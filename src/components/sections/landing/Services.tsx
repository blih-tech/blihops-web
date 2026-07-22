'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { AnimatePresence, motion } from 'motion/react';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { DecorIcon } from '@/components/decor-icon';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { services, type ServiceItem } from '@/content/services';
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

const highlightTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

const serviceMessageKeys = {
  'customer-support': 'customerSupport',
  'back-office': 'backOffice',
  'it-software': 'itSoftware',
  'ai-automation': 'aiAutomation',
  'data-reporting': 'dataReporting',
} as const;

export function Services() {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('Home.services');
  const tServices = useTranslations('Shared.services');
  const [activeId, setActiveId] = useState(services[0]?.id ?? '');
  const [direction, setDirection] = useState(0);
  const localizedServices = services.map((service) => {
    const key =
      serviceMessageKeys[service.id as keyof typeof serviceMessageKeys];

    return {
      ...service,
      title: tServices(`${key}.title`),
      shortDescription: tServices(`${key}.shortDescription`),
      details: tServices(`${key}.details`),
    };
  });

  // Warm the browser cache so rapid hover swaps don't flash empty
  useEffect(() => {
    for (const service of services) {
      const img = new window.Image();
      img.src = service.image;
    }
  }, []);

  const activeIndex = Math.max(
    0,
    localizedServices.findIndex((s) => s.id === activeId),
  );
  const active = localizedServices[activeIndex] ?? localizedServices[0];

  if (!active) return null;

  const select = (id: string) => {
    const next = localizedServices.findIndex((s) => s.id === id);
    if (next === -1 || next === activeIndex) return;
    setDirection(next > activeIndex ? 1 : -1);
    setActiveId(id);
  };

  return (
    <section
      ref={sectionRef}
      className="flex w-full flex-col gap-16 py-16 md:gap-20 md:py-24"
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
          className="font-sans mx-auto max-w-2xl text-sm leading-relaxed text-pretty text-muted-foreground md:text-base"
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
        className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-10"
      >
        <ul
          className="relative flex flex-col gap-1"
          role="listbox"
          aria-label={t('serviceListAriaLabel')}
        >
          {localizedServices.map((service) => (
            <ServiceListItem
              key={service.id}
              service={service}
              isActive={service.id === active.id}
              onSelect={() => select(service.id)}
            />
          ))}
        </ul>

        <div className="flex h-full min-h-80 flex-col gap-4 md:min-h-100 lg:min-h-0">
          <div className="relative min-h-0 flex-1 border border-border bg-muted/40">
            <DecorIcon className="size-3.5" position="top-left" />
            <DecorIcon className="size-3.5" position="top-right" />
            <DecorIcon className="size-3.5" position="bottom-left" />
            <DecorIcon className="size-3.5" position="bottom-right" />
            <div className="absolute inset-0 overflow-hidden">
              <AnimatePresence
                initial={false}
                custom={direction}
                mode="popLayout"
              >
                <motion.div
                  key={active.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-0 flex flex-col"
                >
                  <ServicePreview service={active} />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div
            className="flex shrink-0 items-center justify-center gap-2"
            role="tablist"
            aria-label={t('serviceSlidesAriaLabel')}
          >
            {localizedServices.map((service) => {
              const isActive = service.id === active.id;
              return (
                <button
                  key={service.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={t('showServiceAriaLabel', {
                    title: service.title,
                  })}
                  onClick={() => select(service.id)}
                  className={cn(
                    'h-1.5 rounded-full transition-all duration-300',
                    isActive
                      ? 'w-6 bg-foreground'
                      : 'w-1.5 bg-muted-foreground/30 hover:bg-muted-foreground/50',
                  )}
                />
              );
            })}
          </div>
        </div>
      </TimelineAnimation>
    </section>
  );
}

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? 48 : -48,
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? -48 : 48,
    opacity: 0,
  }),
};

function ServiceListItem({
  service,
  isActive,
  onSelect,
}: {
  service: ServiceItem;
  isActive: boolean;
  onSelect: () => void;
}) {
  const Icon = service.icon;

  return (
    <li role="option" aria-selected={isActive}>
      <button
        type="button"
        onMouseEnter={onSelect}
        onFocus={onSelect}
        onClick={onSelect}
        className="relative z-10 flex w-full items-start gap-3 rounded-xl p-3.5 text-left md:p-4"
      >
        {isActive ? (
          <motion.span
            layoutId="services-list-highlight"
            className="absolute inset-0 -z-0 rounded-xl border border-border bg-muted"
            transition={highlightTransition}
            aria-hidden
          />
        ) : null}

        <span
          className={cn(
            'relative z-10 flex size-10 shrink-0 items-center justify-center rounded-lg transition-colors',
            isActive
              ? 'bg-primary text-primary-foreground'
              : 'bg-muted text-muted-foreground',
          )}
        >
          <Icon className="size-4.5" strokeWidth={1.75} />
        </span>

        <span className="relative z-10 min-w-0 pt-0.5">
          <span
            className={cn(
              'block font-sans text-sm font-semibold md:text-[15px]',
              isActive ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {service.title}
          </span>
          <span
            className={cn(
              'mt-0.5 block font-sans text-xs leading-relaxed md:text-[13px]',
              isActive ? 'text-muted-foreground' : 'text-muted-foreground/70',
            )}
          >
            {service.shortDescription}
          </span>
        </span>
      </button>
    </li>
  );
}

function ServicePreview({ service }: { service: ServiceItem }) {
  const Icon = service.icon;
  const tActions = useTranslations('Shared.actions');

  return (
    <div className="relative flex h-full flex-col">
      <div className="absolute inset-0 bg-muted">
        <Image
          src={service.image}
          alt=""
          fill
          priority
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
      </div>

      <div className="relative z-10 mt-auto flex items-start gap-3 border-t border-border/60 bg-card/90 px-5 py-4 backdrop-blur-sm md:px-6 md:py-5">
        <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <Icon className="size-4.5" strokeWidth={1.75} />
        </span>
        <div className="min-w-0">
          <p className="font-sans text-sm font-semibold text-foreground md:text-base">
            {service.title}
          </p>
          <p className="mt-1 font-sans text-xs leading-relaxed text-muted-foreground md:text-sm">
            {service.details}
          </p>
          <Link
            href={service.href}
            className="mt-2 inline-block font-sans text-xs font-medium text-primary hover:underline"
          >
            {tActions('learnMore')}
          </Link>
        </div>
      </div>
    </div>
  );
}
