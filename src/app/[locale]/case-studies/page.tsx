import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CaseStudiesArchive } from '@/components/sections/case-studies/CaseStudiesArchive';
import { CaseStudiesError } from '@/components/sections/case-studies/CaseStudiesError';
import { CaseStudiesHero } from '@/components/sections/case-studies/CaseStudiesHero';
import { createGenerateMetadata } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import {
  getCaseStudies,
  getCategories,
  localizeCaseStudy,
  type CaseStudyListItem,
  type Category,
} from '@/lib/api/content';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata(
  'caseStudies',
  '/case-studies',
);

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function CaseStudiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let categories: Category[] = [];
  let caseStudies: CaseStudyListItem[] = [];
  let failed = false;

  try {
    [categories, caseStudies] = await Promise.all([
      getCategories(),
      getCaseStudies(),
    ]);
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CaseStudiesHero />
        {failed ? (
          <CaseStudiesError />
        ) : (
          <CaseStudiesArchive
            categories={categories}
            caseStudies={caseStudies.map((study) =>
              localizeCaseStudy(study, locale as 'en' | 'de'),
            )}
          />
        )}
      </SectionWrapper>
    </main>
  );
}
