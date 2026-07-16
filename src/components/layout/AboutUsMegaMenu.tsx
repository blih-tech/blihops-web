'use client';

import { useTranslations } from 'next-intl';

import Silk from '@/components/Silk';
import { cn } from '@/lib/utils';

type AboutUsMegaMenuProps = {
  className?: string;
  title?: string;
  description?: string;
};

export function AboutUsMegaMenu({
  className,
  title,
  description,
}: AboutUsMegaMenuProps) {
  const t = useTranslations('Shared.header.aboutMenu.whoWeAre');

  return (
    <div
      className={cn(
        'relative size-full min-h-36 overflow-hidden rounded-xl',
        className,
      )}
    >
      <div className="absolute inset-0">
        <Silk
          speed={4}
          scale={1.1}
          color="#5B7CFF"
          noiseIntensity={1.2}
          rotation={0.15}
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-foreground/55 via-foreground/10 to-transparent" />
      <div className="relative z-10 flex h-full min-h-36 flex-col justify-end p-4">
        <p className="font-sans text-sm font-semibold text-background">
          {title ?? t('label')}
        </p>
        <p className="mt-1 font-sans text-xs leading-relaxed text-background/80">
          {description ?? t('previewDescription')}
        </p>
      </div>
    </div>
  );
}
