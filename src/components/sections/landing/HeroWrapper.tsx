import type { Logo } from '@/lib/api/content';

import { Hero } from '@/components/sections/landing/Hero';
import { LogosSection } from '@/components/sections/landing/LogosSection';

export function HeroWrapper({ logos }: { logos: Logo[] }) {
  return (
    <div className="relative w-full">
      <Hero />
      <LogosSection logos={logos} />
    </div>
  );
}
