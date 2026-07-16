import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Commitments } from '@/components/sections/how-we-work/Commitments';
import { HowWeWorkHero } from '@/components/sections/how-we-work/Hero';
import { ProcessTimeline } from '@/components/sections/how-we-work/ProcessTimeline';
import { Security } from '@/components/sections/how-we-work/Security';
import { createGenerateMetadata } from '@/i18n/metadata';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata(
  'process',
  '/how-we-work',
);

export default async function HowWeWorkPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <HowWeWorkHero />
        <ProcessTimeline />
        <Commitments />
        <Security />
      </SectionWrapper>
    </main>
  );
}
