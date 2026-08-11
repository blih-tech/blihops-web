import Image from 'next/image';
import type { LocalizedCaseStudyDetail } from '@/lib/api/content';
import HoverPlayCard from '@/components/shared/video-card';

import { CaseStudyHeader } from './CaseStudyHeader';
import { CaseStudyNarrative } from './CaseStudyNarrative';

export { CaseStudyHeader, CaseStudyNarrative };
export { CaseStudyRelated } from './CaseStudyRelated';

export function CaseStudyDetail({
  study,
}: {
  study: LocalizedCaseStudyDetail;
}) {
  return (
    <article>
      <CaseStudyHeader study={study} />

      <CaseStudyHeroImage study={study} />

      <CaseStudyNarrative study={study} />
    </article>
  );
}

function CaseStudyHeroImage({ study }: { study: LocalizedCaseStudyDetail }) {
  const alt = study.media.alt ?? `${study.title} — ${study.client}`;

  return (
    <figure className="group relative aspect-video w-full overflow-hidden border border-border bg-muted">
      {study.media.type === 'video' ? (
        <HoverPlayCard
          src={study.media.url}
          loop
          className="absolute inset-0 rounded-none shadow-none [&_video]:max-w-none [&_video]:object-cover"
        />
      ) : (
        <Image
          src={study.media.url}
          alt={alt}
          fill
          priority
          sizes="(max-width: 768px) 100vw, 72rem"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.015]"
        />
      )}
    </figure>
  );
}
