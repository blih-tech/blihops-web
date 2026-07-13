'use client';

import { useRef } from 'react';
import NumberFlow from '@number-flow/react';
import { useInView, type Variants } from 'motion/react';

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

const stats = [
  {
    id: 'cost',
    value: 40,
    prefix: '25–',
    suffix: '%',
    label: 'Typical cost reduction vs in-house or Western outsourcing',
  },
  {
    id: 'sla',
    value: 90,
    prefix: '',
    suffix: '%',
    label: 'SLA compliance across active delivery pods',
  },
  {
    id: 'pilot',
    value: 15,
    prefix: '',
    suffix: '-day',
    label: 'Average pilot-to-live deployment window',
  },
] as const;

export function Trust() {
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-15% 0px' });

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col gap-12 py-16 md:gap-16 md:py-24"
      aria-label="Trust and proof"
    >
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <TimelineAnimation
          as="p"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          Trust &amp; Proof
        </TimelineAnimation>
        <TimelineAnimation
          as="h2"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          Built for reliability, security, and clear ownership
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          SLA-backed delivery, GDPR-aware processes, and ISO-aligned quality —
          run by Ethiopia-based pods with weekly reporting you can act on.
        </TimelineAnimation>
      </div>

      <TimelineAnimation
        as="div"
        animationNum={3}
        timelineRef={sectionRef}
        once={false}
        customVariants={motionVariants}
      >
        <div
          ref={statsRef}
          className="grid grid-cols-1 gap-1.5 md:grid-cols-3 md:gap-2"
        >
          {stats.map((stat) => (
            <div
              key={stat.id}
              className={cn(
                'flex flex-col items-center justify-center gap-3 rounded-xl border border-border bg-muted px-6 py-12 text-center',
              )}
            >
              <p className="font-heading text-4xl font-semibold tracking-tight text-foreground tabular-nums md:text-5xl">
                <NumberFlow
                  value={statsInView ? stat.value : 0}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                  trend={1}
                  transformTiming={{
                    duration: 900,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                  spinTiming={{
                    duration: 900,
                    easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </p>
              <p className="max-w-[16rem] font-sans text-sm leading-relaxed text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </TimelineAnimation>
    </section>
  );
}
