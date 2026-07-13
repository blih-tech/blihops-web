import { Hero } from '@/components/sections/Hero';
import { LogosSection } from '@/components/sections/LogosSection';

export function HeroWrapper() {
  return (
    <div className="relative w-full">
      <Hero />
      <LogosSection />
    </div>
  );
}
