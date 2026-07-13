import type { Metadata } from 'next';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Approach } from '@/components/sections/what-we-offer/Approach';
import { WhatWeOfferHero } from '@/components/sections/what-we-offer/Hero';

export const metadata: Metadata = {
  title: 'What We Offer',
  description:
    'Explore BlihOps services: customer support, back-office, IT & software, AI automation, and data processing — with SLAs, SOPs, and a free pilot.',
  alternates: {
    canonical: '/what-we-offer',
  },
};

export default function WhatWeOfferPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <WhatWeOfferHero />
        <Approach />
      </SectionWrapper>
    </main>
  );
}
