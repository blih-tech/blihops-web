'use client';

import { useRef } from 'react';
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from 'lucide-react';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { BookCallButton } from '@/components/BookCallButton';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { HeroBackdrop } from '@/components/sections/shared/HeroBackdrop';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const motionVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: 16,
    opacity: 0,
  },
};

export function HowWeWorkHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('ProcessPage.hero');
  const tActions = useTranslations('Shared.actions');

  return (
    <section
      ref={sectionRef}
      className="relative w-full py-16 md:py-24"
      aria-label={t('ariaLabel')}
    >
      <HeroBackdrop />

      <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
        <TimelineAnimation
          as="div"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="flex w-fit items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-foreground uppercase"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          {t('eyebrow')}
        </TimelineAnimation>

        <TimelineAnimation
          as="h1"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="mt-5 font-heading text-4xl font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </TimelineAnimation>

        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="mt-5 max-w-2xl font-sans text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          {t('description')}
        </TimelineAnimation>

        <TimelineAnimation
          as="div"
          animationNum={3}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          <BookCallButton
            calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
            namespace="blih-ops-desicovery-call"
            className="h-10 rounded-md border border-border bg-background px-4 text-foreground hover:bg-muted hover:text-foreground"
          />
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group/cta bg-primary hover:bg-primary',
            )}
          >
            {tActions('getPilot')}
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform group-hover/cta:translate-x-0.5"
            />
          </Link>
        </TimelineAnimation>
      </div>
    </section>
  );
}
