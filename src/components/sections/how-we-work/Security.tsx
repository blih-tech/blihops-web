'use client';

import { useRef } from 'react';
import { LockIcon, ShieldCheckIcon } from 'lucide-react';
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

export function Security() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('ProcessPage.security');
  const trustPoints = t.raw('points') as string[];

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24"
      aria-label={t('ariaLabel')}
    >
      <div className="relative bg-background">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-5 -left-5 top-0 z-10 h-px bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-5 bottom-0 -left-5 z-10 h-px bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-5 -bottom-5 left-0 z-10 w-px bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-1.25rem] right-0 bottom-[-1.25rem] z-10 w-px bg-border"
        />

        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="flex flex-col justify-center border-b border-border px-6 py-12 md:px-10 md:py-16 lg:border-r lg:border-b-0">
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
              className="mt-4 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl"
            >
              {t('title')}
            </TimelineAnimation>
            <TimelineAnimation
              as="p"
              animationNum={2}
              timelineRef={sectionRef}
              once={false}
              customVariants={motionVariants}
              className="mt-4 max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              {t('description')}
            </TimelineAnimation>

            <ul className="mt-8 space-y-3">
              {trustPoints.map((point, index) => (
                <TimelineAnimation
                  key={point}
                  as="li"
                  animationNum={index + 3}
                  timelineRef={sectionRef}
                  once={false}
                  customVariants={motionVariants}
                  className={cn(
                    'flex items-center gap-3 border border-border bg-muted/40 px-4 py-3 font-sans text-sm text-foreground',
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-border bg-card text-foreground">
                    <ShieldCheckIcon className="size-3.5" strokeWidth={1.75} />
                  </span>
                  {point}
                </TimelineAnimation>
              ))}
            </ul>
          </div>

          <div className="relative flex min-h-72 items-center justify-center bg-foreground px-6 py-16 md:min-h-96 md:py-20">
            <TimelineAnimation
              as="div"
              animationNum={8}
              timelineRef={sectionRef}
              once={false}
              customVariants={motionVariants}
              className="relative flex size-48 items-center justify-center md:size-56"
            >
              <div
                aria-hidden
                className="absolute inset-0 rounded-full border border-background/15"
              />
              <div
                aria-hidden
                className="absolute inset-6 rounded-full border border-dashed border-background/20"
              />
              <div
                aria-hidden
                className="absolute inset-12 rounded-full border border-background/15"
              />
              <div className="relative z-10 flex size-28 items-center justify-center rounded-full border border-background/20 bg-background/10 shadow-md backdrop-blur-sm md:size-32">
                <LockIcon
                  className="size-12 text-background md:size-14"
                  strokeWidth={1.25}
                />
              </div>
            </TimelineAnimation>
          </div>
        </div>
      </div>
    </section>
  );
}
