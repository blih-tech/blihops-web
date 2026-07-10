import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroWrapper } from '@/components/sections/HeroWrapper';
import { Problem } from '@/components/sections/Problem';
import { Solution } from '@/components/sections/Solution';

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <HeroWrapper />
        <Problem />
        <Solution />
      </SectionWrapper>
    </main>
  );
}
