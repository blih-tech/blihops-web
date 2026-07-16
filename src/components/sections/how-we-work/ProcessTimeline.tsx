'use client';

import { useRef, type ReactNode } from 'react';
import {
  BookOpenIcon,
  SearchIcon,
  TrendingUpIcon,
  UsersIcon,
  ZapIcon,
} from 'lucide-react';
import {
  motion,
  useInView,
  useScroll,
  useSpring,
  useTransform,
  type Variants,
} from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { cn } from '@/lib/utils';

const headerVariants: Variants = {
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

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const steps = [
  {
    id: '01',
    key: 'discoveryAssessment',
    icon: SearchIcon,
  },
  {
    id: '02',
    key: 'solutionDesign',
    icon: BookOpenIcon,
  },
  {
    id: '03',
    key: 'teamAssembly',
    icon: UsersIcon,
  },
  {
    id: '04',
    key: 'goLive',
    icon: ZapIcon,
  },
  {
    id: '05',
    key: 'continuousOptimization',
    icon: TrendingUpIcon,
  },
] as const;

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('ProcessPage.timeline');

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start 70%', 'end 35%'],
  });

  const progressHeight = useSpring(
    useTransform(scrollYProgress, [0, 1], ['0%', '100%']),
    { stiffness: 120, damping: 28, mass: 0.35 },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-16"
      aria-label={t('ariaLabel')}
    >
      <div className="relative bg-background">
        {/* Outer frame lines that overrun corners so they cross */}
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

        <div className="border-b border-border px-6 py-10 md:px-10 md:py-12">
          <TimelineAnimation
            as="p"
            animationNum={0}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="mb-4 inline-flex items-center rounded-sm border border-border bg-muted/40 px-3 py-1 font-sans text-xs font-medium text-muted-foreground"
          >
            {t('eyebrow')}
          </TimelineAnimation>
          <TimelineAnimation
            as="h2"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="font-heading max-w-2xl text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
          >
            {t('title')}
          </TimelineAnimation>
          <TimelineAnimation
            as="p"
            animationNum={2}
            timelineRef={sectionRef}
            once={false}
            customVariants={headerVariants}
            className="mt-4 max-w-xl font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {t('description')}
          </TimelineAnimation>
        </div>

        <div ref={trackRef} className="relative">
          {/* Center vertical rail + scroll progress fill */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-0 bottom-0 left-1/2 z-20 hidden w-px -translate-x-1/2 bg-border md:block"
          >
            <motion.div
              className="absolute top-0 left-1/2 w-px -translate-x-1/2 origin-top overflow-hidden"
              style={{ height: progressHeight }}
            >
              <div className="absolute inset-0 bg-linear-to-b from-foreground/50 via-foreground to-foreground/70" />
              <div className="absolute inset-y-0 left-0 w-px bg-background/30" />
              <div className="absolute inset-0 bg-linear-to-b from-transparent via-background/20 to-transparent opacity-80 animate-pulse" />
              <div className="absolute -inset-x-0.5 inset-y-0 bg-foreground/25 blur-[2px]" />
              <div className="absolute bottom-0 left-1/2 size-1.5 -translate-x-1/2 translate-y-1/2 rounded-full bg-foreground shadow-[0_0_8px_1px] shadow-foreground/40" />
            </motion.div>
          </div>

          {steps.map((step, index) => (
            <TimelineRow
              key={step.id}
              step={step}
              reverse={index % 2 === 1}
              isLast={index === steps.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function TimelineRow({
  step,
  reverse,
  isLast,
}: {
  step: (typeof steps)[number];
  reverse: boolean;
  isLast: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: false, margin: '-12% 0px' });
  const Icon = step.icon;
  const t = useTranslations('ProcessPage.timeline.steps');

  const textBlock = (
    <div
      className={cn(
        'flex flex-col justify-center px-6 py-12 md:px-10 md:py-16',
        reverse ? 'md:items-start md:text-left' : 'md:items-end md:text-right',
      )}
    >
      <p className="mb-2 font-mono text-xs font-medium tracking-widest text-muted-foreground">
        {step.id}
      </p>
      <h3 className="font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
        {t(`${step.key}.title`)}
      </h3>
      <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        {t(`${step.key}.description`)}
      </p>
    </div>
  );

  const visualBlock = (
    <div className="flex items-center justify-center px-6 py-12 md:px-10 md:py-16">
      <TimelineVisual>
        <Icon
          className="size-10 text-foreground md:size-12"
          strokeWidth={1.25}
        />
      </TimelineVisual>
    </div>
  );

  return (
    <motion.div
      ref={rowRef}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={rowVariants}
      className={cn(
        'grid grid-cols-1 md:grid-cols-2',
        !isLast && 'border-b border-border',
      )}
    >
      <div
        className={cn(
          'border-border md:border-r',
          reverse && 'order-2 border-r-0 md:order-1 md:border-r-0',
        )}
      >
        {reverse ? visualBlock : textBlock}
      </div>
      <div className={cn(reverse && 'order-1 md:order-2')}>
        {reverse ? textBlock : visualBlock}
      </div>
    </motion.div>
  );
}

function TimelineVisual({ children }: { children: ReactNode }) {
  return (
    <div className="group/visual relative flex size-44 items-center justify-center md:size-52">
      {/* back layers with hatch */}
      <div
        aria-hidden
        className="absolute size-[78%] -translate-x-2 -translate-y-2 border border-border bg-muted/40 transition-transform duration-500 ease-out group-hover/visual:-translate-x-3 group-hover/visual:-translate-y-3"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 3px, color-mix(in oklch, var(--border) 55%, transparent) 3px, color-mix(in oklch, var(--border) 55%, transparent) 4px)',
        }}
      />
      <div
        aria-hidden
        className="absolute size-[78%] translate-x-2 translate-y-2 border border-border bg-muted/30 transition-transform duration-500 ease-out group-hover/visual:translate-x-3 group-hover/visual:translate-y-3"
        style={{
          backgroundImage:
            'repeating-linear-gradient(-45deg, transparent, transparent 3px, color-mix(in oklch, var(--border) 45%, transparent) 3px, color-mix(in oklch, var(--border) 45%, transparent) 4px)',
        }}
      />
      {/* front card */}
      <div className="relative z-10 flex size-[72%] items-center justify-center border border-border bg-card shadow-xs transition-all duration-500 ease-out group-hover/visual:-translate-y-1 group-hover/visual:border-foreground/20 group-hover/visual:shadow-md group-hover/visual:[&_svg]:scale-110">
        <span className="transition-transform duration-500 ease-out group-hover/visual:scale-110">
          {children}
        </span>
      </div>
    </div>
  );
}
