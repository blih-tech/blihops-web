import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowUpRightIcon } from 'lucide-react';
import type { CaseStudy } from '@/content/case-studies';

export function CaseStudyRelated({ studies }: { studies: CaseStudy[] }) {
  if (studies.length === 0) return null;

  return (
    <section
      className="border-t border-border py-16 md:py-24"
      aria-label="Related case studies"
    >
      <div className="mb-10 flex items-baseline justify-between gap-6">
        <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
          Related case studies
        </h2>
        <Link
          href="/case-studies"
          className="hidden font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground sm:inline-flex"
        >
          View all
        </Link>
      </div>

      <div className="grid grid-cols-1 gap-px border border-border bg-border md:grid-cols-2">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/case-studies/${study.slug}`}
            className="group flex flex-col bg-background p-5 transition-colors hover:bg-muted/50"
            aria-label={`Read case study: ${study.title}`}
          >
            <div className="relative aspect-video w-full overflow-hidden border border-border bg-muted">
              <Image
                src={study.heroImage}
                alt=""
                fill
                sizes="(max-width: 768px) 100vw, 560px"
                className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]"
              />
            </div>

            <div className="mt-4 flex flex-1 flex-col">
              <p className="font-sans text-[11px] font-medium text-primary">
                {study.services.join('  ·  ')}
                <span className="text-muted-foreground"> · {study.client}</span>
              </p>

              <h3 className="mt-3 max-w-lg font-heading text-lg font-semibold leading-tight tracking-tight text-foreground">
                {study.title}
              </h3>

              <p className="mt-3 line-clamp-2 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground">
                {study.excerpt}
              </p>

              <div className="mt-auto flex items-end justify-between gap-4 pt-6">
                <p className="max-w-md font-sans text-xs leading-relaxed text-muted-foreground">
                  <span className="font-semibold text-primary">Outcome:</span>{' '}
                  {study.outcomes[0]}
                </p>
                <ArrowUpRightIcon className="size-5 shrink-0 text-primary motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 sm:hidden">
        <Link
          href="/case-studies"
          className="font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          View all case studies
        </Link>
      </div>
    </section>
  );
}
