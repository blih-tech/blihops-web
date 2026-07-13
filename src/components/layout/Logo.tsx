import Image from 'next/image';

import { cn } from '@/lib/utils';

type LogoProps = {
  className?: string;
  priority?: boolean;
};

export function Logo({ className, priority = false }: LogoProps) {
  return (
    <Image
      src="/blihops-logo-main.png"
      alt="BlihOps"
      width={140}
      height={32}
      priority={priority}
      className={cn('h-20 w-auto', className)}
    />
  );
}
