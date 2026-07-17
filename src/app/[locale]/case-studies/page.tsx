import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CaseStudiesArchive } from '@/components/sections/case-studies/CaseStudiesArchive';
import { CaseStudiesHero } from '@/components/sections/case-studies/CaseStudiesHero';
import { caseStudies } from '@/content/case-studies';
import { createGenerateMetadata } from '@/i18n/metadata';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata(
  'caseStudies',
  '/case-studies',
);

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CaseStudiesHero />
        <CaseStudiesArchive caseStudies={caseStudies} />
      </SectionWrapper>
    </main>
  );
}
