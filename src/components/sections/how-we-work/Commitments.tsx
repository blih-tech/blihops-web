'use client';

import { useRef } from 'react';
import {
  BarChart3Icon,
  CheckCircle2Icon,
  GlobeIcon,
  LayersIcon,
  ShieldCheckIcon,
  UserCircleIcon,
} from 'lucide-react';
import type { Variants } from 'motion/react';

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

const commitments = [
  {
    title: 'Dedicated account manager',
    description:
      'A single point of contact who knows your business, goals, and preferences.',
    icon: UserCircleIcon,
  },
  {
    title: 'Transparent weekly reporting',
    description:
      'SLA compliance, output volume, quality scores, and optimization insights every week.',
    icon: BarChart3Icon,
  },
  {
    title: 'GDPR-aware operations',
    description:
      'GDPR-aware practices for European markets. Your data is handled with care.',
    icon: GlobeIcon,
  },
  {
    title: 'Flexible scaling',
    description:
      'Scale up or down as needs change. No long-term lock-in. Our model adapts to you.',
    icon: LayersIcon,
  },
  {
    title: 'ISO-aligned standards',
    description:
      'Operations follow ISO 9001 and ISO 27001-aligned processes. Security and quality built in.',
    icon: ShieldCheckIcon,
  },
  {
    title: 'Quality assurance framework',
    description:
      'Defined quality gates so errors are caught before they reach you, not after.',
    icon: CheckCircle2Icon,
  },
] as const;

export function Commitments() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24"
      aria-label="Our commitments"
    >
      <div className="mx-auto mb-12 max-w-2xl space-y-3 text-center md:mb-16">
        <TimelineAnimation
          as="p"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          Our commitments
        </TimelineAnimation>
        <TimelineAnimation
          as="h2"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          What you can always expect
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Clear ownership, measured delivery, and standards that hold as you
          scale.
        </TimelineAnimation>
      </div>

      <TimelineAnimation
        as="div"
        animationNum={3}
        timelineRef={sectionRef}
        once={false}
        customVariants={motionVariants}
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 md:gap-4"
      >
        {commitments.map((item, index) => {
          const Icon = item.icon;
          const isAccent = index % 2 === 0;
          return (
            <div
              key={item.title}
              className={cn(
                'group flex flex-col gap-4 border border-border p-6 transition-colors duration-300 md:p-8',
                isAccent ? 'bg-muted hover:bg-muted' : 'bg-card hover:bg-muted',
              )}
            >
              <span className="flex size-10 items-center justify-center rounded-md border border-border bg-muted text-foreground transition-transform duration-300 group-hover:scale-105">
                <Icon className="size-5" strokeWidth={1.5} />
              </span>
              <div className="space-y-2">
                <h3 className="font-heading text-base font-semibold tracking-tight text-foreground md:text-lg">
                  {item.title}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground">
                  {item.description}
                </p>
              </div>
            </div>
          );
        })}
      </TimelineAnimation>
    </section>
  );
}
