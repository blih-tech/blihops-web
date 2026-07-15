'use client';

import { useRef } from 'react';
import type { Variants } from 'motion/react';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';

const heroVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
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

export function InsightsHero() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="border-b border-border py-16 md:py-24"
      aria-labelledby="insights-heading"
    >
      <div className="max-w-3xl">
        <TimelineAnimation
          as="div"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroVariants}
          className="flex w-fit items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 font-sans text-xs font-medium tracking-wide text-foreground uppercase"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span>Insights</span>
        </TimelineAnimation>
        <TimelineAnimation
          as="h1"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroVariants}
          id="insights-heading"
          className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
        >
          Practical thinking for better operations.
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroVariants}
          className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          Field notes on service design, automation, quality, reporting, and
          delivery.
        </TimelineAnimation>
      </div>
    </section>
  );
}
