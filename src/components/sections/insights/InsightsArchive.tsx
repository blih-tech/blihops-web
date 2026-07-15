'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useRef, useState } from 'react';
import { ArrowUpRightIcon } from 'lucide-react';
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  type Variants,
} from 'motion/react';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { insightCategoryNames, type Insight } from '@/content/insights';
import { cn } from '@/lib/utils';

type InsightsArchiveProps = {
  insights: Insight[];
};

const ALL_CATEGORIES = 'All';

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

function formatDate(iso: string): string {
  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(`${iso}T00:00:00`));
}

export function InsightsArchive({ insights }: InsightsArchiveProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(ALL_CATEGORIES);

  const visibleInsights =
    activeCategory === ALL_CATEGORIES
      ? insights
      : insights.filter((insight) => insight.category === activeCategory);

  return (
    <section
      ref={sectionRef}
      className="grid items-start lg:grid-cols-[13.5rem_minmax(0,1fr)]"
      aria-label="Insight archive"
    >
      <aside className="border-b border-border py-5 lg:sticky lg:top-20 lg:border-r lg:border-b-0 lg:py-7 lg:pr-7">
        <TimelineAnimation
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={archiveIntroVariants}
        >
          <p className="mb-4 font-sans text-[10px] font-medium tracking-widest text-muted-foreground uppercase lg:mb-5">
            Filter by category
          </p>
          <div
            className="flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:gap-0 lg:overflow-visible lg:pb-0"
            aria-label="Filter insights by category"
          >
            {[ALL_CATEGORIES, ...insightCategoryNames].map((category) => {
              const isActive = activeCategory === category;

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setActiveCategory(category)}
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
                  <span className="relative z-10 lg:pl-1">{category}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-6 hidden font-mono text-[10px] text-muted-foreground lg:block">
            {String(visibleInsights.length).padStart(2, '0')} articles
          </p>
        </TimelineAnimation>
      </aside>

      <div className="lg:pl-0">
        <p className="border-b border-border py-4 font-mono text-[10px] text-muted-foreground lg:hidden">
          {String(visibleInsights.length).padStart(2, '0')} articles
        </p>

        <LayoutGroup>
          <motion.div
            layout
            className="grid grid-cols-1 gap-px bg-border md:grid-cols-2"
          >
            <AnimatePresence mode="popLayout">
              {visibleInsights.map((insight, index) => (
                <motion.div
                  key={insight.slug}
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
                  className="bg-background"
                >
                  <InsightCard insight={insight} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>
      </div>
    </section>
  );
}

function InsightCard({ insight }: { insight: Insight }) {
  return (
    <Link
      href={`/insights/${insight.slug}`}
      className="group flex min-h-full flex-col bg-background p-4 transition-colors duration-300 hover:bg-muted/50 sm:p-5"
      aria-label={`Read insight: ${insight.title}`}
    >
      <div className="relative aspect-video overflow-hidden rounded-md border border-border bg-muted">
        <Image
          src={insight.heroImage}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 470px"
          className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]"
        />
      </div>

      <article className="flex flex-1 flex-col pt-4">
        <p className="font-sans text-[11px] font-medium text-primary">
          {insight.category}
          <span className="text-muted-foreground">
            {' '}
            · {formatDate(insight.publishedAt)}
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
            <span className="font-semibold text-primary">By:</span>{' '}
            {insight.author} · {insight.readTime}
          </p>
          <ArrowUpRightIcon className="size-5 shrink-0 text-primary motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-0.5 motion-safe:group-hover:-translate-y-0.5" />
        </div>
      </article>
    </Link>
  );
}
