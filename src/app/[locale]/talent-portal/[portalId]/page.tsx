import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { noIndexRobots } from '@/i18n/metadata';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; portalId: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.talentPortal',
  });

  return {
    title: t('title'),
    description: t('description'),
    robots: noIndexRobots,
  };
}

export default async function TalentPortalPage({
  params,
}: {
  params: Promise<{ locale: string; portalId: string }>;
}) {
  const { locale, portalId } = await params;

  if (locale !== 'en') {
    redirect(`/en/talent-portal/${portalId}`);
  }

  const t = await getTranslations('TalentPortal');

  return (
    <main className="flex min-h-svh items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
          {t('title')}
        </h1>
        <p className="font-mono text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {t('idLabel')} {portalId}
        </p>
      </div>
    </main>
  );
}
