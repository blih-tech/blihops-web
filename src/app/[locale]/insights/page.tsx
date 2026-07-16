import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { InsightsArchive } from '@/components/sections/insights/InsightsArchive';
import { InsightsHero } from '@/components/sections/insights/InsightsHero';
import { insights } from '@/content/insights';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata('insights', '/insights');

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
