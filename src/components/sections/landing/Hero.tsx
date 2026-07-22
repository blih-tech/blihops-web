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

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('Home.hero');
  const tActions = useTranslations('Shared.actions');

  return (
    <section
      ref={sectionRef}
      className="relative mx-auto w-full max-w-6xl font-sans"
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
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span>{t('eyebrow')}</span>
        </TimelineAnimation>

        <TimelineAnimation
          as="h1"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroMotionVariants}
          className="font-heading max-w-3xl text-center text-[2rem] leading-[1.08] font-semibold tracking-tight text-balance text-foreground sm:text-5xl lg:text-6xl"
        >
          {t('title')}
        </TimelineAnimation>

        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroMotionVariants}
          className="font-sans mx-auto max-w-xl text-center text-base leading-relaxed tracking-normal text-pretty text-muted-foreground sm:text-lg"
        >
          {t('description')}
        </TimelineAnimation>

        <TimelineAnimation
          as="div"
          animationNum={3}
          timelineRef={sectionRef}
          once={false}
          customVariants={heroMotionVariants}
          className="flex w-full flex-col items-center justify-center gap-3 pt-1 sm:w-auto sm:flex-row sm:flex-wrap"
        >
          <BookCallButton
            calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
            namespace="blih-ops-desicovery-call"
            className="h-10 w-full rounded-md border border-border bg-background! px-4 text-foreground! hover:bg-muted! hover:text-foreground! sm:w-auto"
          />
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group/cta w-full bg-primary hover:bg-primary sm:w-auto',
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
