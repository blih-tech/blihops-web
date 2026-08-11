import { useTranslations } from 'next-intl';

import { LogoCloud } from '@/components/sections/shared/LogoCloud';
import type { Logo } from '@/lib/api/content';

export function LogosSection({ logos }: { logos: Logo[] }) {
  const t = useTranslations('Home.logoCloud');

  if (logos.length === 0) return null;

  return (
    <section className="relative space-y-4 border-t pt-6 pb-10">
      <h2 className="font-sans text-center font-medium text-lg text-muted-foreground tracking-tight md:text-xl">
        {t('heading')}
      </h2>
      <div className="relative z-10 mx-auto max-w-4xl">
        <LogoCloud logos={logos} />
      </div>
    </section>
  );
}
