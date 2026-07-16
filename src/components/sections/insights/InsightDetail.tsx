'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useRef } from 'react';
import { ArrowLeftIcon, ArrowUpRightIcon } from 'lucide-react';
import type { Variants } from 'motion/react';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { buttonVariants } from '@/components/ui/button';
import type { Insight } from '@/content/insights';
import { useActiveSection } from '@/hooks/use-active-section';
import { cn } from '@/lib/utils';

const revealVariants: Variants = {
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
    y: 16,
    opacity: 0,
  },
};

type ArticleSection = {
  id: string;
  label: string;
  heading: string;
  html: string;
};

function parseSections(contentHtml: string): ArticleSection[] {
  const headingRegex = /<h2[^>]*>(.*?)<\/h2>/gi;
  const matches = Array.from(contentHtml.matchAll(headingRegex));

  return matches.map((match, index) => {
    const heading = match[1].trim();
    const start = (match.index ?? 0) + match[0].length;
    const end = matches[index + 1]?.index ?? contentHtml.length;

    return {
      id: heading.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      label: String(index + 1).padStart(2, '0'),
      heading,
      html: contentHtml.slice(start, end).trim(),
    };
  });
}

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));
}

export function InsightDetail({ insight }: { insight: Insight }) {
  return (
    <article>
      <InsightHeader insight={insight} />

      <figure className="group relative aspect-video w-full overflow-hidden border border-border bg-muted">
        <Image
          src={insight.heroImage}
          alt={`${insight.title} — BlihOps insight`}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 72rem"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.015]"
        />
      </figure>

      <InsightArticle insight={insight} />
    </article>
  );
}

function InsightHeader({ insight }: { insight: Insight }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="border-b border-border py-12 md:py-20"
      aria-label="Insight summary"
    >
      <TimelineAnimation
        as="div"
        animationNum={0}
        timelineRef={sectionRef}
        once={false}
        customVariants={revealVariants}
      >
        <Link
          href="/insights"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'h-auto gap-1.5 px-0 font-sans text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground',
          )}
        >
          <ArrowLeftIcon className="size-4" />
          Back to insights
        </Link>
      </TimelineAnimation>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <TimelineAnimation
            as="div"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="flex w-fit items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 font-sans text-xs font-medium tracking-wide text-foreground uppercase"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>{insight.category}</span>
          </TimelineAnimation>

          <TimelineAnimation
            as="h1"
            animationNum={2}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {insight.title}
          </TimelineAnimation>

          <TimelineAnimation
            as="p"
            animationNum={3}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {insight.excerpt}
          </TimelineAnimation>
        </div>

        <div className="lg:col-span-5">
          <TimelineAnimation
            as="div"
            animationNum={4}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="relative"
          >
            <CornerExtensions />
            <dl className="grid grid-cols-1 gap-px border border-border bg-border">
              <BriefRow label="Author" value={insight.author} />
              <BriefRow
                label="Published"
                value={formatDate(insight.publishedAt)}
              />
              <BriefRow label="Reading time" value={insight.readTime} />
              <BriefRow label="Topic" value={insight.category} />
            </dl>
          </TimelineAnimation>
        </div>
      </div>
    </section>
  );
}

function BriefRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] items-start gap-4 bg-background px-5 py-4 md:gap-6 md:px-6">
      <dt className="font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="font-sans text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function CornerExtensions() {
  const marks = [
    '-top-4 left-0 h-4 w-px',
    'top-0 -left-4 h-px w-4',
    '-top-4 right-0 h-4 w-px',
    'top-0 -right-4 h-px w-4',
    '-bottom-4 left-0 h-4 w-px',
    'bottom-0 -left-4 h-px w-4',
    '-bottom-4 right-0 h-4 w-px',
    'bottom-0 -right-4 h-px w-4',
  ];

  return marks.map((className) => (
    <span
      key={className}
      aria-hidden
      className={cn('pointer-events-none absolute bg-border', className)}
    />
  ));
}

function InsightArticle({ insight }: { insight: Insight }) {
  const sectionRef = useRef<HTMLElement>(null);
  const sections = parseSections(insight.contentHtml);
  const [activeSection, setActiveSection] = useActiveSection(
    sections.map((section) => section.id).join(','),
  );

  if (sections.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24"
      aria-label="Article content"
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <aside className="h-fit lg:sticky lg:top-24 lg:col-span-4">
          <TimelineAnimation
            as="p"
            animationNum={0}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase"
          >
            In this article
          </TimelineAnimation>

          <nav aria-label="Article sections">
            <ol className="mt-6 space-y-3">
              {sections.map((section) => {
                const isActive = activeSection === section.id;

                return (
                  <li key={section.id}>
                    <a
                      href={`#${section.id}`}
                      onClick={() => setActiveSection(section.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={cn(
                        'group flex items-baseline gap-3 font-sans text-sm text-muted-foreground transition-[color,transform] duration-300 hover:text-foreground',
                        isActive && 'translate-x-1.5 text-foreground',
                      )}
                    >
                      <span className="font-mono text-[11px] tracking-widest text-primary">
                        {section.label}
                      </span>
                      <span
                        className={cn(
                          'border-b border-transparent transition-colors group-hover:border-border',
                          isActive && 'border-border',
                        )}
                      >
                        {section.heading}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ol>
          </nav>

          <div className="mt-8 border-t border-border pt-5 font-sans text-xs leading-relaxed text-muted-foreground">
            <p>{insight.author}</p>
            <p className="mt-1">{insight.readTime}</p>
          </div>
        </aside>

        <div className="lg:col-span-8">
          <div className="divide-y divide-border">
            {sections.map((section, index) => (
              <TimelineAnimation
                key={section.id}
                as="section"
                animationNum={index + 1}
                timelineRef={sectionRef}
                once={false}
                customVariants={revealVariants}
                id={section.id}
                className="scroll-mt-28 py-10 first:pt-0"
                aria-labelledby={`${section.id}-heading`}
              >
                <p className="font-mono text-[11px] tracking-widest text-primary">
                  {section.label}
                </p>
                <h2
                  id={`${section.id}-heading`}
                  className="mt-3 font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl"
                >
                  {section.heading}
                </h2>
                <div
                  className="mt-6 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground [&_a]:font-medium [&_a]:text-primary [&_a]:underline [&_a]:underline-offset-4 [&_blockquote]:relative [&_blockquote]:my-7 [&_blockquote]:bg-foreground [&_blockquote]:py-5 [&_blockquote]:pr-5 [&_blockquote]:pl-10 [&_blockquote]:text-sm [&_blockquote]:text-background [&_blockquote]:before:absolute [&_blockquote]:before:inset-y-5 [&_blockquote]:before:left-5 [&_blockquote]:before:w-0.5 [&_blockquote]:before:rounded-full [&_blockquote]:before:bg-background/40 [&_blockquote]:before:content-[''] [&_h3]:mt-8 [&_h3]:mb-3 [&_h3]:font-heading [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:tracking-tight [&_h3]:text-foreground [&_li]:pl-1 [&_ol]:my-5 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5 [&_p]:mb-5 [&_p:last-child]:mb-0 [&_strong]:font-semibold [&_strong]:text-foreground [&_ul]:my-5 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ul]:marker:text-primary md:[&_blockquote]:py-6 md:[&_blockquote]:pr-6 md:[&_blockquote]:pl-12 md:[&_blockquote]:text-[15px] md:[&_blockquote]:before:inset-y-6 md:[&_blockquote]:before:left-6"
                  dangerouslySetInnerHTML={{ __html: section.html }}
                />
              </TimelineAnimation>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {insight.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md border border-border bg-muted px-3 py-1.5 font-sans text-xs font-medium text-muted-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function InsightRelated({ insights }: { insights: Insight[] }) {
  if (insights.length === 0) return null;

  return (
    <section
      className="border-t border-border py-16 md:py-24"
      aria-label="Related insights"
    >
      <div className="mb-10 flex items-baseline justify-between gap-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Related insights
        </h2>
        <Link
          href="/insights"
          className="hidden font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {insights.map((insight) => (
          <Link
            key={insight.slug}
            href={`/insights/${insight.slug}`}
            className="group flex flex-col bg-background p-5 transition-colors hover:bg-muted/50"
            aria-label={`Read insight: ${insight.title}`}
          >
            <div className="relative aspect-video w-full overflow-hidden border border-border bg-muted">
              <Image
                src={insight.heroImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]"
              />
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              <p className="font-sans text-[11px] font-medium text-primary">
                {insight.category}
                <span className="text-muted-foreground">
                  {' '}
                  · {formatDate(insight.publishedAt)}
                </span>
              </p>
              <h3 className="mt-3 max-w-lg font-heading text-lg font-semibold leading-tight tracking-tight text-foreground">
                {insight.title}
              </h3>
              <p className="mt-3 line-clamp-2 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground">
                {insight.excerpt}
              </p>
              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <p className="font-sans text-xs text-muted-foreground">
                  {insight.author} · {insight.readTime}
                </p>
                <ArrowUpRightIcon className="size-5 shrink-0 text-primary motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
