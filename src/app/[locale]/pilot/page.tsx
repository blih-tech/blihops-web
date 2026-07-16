import Image from 'next/image';
import { ChevronDownIcon } from 'lucide-react';

import { BookCallButton } from '@/components/BookCallButton';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { PilotForm } from '@/components/sections/pilot/PilotForm';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata('pilot', '/pilot');

const pilotSteps = [
  {
    number: '01',
    title: 'Share one workflow',
    description:
      'Tell us where work is delayed, inconsistent, or taking too much of your team’s time.',
  },
  {
    number: '02',
    title: 'Define the proof',
    description:
      'We agree on scope, ownership, service levels, and the measures that will prove value.',
  },
  {
    number: '03',
    title: 'Run for two weeks',
    description:
      'A focused delivery pod operates the workflow with quality checks and visible reporting.',
  },
  {
    number: '04',
    title: 'Review and decide',
    description:
      'You receive the evidence needed to scale, refine, or stop without a long-term commitment.',
  },
] as const;

const faqs = [
  {
    question: 'Is the two-week pilot really free?',
    answer:
      'Yes. We first agree on a focused workflow and clear boundaries so the pilot can produce useful evidence within two weeks.',
  },
  {
    question: 'What kind of process works best for a pilot?',
    answer:
      'Choose one repeatable process with visible volume and outcomes, such as support tickets, back-office processing, data work, or a defined automation workflow.',
  },
  {
    question: 'Do we need to replace our current tools?',
    answer:
      'Usually not. We begin with the tools and access you already use, then recommend changes only where they remove a clear operational constraint.',
  },
  {
    question: 'What happens after the pilot?',
    answer:
      'We review delivery quality, service levels, workload, and improvement opportunities with you. You decide whether to scale the engagement; there is no automatic long-term commitment.',
  },
] as const;

export default function PilotPage() {
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
              <span>Pilot application</span>
              <span>One workflow / Two weeks</span>
            </div>

            <div className="grid lg:grid-cols-[0.88fr_1.12fr] lg:divide-x lg:divide-border/80">
              <div className="px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-20">
                <p className="font-mono text-[11px] tracking-[0.12em] text-primary uppercase">
                  A focused way to begin
                </p>
                <h1 className="mt-7 max-w-lg font-heading text-5xl leading-[0.94] font-semibold tracking-[-0.045em] text-balance text-foreground sm:text-6xl lg:text-7xl">
                  Prove value before you scale.
                </h1>
                <p className="mt-8 max-w-md text-base leading-7 text-muted-foreground sm:text-lg">
                  Test one workflow with clear measures and visible reporting
                  before making a longer commitment.
                </p>

                <ul className="mt-12 border-t border-border/80 text-sm text-foreground">
                  {[
                    'No long-term commitment',
                    'Success measures agreed upfront',
                    'Response within one business day',
                  ].map((item, index) => (
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
                      alt="A BlihOps delivery team discussing an operational workflow"
                      fill
                      className="object-cover object-[center_42%] saturate-[0.72]"
                      sizes="28rem"
                      priority
                    />
                  </div>
                  <figcaption className="grid grid-cols-[1fr_auto] gap-6 border-b border-border/80 py-4 text-xs leading-5 text-muted-foreground">
                    <span>A delivery team built around your workflow.</span>
                    <span className="font-mono text-[10px] tracking-wider uppercase">
                      Addis Ababa
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
              The working model
            </p>
            <h2
              id="pilot-process"
              className="mt-6 max-w-md font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl"
            >
              Two weeks. Four deliberate stages.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
              One focused question guides the work: can BlihOps deliver this
              workflow better?
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
                    {step.title}
                  </h3>
                  <p className="text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                    {step.description}
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
              Practical details
            </p>
            <h2 className="mt-6 max-w-md font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.035em] text-foreground sm:text-5xl">
              Pilot questions, answered.
            </h2>
            <p className="mt-6 max-w-sm text-base leading-7 text-muted-foreground">
              A focused scope produces better evidence. These are the details
              most buyers ask first.
            </p>
          </div>

          <div className="border-b border-border/80">
            {faqs.map((faq, index) => (
              <details
                key={faq.question}
                className="group border-t border-border/80"
              >
                <summary className="grid cursor-pointer list-none grid-cols-[2rem_1fr_auto] items-center gap-4 py-7 font-medium text-foreground outline-none transition-colors duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden">
                  <span className="font-mono text-[10px] text-muted-foreground">
                    0{index + 1}
                  </span>
                  {faq.question}
                  <ChevronDownIcon
                    className="size-4 shrink-0 transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-open:rotate-180"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </summary>
                <p className="max-w-2xl pr-8 pb-8 pl-12 text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
                  {faq.answer}
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
              Not ready to apply?
            </h2>
            <p className="mt-2 text-sm leading-6 text-muted-foreground sm:text-base">
              Talk through the workflow and decide whether a pilot is the right
              next step.
            </p>
          </div>
          <BookCallButton
            calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
            namespace="blih-ops-desicovery-call"
            className="shrink-0 border border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
          />
        </div>
      </SectionWrapper>
    </main>
  );
}
