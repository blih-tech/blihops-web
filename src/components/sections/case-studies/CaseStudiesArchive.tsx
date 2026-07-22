'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useRef, useState } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import {
  caseStudyServiceNames,
  type CaseStudy,
  type CaseStudyService,
} from '@/content/case-studies';
import { cn } from '@/lib/utils';

type CaseStudiesArchiveProps = {
  caseStudies: CaseStudy[];
};

const ALL_SERVICES = 'All';

const studyMessageKeys = {
  'scaling-support-across-channels': 'scalingSupportAcrossChannels',
  'streamlining-document-processing': 'streamliningDocumentProcessing',
  'engineering-support-for-product-roadmap':
    'engineeringSupportForProductRoadmap',
  'automating-repetitive-operations': 'automatingRepetitiveOperations',
  'turning-data-into-clear-decisions': 'turningDataIntoClearDecisions',
  'optimizing-provider-onboarding': 'optimizingProviderOnboarding',
  'quality-system-for-customer-conversations':
    'qualitySystemForCustomerConversations',
  'software-support-with-clear-ownership': 'softwareSupportWithClearOwnership',
} as const;

const serviceMessageKeys = {
  'Customer Support': 'customerSupport',
  'Back-Office': 'backOffice',
  'IT & Software': 'itSoftware',
  'AI & Automation': 'aiAutomation',
  'Data & Reporting': 'dataReporting',
} as const satisfies Record<CaseStudyService, string>;

type LocalizedCaseStudy = CaseStudy & {
  outcome: string;
  serviceLabels: string[];
};

const archiveIntroVariants: Variants = {
  visible: {
    filter: 'blur(0px)',
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  },
  hidden: {
    filter: 'blur(8px)',
    x: -12,
    opacity: 0,
  },
};

const cardVariants: Variants = {
  visible: (index: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: Math.min(index, 5) * 0.05,
      duration: 0.45,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(8px)',
    y: 16,
    opacity: 0,
  },
  exit: {
    filter: 'blur(5px)',
    y: 8,
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: [0.4, 0, 1, 1],
    },
  },
};

export function CaseStudiesArchive({ caseStudies }: CaseStudiesArchiveProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeService, setActiveService] = useState<
    CaseStudyService | typeof ALL_SERVICES
  >(ALL_SERVICES);
  const t = useTranslations('CaseStudiesPage.archive');
  const tStudies = useTranslations('CaseStudiesPage.studies');
  const tServices = useTranslations('Shared.services');
  const localizedCaseStudies = caseStudies.map((study) => {
    const key = studyMessageKeys[study.slug as keyof typeof studyMessageKeys];

    return {
      ...study,
      title: tStudies(`${key}.title`),
      client: tStudies(`${key}.client`),
      excerpt: tStudies(`${key}.excerpt`),
      outcome: tStudies(`${key}.outcome`),
      serviceLabels: study.services.map((service) =>
        tServices(`${serviceMessageKeys[service]}.title`),
      ),
    };
  });
  const serviceFilters: {
    value: CaseStudyService | typeof ALL_SERVICES;
    label: string;
  }[] = [
    { value: ALL_SERVICES, label: t('all') },
    ...caseStudyServiceNames.map((service) => ({
      value: service,
      label: tServices(`${serviceMessageKeys[service]}.title`),
    })),
  ];

  const visibleStudies =
    activeService === ALL_SERVICES
      ? localizedCaseStudies
      : localizedCaseStudies.filter((study) =>
          study.services.some((service) => service === activeService),
        );

  return (
    <section
      ref={sectionRef}
      className="grid min-w-0 items-start lg:grid-cols-[13.5rem_minmax(0,1fr)]"
      aria-label={t('ariaLabel')}
    >
      <aside className="min-w-0 border-b border-border py-5 lg:sticky lg:top-20 lg:border-r lg:border-b-0 lg:py-7 lg:pr-7">
        <TimelineAnimation
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={archiveIntroVariants}
        >
          <p className="mb-4 font-sans text-[10px] font-medium tracking-widest text-muted-foreground uppercase lg:mb-5">
            {t('filterLabel')}
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
            aria-label={t('filterAriaLabel')}
          >
            {serviceFilters.map((service) => {
              const isActive = activeService === service.value;

              return (
                <button
                  key={service.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveService(service.value)}
                  className={cn(
                    'relative shrink-0 cursor-pointer rounded-md border px-3 py-2 text-left font-sans text-xs font-medium transition-colors lg:w-full lg:border-0 lg:px-4 lg:py-2.5',
                    isActive
                      ? 'border-border bg-muted/70 text-foreground'
                      : 'border-transparent text-muted-foreground hover:bg-muted/40 hover:text-foreground',
                  )}
                >
                  {isActive ? (
                    <span
                      className="absolute inset-y-2 left-1 z-10 w-0.5 bg-primary"
                      aria-hidden
                    />
                  ) : null}
                  <span className="relative z-10 lg:pl-1">{service.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 hidden font-mono text-[10px] text-muted-foreground lg:block">
            {t('count', { count: visibleStudies.length })}
          </p>
        </TimelineAnimation>
      </aside>

      <div className="min-w-0 lg:pl-0">
        <p className="border-b border-border py-4 font-mono text-[10px] text-muted-foreground lg:hidden">
          {t('count', { count: visibleStudies.length })}
        </p>

        {visibleStudies.length > 0 ? (
          <LayoutGroup>
            <motion.div
              layout
              className="grid min-w-0 grid-cols-1 gap-px bg-border md:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {visibleStudies.map((study, index) => (
                  <motion.div
                    key={study.slug}
                    layout
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={cardVariants}
                    transition={{
                      layout: {
                        type: 'spring',
                        stiffness: 320,
                        damping: 30,
                      },
                    }}
                    className="min-w-0 bg-background"
                  >
                    <CaseStudyCard study={study} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          <div className="min-h-72 border-b border-border px-6 py-20 text-center">
            <p className="font-heading text-2xl text-foreground">
              {t('empty')}
            </p>
          </div>
        )}
      </div>
    </section>
  );
}

function CaseStudyCard({ study }: { study: LocalizedCaseStudy }) {
  const t = useTranslations('CaseStudiesPage.archive');

  return (
    <Link
      href={`/case-studies/${study.slug}`}
      className="group flex min-h-full min-w-0 flex-col bg-background p-4 transition-colors duration-300 hover:bg-muted/50 sm:p-5"
      aria-label={t('readAriaLabel', { title: study.title })}
    >
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={study.heroImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 470px"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]"
        />
      </div>

      <article className="flex flex-1 flex-col pt-4">
        <p className="font-sans text-[11px] font-medium text-primary">
          {study.serviceLabels.join('  ·  ')}
          <span className="text-muted-foreground"> · {study.client}</span>
        </p>

        <h2 className="mt-3 max-w-lg font-heading text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
          {study.title}
        </h2>

        <p className="mt-3 line-clamp-3 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground">
          {study.excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between gap-5 pt-6">
          <p className="max-w-md font-sans text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-primary">
              {t('outcomeLabel')}
            </span>{' '}
            {study.outcome}
          </p>
          <ArrowUpRightIcon className="size-5 shrink-0 text-primary motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </article>
    </Link>
  );
}
