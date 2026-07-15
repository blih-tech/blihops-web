import Image from 'next/image';
import type { CaseStudy } from '@/content/case-studies';

import { CaseStudyHeader } from './CaseStudyHeader';
import { CaseStudyNarrative } from './CaseStudyNarrative';

export { CaseStudyHeader, CaseStudyNarrative };
export { CaseStudyRelated } from './CaseStudyRelated';

export function CaseStudyDetail({ study }: { study: CaseStudy }) {
  return (
    <article>
      <CaseStudyHeader study={study} />

      <CaseStudyHeroImage study={study} />

      <CaseStudyOutcomes study={study} />

      <CaseStudyNarrative study={study} />
    </article>
  );
}

function CaseStudyHeroImage({ study }: { study: CaseStudy }) {
  return (
    <figure className="group relative aspect-video w-full overflow-hidden border border-border bg-muted">
      <Image
        src={study.heroImage}
        alt={`${study.title} — ${study.client}`}
        fill
        priority
        sizes="(max-width: 768px) 100vw, 72rem"
        className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.015]"
      />
    </figure>
  );
}

function CaseStudyOutcomes({ study }: { study: CaseStudy }) {
  if (study.outcomes.length === 0) return null;

  return (
    <section
      className="border-b border-border py-12 md:py-16"
      aria-label="Key outcomes"
    >
      <div className="flex flex-wrap items-stretch gap-px border border-border bg-border">
        {study.outcomes.map((outcome) => (
          <div
            key={outcome}
            className="flex min-w-48 flex-1 flex-col justify-between gap-3 bg-primary px-6 py-6 text-primary-foreground"
          >
            <div
              aria-hidden
              className="font-mono text-[11px] tracking-widest text-primary-foreground/75 uppercase"
            >
              Outcome
            </div>
            <p className="font-heading text-lg font-semibold leading-snug tracking-tight text-primary-foreground">
              {outcome}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
