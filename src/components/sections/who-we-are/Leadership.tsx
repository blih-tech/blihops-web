'use client';

import { useRef } from 'react';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { cn } from '@/lib/utils';

const motionVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: 18,
    opacity: 0,
  },
};

type LeadershipProps = {
  className?: string;
};

const principleKeys = [
  'deliveryOwnership',
  'qualityOwnership',
  'performanceVisibility',
] as const;

export function Leadership({ className }: LeadershipProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutPage.leadership');

  return (
    <section
      ref={sectionRef}
      className={cn('w-full py-16 md:py-24', className)}
      aria-labelledby="leadership-heading"
    >
      <div className="max-w-3xl">
        <TimelineAnimation
          as="p"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t('eyebrow')}
        </TimelineAnimation>
        <TimelineAnimation
          as="h2"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          id="leadership-heading"
          className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          {t('title')}
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {t('description')}
        </TimelineAnimation>
      </div>

      <div className="mt-12 border border-border bg-muted/30 p-6 md:mt-16 md:p-10">
        <div className="grid items-stretch md:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {principleKeys.map((key, index) => (
            <div key={key} className="contents">
              <TimelineAnimation
                as="article"
                animationNum={3 + index}
                timelineRef={sectionRef}
                once={false}
                customVariants={motionVariants}
                className="py-6 md:px-6 md:py-4"
              >
                <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {t(`principles.${key}.title`)}
                </h3>
                <p className="mt-4 font-sans text-sm leading-relaxed text-muted-foreground">
                  {t(`principles.${key}.description`)}
                </p>
              </TimelineAnimation>

              {index < principleKeys.length - 1 ? (
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center"
                >
                  <span className="h-10 w-px bg-border md:h-px md:w-10" />
                </div>
              ) : null}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
