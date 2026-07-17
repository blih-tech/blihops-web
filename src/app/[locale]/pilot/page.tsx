import Image from 'next/image';
import { ChevronDownIcon } from 'lucide-react';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { BookCallButton } from '@/components/BookCallButton';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PilotForm } from '@/components/sections/pilot/PilotForm';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata('pilot', '/pilot');

const pilotSteps = [
  {
    number: '01',
    key: 'shareWorkflow',
  },
  {
    number: '02',
    key: 'defineProof',
  },
  {
    number: '03',
    key: 'runPilot',
  },
  {
    number: '04',
    key: 'reviewDecide',
  },
] as const;

const faqs = ['isFree', 'bestProcess', 'replaceTools', 'afterPilot'] as const;

export default async function PilotPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('PilotPage');
  const tActions = await getTranslations('Shared.actions');
  const benefits = t.raw('hero.benefits') as string[];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/80">
        <SectionWrapper className="py-10 md:py-14 lg:py-20">
          <div className="relative border-x border-border/80">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-px h-4 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 -left-3 h-px w-3 bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute -top-4 -right-px h-4 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 -right-3 h-px w-3 bg-border"
            />
            <div className="flex items-center justify-between border-y border-border/80 px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-8">
              <span>{t('hero.label')}</span>
              <span>{t('hero.context')}</span>
            </div>

            <div className="grid lg:grid-cols-[0.88fr_1.12fr] lg:divide-x lg:divide-border/80">
              <div className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-20">
                <p className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
                  {t('hero.eyebrow')}
                </p>
                <h1 className="mt-7 max-w-lg font-heading text-5xl leading-[0.94] font-semibold tracking-[-0.045em] text-balance text-foreground sm:text-6xl lg:text-7xl">
                  {t('hero.title')}
                </h1>
                <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                  {t('hero.description')}
                </p>

                <ul className="mt-12 border-t border-border/80 text-sm text-foreground">
                  {benefits.map((item, index) => (
                    <li
                      key={item}
                      className="grid grid-cols-[2rem_1fr] gap-3 border-b border-border/80 py-4"
                    >
                      <span className="font-mono text-[10px] text-primary">
                        0{index + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <figure className="mt-14 hidden lg:block">
                  <div className="relative aspect-[4/5] overflow-hidden bg-muted">
                    <Image
                      src="/about-us-image.jpg"
                      alt={t('hero.imageAlt')}
                      fill
                      className="object-cover object-[center_42%] saturate-[0.72]"
                      sizes="28rem"
                      priority
                    />
                  </div>
                  <figcaption className="grid grid-cols-[1fr_auto] gap-6 border-b border-border/80 py-4 text-xs leading-5 text-muted-foreground">
                    <span>{t('hero.imageCaption')}</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase">
                      {t('hero.locationCaption')}
                    </span>
                  </figcaption>
                </figure>
              </div>

              <div className="border-t border-border/80 px-5 py-12 sm:px-8 md:py-16 lg:border-t-0 lg:px-10 lg:py-20">
                <PilotForm />
              </div>
            </div>
          </div>
        </SectionWrapper>
      </section>

      <SectionWrapper
        as="section"
        className="py-24 md:py-32"
        aria-labelledby="pilot-process"
      >
        <div className="grid gap-14 lg:grid-cols-[0.78fr_1.22fr] lg:gap-24">
          <div className="lg:sticky lg:top-28 lg:h-fit">
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              {t('process.eyebrow')}
            </p>
            <h2
              id="pilot-process"
              className="mt-6 max-w-md font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              {t('process.title')}
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
              {t('process.description')}
            </p>
          </div>

          <ol className="border-t border-border/80">
            {pilotSteps.map((step) => (
              <li
                key={step.number}
                className="grid gap-5 border-b border-border/80 py-8 sm:grid-cols-[5rem_1fr] sm:gap-8 sm:py-10"
              >
                <span className="font-mono text-3xl font-light tracking-tighter text-primary/70 sm:text-4xl">
                  {step.number}
                </span>
                <div className="grid gap-3 md:grid-cols-[0.75fr_1.25fr] md:gap-10">
                  <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground">
                    {t(`process.steps.${step.key}.title`)}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {t(`process.steps.${step.key}.description`)}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </SectionWrapper>

      <section className="border-y border-border/80 bg-muted/50">
        <SectionWrapper className="grid gap-14 py-24 md:py-32 lg:grid-cols-[0.72fr_1.28fr] lg:gap-24">
          <div>
            <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
              {t('faq.eyebrow')}
            </p>
            <h2 className="mt-6 max-w-md font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
              {t('faq.title')}
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
              {t('faq.description')}
            </p>
          </div>

          <div className="border-b border-border/80">
            {faqs.map((faq, index) => (
              <details key={faq} className="group border-t border-border/80">
                <summary className="grid cursor-pointer list-none grid-cols-[2rem_1fr_auto] items-center gap-4 py-7 font-medium text-foreground outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    0{index + 1}
                  </span>
                  {t(`faq.items.${faq}.question`)}
                  <ChevronDownIcon
                    className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-2xl pr-8 pb-8 pl-12 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {t(`faq.items.${faq}.answer`)}
                </p>
              </details>
            ))}
          </div>
        </SectionWrapper>
      </section>

      <SectionWrapper as="section" className="py-20 md:py-24">
        <div className="flex flex-col items-start justify-between gap-6 border-y border-border/80 py-8 sm:flex-row sm:items-center sm:py-10">
          <div>
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-foreground sm:text-3xl">
              {t('callCta.title')}
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              {t('callCta.description')}
            </p>
          </div>
          <BookCallButton
            calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
            namespace="blih-ops-desicovery-call"
            className="shrink-0 border border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
          >
            {tActions('bookCall')}
          </BookCallButton>
        </div>
      </SectionWrapper>
    </main>
  );
}
