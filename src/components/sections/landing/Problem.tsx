'use client';

import { useRef, type ReactNode, type RefObject } from 'react';
import { BarChartIcon, EyeOffIcon, FlameIcon, WalletIcon } from 'lucide-react';
import type { HTMLMotionProps, Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { DecorIcon } from '@/components/decor-icon';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { cn } from '@/lib/utils';

type ProblemDefinition = {
  key: 'costTrap' | 'visibilityGap' | 'scalingWall' | 'outsourcingBurn';
  icon: ReactNode;
};

type ProblemCard = {
  title: string;
  icon: ReactNode;
  description: string;
};

const problemMotionVariants: Variants = {
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
    y: 18,
    opacity: 0,
  },
};

export function Problem() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('Home.problem');

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col justify-center gap-12 py-16 md:py-24"
      aria-label={t('ariaLabel')}
    >
      <div className="mx-auto max-w-2xl space-y-3 text-center">
        <TimelineAnimation
          as="h2"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={problemMotionVariants}
          className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          {t('title')}
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={problemMotionVariants}
          className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          {t('description')}
        </TimelineAnimation>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {problems.map((problem, index) => (
          <ProblemCardItem
            key={problem.key}
            problem={{
              title: t(`items.${problem.key}.title`),
              description: t(`items.${problem.key}.description`),
              icon: problem.icon,
            }}
            animationNum={index + 2}
            timelineRef={sectionRef}
          />
        ))}
      </div>
    </section>
  );
}

function ProblemCardItem({
  problem,
  animationNum,
  timelineRef,
  className,
  ...props
}: HTMLMotionProps<'div'> & {
  problem: ProblemCard;
  animationNum: number;
  timelineRef: RefObject<HTMLElement | null>;
}) {
  return (
    <TimelineAnimation
      as="div"
      animationNum={animationNum}
      timelineRef={timelineRef}
      once={false}
      customVariants={problemMotionVariants}
      className={cn(
        'group relative flex flex-col justify-between gap-6 bg-background px-6 pt-8 pb-6 shadow-xs transition-colors duration-300 hover:bg-muted',
        'dark:bg-[radial-gradient(50%_80%_at_25%_0%,--theme(--color-foreground/.1),transparent)]',
        className,
      )}
      {...props}
    >
      <div className="absolute -inset-y-4 -left-px w-px bg-border" />
      <div className="absolute -inset-y-4 -right-px w-px bg-border" />
      <div className="absolute -inset-x-4 -top-px h-px bg-border" />
      <div className="absolute -right-4 -bottom-px -left-4 h-px bg-border" />

      <DecorIcon className="size-3.5" position="top-left" />

      <div
        className={cn(
          'relative z-10 flex w-fit items-center justify-center rounded-lg border bg-muted/20 p-3',
          '[&_svg]:size-5 [&_svg]:stroke-[1.5] [&_svg]:text-foreground [&_svg]:transition-transform [&_svg]:duration-300 [&_svg]:ease-out group-hover:[&_svg]:scale-110 group-hover:[&_svg]:rotate-3',
        )}
      >
        {problem.icon}
      </div>

      <div className="relative z-10 space-y-2">
        <h3 className="font-heading text-base font-medium text-foreground">
          {problem.title}
        </h3>
        <p className="font-sans text-xs leading-relaxed text-muted-foreground">
          {problem.description}
        </p>
      </div>
    </TimelineAnimation>
  );
}

const problems: ProblemDefinition[] = [
  {
    key: 'costTrap',
    icon: <WalletIcon />,
  },
  {
    key: 'visibilityGap',
    icon: <EyeOffIcon />,
  },
  {
    key: 'scalingWall',
    icon: <BarChartIcon />,
  },
  {
    key: 'outsourcingBurn',
    icon: <FlameIcon />,
  },
];
