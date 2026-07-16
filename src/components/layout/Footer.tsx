'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, ArrowUp } from 'lucide-react';
import type { Variants } from 'motion/react';

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
  { label: 'Services', href: '/what-we-offer' },
  { label: 'Process', href: '/how-we-work' },
  { label: 'About', href: '/who-we-are' },
  { label: 'Careers', href: '/careers' },
  { label: 'Insights', href: '/insights' },
  { label: 'Contact', href: '/contact' },
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
      className="flex size-10 items-center justify-center rounded-md border border-border bg-background text-foreground transition-colors hover:border-primary hover:bg-muted hover:text-primary"
    >
      {children}
    </a>
  );
}

export function Footer() {
  const pathname = usePathname();
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const isPilotPage = pathname === '/pilot';
  const isContactPage = pathname === '/contact';
  const isSkillsPage = pathname === '/skills';
  const isTalentPage = pathname === '/talent';

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
            className="group relative h-80 overflow-hidden rounded-2xl border border-border bg-card shadow-lg md:h-96"
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
            <div className="absolute inset-0 flex flex-col justify-center p-8 sm:p-12 md:p-16">
              <h2 className="font-heading mb-3 max-w-2xl text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
                {isPilotPage
                  ? 'Not ready to apply? Let’s talk it through.'
                  : isSkillsPage
                    ? 'Ready to build skills that lead somewhere?'
                    : isTalentPage
                      ? 'Ready to make your verified skills visible?'
                      : 'Ready to get relief from operational overwhelm?'}
              </h2>
              <p className="font-sans mb-6 max-w-xl text-sm text-primary-foreground/90 sm:text-base">
                {isPilotPage
                  ? 'Book a discovery call to discuss your workflow, questions, and fit.'
                  : isSkillsPage
                    ? 'Explore practical tracks, complete assessments, and prepare for BlihOps talent opportunities.'
                    : isTalentPage
                      ? 'Join the pool and hear from us when there is a relevant match. Placement is not guaranteed.'
                      : 'A focused 2-week pilot. Clear deliverables. Prove value before you commit.'}
              </p>
              {isPilotPage ? (
                <BookCallButton
                  calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
                  namespace="blih-ops-desicovery-call"
                  className="w-fit bg-primary text-primary-foreground hover:bg-primary/90"
                />
              ) : isSkillsPage ? (
                <a
                  href="https://skills.blihops.com"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group/cta w-fit gap-3 bg-primary hover:bg-primary',
                  )}
                >
                  Explore BlihOps Skills
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground text-primary">
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </span>
                </a>
              ) : isTalentPage ? (
                <a
                  href="https://talent.blihops.com"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group/cta w-fit gap-3 bg-primary hover:bg-primary',
                  )}
                >
                  Explore BlihOps Talent
                  <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground text-primary">
                    <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                  </span>
                </a>
              ) : (
                <Link
                  href="/pilot"
                  className={cn(
                    buttonVariants({ size: 'lg' }),
                    'group/cta w-fit gap-3 bg-primary hover:bg-primary',
                  )}
                >
                  Get a 2-week pilot
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
                    Connect
                  </TimelineAnimation>
                  <div className="flex flex-wrap gap-3">
                    <TimelineAnimation
                      as="div"
                      animationNum={2}
                      timelineRef={contentRef}
                      once={false}
                      customVariants={footerMotionVariants}
                    >
                      <SocialIcon label="Facebook" href="#">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M24 12.1C24 5.4 18.6 0 12 0S0 5.4 0 12.1C0 18.1 4.4 23 10.1 24v-8.4h-3v-3.5h3V9.4c0-3 1.8-4.7 4.6-4.7 1.3 0 2.7.2 2.7.2v3h-1.5c-1.5 0-2 .9-2 1.9v2.3h3.3l-.5 3.5h-2.8V24C19.6 23 24 18.1 24 12.1z" />
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
                      <SocialIcon label="X" href="#">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M18.9 2H22l-6.8 7.8L23 22h-6.2l-4.9-6.4L6.3 22H3.2l7.3-8.3L1 2h6.4l4.4 5.8L18.9 2zm-1.1 18h1.7L6.3 3.9H4.5L17.8 20z" />
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
                      <SocialIcon label="LinkedIn" href="#">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5zM3.5 9h3v12h-3V9zm6 0h2.9v1.6h.1c.4-.8 1.5-1.7 3-1.7 3.2 0 3.8 2.1 3.8 4.8V21h-3v-6.5c0-1.5 0-3.5-2.1-3.5s-2.4 1.7-2.4 3.4V21h-3V9z" />
                        </svg>
                      </SocialIcon>
                    </TimelineAnimation>
                    <TimelineAnimation
                      as="div"
                      animationNum={5}
                      timelineRef={contentRef}
                      once={false}
                      customVariants={footerMotionVariants}
                    >
                      <SocialIcon label="YouTube" href="#">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.6V8.4l6.3 3.6-6.3 3.6z" />
                        </svg>
                      </SocialIcon>
                    </TimelineAnimation>
                  </div>
                  <TimelineAnimation
                    as="div"
                    animationNum={6}
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
                  {isPilotPage
                    ? 'Prefer a conversation first?'
                    : isSkillsPage
                      ? 'Build skill. Show evidence.'
                      : isTalentPage
                        ? 'Be ready when the fit is right.'
                        : isContactPage
                          ? 'Ready to prove the workflow?'
                          : 'Choose how you want to begin'}
                </h3>
                <p className="font-sans max-w-md text-sm text-muted-foreground lg:ml-auto">
                  {isPilotPage
                    ? 'Book a discovery call and we’ll help clarify the right next step.'
                    : isSkillsPage
                      ? 'Choose a practical track and start building verified, opportunity-ready ability.'
                      : isTalentPage
                        ? 'Keep your verified profile current so relevant opportunities can find you.'
                        : isContactPage
                          ? 'Start with one focused process and clear success measures.'
                          : 'Test one workflow or talk through your operational needs first.'}
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
                      Explore BlihOps Skills
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
                      Explore BlihOps Talent
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
                      Get a 2-week pilot
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
              aria-label="Footer"
              className="grid grid-cols-2 gap-4 border-t border-border py-8 text-sm font-medium text-muted-foreground sm:grid-cols-3 lg:grid-cols-6"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
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
                BlihOps
              </span>
              <span className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} BlihOps. All rights reserved.
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
                Back to top
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
