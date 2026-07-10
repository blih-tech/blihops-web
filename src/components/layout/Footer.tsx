'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, ArrowUp, Mail } from 'lucide-react';
import type { Variants } from 'motion/react';

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
  const ctaRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

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
              <h2 className="mb-3 max-w-2xl text-3xl font-semibold tracking-tight text-primary-foreground sm:text-4xl md:text-5xl">
                Ready to get relief from operational overwhelm?
              </h2>
              <p className="mb-6 max-w-xl text-sm text-primary-foreground/90 sm:text-base">
                Free 2-week pilot. Clear deliverables. Prove value before you
                commit.
              </p>
              <Link
                href="/pilot"
                className={cn(
                  buttonVariants({ size: 'lg' }),
                  'group/cta w-fit gap-3 bg-primary hover:bg-primary',
                )}
              >
                Get free pilot
                <span className="flex size-7 items-center justify-center rounded-md bg-primary-foreground text-primary">
                  <ArrowRight className="size-4 transition-transform group-hover/cta:translate-x-0.5" />
                </span>
              </Link>
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
                      <SocialIcon label="GitHub" href="#">
                        <svg
                          viewBox="0 0 24 24"
                          className="size-4 fill-current"
                          aria-hidden
                        >
                          <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2.1c-3.3.7-4-1.6-4-1.6-.5-1.3-1.3-1.7-1.3-1.7-1.1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-6 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.1 0 0 1-.3 3.3 1.2a11.4 11.4 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.6.2 2.8.1 3.1.8.8 1.2 1.9 1.2 3.2 0 4.7-2.8 5.7-5.5 6 .4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
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
                      <SocialIcon label="Email" href="mailto:hello@blihops.com">
                        <Mail className="size-4" />
                      </SocialIcon>
                    </TimelineAnimation>
                  </div>
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
                <h3 className="text-base font-medium text-foreground">
                  Stay ahead of operational chaos
                </h3>
                <p className="max-w-md text-sm text-muted-foreground lg:ml-auto">
                  Tips on outsourcing, SLAs, and scaling ops with AI delivered
                  straight to your inbox.
                </p>
                <div className="relative max-w-md lg:ml-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full rounded-md border border-border bg-background px-4 py-2.5 pr-12 text-sm text-foreground placeholder:text-muted-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30"
                  />
                  <button
                    type="button"
                    aria-label="Subscribe"
                    className="absolute top-1/2 right-1.5 flex size-8 -translate-y-1/2 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/80"
                  >
                    <ArrowRight className="size-4" />
                  </button>
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
