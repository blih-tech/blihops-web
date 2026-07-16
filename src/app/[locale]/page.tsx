import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroWrapper } from '@/components/sections/landing/HeroWrapper';
import { Problem } from '@/components/sections/landing/Problem';
import { Services } from '@/components/sections/landing/Services';
import { Solution } from '@/components/sections/landing/Solution';
import { Testimonials } from '@/components/sections/landing/Testimonials';
import { Trust } from '@/components/sections/landing/Trust';

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <HeroWrapper />
        <Problem />
        <Solution />
        <Services />
        <Trust />
        <Testimonials />
      </SectionWrapper>
    </main>
  );
}
import { setRequestLocale } from 'next-intl/server';
