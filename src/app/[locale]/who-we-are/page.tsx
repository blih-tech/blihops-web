import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CoreValues } from '@/components/sections/who-we-are/CoreValues';
import { Leadership } from '@/components/sections/who-we-are/Leadership';
import { Story } from '@/components/sections/who-we-are/Story';
import { WhoWeAreHero } from '@/components/sections/who-we-are/Hero';
import { VisionMission } from '@/components/sections/who-we-are/VisionMission';
import { WhyEthiopia } from '@/components/sections/who-we-are/WhyEthiopia';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata('about', '/who-we-are');

export default function WhoWeArePage() {
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
