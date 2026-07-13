import type { Metadata } from 'next';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HowWeWorkHero } from '@/components/sections/how-we-work/Hero';
import { ProcessTimeline } from '@/components/sections/how-we-work/ProcessTimeline';

export const metadata: Metadata = {
  title: 'How We Work',
  description:
    'See how BlihOps delivers intelligent operations — from discovery and SOPs to dedicated pods, SLA tracking, and continuous optimization.',
  alternates: {
    canonical: '/how-we-work',
  },
};

export default function HowWeWorkPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <HowWeWorkHero />
        <ProcessTimeline />
      </SectionWrapper>
    </main>
  );
}
