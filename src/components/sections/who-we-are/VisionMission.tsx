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

type VisionMissionProps = {
  className?: string;
};

const driverKeys = [
  'reliableSystems',
  'aiAssistedOperations',
  'africanTalent',
] as const;

export function VisionMission({ className }: VisionMissionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutPage.visionMission');

  return (
    <section
      ref={sectionRef}
      className={cn('w-full py-16 md:py-24', className)}
      aria-labelledby="vision-mission-heading"
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
          id="vision-mission-heading"
          className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          {t('heading')}
        </TimelineAnimation>
      </div>

      <div className="mt-12 border border-border md:mt-16">
        <TimelineAnimation
          as="div"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="bg-primary p-6 text-primary-foreground md:p-10 lg:p-12"
        >
          <p className="font-sans text-xs font-medium tracking-widest text-primary-foreground/70 uppercase">
            {t('visionLabel')}
          </p>
          <p className="mt-8 max-w-4xl font-heading text-3xl leading-tight font-semibold tracking-tight md:text-5xl">
            {t('vision')}
          </p>
        </TimelineAnimation>

        <div className="grid border-t border-border lg:grid-cols-12">
          <TimelineAnimation
            as="div"
            animationNum={3}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="bg-muted/40 p-6 md:p-10 lg:col-span-5 lg:border-r lg:border-border"
          >
            <p className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase">
              {t('missionLabel')}
            </p>
            <p className="mt-6 font-heading text-2xl leading-snug font-semibold tracking-tight text-foreground md:text-3xl">
              {t('mission')}
            </p>
          </TimelineAnimation>

          <div className="divide-y divide-border bg-background lg:col-span-7">
            {driverKeys.map((key, index) => (
              <TimelineAnimation
                key={key}
                as="article"
                animationNum={4 + index}
                timelineRef={sectionRef}
                once={false}
                customVariants={motionVariants}
                className="grid gap-2 p-6 transition-colors duration-300 hover:bg-muted/40 sm:grid-cols-[minmax(0,0.75fr)_minmax(0,1fr)] sm:items-baseline md:p-8"
              >
                <h3 className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {t(`drivers.${key}.title`)}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {t(`drivers.${key}.description`)}
                </p>
              </TimelineAnimation>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
