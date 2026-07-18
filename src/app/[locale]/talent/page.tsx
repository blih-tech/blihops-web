import {
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  SearchIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import * as motion from 'motion/react-client';
import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroBackdrop } from '@/components/sections/shared/HeroBackdrop';
import { buttonVariants } from '@/components/ui/button';
import { talentOpportunities } from '@/content/talent';
import { createGenerateMetadata } from '@/i18n/metadata';
import { cn } from '@/lib/utils';

const talentPlatformUrl = 'https://talent.blihops.com';

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

export const generateMetadata = createGenerateMetadata('talent', '/talent');

const profileKeys = [
  'supportSpecialist',
  'dataAssociate',
  'qaAnalyst',
  'automationAssistant',
] as const;
const opportunityMessageKeys = {
  'customer-support-specialist': 'customerSupportSpecialist',
  'back-office-associate': 'backOfficeAssociate',
  'junior-qa-analyst': 'juniorQaAnalyst',
  'ai-automation-assistant': 'aiAutomationAssistant',
} as const;

export default async function TalentPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('TalentPage');
  const sampleSkills = t.raw('sampleMatch.skills') as string[];

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
              className="mt-6 max-w-3xl font-heading text-5xl leading-[0.96] font-semibold tracking-[-0.045em] text-balance sm:text-6xl lg:text-7xl"
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
              <a
                href="#opportunities"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group/cta bg-primary hover:bg-primary',
                )}
              >
                {t('hero.forTalent')}
                <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
              </a>
              <a
                href="#talent-profiles"
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'border-border bg-background text-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                {t('hero.forCompanies')}
              </a>
            </motion.div>
          </div>

          <motion.div
            {...heroReveal(0.48)}
            className="relative mx-auto mt-12 w-full max-w-5xl border border-border bg-card md:mt-14"
          >
            <div className="flex items-center justify-between border-b border-border px-5 py-4 sm:px-7">
              <div>
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t('hero.marketplace.label')}
                </p>
                <p className="mt-1 font-heading text-xl font-semibold">
                  {t('hero.marketplace.title')}
                </p>
              </div>
              <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-wider text-primary uppercase">
                <span className="size-1.5 rounded-full bg-primary" />
                {t('hero.marketplace.status')}
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
                  {t('hero.marketplace.talentLabel')}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                  {t('hero.marketplace.talentTitle')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t('hero.marketplace.talentDescription')}
                </p>
              </div>
              <div className="bg-muted p-6 sm:p-7">
                <SearchIcon
                  className="size-6 text-primary"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
                <p className="mt-8 font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t('hero.marketplace.companyLabel')}
                </p>
                <h2 className="mt-2 font-heading text-2xl font-semibold tracking-tight">
                  {t('hero.marketplace.companyTitle')}
                </h2>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">
                  {t('hero.marketplace.companyDescription')}
                </p>
              </div>
            </div>
            <p className="border-t border-border px-6 py-4 text-sm text-muted-foreground sm:px-7">
              {t('hero.marketplace.note')}
            </p>
          </motion.div>
        </section>

        <motion.section
          {...sectionReveal}
          className="py-16 md:py-24"
          aria-labelledby="match-heading"
        >
          <div className="mx-auto mb-10 max-w-2xl text-center">
            <h2
              id="match-heading"
              className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
            >
              {t('sampleMatch.title')}
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
              {t('sampleMatch.description')}
            </p>
          </div>

          <div className="border border-border bg-card text-left">
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
              <div>
                <p className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                  {t('sampleMatch.eyebrow')}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {t('sampleMatch.area')}
                </p>
              </div>
              <span className="font-mono text-[10px] tracking-wider text-primary uppercase">
                MATCH-042
              </span>
            </div>

            <div className="grid md:grid-cols-[1fr_auto_1fr]">
              <div className="p-6 sm:p-8">
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                      {t('sampleMatch.profileLabel')}
                    </p>
                    <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
                      {t('sampleMatch.candidate')} 024
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t('sampleMatch.pathway')}
                    </p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-md border border-primary/25 bg-accent text-primary">
                    <ShieldCheckIcon className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {sampleSkills.map((skill) => (
                    <li
                      key={skill}
                      className="flex items-center gap-3 py-3 text-sm"
                    >
                      <CheckIcon
                        className="size-3.5 text-primary"
                        aria-hidden="true"
                      />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-center border-y border-border px-6 py-4 md:border-x md:border-y-0 md:px-4">
                <span className="flex size-10 rotate-90 items-center justify-center rounded-full border border-primary bg-background text-primary md:rotate-0">
                  <ArrowRightIcon className="size-4" aria-hidden="true" />
                </span>
              </div>

              <div className="p-6 sm:p-8">
                <p className="font-mono text-[10px] tracking-widest text-muted-foreground uppercase">
                  {t('sampleMatch.opportunityLabel')}
                </p>
                <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
                  {t('sampleMatch.opportunityTitle')}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {t('sampleMatch.opportunityDescription')}
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-px bg-border">
                  <MatchDetail
                    label={t('sampleMatch.details.skillFit.label')}
                    value={t('sampleMatch.details.skillFit.value')}
                  />
                  <MatchDetail
                    label={t('sampleMatch.details.availability.label')}
                    value={t('sampleMatch.details.availability.value')}
                  />
                </dl>
              </div>
            </div>
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          id="opportunities"
          className="scroll-mt-24 border-t border-border py-16 md:py-24"
          aria-labelledby="opportunities-heading"
        >
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:col-span-4">
              <p className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase">
                {t('opportunities.eyebrow')}
              </p>
              <h2
                id="opportunities-heading"
                className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                {t('opportunities.title')}
              </h2>
              <div className="mt-8 border-l-2 border-primary pl-4">
                <p className="text-sm font-medium text-foreground">
                  {t('opportunities.disclaimerTitle')}
                </p>
                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {t('opportunities.disclaimer')}
                </p>
              </div>
            </div>

            <div className="border-t border-border lg:col-span-8">
              {talentOpportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;
                const key =
                  opportunityMessageKeys[
                    opportunity.id as keyof typeof opportunityMessageKeys
                  ];
                const title = t(`opportunities.items.${key}.title`);
                const skills = t.raw(
                  `opportunities.items.${key}.skills`,
                ) as string[];

                return (
                  <motion.a
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    key={opportunity.id}
                    href={talentPlatformUrl}
                    className="group block border-b border-border py-7 transition-colors hover:bg-muted/50 focus-visible:bg-muted/50 focus-visible:outline-none sm:px-5"
                    aria-label={t('opportunities.exploreAriaLabel', { title })}
                  >
                    <div className="grid gap-5 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto]">
                      <span className="flex size-10 items-center justify-center rounded-md border border-border bg-muted text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <Icon
                          className="size-4"
                          strokeWidth={1.75}
                          aria-hidden="true"
                        />
                      </span>
                      <div>
                        <p className="text-xs font-medium tracking-wide text-primary uppercase">
                          {t('opportunities.partnerLabel')}
                        </p>
                        <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                          {title}
                        </h3>
                        <p className="mt-2 text-xs font-medium text-muted-foreground">
                          {t(`opportunities.items.${key}.area`)}
                        </p>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {t(`opportunities.items.${key}.description`)}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPinIcon
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            {t(`opportunities.items.${key}.location`)}
                          </span>
                          <span>
                            {t(`opportunities.items.${key}.workMode`)}
                          </span>
                          <span>
                            {t(`opportunities.items.${key}.commitment`)}
                          </span>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {skills.map((skill) => (
                            <span
                              key={skill}
                              className="rounded-full border border-border bg-background px-2.5 py-1 text-[11px] text-muted-foreground"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <span className="flex size-10 items-center justify-center self-start rounded-md border border-border bg-background text-primary transition-[color,background-color,border-color,transform] group-hover:translate-x-0.5 group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                        <ArrowRightIcon className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          id="talent-profiles"
          className="scroll-mt-24 border-y border-border bg-muted/50 py-16 md:py-24"
          aria-labelledby="profiles-heading"
        >
          <div className="px-0 sm:px-6 lg:px-10">
            <div className="mx-auto max-w-2xl text-center">
              <h2
                id="profiles-heading"
                className="font-heading text-4xl font-semibold tracking-tight sm:text-5xl"
              >
                {t('profiles.title')}
              </h2>
              <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-muted-foreground">
                {t('profiles.description')}
              </p>
            </div>

            <div className="mt-12 grid gap-px border border-border bg-border lg:grid-cols-2">
              {profileKeys.map((key, index) => {
                const Icon = talentOpportunities[index].icon;
                const skills = t.raw(
                  `profiles.items.${key}.skills`,
                ) as string[];

                return (
                  <motion.a
                    key={key}
                    href={talentPlatformUrl}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, amount: 0.2 }}
                    transition={{
                      duration: 0.45,
                      delay: index * 0.05,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative flex min-h-[34rem] flex-col overflow-hidden bg-background transition-colors hover:bg-card focus-visible:bg-card focus-visible:outline-none"
                    aria-label={t('profiles.viewAriaLabel', {
                      title: t(`profiles.items.${key}.title`),
                    })}
                  >
                    <span
                      className="absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-primary transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100"
                      aria-hidden="true"
                    />

                    <div className="border-b border-border p-6 sm:p-8">
                      <div className="flex items-start justify-between gap-5">
                        <span className="flex size-14 shrink-0 items-center justify-center border border-border bg-muted text-primary transition-colors group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                          <Icon
                            className="size-5"
                            strokeWidth={1.5}
                            aria-hidden="true"
                          />
                        </span>
                        <span className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                          {t('profiles.sampleLabel')} /{' '}
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <h3 className="mt-8 max-w-sm font-heading text-3xl leading-[1.05] font-semibold tracking-tight">
                        {t(`profiles.items.${key}.title`)}
                      </h3>
                    </div>

                    <div className="flex items-center justify-between gap-5 border-b border-border bg-muted/70 px-6 py-5 sm:px-8">
                      <div className="flex items-center gap-3">
                        <span className="flex size-9 items-center justify-center border border-primary/25 bg-background text-primary">
                          <ShieldCheckIcon
                            className="size-4"
                            aria-hidden="true"
                          />
                        </span>
                        <div>
                          <p className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
                            {t('profiles.labels.verification')}
                          </p>
                          <p className="mt-1 text-sm font-medium">
                            {t(`profiles.items.${key}.verification`)}
                          </p>
                        </div>
                      </div>
                      <span className="border border-primary/25 bg-background px-2.5 py-1 font-mono text-[9px] tracking-wider text-primary uppercase">
                        {t('profiles.verified')}
                      </span>
                    </div>

                    <dl className="grid gap-px border-b border-border bg-border sm:grid-cols-3">
                      <ProfileDetail
                        label={t('profiles.labels.availability')}
                        value={t(`profiles.items.${key}.availability`)}
                      />
                      <ProfileDetail
                        label={t('profiles.labels.location')}
                        value={t(`profiles.items.${key}.location`)}
                      />
                      <ProfileDetail
                        label={t('profiles.labels.workMode')}
                        value={t(`profiles.items.${key}.workMode`)}
                      />
                    </dl>

                    <div className="flex-1 p-6 sm:px-8">
                      <p className="font-mono text-[9px] tracking-[0.16em] text-muted-foreground uppercase">
                        {t('profiles.labels.skills')}
                      </p>
                      <ul className="mt-4 grid gap-x-6 sm:grid-cols-2">
                        {skills.map((skill) => (
                          <li
                            key={skill}
                            className="flex items-center gap-2.5 border-t border-border py-3 text-sm"
                          >
                            <CheckIcon
                              className="size-3.5 text-primary"
                              aria-hidden="true"
                            />
                            {skill}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex items-center justify-between border-t border-border px-6 py-5 text-sm font-medium transition-colors group-hover:bg-foreground group-hover:text-background sm:px-8">
                      {t('profiles.viewProfile')}
                      <span className="flex size-8 items-center justify-center border border-border bg-background text-primary transition-transform group-hover:translate-x-0.5">
                        <ArrowRightIcon className="size-4" aria-hidden="true" />
                      </span>
                    </div>
                  </motion.a>
                );
              })}
            </div>
          </div>
        </motion.section>

        <motion.section
          {...sectionReveal}
          className="grid gap-px border-y border-border bg-border lg:grid-cols-[1.15fr_0.85fr]"
          aria-labelledby="final-cta-heading"
        >
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
          <div className="grid gap-px bg-border sm:grid-cols-2 lg:grid-cols-1">
            <a
              href={talentPlatformUrl}
              className="group flex items-center justify-between gap-6 bg-background p-7 text-lg font-medium transition-colors hover:bg-muted sm:p-8"
            >
              {t('finalCta.talent')}
              <ArrowRightIcon className="size-5 text-primary transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href={talentPlatformUrl}
              className="group flex items-center justify-between gap-6 bg-muted p-7 text-lg font-medium transition-colors hover:bg-card sm:p-8"
            >
              {t('finalCta.companies')}
              <ArrowRightIcon className="size-5 text-primary transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.section>
      </SectionWrapper>
    </main>
  );
}

function MatchDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-background p-4">
      <dt className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function ProfileDetail({ label, value }: { label: string; value: string }) {
  return (
    <div className="min-w-0 bg-background px-4 py-5 sm:px-5">
      <dt className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-xs leading-5 font-medium text-foreground sm:text-sm">
        {value}
      </dd>
    </div>
  );
}
