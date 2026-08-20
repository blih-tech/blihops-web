import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { noIndexRobots } from '@/i18n/metadata';
import { TalentPortalContent } from '@/components/sections/talent-portal/TalentPortalContent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
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
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (locale !== 'en') {
    redirect('/en/talent-portal');
  }

  const t = await getTranslations('TalentPortal');

  return <TalentPortalContent signOutLabel={t('signOut')} />;
}
