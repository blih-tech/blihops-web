import type { Metadata } from 'next';
import { Link } from '@/i18n/navigation';
import {
  ArrowRightIcon,
  CheckIcon,
  MapPinIcon,
  ShieldCheckIcon,
} from 'lucide-react';
import * as motion from 'motion/react-client';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { HeroBackdrop } from '@/components/sections/shared/HeroBackdrop';
import { buttonVariants } from '@/components/ui/button';
import { talentOpportunities } from '@/content/talent';
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

export const metadata: Metadata = {
  title: 'Talent',
  description:
    'Join the BlihOps talent pool, build a verified professional profile, and be considered when your skills match an opportunity.',
  alternates: { canonical: '/talent' },
  openGraph: {
    title: 'BlihOps Talent',
    description:
      'Turn verified skills into visibility for relevant BlihOps and partner opportunities.',
    url: '/talent',
  },
};

const matchingSteps = [
  {
    number: '01',
    title: 'Build your profile',
    description:
      'Show your skills, interests, availability, and preferred work.',
  },
  {
    number: '02',
    title: 'Verify your ability',
    description:
      'Connect completed assessments and practical evidence to your profile.',
  },
  {
    number: '03',
    title: 'Enter the pool',
    description:
      'Become discoverable for roles that fit your verified capabilities.',
  },
  {
    number: '04',
    title: 'Hear when there is a match',
    description:
      'BlihOps reaches out when your profile aligns with real demand.',
  },
] as const;

export default function TalentPage() {
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
              BlihOps Talent
            </motion.div>

            <motion.h1
              {...heroReveal(0.12)}
              id="talent-heading"
              className="mt-5 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              Turn proven skills into real opportunity.
            </motion.h1>
            <motion.p
              {...heroReveal(0.24)}
              className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
            >
              Build a verified profile and become visible when your abilities
              match real work.
            </motion.p>

            <motion.div
              {...heroReveal(0.36)}
              className="mt-8 flex flex-wrap items-center justify-center gap-3"
            >
              <Link
                href="#opportunities"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group/cta bg-primary hover:bg-primary',
                )}
              >
                Explore opportunities
                <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
              </Link>
              <a
                href={talentPlatformUrl}
                className={cn(
                  buttonVariants({ variant: 'outline', size: 'lg' }),
                  'h-10 border-border bg-background px-4 text-foreground hover:bg-muted hover:text-foreground',
                )}
              >
                Visit Talent platform
              </a>
            </motion.div>
          </div>

          <motion.div
            {...heroReveal(0.48)}
            className="relative mx-auto mt-12 w-full max-w-5xl border border-border bg-card text-left md:mt-14"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-5 py-4 sm:px-7">
              <div>
                <p className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                  Sample talent match
                </p>
                <p className="mt-1 text-sm font-medium">Support operations</p>
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
                      Verified profile
                    </p>
                    <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
                      Candidate 024
                    </h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                      Customer support pathway
                    </p>
                  </div>
                  <span className="flex size-9 items-center justify-center rounded-md border border-primary/25 bg-accent text-primary">
                    <ShieldCheckIcon className="size-4" aria-hidden="true" />
                  </span>
                </div>
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {[
                    'Written communication',
                    'Ticket handling',
                    'Quality routines',
                  ].map((skill) => (
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
                  Matching opportunity
                </p>
                <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight">
                  Customer Support Specialist
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  A role requiring clear written support, reliable escalation,
                  and consistent customer-care standards.
                </p>
                <dl className="mt-6 grid grid-cols-2 gap-px bg-border">
                  <MatchDetail label="Skill fit" value="Strong" />
                  <MatchDetail label="Availability" value="Aligned" />
                </dl>
              </div>
            </div>

            <dl className="grid gap-px border-t border-border bg-border sm:grid-cols-3">
              <MatchDetail label="Profile status" value="Verified" muted />
              <MatchDetail label="Preferred work" value="Remote-ready" muted />
              <MatchDetail
                label="Pool status"
                value="Available for matching"
                muted
              />
            </dl>
          </motion.div>
        </section>

        <motion.section
          {...sectionReveal}
          className="grid gap-px border-b border-border bg-border sm:grid-cols-3"
        >
          {[
            ['Verified', 'Skills backed by evidence'],
            ['Visible', 'Profiles ready for matching'],
            ['Relevant', 'Contact when there is a fit'],
          ].map(([title, description]) => (
            <div key={title} className="bg-background px-5 py-6 sm:px-6">
              <p className="font-heading text-xl font-semibold">{title}</p>
              <p className="mt-1 text-sm text-muted-foreground">
                {description}
              </p>
            </div>
          ))}
        </motion.section>

        <motion.section
          {...sectionReveal}
          id="opportunities"
          className="scroll-mt-24 py-16 md:py-24"
          aria-labelledby="opportunities-heading"
        >
          <div className="grid items-start gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:sticky lg:top-24 lg:col-span-4">
              <p className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase">
                Preview opportunities
              </p>
              <h2
                id="opportunities-heading"
                className="mt-3 font-heading text-3xl font-semibold tracking-tight sm:text-4xl"
              >
                See where your skills could fit.
              </h2>
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground sm:text-base">
                These representative pathways show the kinds of work the talent
                pool may support as demand becomes available.
              </p>
            </div>

            <div className="border-t border-border lg:col-span-8">
              {talentOpportunities.map((opportunity, index) => {
                const Icon = opportunity.icon;

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
                    aria-label={`Explore ${opportunity.title} on BlihOps Talent`}
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
                          {opportunity.area}
                        </p>
                        <h3 className="mt-2 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
                          {opportunity.title}
                        </h3>
                        <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
                          {opportunity.description}
                        </p>
                        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-muted-foreground">
                          <span className="inline-flex items-center gap-1.5">
                            <MapPinIcon
                              className="size-3.5"
                              aria-hidden="true"
                            />
                            {opportunity.location}
                          </span>
                          <span>{opportunity.workMode}</span>
                          <span>{opportunity.commitment}</span>
                        </div>
                        <div className="mt-5 flex flex-wrap gap-2">
                          {opportunity.skills.map((skill) => (
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
          className="border-y border-border py-16 md:py-24"
          aria-labelledby="matching-heading"
        >
          <div className="max-w-2xl">
            <h2
              id="matching-heading"
              className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
            >
              A clear path into the pool.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Your profile becomes useful when evidence, availability, and real
              opportunity demand come together.
            </p>
          </div>

          <ol className="mt-12 grid gap-px border border-border bg-border md:grid-cols-2 lg:grid-cols-4">
            {matchingSteps.map((step) => (
              <li key={step.number} className="bg-background p-6 sm:p-7">
                <span className="font-mono text-[11px] tracking-widest text-primary">
                  {step.number}
                </span>
                <h3 className="mt-8 font-heading text-xl font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </motion.section>
      </SectionWrapper>
    </main>
  );
}

function MatchDetail({
  label,
  value,
  muted = false,
}: {
  label: string;
  value: string;
  muted?: boolean;
}) {
  return (
    <div className={cn('p-4', muted ? 'bg-muted sm:px-6' : 'bg-background')}>
      <dt className="font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="mt-2 text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}
