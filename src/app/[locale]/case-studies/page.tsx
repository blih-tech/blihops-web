import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CaseStudiesArchive } from '@/components/sections/case-studies/CaseStudiesArchive';
import { CaseStudiesHero } from '@/components/sections/case-studies/CaseStudiesHero';
import { caseStudies } from '@/content/case-studies';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata(
  'caseStudies',
  '/case-studies',
);

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
