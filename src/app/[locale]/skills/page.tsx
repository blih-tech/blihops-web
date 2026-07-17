import { Link } from '@/i18n/navigation';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import * as motion from 'motion/react-client';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroBackdrop } from '@/components/sections/shared/HeroBackdrop';
import { buttonVariants } from '@/components/ui/button';
import { skillTracks } from '@/content/skills';
import { cn } from '@/lib/utils';
import { createGenerateMetadata } from '@/i18n/metadata';

const skillsPlatformUrl = 'https://skills.blihops.com';

const sectionReveal = {
  initial: { opacity: 0, y: 18, filter: 'blur(10px)' },
  whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
  viewport: { once: false, amount: 0.12 },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
} as const;

function heroReveal(delay: number) {
  return {
    initial: { opacity: 0, y: 16, filter: 'blur(10px)' },
    whileInView: { opacity: 1, y: 0, filter: 'blur(0px)' },
    viewport: { once: false, amount: 0.2 },
    transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] },
  } as const;
}

export const generateMetadata = createGenerateMetadata('skills', '/skills');

const pathwayKeys = [
  'chooseTrack',
  'learnByDoing',
  'showKnowledge',
  'opportunityReady',
] as const;
const sampleStepKeys = ['learn', 'practice', 'assess', 'qualify'] as const;
const principleKeys = ['practical', 'assessed', 'connected'] as const;
const trackMessageKeys = {
  'customer-support-operations': 'customerSupportOperations',
  'back-office-data-quality': 'backOfficeDataQuality',
  'software-quality-assurance': 'softwareQualityAssurance',
  'ai-workflow-automation': 'aiWorkflowAutomation',
} as const;

export default async function SkillsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('SkillsPage');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <section
          className="relative overflow-hidden border-b border-border py-16 md:py-24"
          aria-labelledby="skills-heading"
        >
          <HeroBackdrop />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
            <motion.div
              {...heroReveal(0)}
              className="flex w-fit items-center gap-2.5 rounded-md border border-border bg-card px-3 py-1.5 text-xs font-medium tracking-wide text-foreground uppercase"
            >
              <span className="relative flex size-2" aria-hidden="true">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              {t('hero.eyebrow')}
            </motion.div>

            <motion.h1
              {...heroReveal(0.12)}
              id="skills-heading"
              className="mt-5 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              {...heroReveal(0.24)}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              {...heroReveal(0.36)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="#tracks"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group/cta bg-primary hover:bg-primary',
                )}
              >
                {t('hero.exploreTracks')}
                <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
              <a
                href={skillsPlatformUrl}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-10 border-border bg-background px-4 text-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {t('hero.visitPlatform')}
              </a>
            </motion.div>
          </div>

          <motion.div
            {...heroReveal(0.48)}
            className="relative mx-auto mt-12 w-full max-w-5xl border border-border bg-card text-left md:mt-14"
          >
            <div className="flex flex-col gap-4 border-b border-border px-5 py-5 sm:flex-row sm:items-end sm:justify-between sm:px-7">
              <div className="flex items-start gap-4">
                <span className="font-mono text-[11px] tracking-widest text-primary">
                  SK-01
                </span>
                <div>
                  <p className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                    {t('samplePathway.eyebrow')}
                  </p>
                  <p className="mt-1.5 font-heading text-xl font-semibold tracking-tight sm:text-2xl">
                    {t('samplePathway.title')}
                  </p>
                </div>
              </div>
              <p className="font-mono text-[10px] tracking-wider text-primary uppercase">
                {t('samplePathway.stageProgress', {
                  current: '02',
                  total: '04',
                })}
              </p>
            </div>

            <div className="relative px-5 py-8 sm:px-7 sm:py-10">
              <div
                className="absolute top-[3.35rem] right-[12.5%] left-[12.5%] hidden h-px bg-border sm:block"
                aria-hidden="true"
              >
                <div className="h-full w-1/3 bg-primary" />
              </div>

              <ol className="relative grid gap-px bg-border sm:grid-cols-4 sm:bg-transparent">
                {sampleStepKeys.map((key, index) => {
                  const number = String(index + 1).padStart(2, '0');
                  const status =
                    index === 0
                      ? 'complete'
                      : index === 1
                        ? 'current'
                        : 'upcoming';

                  return (
                    <li
                      key={number}
                      className="relative flex items-center gap-4 bg-background p-4 sm:flex-col sm:bg-transparent sm:p-0 sm:text-center"
                    >
                      <span
                        className={cn(
                          'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-full border bg-background font-mono text-[10px] font-semibold',
                          status === 'complete' &&
                            'border-primary bg-primary text-primary-foreground',
                          status === 'current' &&
                            'border-primary text-primary ring-4 ring-primary/10',
                          status === 'upcoming' &&
                            'border-border text-muted-foreground',
                        )}
                      >
                        {status === 'complete' ? (
                          <CheckIcon className="size-4" aria-hidden="true" />
                        ) : (
                          number
                        )}
                      </span>
                      <div>
                        <p className="font-heading text-lg font-semibold">
                          {t(`samplePathway.steps.${key}.title`)}
                        </p>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {t(`samplePathway.steps.${key}.description`)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ol>
            </div>

            <dl className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
              <PathwayDetail
                label={t('samplePathway.details.currentWork.label')}
                value={t('samplePathway.details.currentWork.value')}
              />
              <PathwayDetail
                label={t('samplePathway.details.evidence.label')}
                value={t('samplePathway.details.evidence.value', { count: 3 })}
              />
              <PathwayDetail
                label={t('samplePathway.details.outcome.label')}
                value={t('samplePathway.details.outcome.value')}
              />
            </dl>
          </motion.div>
        </section>

        <motion.section
          {...sectionReveal}
          className="grid gap-px border-b border-border bg-border sm:grid-cols-3"
        >
          {principleKeys.map((key) => (
            <div key={key} className="bg-background px-5 py-6 sm:px-6">
              <p className="font-heading text-xl font-semibold">
                {t(`principles.${key}.title`)}
              </p>
              <p className="mt-1 text-sm text-muted-foreground">
                {t(`principles.${key}.description`)}
              </p>
            </div>
          ))}
        </motion.section>

        <motion.section
          {...sectionReveal}
          id="tracks"
          className="scroll-mt-24 py-16 md:py-24"
          aria-labelledby="tracks-heading"
        >
          <div className="max-w-2xl">
            <p className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase">
              {t('catalog.eyebrow')}
            </p>
            <h2
              id="tracks-heading"
              className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              {t('catalog.title')}
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {t('catalog.description')}
            </p>
          </div>

          <div className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2">
            {skillTracks.map((track, index) => {
              const Icon = track.icon;
              const key =
                trackMessageKeys[track.id as keyof typeof trackMessageKeys];
              const title = t(`catalog.tracks.${key}.title`);

              return (
                <motion.a
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.15 }}
                  transition={{
                    duration: 0.45,
                    delay: index * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  key={track.id}
                  href={skillsPlatformUrl}
                  className="group flex min-h-96 flex-col bg-background p-6 transition-colors hover:bg-muted/60 focus-visible:bg-muted/60 focus-visible:outline-none sm:p-8"
                  aria-label={t('catalog.exploreAriaLabel', { title })}
                >
                  <div className="flex items-start justify-between gap-6">
                    <span className="flex size-10 items-center justify-center rounded-md border border-border bg-muted text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <Icon
                        className="size-4.5"
                        strokeWidth={1.75}
                        aria-hidden="true"
                      />
                    </span>
                    <span className="font-mono text-[11px] tracking-widest text-muted-foreground">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <div className="mt-8">
                    <p className="text-xs font-medium tracking-wide text-primary uppercase">
                      {t(`catalog.tracks.${key}.category`)}
                    </p>
                    <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                      {title}
                    </h3>
                    <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                      {t(`catalog.tracks.${key}.description`)}
                    </p>
                  </div>

                  <dl className="mt-8 grid grid-cols-3 gap-px bg-border">
                    <TrackDetail
                      label={t('catalog.labels.level')}
                      value={t(`catalog.tracks.${key}.level`)}
                    />
                    <TrackDetail
                      label={t('catalog.labels.length')}
                      value={t(`catalog.tracks.${key}.duration`)}
                    />
                    <TrackDetail
                      label={t('catalog.labels.study')}
                      value={t(`catalog.tracks.${key}.modules`)}
                    />
                  </dl>

                  <div className="mt-auto flex items-center justify-between gap-4 border-t border-border pt-6">
                    <div>
                      <p className="text-xs text-muted-foreground">
                        {t('catalog.labels.outcome')}
                      </p>
                      <p className="mt-1 text-sm font-medium">
                        {t(`catalog.tracks.${key}.outcome`)}
                      </p>
                    </div>
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-md border border-border bg-background text-primary transition-[color,background-color,border-color,transform] group-hover:translate-x-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                      <ArrowRightIcon className="size-4" aria-hidden="true" />
                    </span>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          className="border-y border-border py-16 md:py-24"
          aria-labelledby="pathway-heading"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
              <h2
                id="pathway-heading"
                className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {t('pathway.title')}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t('pathway.description')}
              </p>
            </div>

            <ol className="border-t border-border lg:col-span-8">
              {pathwayKeys.map((key, index) => (
                <li
                  key={key}
                  className="grid gap-4 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:px-5"
                >
                  <span className="font-mono text-[11px] tracking-widest text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-tight">
                      {t(`pathway.steps.${key}.title`)}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {t(`pathway.steps.${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>
      </SectionWrapper>
    </main>
  );
}

function PathwayDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted p-5 sm:px-6">
      <dt className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function TrackDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-muted p-3.5">
      <dt className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-1.5 text-xs font-medium text-foreground">{value}</dd>
    </div>
  );
}
