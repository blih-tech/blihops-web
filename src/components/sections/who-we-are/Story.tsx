'use client';

import Image from 'next/image';
import { useRef } from 'react';
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import type { MotionValue, Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
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

type ScrollRevealContentProps = {
  paragraphs: string[];
};

function ScrollRevealContent({ paragraphs }: ScrollRevealContentProps) {
  const contentRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: contentRef,
    offset: ['start 0.85', 'end 0.3'],
  });

  const characterCount = Array.from(paragraphs.join(' ')).length;

  if (shouldReduceMotion) {
    return (
      <div ref={contentRef} className="mt-8 space-y-5">
        {paragraphs.map((paragraph) => (
          <p
            key={paragraph}
            className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            {paragraph}
          </p>
        ))}
      </div>
    );
  }

  return (
    <div ref={contentRef} className="mt-8 space-y-5">
      {paragraphs.map((paragraph, paragraphIndex) => {
        const words = paragraph.split(/(\s+)/);
        const precedingContent = paragraphs.slice(0, paragraphIndex).join(' ');
        const paragraphStart =
          Array.from(precedingContent).length + (paragraphIndex > 0 ? 1 : 0);

        return (
          <p
            key={paragraph}
            className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
          >
            <span className="sr-only">{paragraph}</span>
            <span aria-hidden="true">
              {words.map((word, wordIndex) => {
                if (/^\s+$/.test(word)) return word;

                const wordStart =
                  paragraphStart +
                  Array.from(words.slice(0, wordIndex).join('')).length;

                return (
                  <span key={`${word}-${wordIndex}`} className="inline-block">
                    {Array.from(word).map((character, index) => (
                      <RevealCharacter
                        key={`${character}-${index}`}
                        character={character}
                        index={wordStart + index}
                        total={characterCount}
                        progress={scrollYProgress}
                      />
                    ))}
                  </span>
                );
              })}
            </span>
          </p>
        );
      })}
    </div>
  );
}

function RevealCharacter({
  character,
  index,
  total,
  progress,
}: {
  character: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
}) {
  const start = (index / total) * 0.96;
  const end = ((index + 1) / total) * 0.96;
  const opacity = useTransform(progress, [start, end], [0.18, 1]);

  return <motion.span style={{ opacity }}>{character}</motion.span>;
}

type StoryProps = {
  className?: string;
};

const statKeys = ['combinedServices', 'sla'] as const;

export function Story({ className }: StoryProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('AboutPage.story');
  const paragraphs = t.raw('paragraphs') as string[];

  return (
    <section
      ref={sectionRef}
      className={cn('w-full py-16 md:py-24', className)}
      aria-label={t('ariaLabel')}
    >
      {/* Asymmetric split: 45/55 \u2014 image left, narrative right */}
      <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-12 lg:gap-16">
        {/* Visual side \u2014 left on large screens */}
        <TimelineAnimation
          as="div"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="lg:sticky lg:top-24 lg:col-span-5"
        >
          <figure className="group relative aspect-[4/5] w-full overflow-hidden border border-border bg-muted">
            <Image
              src="/about-us-image.jpg"
              alt={t('imageAlt')}
              fill
              sizes="(max-width: 1024px) 100vw, 40vw"
              className="object-cover motion-safe:transition-transform motion-safe:duration-700 motion-safe:ease-out motion-safe:group-hover:scale-[1.025]"
            />
            {/* Caption strip */}
            <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between border-t border-border bg-background/95 px-4 py-3 font-mono text-[11px] tracking-wide text-muted-foreground uppercase backdrop-blur-sm">
              <span>{t('imageCaption')}</span>
              <span className="text-foreground/60">
                {t('headquartersCaption')}
              </span>
            </figcaption>
          </figure>
        </TimelineAnimation>

        {/* Narrative side \u2014 right, slightly wider */}
        <div className="lg:col-span-7">
          <TimelineAnimation
            as="p"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase"
          >
            {t('eyebrow')}
          </TimelineAnimation>

          <TimelineAnimation
            as="h2"
            animationNum={2}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="mt-5 font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl"
          >
            {t('heading')}{' '}
            <span className="text-foreground/80">{t('headingAccent')}</span>
          </TimelineAnimation>

          <TimelineAnimation
            as="blockquote"
            animationNum={3}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="mt-8 flex gap-4 bg-foreground p-5 text-background md:p-6"
          >
            <span
              aria-hidden="true"
              className="w-0.5 shrink-0 self-stretch rounded-full bg-background/40"
            />
            <p className="font-sans text-sm leading-relaxed text-background md:text-[15px]">
              {t('pullQuote')}
            </p>
          </TimelineAnimation>

          <ScrollRevealContent paragraphs={paragraphs} />

          {/* Stat tags \u2014 hairline metric cells, not glowing chips */}
          <TimelineAnimation
            as="div"
            animationNum={4 + paragraphs.length}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="mt-10 flex flex-wrap items-stretch gap-px border border-border bg-border"
          >
            {statKeys.map((key) => (
              <div
                key={key}
                className="flex min-w-40 flex-1 flex-col gap-1 bg-background px-6 py-5 last:bg-muted/60"
              >
                <span className="font-heading text-lg font-semibold tracking-tight text-foreground md:text-xl">
                  {t(`stats.${key}.value`)}
                </span>
                <span className="font-sans text-xs uppercase tracking-widest text-muted-foreground">
                  {t(`stats.${key}.label`)}
                </span>
              </div>
            ))}
          </TimelineAnimation>
        </div>
      </div>
    </section>
  );
}
