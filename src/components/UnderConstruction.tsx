import Image from 'next/image';

import { cn } from '@/lib/utils';

type UnderConstructionProps = {
  className?: string;
  title?: string;
  description?: string;
};

export function UnderConstruction({
  className,
  title = 'Under construction',
  description = 'This page is being built. Check back soon.',
}: UnderConstructionProps) {
  return (
    <div
      className={cn(
        'relative flex min-h-[calc(100vh-8rem)] w-full items-center justify-center overflow-hidden bg-background',
        className,
      )}
    >
      <Image
        src="/under-constrcution.jpg"
        alt=""
        fill
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-background/55" />
      <div className="relative z-10 mx-auto max-w-lg px-3 text-center sm:px-6">
        <p className="font-sans text-[10px] font-medium tracking-widest text-muted-foreground uppercase sm:text-xs">
          Coming soon
        </p>
        <h1 className="mt-2 font-heading text-lg font-semibold tracking-tight text-foreground sm:mt-3 sm:text-3xl md:text-4xl">
          {title}
        </h1>
        <p className="mt-1.5 font-sans text-xs leading-relaxed text-muted-foreground sm:mt-3 sm:text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  );
}
