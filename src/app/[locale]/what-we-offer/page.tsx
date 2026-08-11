import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Approach } from '@/components/sections/what-we-offer/Approach';
import { WhatWeOfferHero } from '@/components/sections/what-we-offer/Hero';
import { ServicesList } from '@/components/sections/what-we-offer/ServicesList';
import { createGenerateMetadata } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import { getServicesHero, type ServicesHero } from '@/lib/api/content';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata(
  'services',
  '/what-we-offer',
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function WhatWeOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let servicesHero: ServicesHero | null = null;
  try {
    servicesHero = await getServicesHero();
  } catch {
    servicesHero = null;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <WhatWeOfferHero servicesHero={servicesHero} />
        <Approach />
        <ServicesList />
      </SectionWrapper>
    </main>
  );
}
