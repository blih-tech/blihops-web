'use client';

import { Link } from '@/i18n/navigation';
import { useRef } from 'react';
import { ArrowLeftIcon } from 'lucide-react';
import type { Variants } from 'motion/react';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { buttonVariants } from '@/components/ui/button';
import type { CaseStudy } from '@/content/case-studies';
import { cn } from '@/lib/utils';

const headerVariants: Variants = {
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

function formatDate(iso: string): string {
  const date = new Date(`${iso}T00:00:00`);
  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(date);
}

export function CaseStudyHeader({ study }: { study: CaseStudy }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="border-b border-border py-12 md:py-20"
      aria-label="Case study summary"
    >
      <TimelineAnimation
        as="div"
        animationNum={0}
        timelineRef={sectionRef}
        once={false}
        customVariants={headerVariants}
      >
        <Link
          href="/case-studies"
          className={cn(
            buttonVariants({ variant: 'ghost', size: 'sm' }),
            'h-auto gap-1.5 px-0 font-sans text-sm font-medium text-muted-foreground hover:bg-transparent hover:text-foreground',
          )}
        >
          <ArrowLeftIcon className="size-4" />
          Back to case studies
        </Link>
      </TimelineAnimation>

      <div className="mt-8 grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <TimelineAnimation
            as="div"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="flex w-fit items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 font-sans text-xs font-medium tracking-wide text-foreground uppercase"
          >
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-primary" />
            </span>
            <span>{study.services.join('  ·  ')}</span>
          </TimelineAnimation>

          <TimelineAnimation
            as="h1"
            animationNum={2}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="mt-4 font-heading text-3xl font-semibold tracking-tight text-balance text-foreground sm:text-4xl lg:text-5xl"
          >
            {study.title}
          </TimelineAnimation>

          <TimelineAnimation
            as="p"
            animationNum={3}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {study.excerpt}
          </TimelineAnimation>
        </div>

        <div className="lg:col-span-5">
          <TimelineAnimation
            as="div"
            animationNum={4}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="relative"
          >
            {/* Top-left corner: horizontal arm up, vertical arm left */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 left-0 h-4 w-px bg-border"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 -left-4 h-px w-4 bg-border"
            />
            {/* Top-right corner */}
            <span
              aria-hidden
              className="pointer-events-none absolute -top-4 right-0 h-4 w-px bg-border"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute top-0 -right-4 h-px w-4 bg-border"
            />
            {/* Bottom-left corner */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-4 left-0 h-4 w-px bg-border"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 -left-4 h-px w-4 bg-border"
            />
            {/* Bottom-right corner */}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-4 right-0 h-4 w-px bg-border"
            />
            <span
              aria-hidden
              className="pointer-events-none absolute bottom-0 -right-4 h-px w-4 bg-border"
            />
            <dl className="grid grid-cols-1 gap-px border border-border bg-border">
              <BriefRow label="Client" value={study.client} />
              <BriefRow label="Services" value={study.services.join(', ')} />
              <BriefRow
                label="Published"
                value={formatDate(study.publishedAt)}
              />
              {study.tags.length > 0 ? (
                <BriefRow label="Tags" value={study.tags.join(', ')} />
              ) : null}
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
