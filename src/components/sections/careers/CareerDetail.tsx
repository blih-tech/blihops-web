'use client';

import { useRef } from 'react';
import { Link } from '@/i18n/navigation';
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CheckIcon,
  Link2Icon,
  MailIcon,
  PaperclipIcon,
} from 'lucide-react';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { buttonVariants } from '@/components/ui/button';
import { CAREERS_EMAIL } from '@/content/careers';
import type { CareerDetail } from '@/lib/api/content';
import { cn } from '@/lib/utils';

const revealVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.08,
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: 16,
    opacity: 0,
  },
};

const applicationSubject = (title: string) =>
  `Application: ${title} - [Applicant Name]`;

export function CareerDetail({ role }: { role: CareerDetail }) {
  return (
    <>
      <RoleHeader role={role} />
      <RoleContent role={role} />
    </>
  );
}

function RoleHeader({ role }: { role: CareerDetail }) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('CareersPage.detail');

  return (
    <section ref={sectionRef} className="border-b border-border py-12 md:py-20">
      <TimelineAnimation
        animationNum={0}
        timelineRef={sectionRef}
        once={false}
        customVariants={revealVariants}
      >
        <Link
          href="/careers#open-roles"
          className="group inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeftIcon
            className="size-4 transition-transform group-hover:-translate-x-0.5"
            aria-hidden="true"
          />
          {t('back')}
        </Link>
      </TimelineAnimation>

      <div className="mt-9 grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <TimelineAnimation
            as="p"
            animationNum={1}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="font-mono text-[11px] font-medium tracking-widest text-primary uppercase"
          >
            {role.department}
          </TimelineAnimation>
          <TimelineAnimation
            as="h1"
            animationNum={2}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="mt-4 max-w-3xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
          >
            {role.title}
          </TimelineAnimation>
          <TimelineAnimation
            as="p"
            animationNum={3}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
          >
            {role.summary}
          </TimelineAnimation>
        </div>

        <div className="lg:col-span-5">
          <TimelineAnimation
            animationNum={4}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="relative"
          >
            <CornerExtensions />
            <dl className="grid grid-cols-1 gap-px border border-border bg-border">
              <RoleFact label={t('brief.department')} value={role.department} />
              <RoleFact label={t('brief.location')} value={role.location} />
              <RoleFact
                label={t('brief.employment')}
                value={role.employmentType}
              />
            </dl>
          </TimelineAnimation>
        </div>
      </div>
    </section>
  );
}

function RoleFact({ label, value }: { label: string; value: string }) {
  return (
    <div className="grid grid-cols-[8rem_1fr] items-start gap-4 bg-background px-5 py-4 md:gap-6 md:px-6">
      <dt className="font-mono text-[11px] font-medium tracking-widest text-muted-foreground uppercase">
        {label}
      </dt>
      <dd className="font-sans text-sm font-medium text-foreground">{value}</dd>
    </div>
  );
}

function CornerExtensions() {
  const marks = [
    '-top-4 left-0 h-4 w-px',
    'top-0 -left-4 h-px w-4',
    '-top-4 right-0 h-4 w-px',
    'top-0 -right-4 h-px w-4',
    '-bottom-4 left-0 h-4 w-px',
    'bottom-0 -left-4 h-px w-4',
    '-bottom-4 right-0 h-4 w-px',
    'bottom-0 -right-4 h-px w-4',
  ];

  return marks.map((className) => (
    <span
      key={className}
      aria-hidden="true"
      className={cn('pointer-events-none absolute bg-border', className)}
    />
  ));
}

function RoleContent({ role }: { role: CareerDetail }) {
  const sectionRef = useRef<HTMLElement>(null);
  const t = useTranslations('CareersPage.detail');
  const subject = applicationSubject(role.title);
  const emailHref = `mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(subject)}`;

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24"
      aria-label="Role details and application"
    >
      <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        <aside className="lg:sticky lg:top-24 lg:col-span-4">
          <TimelineAnimation
            animationNum={0}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="border border-border bg-muted/30 p-6 sm:p-7"
          >
            <span className="flex size-10 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <MailIcon className="size-4" aria-hidden="true" />
            </span>
            <h2 className="mt-5 font-heading text-2xl font-semibold tracking-tight">
              {t('apply.title')}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t.rich('apply.description', {
                email: CAREERS_EMAIL,
                mail: (chunks) => (
                  <a
                    href={`mailto:${CAREERS_EMAIL}`}
                    className="font-medium text-foreground underline decoration-border underline-offset-4 transition-colors hover:text-primary"
                  >
                    {chunks}
                  </a>
                ),
              })}
            </p>

            <div className="mt-6 border-t border-border pt-5">
              <p className="font-mono text-[10px] font-medium tracking-widest text-muted-foreground uppercase">
                {t('apply.subjectLabel')}
              </p>
              <p className="mt-2 break-words border border-border bg-background p-3 font-mono text-xs leading-relaxed text-foreground">
                {subject}
              </p>
            </div>

            <ul className="mt-6 space-y-4 text-sm text-muted-foreground">
              <ApplicationStep icon={PaperclipIcon}>
                {t('apply.steps.resume')}
              </ApplicationStep>
              <ApplicationStep icon={Link2Icon}>
                {t('apply.steps.portfolio')}
              </ApplicationStep>
              <ApplicationStep icon={CheckIcon}>
                {t('apply.steps.intro')}
              </ApplicationStep>
            </ul>

            <a
              href={emailHref}
              className={cn(
                buttonVariants({ size: 'lg' }),
                'group mt-7 w-full bg-primary hover:bg-primary',
              )}
            >
              {t('apply.cta')}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </TimelineAnimation>
        </aside>

        <div className="divide-y divide-border lg:col-span-8">
          <AnimatedRoleSection
            number="01"
            title={t('sections.overview')}
            animationNum={1}
            timelineRef={sectionRef}
          >
            <div className="space-y-5">
              {role.overview.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </AnimatedRoleSection>
          <AnimatedRoleSection
            number="02"
            title={t('sections.responsibilities')}
            animationNum={2}
            timelineRef={sectionRef}
          >
            <RoleList items={role.responsibilities} />
          </AnimatedRoleSection>
          <AnimatedRoleSection
            number="03"
            title={t('sections.requirements')}
            animationNum={3}
            timelineRef={sectionRef}
          >
            <RoleList items={role.requirements} />
          </AnimatedRoleSection>

          <TimelineAnimation
            animationNum={4}
            timelineRef={sectionRef}
            once={false}
            customVariants={revealVariants}
            className="pt-10"
          >
            <Link
              href="/careers#open-roles"
              className="group inline-flex items-center gap-2 text-sm font-medium text-foreground transition-colors hover:text-primary"
            >
              {t('viewAll')}
              <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </TimelineAnimation>
        </div>
      </div>
    </section>
  );
}

function ApplicationStep({
  icon: Icon,
  children,
}: {
  icon: typeof PaperclipIcon;
  children: React.ReactNode;
}) {
  return (
    <li className="flex gap-3">
      <Icon
        className="mt-0.5 size-4 shrink-0 text-primary"
        aria-hidden="true"
      />
      <span className="leading-relaxed">{children}</span>
    </li>
  );
}

function AnimatedRoleSection({
  number,
  title,
  animationNum,
  timelineRef,
  children,
}: {
  number: string;
  title: string;
  animationNum: number;
  timelineRef: React.RefObject<HTMLElement | null>;
  children: React.ReactNode;
}) {
  return (
    <TimelineAnimation
      as="section"
      animationNum={animationNum}
      timelineRef={timelineRef}
      once={false}
      customVariants={revealVariants}
      className="py-10 first:pt-0"
    >
      <p className="font-mono text-[11px] tracking-widest text-primary">
        {number}
      </p>
      <h2 className="mt-3 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
        {title}
      </h2>
      <div className="mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </TimelineAnimation>
  );
}

function RoleList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-4">
      {items.map((item) => (
        <li key={item} className="flex gap-3">
          <span
            className="mt-2 size-1.5 shrink-0 rounded-full bg-primary"
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}
