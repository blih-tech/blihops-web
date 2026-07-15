import type { Metadata } from 'next';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { InsightsArchive } from '@/components/sections/insights/InsightsArchive';
import { InsightsHero } from '@/components/sections/insights/InsightsHero';
import { insights } from '@/content/insights';

export const metadata: Metadata = {
  title: 'Insights',
  description:
    'Practical guidance on operations design, AI automation, customer experience, reporting, and delivery from BlihOps.',
  alternates: {
    canonical: '/insights',
  },
};

export default function InsightsPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <InsightsHero />
        <InsightsArchive insights={insights} />
      </SectionWrapper>
    </main>
  );
}
