import { InfiniteSlider } from '@/components/infinite-slider';
import type { Logo } from '@/lib/api/content';

const MIN_MARQUEE_LOGOS = 4;

export function LogoCloud({ logos }: { logos: Logo[] }) {
  if (logos.length === 0) return null;

  if (logos.length < MIN_MARQUEE_LOGOS) {
    return (
      <div className="flex flex-wrap items-center justify-center gap-x-12 gap-y-5 py-4">
        {logos.map(renderLogo)}
      </div>
    );
  }

  return (
    <div className="mask-[linear-gradient(to_right,transparent,black,transparent)] overflow-hidden py-4">
      <InfiniteSlider gap={42} reverse speed={80} speedOnHover={25}>
        {logos.map(renderLogo)}
      </InfiniteSlider>
    </div>
  );
}

function renderLogo(logo: Logo) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      alt={logo.alt}
      className="pointer-events-none h-6 select-none md:h-8 dark:brightness-0 dark:invert"
      height="auto"
      key={logo.id}
      loading="lazy"
      src={logo.imageUrl}
      width="auto"
    />
  );
}
