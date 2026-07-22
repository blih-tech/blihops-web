'use client';

import { useRef } from 'react';
import Image from 'next/image';
import { Link, usePathname } from '@/i18n/navigation';
import { ArrowRight, ArrowUp } from 'lucide-react';
import type { Variants } from 'motion/react';
import { useTranslations } from 'next-intl';

import { BookCallButton } from '@/components/BookCallButton';
import { Logo } from '@/components/layout/Logo';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { TimelineAnimation } from '@/components/layout/TimelineAnimation';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/** Slightly slower overall, snappier ease curve */
const footerMotionVariants: Variants = {
  visible: (i: number) => ({
    filter: 'blur(0px)',
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.16,
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  }),
  hidden: {
    filter: 'blur(10px)',
    y: 16,
    opacity: 0,
  },
};

const footerLinks = [
  { key: 'services', href: '/what-we-offer' },
  { key: 'process', href: '/how-we-work' },
  { key: 'about', href: '/who-we-are' },
  { key: 'careers', href: '/careers' },
  { key: 'insights', href: '/insights' },
  { key: 'contact', href: '/contact' },
] as const;

function SocialIcon({
  label,
  href,
  children,
}: {
  label: string;
  href: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      target="_blank"
      rel="noreferrer"
      className="flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:bg-muted hover:text-primary"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const t = useTranslations('Shared.footer');
  const tActions = useTranslations('Shared.actions');
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isPilotPage = pathname === '/pilot';
  const isContactPage = pathname === '/contact';
  const isSkillsPage = pathname === '/skills';
  const isTalentPage = pathname === '/talent';
  const bannerVariant = isPilotPage
    ? 'pilot'
    : isSkillsPage
      ? 'skills'
      : isTalentPage
        ? 'talent'
        : 'default';
  const promptVariant = isPilotPage
    ? 'pilot'
    : isSkillsPage
      ? 'skills'
      : isTalentPage
        ? 'talent'
        : isContactPage
          ? 'contact'
          : 'default';

  return (
    <footer className="bg-background font-sans text-foreground">
      <SectionWrapper className="pt-24">
        <div ref={ctaRef} className="relative z-10 -mb-20">
          <TimelineAnimation
            as="div"
            animationNum={0}
            timelineRef={ctaRef}
            once={false}
            customVariants={footerMotionVariants}
            className="group relative min-h-80 overflow-hidden rounded-2xl border border-border bg-card shadow-lg md:min-h-96"
          >
            <Image
              src="/footer_image.jpg"
              alt=""
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 72rem"
              priority={false}
            />
            <div className="absolute inset-0 bg-foreground/55" aria-hidden />
            <div className="relative z-10 flex min-h-80 flex-col justify-center p-6 sm:min-h-96 sm:p-12 md:p-16">
              <h2 className="font-heading mb-3 max-w-2xl text-3xl font-semibold tracking-tight text-balance text-primary-foreground sm:text-4xl md:text-5xl">
                {t(`${bannerVariant}.bannerTitle`)}
              </h2>
              <p className="font-sans mb-6 max-w-xl text-sm text-pretty text-primary-foreground/90 sm:text-base">
                {t(`${bannerVariant}.bannerDescription`)}
              </p>
              {isPilotPage ? (
                <BookCallButton
                  calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
                  namespace="blih-ops-desicovery-call"
                  className="h-auto min-h-10 w-full whitespace-normal bg-primary py-2.5 text-center leading-tight text-primary-foreground hover:bg-primary/90 sm:w-fit sm:whitespace-nowrap sm:py-0"
                />
              ) : isSkillsPage ? (
                <a
                  href="https://skills.blihops.com"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group/cta h-auto min-h-10 w-full gap-2 whitespace-normal bg-primary py-2.5 text-center leading-tight hover:bg-primary sm:w-fit sm:gap-3 sm:whitespace-nowrap sm:py-0',
                  )}
                >
                  {tActions('exploreSkills')}
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground text-primary">
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </span>
                </a>
              ) : isTalentPage ? (
                <a
                  href="https://talent.blihops.com"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group/cta h-auto min-h-10 w-full gap-2 whitespace-normal bg-primary py-2.5 text-center leading-tight hover:bg-primary sm:w-fit sm:gap-3 sm:whitespace-nowrap sm:py-0',
                  )}
                >
                  {tActions('exploreTalent')}
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground text-primary">
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </span>
                </a>
              ) : (
                <Link
                  href="/pilot"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group/cta h-auto min-h-10 w-full gap-2 whitespace-normal bg-primary py-2.5 text-center leading-tight hover:bg-primary sm:w-fit sm:gap-3 sm:whitespace-nowrap sm:py-0',
                  )}
                >
                  {tActions('getPilot')}
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground text-primary">
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </span>
                </Link>
              )}
            </div>
          </TimelineAnimation>
        </div>
      </SectionWrapper>

      <div className="border-t border-border bg-muted pt-32 pb-12">
        <SectionWrapper>
          <div ref={contentRef} className="w-full">
            <div className="grid grid-cols-1 items-start gap-10 pb-10 lg:grid-cols-2">
              <div className="space-y-10">
                <TimelineAnimation
                  as="div"
                  animationNum={0}
                  timelineRef={contentRef}
                  once={false}
                  customVariants={footerMotionVariants}
                >
                  <Logo className="h-9 w-auto" />
                </TimelineAnimation>

                <div className="space-y-3">
                  <TimelineAnimation
                    as="h4"
                    animationNum={1}
                    timelineRef={contentRef}
                    once={false}
                    customVariants={footerMotionVariants}
                    className="text-xs font-medium tracking-wider text-muted-foreground uppercase"
                  >
                    {t('connect')}
                  </TimelineAnimation>
                  <div className="flex flex-wrap gap-3">
                    <TimelineAnimation
                      as="div"
                      animationNum={2}
                      timelineRef={contentRef}
                      once={false}
                      customVariants={footerMotionVariants}
                    >
                      <SocialIcon
                        label={t('socialAriaLabels.instagram')}
                        href="https://www.instagram.com/blihops/"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-none stroke-current"
                          aria-hidden
                        >
                          <rect
                            x="2.5"
                            y="2.5"
                            width="19"
                            height="19"
                            rx="5"
                            strokeWidth="2"
                          />
                          <circle cx="12" cy="12" r="4.25" strokeWidth="2" />
                          <circle
                            cx="17.5"
                            cy="6.5"
                            r="1"
                            className="fill-current stroke-none"
                          />
                        </svg>
                      </SocialIcon>
                    </TimelineAnimation>
                    <TimelineAnimation
                      as="div"
                      animationNum={3}
                      timelineRef={contentRef}
                      once={false}
                      customVariants={footerMotionVariants}
                    >
                      <SocialIcon
                        label={t('socialAriaLabels.tiktok')}
                        href="https://www.tiktok.com/@blihops/video/7602309252924984583"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M16.6 5.82a4.85 4.85 0 0 1-1.17-3.18h-3.3v13.24a2.77 2.77 0 1 1-2.39-2.75V9.79a6.1 6.1 0 1 0 5.69 6.09V9.17a8.2 8.2 0 0 0 4.8 1.54V7.42a4.87 4.87 0 0 1-3.63-1.6Z" />
                        </svg>
                      </SocialIcon>
                    </TimelineAnimation>
                    <TimelineAnimation
                      as="div"
                      animationNum={4}
                      timelineRef={contentRef}
                      once={false}
                      customVariants={footerMotionVariants}
                    >
                      <SocialIcon
                        label={t('socialAriaLabels.linkedIn')}
                        href="https://et.linkedin.com/company/blihops"
                      >
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.5 9h3v12h-3V9zm6 0h2.9v1.6h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V21h-3v-6.5c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21h-3V9z" />
                        </svg>
                      </SocialIcon>
                    </TimelineAnimation>
                  </div>
                  <TimelineAnimation
                    as="div"
                    animationNum={5}
                    timelineRef={contentRef}
                    once={false}
                    customVariants={footerMotionVariants}
                  >
                    <a
                      href="mailto:blih.marketing2023@gmail.com"
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      blih.marketing2023@gmail.com
                    </a>
                  </TimelineAnimation>
                </div>
              </div>

              <TimelineAnimation
                as="div"
                animationNum={1}
                timelineRef={contentRef}
                once={false}
                customVariants={footerMotionVariants}
                className="space-y-4 lg:text-right"
              >
                <h3 className="font-heading text-base font-medium text-foreground">
                  {t(`${promptVariant}.promptTitle`)}
                </h3>
                <p className="font-sans max-w-md text-sm text-muted-foreground lg:ml-auto">
                  {t(`${promptVariant}.promptDescription`)}
                </p>
                <div className="flex flex-wrap gap-3 lg:justify-end">
                  {isSkillsPage ? (
                    <a
                      href="https://skills.blihops.com"
                      className={cn(
                        buttonVariants({ size: 'lg' }),
                        'group/cta h-12 rounded-none',
                      )}
                    >
                      {tActions('exploreSkills')}
                      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </a>
                  ) : isTalentPage ? (
                    <a
                      href="https://talent.blihops.com"
                      className={cn(
                        buttonVariants({ size: 'lg' }),
                        'group/cta h-12 rounded-none',
                      )}
                    >
                      {tActions('exploreTalent')}
                      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </a>
                  ) : !isPilotPage ? (
                    <Link
                      href="/pilot"
                      className={cn(
                        buttonVariants({ size: 'lg' }),
                        'group/cta h-12 rounded-none',
                      )}
                    >
                      {tActions('getPilot')}
                      <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                    </Link>
                  ) : null}
                  {!isContactPage && !isSkillsPage && !isTalentPage ? (
                    <BookCallButton
                      calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
                      namespace="blih-ops-desicovery-call"
                      className="border border-border bg-background text-foreground hover:bg-background hover:text-primary"
                    />
                  ) : null}
                </div>
              </TimelineAnimation>
            </div>

            <TimelineAnimation
              as="nav"
              animationNum={2}
              timelineRef={contentRef}
              once={false}
              customVariants={footerMotionVariants}
              aria-label={t('navigationAriaLabel')}
              className="grid grid-cols-2 gap-4 border-t border-border py-8 text-sm font-medium text-muted-foreground sm:grid-cols-3 lg:grid-cols-6"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {t(`links.${link.key}`)}
                </Link>
              ))}
            </TimelineAnimation>

            <TimelineAnimation
              as="div"
              animationNum={3}
              timelineRef={contentRef}
              once={false}
              customVariants={footerMotionVariants}
              className="flex flex-col items-center justify-between gap-6 border-t border-border py-8 md:flex-row"
            >
              <span className="text-sm font-semibold text-foreground">
                Blih Ops
              </span>
              <span className="text-sm text-muted-foreground">
                {t('copyright', { year: new Date().getFullYear() })}
              </span>
              <button
                type="button"
                onClick={() => {
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                  document.documentElement.scrollTo({
                    top: 0,
                    behavior: 'smooth',
                  });
                }}
                className="group/top inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {t('backToTop')}
                <span className="flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors group-hover/top:border-primary group-hover/top:bg-primary group-hover/top:text-primary-foreground">
                  <ArrowUp className="size-4 transition-transform group-hover/top:-translate-y-0.5" />
                </span>
              </button>
            </TimelineAnimation>
          </div>
        </SectionWrapper>
      </div>
    </footer>
  );
}
