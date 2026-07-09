'use client';

import type { Variants } from 'motion/react';
import { type HTMLMotionProps, motion, useInView } from 'motion/react';
import type React from 'react';

import { cn } from '@/lib/utils';

type TimelineContentProps<T extends keyof HTMLElementTagNameMap> = {
  children?: React.ReactNode;
  animationNum: number;
  className?: string;
  timelineRef: React.RefObject<HTMLElement | null>;
  as?: T;
  customVariants?: Variants;
  once?: boolean;
} & HTMLMotionProps<T>;

const defaultSequenceVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
  hidden: {
    filter: 'blur(12px)',
    y: 12,
    opacity: 0,
  },
};

export function TimelineAnimation<
  T extends keyof HTMLElementTagNameMap = 'div',
>({
  children,
  animationNum,
  timelineRef,
  className,
  as,
  customVariants,
  once = true,
  ...props
}: TimelineContentProps<T>) {
  const sequenceVariants = customVariants ?? defaultSequenceVariants;

  const isInView = useInView(timelineRef, {
    once,
    margin: '-8% 0px',
  });

  const MotionComponent = motion[as || 'div'] as React.ElementType;

  return (
    <MotionComponent
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      custom={animationNum}
      variants={sequenceVariants}
      className={cn('text-foreground', className)}
      {...props}
    >
      {children}
    </MotionComponent>
  );
}
