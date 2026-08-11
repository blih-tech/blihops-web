'use client';

import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { useRef, useState } from 'react';
import { ArrowUpRightIcon, SearchXIcon } from 'lucide-react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from 'motion/react';
import { useFormatter, useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import HoverPlayCard from '@/components/shared/video-card';
import type { Category, LocalizedInsight } from '@/lib/api/content';
import { cn } from '@/lib/utils';

type InsightsArchiveProps = {
  categories: Category[];
  insights: LocalizedInsight[];
};

const ALL_CATEGORIES = 'all';

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

export function InsightsArchive({
  categories,
  insights,
}: InsightsArchiveProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategoryId, setActiveCategoryId] =
    useState<string>(ALL_CATEGORIES);
  const t = useTranslations('InsightsPage.archive');

  const categoryFilters = [
    { value: ALL_CATEGORIES, label: t('all') },
    ...categories.map((category) => ({
      value: category.id,
      label: category.name,
    })),
  ];

  const visibleInsights =
    activeCategoryId === ALL_CATEGORIES
      ? insights
      : insights.filter((insight) => insight.category?.id === activeCategoryId);

  const isGloballyEmpty = insights.length === 0;

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
            {categoryFilters.map((category) => {
              const isActive = activeCategoryId === category.value;

              return (
                <button
                  key={category.value}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategoryId(category.value)}
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
                  <span className="relative z-10 lg:pl-1">
                    {category.label}
                  </span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 hidden font-mono text-[10px] text-muted-foreground lg:block">
            {t('count', { count: visibleInsights.length })}
          </p>
        </TimelineAnimation>
      </aside>

      <div className="min-w-0 lg:pl-0">
        <p className="border-b border-border py-4 font-mono text-[10px] text-muted-foreground lg:hidden">
          {t('count', { count: visibleInsights.length })}
        </p>

        {visibleInsights.length > 0 ? (
          <LayoutGroup>
            <motion.div
              layout
              className="grid min-w-0 grid-cols-1 gap-4 md:grid-cols-2"
            >
              <AnimatePresence mode="popLayout">
                {visibleInsights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
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
                    className="min-w-0"
                  >
                    <InsightCard insight={insight} />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          </LayoutGroup>
        ) : (
          <EmptyState
            title={t(isGloballyEmpty ? 'emptyAll' : 'empty')}
            description={t('emptyDescription')}
          />
        )}
      </div>
    </section>
  );
}

function EmptyState({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="flex min-h-72 flex-col items-center justify-center gap-3 border-b border-border px-6 py-20 text-center">
      <SearchXIcon className="size-8 text-muted-foreground/50" aria-hidden />
      <p className="font-heading text-2xl text-foreground">{title}</p>
      <p className="max-w-sm font-sans text-sm leading-relaxed text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function InsightCard({ insight }: { insight: LocalizedInsight }) {
  const format = useFormatter();
  const t = useTranslations('InsightsPage.archive');

  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex min-h-full min-w-0 flex-col rounded-md border border-border bg-background p-4 transition-colors duration-300 hover:border-foreground/20 sm:p-5"
      aria-label={t('readAriaLabel', { title: insight.title })}
    >
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
        {insight.media.type === 'video' ? (
          <HoverPlayCard
            src={insight.media.url}
            loop
            className="absolute inset-0 rounded-none shadow-none [&_video]:max-w-none [&_video]:object-cover"
          />
        ) : (
          <Image
            src={insight.media.url}
            alt=""
            fill
            sizes="(max-width: 768px) 100vw, 470px"
            className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]"
          />
        )}
      </div>

      <article className="flex flex-1 flex-col pt-4">
        <p className="font-sans text-[11px] font-medium text-primary">
          {insight.category ? (
            <>
              {insight.category.name}
              <span className="text-muted-foreground"> · </span>
            </>
          ) : null}
          <span className="text-muted-foreground">
            {format.dateTime(new Date(insight.createdAt), {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </p>

        <h2 className="mt-3 max-w-lg font-heading text-xl font-semibold leading-tight tracking-tight text-foreground sm:text-2xl">
          {insight.title}
        </h2>

        <p className="mt-3 line-clamp-3 max-w-lg font-sans text-sm leading-relaxed text-muted-foreground">
          {insight.excerpt}
        </p>

        <div className="mt-auto flex items-end justify-between gap-5 pt-6">
          <p className="max-w-md font-sans text-xs leading-relaxed text-muted-foreground">
            <span className="font-semibold text-primary">{t('byLabel')}</span>{' '}
            {insight.author} ·{' '}
            {t('readTime', { count: insight.readTimeMinutes })}
          </p>
          <ArrowUpRightIcon className="size-5 shrink-0 text-primary motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </article>
    </Link>
  );
}
