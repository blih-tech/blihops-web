import { Hero } from '@/components/sections/landing/Hero';
import { LogosSection } from '@/components/sections/landing/LogosSection';

export function HeroWrapper() {
  return (
    <div className="relative w-full">
      <Hero />
      <LogosSection />
    </div>
  );
}
