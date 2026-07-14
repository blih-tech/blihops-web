import type { Metadata } from 'next';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { Story } from '@/components/sections/who-we-are/Story';
import { WhoWeAreHero } from '@/components/sections/who-we-are/Hero';
import { VisionMission } from '@/components/sections/who-we-are/VisionMission';

export const metadata: Metadata = {
  title: 'About BlihOps — Ethiopia\u2019s AI-Powered Outsourcing Company',
  description:
    'Blih Intelligent Operations combines AI, skilled African talent, and reliable systems to run operations for growing businesses across Europe, the Middle East, and Asia.',
  alternates: {
    canonical: '/who-we-are',
  },
  openGraph: {
    title: 'About BlihOps — Ethiopia\u2019s AI-Powered Outsourcing Company',
    description:
      'AI-integrated operations combining reliable systems with skilled African talent. Managed pods, defined SLAs, and weekly reporting.',
    url: '/who-we-are',
  },
};

export default function WhoWeArePage() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <WhoWeAreHero />
        <Story />
        <VisionMission />
      </SectionWrapper>
    </main>
  );
}
