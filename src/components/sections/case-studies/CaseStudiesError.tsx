import { AlertTriangleIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { Link } from '@/i18n/navigation';

export async function CaseStudiesError() {
  const t = await getTranslations('CaseStudiesPage.error');

  return (
    <section
      role="alert"
      className="flex min-h-72 flex-col items-center justify-center gap-3 border-b border-border px-6 py-20 text-center"
    >
      <AlertTriangleIcon
        className="size-8 text-muted-foreground/50"
        aria-hidden
      />
      <p className="font-heading text-2xl text-foreground">{t('title')}</p>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        {t('description')}
      </p>
      <Link
        href="/case-studies"
        className="mt-2 font-sans text-sm font-medium text-primary underline underline-offset-4 transition-colors hover:text-foreground"
      >
        {t('retry')}
      </Link>
    </section>
  );
}
