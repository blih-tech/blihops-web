'use client';

import { useRef, type ReactNode, type RefObject } from 'react';
import { BarChartIcon, EyeOffIcon, FlameIcon, WalletIcon } from 'lucide-react';
import type { HTMLMotionProps, Variants } from 'motion/react';

import { DecorIcon } from '@/components/decor-icon';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { cn } from '@/lib/utils';

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

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col justify-center gap-12 py-16 md:py-24"
      aria-label="The real cost of doing it all yourself"
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
          Great Businesses Stall When Operations Take Over
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={problemMotionVariants}
          className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          You didn&apos;t start your business to chase support tickets or
          babysit processes. Stretched thin and overspending, scaling feels
          harder every quarter. There&apos;s a smarter way than traditional
          models.
        </TimelineAnimation>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
        {problems.map((problem, index) => (
          <ProblemCardItem
            key={problem.title}
            problem={problem}
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

const problems: ProblemCard[] = [
  {
    title: 'The Cost Trap',
    icon: <WalletIcon />,
    description:
      'Recruiting, training, and retaining an in-house operations team costs more than it should. And every time someone leaves, you start from zero.',
  },
  {
    title: 'The Visibility Gap',
    icon: <EyeOffIcon />,
    description:
      "There's no dashboard, no SLA, no weekly report. You find out about problems when clients complain not before. Operations run on hope, not data.",
  },
  {
    title: 'The Scaling Wall',
    icon: <BarChartIcon />,
    description:
      "Manual processes and tribal knowledge don't scale. Every new client means more chaos, more hires, more firefighting. You need intelligent systems, not just more people.",
  },
  {
    title: 'The Outsourcing Burn',
    icon: <FlameIcon />,
    description:
      'You tried offshore outsourcing and got missed deadlines, poor quality, and zero accountability. You need a partner who treats your operations like their own.',
  },
];
