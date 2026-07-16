import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Approach } from '@/components/sections/what-we-offer/Approach';
import { WhatWeOfferHero } from '@/components/sections/what-we-offer/Hero';
import { ServicesList } from '@/components/sections/what-we-offer/ServicesList';
import { createGenerateMetadata } from '@/i18n/metadata';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata(
  'services',
  '/what-we-offer',
);

export default async function WhatWeOfferPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <WhatWeOfferHero />
        <Approach />
        <ServicesList />
      </SectionWrapper>
    </main>
  );
}
