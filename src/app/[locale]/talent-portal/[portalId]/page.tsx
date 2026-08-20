import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import { getTranslations } from 'next-intl/server';

import { noIndexRobots } from '@/i18n/metadata';
import { TalentPortalContent } from '@/components/sections/talent-portal/TalentPortalContent';

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

  return <TalentPortalContent portalId={portalId} signOutLabel={t('signOut')} />;
}
