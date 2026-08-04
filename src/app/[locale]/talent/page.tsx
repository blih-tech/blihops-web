import {
  ArrowRightIcon,
  CheckIcon,
  ChevronDownIcon,
  ShieldCheckIcon,
  SparklesIcon,
  UsersIcon,
} from 'lucide-react';
import * as motion from 'motion/react-client';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroBackdrop } from '@/components/sections/shared/HeroBackdrop';
import { buttonVariants } from '@/components/ui/button';
import { createGenerateMetadata } from '@/i18n/metadata';
import { Link } from '@/i18n/navigation';
import { cn } from '@/lib/utils';

export const generateMetadata = createGenerateMetadata('talent', '/talent');

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

const criteriaKeys = ['skill', 'communication', 'remote', 'growth'] as const;
const processKeys = ['apply', 'screening', 'approval', 'invitation'] as const;
const faqs = ['eligibility', 'timeline', 'location', 'afterApproval'] as const;

export default async function TalentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('TalentPage');
  const poolValues = t.raw('hero.poolValues') as string[];

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <section
          className="relative overflow-hidden border-b border-border py-16 md:py-24"
          aria-labelledby="talent-heading"
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
              id="talent-heading"
              className="mt-6 max-w-3xl break-words font-heading text-[2rem] leading-[1.05] font-semibold tracking-tight hyphens-auto text-balance sm:text-6xl sm:leading-[0.96] sm:tracking-[-0.045em] lg:text-7xl"
            >
              {t('hero.title')}
            </motion.h1>
            <motion.p
              {...heroReveal(0.24)}
              className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg"
            >
              {t('hero.description')}
            </motion.p>

            <motion.div
              {...heroReveal(0.36)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="/talent/apply"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group/cta bg-primary hover:bg-primary',
                )}
              >
                {t('hero.apply')}
                <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
              <a
                href="#process"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-border bg-background text-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {t('hero.howItWorks')}
              </a>
            </motion.div>
          </div>

          <motion.div
            {...heroReveal(0.48)}
            className="relative mx-auto mt-12 w-full max-w-5xl border border-border bg-card"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t('hero.pool.label')}
                </p>
                <p className="mt-1 font-heading text-xl font-semibold">
                  {t('hero.pool.title')}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-primary uppercase">
                <span className="size-1.5 rounded-full bg-primary" />
                {t('hero.pool.status')}
              </span>
            </div>

            <div className="grid gap-px bg-border sm:grid-cols-2">
              <div className="bg-background p-6 sm:p-7">
                <ShieldCheckIcon
                  className="size-6 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="mt-8 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t('hero.pool.reviewedLabel')}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                  {t('hero.pool.reviewedTitle')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t('hero.pool.reviewedDescription')}
                </p>
              </div>
              <div className="bg-muted p-6 sm:p-7">
                <UsersIcon
                  className="size-6 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="mt-8 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t('hero.pool.introductionLabel')}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                  {t('hero.pool.introductionTitle')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t('hero.pool.introductionDescription')}
                </p>
              </div>
            </div>
            <ul className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
              {poolValues.map((value) => (
                <li
                  key={value}
                  className="flex min-w-0 items-center gap-3 bg-background px-5 py-4 sm:px-6"
                >
                  <span className="flex size-4 shrink-0 items-center justify-center rounded-sm border border-primary/30 bg-accent text-primary">
                    <CheckIcon className="size-2.5" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-muted-foreground">{value}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </section>

        <motion.section
          {...sectionReveal}
          className="border-b border-border py-16 md:py-24"
          aria-labelledby="criteria-heading"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <p className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase">
              {t('criteria.eyebrow')}
            </p>
            <h2
              id="criteria-heading"
              className="mt-3 font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {t('criteria.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              {t('criteria.description')}
            </p>
          </div>

          <div className="grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {criteriaKeys.map((key, index) => (
              <div
                key={key}
                className="relative flex min-h-72 flex-col justify-between bg-background p-6 transition-colors hover:bg-muted/40 sm:p-7"
              >
                <span className="flex size-10 items-center justify-center rounded-md border border-border bg-muted text-primary">
                  <span className="font-mono text-[10px] tracking-widest">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                </span>
                <div className="mt-8">
                  <h3 className="font-heading text-3xl font-semibold tracking-tight">
                    {t(`criteria.items.${key}.title`)}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {t(`criteria.items.${key}.description`)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          id="process"
          className="scroll-mt-24 py-16 md:py-24"
          aria-labelledby="process-heading"
        >
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:col-span-4 lg:self-start">
              <p className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase">
                {t('process.eyebrow')}
              </p>
              <h2
                id="process-heading"
                className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {t('process.title')}
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                {t('process.description')}
              </p>
              <Link
                href="/talent/apply"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group/cta mt-8 bg-primary hover:bg-primary',
                )}
              >
                {t('process.apply')}
                <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
            </div>

            <ol className="border-t border-border lg:col-span-8">
              {processKeys.map((key, index) => (
                <li
                  key={key}
                  className="grid gap-4 border-b border-border py-7 sm:grid-cols-[3rem_minmax(0,1fr)] sm:px-5"
                >
                  <span className="font-mono text-[11px] tracking-widest text-primary">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <h3 className="font-heading text-2xl font-semibold tracking-tight">
                      {t(`process.steps.${key}.title`)}
                    </h3>
                    <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                      {t(`process.steps.${key}.description`)}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          className="border-y border-border bg-muted/50 py-16 md:py-24"
          aria-labelledby="next-heading"
        >
          <div className="px-0 sm:px-6 lg:px-10">
            <div className="grid lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
              <div>
                <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                  {t('next.eyebrow')}
                </p>
                <h2
                  id="next-heading"
                  className="mt-6 max-w-md font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
                >
                  {t('next.title')}
                </h2>
                <p className="mt-6 max-w-md text-base leading-7 text-muted-foreground">
                  {t('next.description')}
                </p>
              </div>

              <div className="mt-10 border-t border-border lg:mt-0">
                <div className="flex items-start gap-4 border-b border-border py-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-accent text-primary">
                    <ShieldCheckIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      {t('next.items.invitation.title')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t('next.items.invitation.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 border-b border-border py-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-accent text-primary">
                    <SparklesIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      {t('next.items.profile.title')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t('next.items.profile.description')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4 py-6">
                  <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-primary/25 bg-accent text-primary">
                    <UsersIcon className="size-4" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-semibold">
                      {t('next.items.matching.title')}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                      {t('next.items.matching.description')}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          className="py-16 md:py-24"
          aria-labelledby="faq-heading"
        >
          <div className="mx-auto max-w-2xl">
            <div className="text-center">
              <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
                {t('faq.eyebrow')}
              </p>
              <h2
                id="faq-heading"
                className="mt-6 font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {t('faq.title')}
              </h2>
            </div>

            <div className="mt-12 border-b border-border/80">
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
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          className="border-y border-border"
          aria-labelledby="final-cta-heading"
        >
          <div className="grid gap-px bg-border lg:grid-cols-[1.15fr_0.85fr]">
            <div className="bg-foreground p-8 text-background sm:p-10 lg:p-12">
              <h2
                id="final-cta-heading"
                className="max-w-xl font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {t('finalCta.title')}
              </h2>
              <p className="mt-4 max-w-lg text-sm leading-7 text-background/70 sm:text-base">
                {t('finalCta.description')}
              </p>
            </div>
            <div className="bg-background">
              <Link
                href="/talent/apply"
                className="group flex min-h-full flex-col justify-between gap-8 p-7 transition-colors hover:bg-muted sm:p-8"
              >
                <div>
                  <span className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                    {t('finalCta.eyebrow')}
                  </span>
                  <h3 className="mt-3 font-heading text-3xl font-semibold tracking-tight">
                    {t('finalCta.actionTitle')}
                  </h3>
                  <p className="mt-3 max-w-sm text-sm leading-6 text-muted-foreground">
                    {t('finalCta.actionDescription')}
                  </p>
                </div>
                <span className="flex w-fit items-center gap-3 text-lg font-medium text-foreground">
                  {t('finalCta.apply')}
                  <span className="flex size-10 items-center justify-center rounded-md border border-border bg-background text-primary transition-transform group-hover:translate-x-0.5">
                    <ArrowRightIcon className="size-5" aria-hidden="true" />
                  </span>
                </span>
              </Link>
            </div>
          </div>
        </motion.section>
      </SectionWrapper>
    </main>
  );
}
