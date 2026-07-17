import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { InsightsArchive } from '@/components/sections/insights/InsightsArchive';
import { InsightsHero } from '@/components/sections/insights/InsightsHero';
import { insights } from '@/content/insights';
import { createGenerateMetadata } from '@/i18n/metadata';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata('insights', '/insights');

export default async function InsightsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <InsightsHero />
        <InsightsArchive insights={insights} />
      </SectionWrapper>
    </main>
  );
}
