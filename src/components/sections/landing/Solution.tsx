'use client';

import { useRef, type ReactNode } from 'react';
import NumberFlow from '@number-flow/react';
import { SparklesIcon } from 'lucide-react';
import { useInView, type Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { DecorIcon } from '@/components/decor-icon';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { Globe } from '@/components/ui/globe';
import { cn } from '@/lib/utils';

const motionVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: 18,
    opacity: 0,
  },
};

const globeConfig = {
  width: 800,
  height: 800,
  onRender: () => {},
  devicePixelRatio: 2,
  phi: 0,
  theta: 0.25,
  dark: 0,
  diffuse: 0.4,
  mapSamples: 16000,
  mapBrightness: 1.2,
  baseColor: [1, 1, 1] as [number, number, number],
  markerColor: [0.39, 0.4, 0.95] as [number, number, number],
  glowColor: [1, 1, 1] as [number, number, number],
  markers: [
    { location: [9.032, 38.7469] as [number, number], size: 0.1 }, // Addis
    { location: [51.5074, -0.1278] as [number, number], size: 0.06 }, // London
    { location: [25.2048, 55.2708] as [number, number], size: 0.06 }, // Dubai
    { location: [52.52, 13.405] as [number, number], size: 0.05 }, // Berlin
    { location: [-1.2921, 36.8219] as [number, number], size: 0.05 }, // Nairobi
  ],
};

export function Solution() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('Home.solution');

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col gap-12 py-16 md:py-24"
      aria-label={t('ariaLabel')}
    >
      <div className="mx-auto max-w-3xl space-y-3 text-center">
        <TimelineAnimation
          as="p"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          {t('eyebrow')}
        </TimelineAnimation>
        <TimelineAnimation
          as="h2"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground md:text-5xl"
        >
          {t('title')}
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="font-sans mx-auto max-w-xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base"
        >
          {t('description')}
        </TimelineAnimation>
      </div>

      <TimelineAnimation
        as="div"
        animationNum={3}
        timelineRef={sectionRef}
        once={false}
        customVariants={motionVariants}
        className="relative border border-border bg-card"
      >
        {/* outer corners */}
        <DecorIcon className="size-3.5" position="top-left" />
        <DecorIcon className="size-3.5" position="top-right" />
        <DecorIcon className="size-3.5" position="bottom-left" />
        <DecorIcon className="size-3.5" position="bottom-right" />
        {/* outer edge midpoints on center column (desktop) */}
        <GridPlus className="top-0 left-1/2 max-lg:hidden" />
        <GridPlus className="bottom-0 left-1/2 max-lg:hidden" />

        <div className="relative grid grid-cols-1 lg:grid-cols-2">
          <FeatureCell
            visual={<PodMock />}
            title={t('features.deliveryPods.title')}
            description={t('features.deliveryPods.description')}
            className="border-b border-border lg:border-r"
          />
          <FeatureCell
            visual={<IntegrationsMock />}
            title={t('features.aiWorkflows.title')}
            description={t('features.aiWorkflows.description')}
            className="border-b border-border"
          />
        </div>

        {/* row divider junctions */}
        <div className="relative">
          <GridPlus className="top-0 left-0" />
          <GridPlus className="top-0 right-0 translate-x-1/2" />
          <GridPlus className="top-0 left-1/2 max-lg:hidden" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <StatsRow />
            <QuoteCell className="border-b border-border" />
          </div>
        </div>

        <div className="relative">
          <GridPlus className="top-0 left-0" />
          <GridPlus className="top-0 right-0 translate-x-1/2" />
          <GridPlus className="top-0 left-1/2 max-lg:hidden" />
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <FeatureCell
              visual={
                <div className="relative flex h-48 w-full items-center justify-center md:h-56">
                  <Globe className="max-w-70 opacity-90" config={globeConfig} />
                </div>
              }
              title={t('features.globalDelivery.title')}
              description={t('features.globalDelivery.description')}
              className="border-b border-border lg:border-r lg:border-b-0"
            />
            <FeatureCell
              visual={<SlaMock />}
              title={t('features.slaImprovement.title')}
              description={t('features.slaImprovement.description')}
              className="group/sla"
            />
          </div>
        </div>
      </TimelineAnimation>
    </section>
  );
}

function GridPlus({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      className={cn(
        'pointer-events-none absolute z-10 size-3.5 -translate-x-1/2 -translate-y-1/2 stroke-1 stroke-muted-foreground',
        className,
      )}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}

function FeatureCell({
  visual,
  title,
  description,
  className,
}: {
  visual: ReactNode;
  title: string;
  description: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center px-4 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12',
        className,
      )}
    >
      <div className="flex min-h-44 w-full flex-1 items-center justify-center sm:min-h-48 md:min-h-56">
        {visual}
      </div>
      <div className="mt-6 max-w-xs space-y-2 text-center sm:mt-8">
        <h3 className="font-heading text-base font-semibold text-foreground">
          {title}
        </h3>
        <p className="font-sans text-sm leading-relaxed text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );
}

function StatsRow() {
  const statsRef = useRef<HTMLDivElement>(null);
  const statsInView = useInView(statsRef, { once: true, margin: '-15% 0px' });
  const t = useTranslations('Home.solution.stats');

  return (
    <div
      ref={statsRef}
      className="relative grid grid-cols-1 border-b border-border bg-muted sm:grid-cols-2 lg:border-r"
    >
      <GridPlus className="top-0 left-1/2 hidden sm:block" />
      <GridPlus className="bottom-0 left-1/2 hidden sm:block" />
      <StatBlock
        value={statsInView ? 40 : 0}
        prefix="25–"
        suffix="%"
        label={t('costReduction')}
        className="border-b border-border sm:border-r sm:border-b-0"
      />
      <StatBlock
        value={statsInView ? 20 : 0}
        prefix="10–"
        suffix={t('hoursSuffix')}
        label={t('reclaimedPerWeek')}
      />
    </div>
  );
}

function StatBlock({
  value,
  prefix,
  suffix,
  label,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-2 px-4 py-8 sm:py-10 md:py-12',
        className,
      )}
    >
      <p className="font-heading text-3xl font-semibold tracking-tight text-foreground tabular-nums md:text-4xl">
        <NumberFlow
          value={value}
          prefix={prefix}
          suffix={suffix}
          trend={1}
          transformTiming={{
            duration: 900,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
          spinTiming={{
            duration: 900,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)',
          }}
        />
      </p>
      <p className="font-sans text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function QuoteCell({ className }: { className?: string }) {
  const t = useTranslations('Home.solution.quote');

  return (
    <div
      className={cn(
        'flex items-center px-6 py-10 md:px-10 md:py-12',
        className,
      )}
    >
      <div className="flex gap-4 bg-foreground p-5 text-background md:p-6">
        <div className="w-0.5 shrink-0 self-stretch rounded-full bg-background/40" />
        <div className="space-y-4">
          <p className="font-sans text-sm leading-relaxed text-background md:text-[15px]">
            {t('text')}
          </p>
          <p className="font-sans text-sm text-background/70">
            <span className="font-medium text-background">{t('role')}</span>
            <span className="mx-1.5">·</span>
            {t('companyType')}
          </p>
        </div>
      </div>
    </div>
  );
}

function PodMock() {
  const t = useTranslations('Home.solution.podMock');

  return (
    <div className="relative w-full max-w-62">
      <div className="rounded-xl border border-border bg-card p-5 shadow-md">
        <div className="mb-4 flex items-start justify-between">
          <div className="flex size-8 items-center justify-center rounded-md bg-primary/10">
            <span className="font-mono text-xs font-semibold text-primary">
              B
            </span>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 px-2.5 py-2 shadow-xs">
            <div className="space-y-1">
              <div className="h-1 w-8 rounded-full bg-muted-foreground/25" />
              <div className="h-1 w-6 rounded-full bg-muted-foreground/20" />
              <div className="h-1 w-7 rounded-full bg-muted-foreground/15" />
            </div>
          </div>
        </div>
        <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
          POD-04 · {t('support')}
        </p>
        <p className="mt-1 font-heading text-2xl font-semibold tracking-tight text-foreground">
          {t('slaLive')}
        </p>
        <p className="mt-0.5 font-sans text-xs text-muted-foreground">
          {t('responseTime', { count: 1 })}
        </p>
        <div className="mt-5 space-y-2.5 border-t border-border pt-4">
          {[
            { label: t('lead'), w: 'w-16' },
            { label: t('qa'), w: 'w-20' },
            { label: t('operations'), w: 'w-24' },
          ].map((row) => (
            <div key={row.label} className="flex items-center gap-3">
              <span className="w-10 font-sans text-xs text-muted-foreground">
                {row.label}
              </span>
              <div
                className={cn('h-2 rounded-full bg-muted-foreground/15', row.w)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function IntegrationsMock() {
  const t = useTranslations('Home.solution.automationMock');
  const stepLabels = t.raw('steps') as [string, string, string];
  const steps = [
    { label: stepLabels[0], done: true },
    { label: stepLabels[1], done: true },
    { label: stepLabels[2], done: false },
  ];

  return (
    <div className="relative w-full max-w-72">
      <div className="absolute -inset-4 rounded-3xl bg-primary/5 blur-2xl" />
      <div className="absolute -right-2 -bottom-3 h-24 w-40 rounded-full bg-chart-2/15 blur-2xl" />

      <div className="relative rounded-2xl border border-border/80 bg-card/90 p-5 shadow-lg backdrop-blur-sm">
        <div className="mb-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="flex size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm shadow-primary/30">
              <SparklesIcon className="size-4" />
            </div>
            <div>
              <p className="font-sans text-sm font-semibold text-foreground">
                {t('title')}
              </p>
              <p className="font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                {t('layerStatus', { number: '02' })}
              </p>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-1 font-sans text-[11px] font-medium text-primary">
            <span className="relative flex size-1.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
            </span>
            {t('running')}
          </span>
        </div>

        <div className="mb-4 flex items-center gap-1.5">
          {steps.map((step, i) => (
            <div key={step.label} className="flex flex-1 items-center gap-1.5">
              <div
                className={cn(
                  'flex h-8 flex-1 items-center justify-center rounded-lg border font-sans text-[11px] font-medium transition-colors',
                  step.done
                    ? 'border-primary/25 bg-primary/10 text-primary'
                    : 'border-border bg-muted/40 text-muted-foreground',
                )}
              >
                {step.label}
              </div>
              {i < steps.length - 1 ? (
                <div
                  className={cn(
                    'h-px w-2 shrink-0',
                    step.done ? 'bg-primary/40' : 'bg-border',
                  )}
                />
              ) : null}
            </div>
          ))}
        </div>

        <div className="space-y-3 rounded-xl border border-border/70 bg-muted/30 p-3.5">
          <div className="flex items-center justify-between">
            <p className="font-sans text-xs text-muted-foreground">
              {t('coverage')}
            </p>
            <p className="font-mono text-xs font-medium text-foreground">68%</p>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-background">
            <div className="h-full w-[68%] rounded-full bg-linear-to-r from-primary via-chart-2 to-chart-3" />
          </div>
          <div className="flex items-center justify-between pt-0.5">
            <p className="font-sans text-[11px] text-muted-foreground">
              {t('rulesLive', { count: 12 })}
            </p>
            <p className="font-sans text-[11px] font-medium text-foreground">
              {t('hoursSaved', { hours: 4.2 })}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlaMock() {
  const t = useTranslations('Home.solution.slaMock');

  return (
    <div className="relative w-full max-w-62">
      <div className="absolute inset-x-3 top-0 h-full translate-y-1.5 rounded-xl border border-border bg-card opacity-40 shadow-xs transition-all duration-300 ease-out group-hover/sla:translate-y-3 group-hover/sla:scale-[0.96] group-hover/sla:opacity-60" />
      <div className="absolute inset-x-1.5 top-0 h-full translate-y-0.5 rounded-xl border border-border bg-card opacity-60 shadow-xs transition-all duration-300 ease-out group-hover/sla:translate-y-1.5 group-hover/sla:scale-[0.98] group-hover/sla:opacity-80" />
      <div className="relative rounded-xl border border-border bg-card p-5 shadow-md transition-transform duration-300 ease-out group-hover/sla:-translate-y-1 group-hover/sla:shadow-lg">
        <p className="font-sans text-sm font-semibold text-foreground">
          <span className="rounded-sm bg-amber-200/80 px-1 text-foreground dark:bg-amber-400/30">
            {t('title')}
          </span>
        </p>
        <p className="mt-1 font-sans text-xs text-muted-foreground">
          {t('period')}
        </p>
        <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[90%] rounded-full bg-linear-to-r from-primary to-chart-2" />
        </div>
        <div className="mt-3 flex justify-between">
          <div>
            <p className="font-heading text-lg font-semibold text-foreground">
              90%
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              {t('met')}
            </p>
          </div>
          <div className="text-right">
            <p className="font-heading text-lg font-semibold text-foreground">
              10%
            </p>
            <p className="font-sans text-xs text-muted-foreground">
              {t('watch')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
