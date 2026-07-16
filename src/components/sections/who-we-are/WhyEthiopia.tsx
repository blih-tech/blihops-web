'use client';

import Image from 'next/image';
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

type WhyEthiopiaProps = {
  className?: string;
};

const advantageKeys = [
  'lowerCosts',
  'englishTalent',
  'timeOverlap',
  'outsourcingHub',
  'workforceModel',
] as const;

export function WhyEthiopia({ className }: WhyEthiopiaProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutPage.ethiopia');

  return (
    <section
      ref={sectionRef}
      className={cn('w-full py-16 md:py-24', className)}
      aria-labelledby="why-ethiopia-heading"
    >
      <TimelineAnimation
        as="div"
        animationNum={0}
        timelineRef={sectionRef}
        once={false}
        customVariants={motionVariants}
        className="group relative min-h-130 overflow-hidden border border-border md:min-h-150"
      >
        <Image
          src="/addis-image.jpg"
          alt={t('imageAlt')}
          fill
          sizes="(max-width: 1280px) 100vw, 1152px"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.02]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/45 to-foreground/10" />

        <div className="absolute inset-x-0 bottom-0 p-6 text-background md:p-10 lg:p-12">
          <p className="font-sans text-xs font-medium tracking-widest text-background/70 uppercase">
            {t('eyebrow')}
          </p>
          <h2
            id="why-ethiopia-heading"
            className="mt-5 max-w-3xl font-heading text-3xl font-semibold tracking-tight md:text-5xl"
          >
            {t('title')}
          </h2>
          <p className="mt-5 max-w-2xl font-sans text-sm leading-relaxed text-background/80 md:text-base">
            {t('description')}
          </p>
        </div>
      </TimelineAnimation>

      <div className="grid grid-cols-1 gap-px border-x border-b border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
        {advantageKeys.map((key, index) => (
          <TimelineAnimation
            key={key}
            as="article"
            animationNum={1 + index}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="min-h-36 bg-background p-5 transition-colors duration-300 hover:bg-muted/50 md:p-6"
          >
            <p className="font-heading text-2xl font-semibold tracking-tight text-foreground">
              {t(`advantages.${key}.highlight`)}
            </p>
            <p className="mt-3 font-sans text-xs leading-relaxed text-muted-foreground uppercase tracking-wide">
              {t(`advantages.${key}.label`)}
            </p>
          </TimelineAnimation>
        ))}
      </div>
    </section>
  );
}
