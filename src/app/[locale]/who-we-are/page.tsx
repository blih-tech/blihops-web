import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CoreValues } from '@/components/sections/who-we-are/CoreValues';
import { Leadership } from '@/components/sections/who-we-are/Leadership';
import { Story } from '@/components/sections/who-we-are/Story';
import { WhoWeAreHero } from '@/components/sections/who-we-are/Hero';
import { VisionMission } from '@/components/sections/who-we-are/VisionMission';
import { WhyEthiopia } from '@/components/sections/who-we-are/WhyEthiopia';
import { createGenerateMetadata } from '@/i18n/metadata';
import { setRequestLocale } from 'next-intl/server';

export const generateMetadata = createGenerateMetadata('about', '/who-we-are');

export default async function WhoWeArePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <WhoWeAreHero />
        <Story />
        <VisionMission />
        <CoreValues />
        <WhyEthiopia />
        <Leadership />
      </SectionWrapper>
    </main>
  );
}
