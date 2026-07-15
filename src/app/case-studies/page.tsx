import type { Metadata } from 'next';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CaseStudiesArchive } from '@/components/sections/case-studies/CaseStudiesArchive';
import { CaseStudiesHero } from '@/components/sections/case-studies/CaseStudiesHero';
import { caseStudies } from '@/content/case-studies';

export const metadata: Metadata = {
  title: 'Case Studies',
  description:
    'Explore how BlihOps improves customer support, back-office operations, software delivery, automation, and reporting.',
  alternates: {
    canonical: '/case-studies',
  },
};

export default function CaseStudiesPage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CaseStudiesHero />
        <CaseStudiesArchive caseStudies={caseStudies} />
      </SectionWrapper>
    </main>
  );
}
