import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Approach } from '@/components/sections/what-we-offer/Approach';
import { WhatWeOfferHero } from '@/components/sections/what-we-offer/Hero';
import { ServicesList } from '@/components/sections/what-we-offer/ServicesList';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata(
  'services',
  '/what-we-offer',
);

export default function WhatWeOfferPage() {
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
