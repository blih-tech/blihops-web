import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { InsightsArchive } from '@/components/sections/insights/InsightsArchive';
import { InsightsError } from '@/components/sections/insights/InsightsError';
import { InsightsHero } from '@/components/sections/insights/InsightsHero';
import { createGenerateMetadata } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import {
  getCategories,
  getInsights,
  localizeInsight,
  type Category,
  type InsightListItem,
} from '@/lib/api/content';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata('insights', '/insights');

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let categories: Category[] = [];
  let insights: InsightListItem[] = [];
  let failed = false;

  try {
    [categories, insights] = await Promise.all([
      getCategories(),
      getInsights(),
    ]);
  } catch {
    failed = true;
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <InsightsHero />
        {failed ? (
          <InsightsError />
        ) : (
          <InsightsArchive
            categories={categories}
            insights={insights.map((insight) =>
              localizeInsight(insight, locale as 'en' | 'de'),
            )}
          />
        )}
      </SectionWrapper>
    </main>
  );
}
