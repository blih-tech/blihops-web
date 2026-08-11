import { setRequestLocale } from 'next-intl/server';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroWrapper } from '@/components/sections/landing/HeroWrapper';
import { Problem } from '@/components/sections/landing/Problem';
import { Services } from '@/components/sections/landing/Services';
import { Solution } from '@/components/sections/landing/Solution';
import { Testimonials } from '@/components/sections/landing/Testimonials';
import { Trust } from '@/components/sections/landing/Trust';
import { routing } from '@/i18n/routing';
import {
  getLogos,
  getTestimonials,
  type Logo,
  type Testimonial,
} from '@/lib/api/content';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  let logos: Logo[] = [];
  let testimonials: Testimonial[] = [];
  try {
    [logos, testimonials] = await Promise.all([getLogos(), getTestimonials()]);
  } catch {
    logos = [];
    testimonials = [];
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <HeroWrapper logos={logos} />
        <Problem />
        <Solution testimonials={testimonials} />
        <Services />
        <Trust />
        <Testimonials testimonials={testimonials} />
      </SectionWrapper>
    </main>
  );
}
