'use client';

import { useRef } from 'react';
import Image from 'next/image';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { InfiniteSlider } from '@/components/infinite-slider';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { testimonials, type Testimonial } from '@/content/testimonials';
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

const testimonialMessageKeys = [
  'sarahChen',
  'marcusWebb',
  'amiraHassan',
  'jamesOkonkwo',
  'elenaPetrova',
  'davidKim',
] as const;

export function Testimonials() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('Home.testimonials');
  const localizedTestimonials = testimonials.map((testimonial, index) => {
    const key = testimonialMessageKeys[index];

    return {
      ...testimonial,
      quote: t(`items.${key}.quote`),
      name: t(`items.${key}.name`),
      role: t(`items.${key}.role`),
    };
  });

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24"
      aria-label={t('ariaLabel')}
    >
      <SectionWrapper className="flex flex-col gap-12 md:gap-16">
        <div className="max-w-2xl space-y-3">
          <TimelineAnimation
            as="h2"
            animationNum={0}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="font-heading text-3xl font-semibold tracking-tight text-balance text-foreground md:text-5xl"
          >
            {t('title')}
          </TimelineAnimation>
          <TimelineAnimation
            as="p"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={motionVariants}
            className="font-sans text-sm leading-relaxed text-pretty text-muted-foreground md:text-base"
          >
            {t('description')}
          </TimelineAnimation>
        </div>

        <TimelineAnimation
          as="div"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={motionVariants}
          className="relative border-y border-border"
          data-lenis-prevent
        >
          <ul className="sr-only">
            {localizedTestimonials.map((testimonial) => (
              <li key={testimonial.id}>
                {t('screenReader', {
                  name: testimonial.name,
                  role: testimonial.role,
                  company: testimonial.company,
                  quote: testimonial.quote,
                })}
              </li>
            ))}
          </ul>

          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-8 bg-linear-to-r from-background to-transparent sm:w-24" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-8 bg-linear-to-l from-background to-transparent sm:w-24" />

          <InfiniteSlider
            gap={0}
            speed={40}
            speedOnHover={12}
            className="w-full"
          >
            {localizedTestimonials.map((item) => (
              <TestimonialCard key={item.id} testimonial={item} />
            ))}
          </InfiniteSlider>
        </TimelineAnimation>
      </SectionWrapper>
    </section>
  );
}

function TestimonialCard({
  testimonial,
  className,
}: {
  testimonial: Testimonial;
  className?: string;
}) {
  const t = useTranslations('Home.testimonials');

  return (
    <article
      className={cn(
        'flex w-[calc(100vw-2rem)] max-w-80 shrink-0 flex-col border-r border-border bg-background sm:w-96 sm:max-w-none',
        className,
      )}
    >
      <div className="flex items-center justify-between border-b border-border px-5 py-3.5">
        <QuoteMark className="size-5 text-muted-foreground/50" />
        <span className="font-sans text-xs text-muted-foreground">
          {testimonial.source}
        </span>
      </div>

      <div className="flex flex-1 flex-col justify-center px-5 py-6">
        <p className="font-sans text-sm leading-relaxed text-foreground md:text-[15px]">
          {testimonial.quote}
        </p>
      </div>

      <div className="flex items-center gap-3 border-t border-border px-5 py-4">
        <Image
          src={testimonial.avatar}
          alt=""
          width={40}
          height={40}
          className="size-10 shrink-0 rounded-full object-cover"
        />
        <div className="min-w-0">
          <p className="truncate font-sans text-sm font-semibold text-foreground">
            {testimonial.name}
          </p>
          <p className="truncate font-sans text-xs text-muted-foreground">
            {t('attribution', {
              role: testimonial.role,
              company: testimonial.company,
            })}
          </p>
        </div>
      </div>
    </article>
  );
}

function QuoteMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
    >
      <path d="M7.17 6C4.86 6 3 7.86 3 10.17V17h6.5v-6.83H6.33c0-1.29.55-1.84 1.84-1.84V6zm10 0C14.86 6 13 7.86 13 10.17V17H19.5v-6.83h-3.17c0-1.29.55-1.84 1.84-1.84V6z" />
    </svg>
  );
}
