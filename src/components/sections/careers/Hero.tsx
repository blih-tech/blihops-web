'use client';

import { useRef } from 'react';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { HeroBackdrop } from '@/components/sections/shared/HeroBackdrop';

const heroMotionVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.14,
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

export function CareersHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('CareersPage.hero');

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl font-sans"
      aria-labelledby="careers-heading"
    >
      <HeroBackdrop />
      <div className="relative flex flex-col items-center justify-center gap-6 px-4 pt-16 pb-24 sm:px-6 md:pt-24">
        <TimelineAnimation
          as="div"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroMotionVariants}
          className="mx-auto flex w-fit items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-foreground uppercase"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {t('eyebrow')}
        </TimelineAnimation>

        <TimelineAnimation
          as="h1"
          id="careers-heading"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroMotionVariants}
          className="max-w-3xl text-center font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </TimelineAnimation>

        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroMotionVariants}
          className="mx-auto max-w-2xl text-center text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t('description')}
        </TimelineAnimation>
      </div>
    </section>
  );
}
