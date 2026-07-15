'use client';

import { useRef } from 'react';
import type { Variants } from 'motion/react';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import type { CaseStudy } from '@/content/case-studies';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

const narrativeVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: 18,
    opacity: 0,
  },
};

type Chapter = {
  id: string;
  label: string;
  heading: string;
  html: string;
};

function parseChapters(contentHtml: string): Chapter[] {
  const sections: Chapter[] = [];
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const matches = Array.from(contentHtml.matchAll(headingRegex));

  matches.forEach((match, index) => {
    const headingText = match[1].trim();
    const start = match.index !== undefined ? match.index + match[0].length : 0;
    const end =
      index + 1 < matches.length
        ? matches[index + 1].index
        : contentHtml.length;
    const html = contentHtml.slice(start, end).trim();

    const id = headingText.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    sections.push({
      id,
      label: String(index + 1).padStart(2, '0'),
      heading: headingText,
      html,
    });
  });

  return sections;
}

export function CaseStudyNarrative({ study }: { study: CaseStudy }) {
  const sectionRef = useRef<HTMLElement>(null);
  const chapters = parseChapters(study.contentHtml);
  const [activeChapter, setActiveChapter] = useActiveSection(
    chapters.map((chapter) => chapter.id).join(','),
  );

  if (chapters.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24"
      aria-label="Case study narrative"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="h-fit lg:sticky lg:top-24 lg:col-span-4">
          <TimelineAnimation
            as="p"
            animationNum={0}
            timelineRef={sectionRef}
            once={false}
            customVariants={narrativeVariants}
            className="font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase"
          >
            The narrative
          </TimelineAnimation>
          <TimelineAnimation
            as="h2"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={narrativeVariants}
            className="mt-4 font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
          >
            {study.title}
          </TimelineAnimation>

          <nav aria-label="Chapter index">
            <ol className="mt-8 space-y-3">
              {chapters.map((chapter) => (
                <li key={chapter.id}>
                  <a
                    href={`#${chapter.id}`}
                    onClick={() => setActiveChapter(chapter.id)}
                    aria-current={
                      activeChapter === chapter.id ? 'location' : undefined
                    }
                    className={cn(
                      'group flex items-baseline gap-3 font-sans text-sm text-muted-foreground transition-[color,transform] duration-300 hover:text-foreground',
                      activeChapter === chapter.id &&
                        'translate-x-1.5 text-foreground',
                    )}
                  >
                    <span className="font-mono text-[11px] tracking-widest text-primary">
                      {chapter.label}
                    </span>
                    <span
                      className={cn(
                        'border-b border-transparent transition-colors group-hover:border-border',
                        activeChapter === chapter.id && 'border-border',
                      )}
                    >
                      {chapter.heading}
                    </span>
                  </a>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        <div className="lg:col-span-8">
          <div className="divide-y divide-border">
            {chapters.map((chapter, index) => (
              <TimelineAnimation
                key={chapter.id}
                as="div"
                animationNum={index + 2}
                timelineRef={sectionRef}
                once={false}
                customVariants={narrativeVariants}
                id={chapter.id}
                className="scroll-mt-28 py-10 first:pt-0"
              >
                <div className="flex items-center gap-4">
                  <span className="flex size-10 shrink-0 items-center justify-center border border-border bg-muted font-mono text-sm font-medium tracking-tight text-foreground">
                    {chapter.label}
                  </span>
                  <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                    {chapter.heading}
                  </h3>
                </div>
                <div
                  className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:relative [&_blockquote]:my-7 [&_blockquote]:bg-foreground [&_blockquote]:py-5 [&_blockquote]:pr-5 [&_blockquote]:pl-10 [&_blockquote]:font-sans [&_blockquote]:text-sm [&_blockquote]:leading-relaxed [&_blockquote]:text-background [&_blockquote]:before:absolute [&_blockquote]:before:inset-y-5 [&_blockquote]:before:left-5 [&_blockquote]:before:w-0.5 [&_blockquote]:before:rounded-full [&_blockquote]:before:bg-background/40 [&_blockquote]:before:content-[''] md:[&_blockquote]:py-6 md:[&_blockquote]:pr-6 md:[&_blockquote]:pl-12 md:[&_blockquote]:text-[15px] md:[&_blockquote]:before:inset-y-6 md:[&_blockquote]:before:left-6 [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground [&_li]:pl-1 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-primary"
                  dangerouslySetInnerHTML={{ __html: chapter.html }}
                />
              </TimelineAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
