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

const valueLayouts = [
  'md:col-span-7',
  'md:col-span-5',
  'md:col-span-4',
  'md:col-span-4',
  'md:col-span-4',
] as const;

const valueKeys = [
  'intelligence',
  'talent',
  'reliability',
  'quality',
  'efficiency',
] as const;

type CoreValuesProps = {
  className?: string;
};

export function CoreValues({ className }: CoreValuesProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutPage.coreValues');

  return (
    <section
      ref={sectionRef}
      className={cn('w-full py-16 md:py-24', className)}
      aria-labelledby="core-values-heading"
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
          id="core-values-heading"
          className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          {t('title')}
        </TimelineAnimation>
      </div>

      <div className="mt-12 grid grid-cols-1 gap-px border border-border bg-border md:mt-16 md:grid-cols-12">
        {valueKeys.map((key, index) => {
          const isFeatured = key === 'talent';

          return (
            <TimelineAnimation
              key={key}
              as="article"
              animationNum={2 + index}
              timelineRef={sectionRef}
              once={false}
              customVariants={motionVariants}
              className={cn(
                'group min-h-52 p-6 transition-colors duration-300 hover:bg-muted/50 md:p-8',
                isFeatured ? 'bg-muted/50' : 'bg-background',
                valueLayouts[index],
              )}
            >
              <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-8 max-w-md font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                {t(`items.${key}.description`)}
              </p>
              <div
                className={cn(
                  'mt-8 h-0.5 transition-all duration-300 group-hover:w-16 group-hover:bg-primary',
                  isFeatured ? 'w-16 bg-primary' : 'w-10 bg-border',
                )}
              />
            </TimelineAnimation>
          );
        })}
      </div>
    </section>
  );
}
