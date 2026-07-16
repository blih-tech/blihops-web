'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Link } from '@/i18n/navigation';
import { ArrowRightIcon, CheckIcon } from 'lucide-react';
import { motion, useInView, type Variants } from 'motion/react';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { buttonVariants } from '@/components/ui/button';
import { services, type ServiceItem } from '@/content/services';
import { cn } from '@/lib/utils';

const headerVariants: Variants = {
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

const rowVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export function ServicesList() {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <section
      ref={sectionRef}
      className="w-full py-16 md:py-24"
      aria-label="Our services"
    >
      <div className="mx-auto mb-14 max-w-2xl space-y-3 text-center md:mb-20">
        <TimelineAnimation
          as="p"
          animationNum={0}
          timelineRef={sectionRef}
          once={false}
          customVariants={headerVariants}
          className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase"
        >
          What we deliver
        </TimelineAnimation>
        <TimelineAnimation
          as="h2"
          animationNum={1}
          timelineRef={sectionRef}
          once={false}
          customVariants={headerVariants}
          className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-5xl"
        >
          Five capabilities. One partner.
        </TimelineAnimation>
        <TimelineAnimation
          as="p"
          animationNum={2}
          timelineRef={sectionRef}
          once={false}
          customVariants={headerVariants}
          className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Every service ships with documented SOPs, defined SLAs, trained pods,
          and automation where it counts.
        </TimelineAnimation>
      </div>

      <div className="flex flex-col gap-20 md:gap-28">
        {services.map((service, index) => (
          <ServiceRow
            key={service.id}
            service={service}
            reverse={index % 2 === 1}
          />
        ))}
      </div>
    </section>
  );
}

function ServiceRow({
  service,
  reverse,
}: {
  service: ServiceItem;
  reverse: boolean;
}) {
  const Icon = service.icon;
  const rowRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rowRef, { once: false, margin: '-10% 0px' });

  return (
    <motion.div
      ref={rowRef}
      id={service.id}
      role="article"
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={rowVariants}
      className="scroll-mt-28 grid grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-14"
    >
      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: reverse ? 24 : -24,
            filter: 'blur(6px)',
          },
          visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.05,
            },
          },
        }}
        className={cn(
          'group/image relative aspect-4/3 w-full bg-muted',
          reverse && 'lg:order-2',
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src={service.image}
            alt=""
            fill
            className="object-cover transition-transform duration-500 ease-out group-hover/image:scale-105"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-foreground/0 transition-colors duration-500 group-hover/image:bg-foreground/10"
          />
        </div>
        <div
          aria-hidden
          className="pointer-events-none absolute -right-5 -left-5 top-0 z-10 h-px bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -right-5 bottom-0 -left-5 z-10 h-px bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute -top-5 -bottom-5 left-0 z-10 w-px bg-border"
        />
        <div
          aria-hidden
          className="pointer-events-none absolute top-[-1.25rem] right-0 bottom-[-1.25rem] z-10 w-px bg-border"
        />
      </motion.div>

      <motion.div
        variants={{
          hidden: {
            opacity: 0,
            x: reverse ? -24 : 24,
            filter: 'blur(6px)',
          },
          visible: {
            opacity: 1,
            x: 0,
            filter: 'blur(0px)',
            transition: {
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
              delay: 0.12,
            },
          },
        }}
        className={cn('flex flex-col gap-5', reverse && 'lg:order-1')}
      >
        <div className="flex items-center gap-3">
          <span className="flex size-9 shrink-0 items-center justify-center rounded-md border border-border bg-muted text-foreground">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          <p className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {service.tag}
          </p>
        </div>

        <div className="space-y-2">
          <h3 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
            {service.title}
          </h3>
          <p className="font-sans text-base font-medium text-foreground/80">
            {service.subtitle}
          </p>
        </div>

        <p className="font-sans text-sm leading-relaxed text-muted-foreground md:text-[15px]">
          {service.body}
        </p>

        <ul className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {service.features.map((feature) => (
            <li
              key={feature}
              className="flex items-start gap-2 font-sans text-sm text-foreground"
            >
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-primary" />
              <span className="leading-snug text-muted-foreground">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        <div className="flex gap-4 bg-foreground p-4 text-background md:p-5">
          <div className="w-0.5 shrink-0 self-stretch rounded-full bg-background/40" />
          <p className="font-sans text-sm leading-relaxed">
            <span className="font-medium text-background">
              Who this is for:{' '}
            </span>
            <span className="text-background/80">{service.whoThisIsFor}</span>
          </p>
        </div>

        <div>
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ variant: 'link', size: 'lg' }),
              'group/cta h-auto px-0 text-foreground underline-offset-4 hover:text-primary',
            )}
          >
            Get free pilot
            <ArrowRightIcon
              data-icon="inline-end"
              className="transition-transform group-hover/cta:translate-x-0.5"
            />
          </Link>
        </div>
      </motion.div>
    </motion.div>
  );
}
