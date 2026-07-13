import type { ComponentPropsWithoutRef, ElementType, ReactNode } from 'react';

import { cn } from '@/lib/utils';

type SectionWrapperProps<T extends ElementType = 'div'> = {
  as?: T;
  children: ReactNode;
  className?: string;
} & Omit<ComponentPropsWithoutRef<T>, 'as' | 'children' | 'className'>;

export function SectionWrapper<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...props
}: SectionWrapperProps<T>) {
  const Component = (as ?? 'div') as ElementType;

  return (
    <Component
      className={cn('mx-auto w-full max-w-6xl px-4 sm:px-6', className)}
      {...props}
    >
      {children}
    </Component>
  );
}
