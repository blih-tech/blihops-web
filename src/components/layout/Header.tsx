'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  ArrowRight,
  Building2,
  ChevronDown,
  Lightbulb,
  Menu,
  Newspaper,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { BookCallButton } from '@/components/BookCallButton';
import { AboutUsMegaMenu } from '@/components/layout/AboutUsMegaMenu';
import { Logo } from '@/components/layout/Logo';
import { MegaMenu, type MegaMenuLink } from '@/components/layout/MegaMenu';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const primaryLinks = [
  { id: 'services', name: 'Services', href: '/what-we-offer' },
  { id: 'process', name: 'Process', href: '/how-we-work' },
] as const;

const trailingLinks = [
  { id: 'careers', name: 'Careers', href: '/careers' },
  { id: 'skills', name: 'Skills', href: '/skills' },
  { id: 'talent', name: 'Talent', href: '/talent' },
] as const;

const aboutHrefs = ['/who-we-are', '/case-studies', '/insights'] as const;

function isRouteActive(pathname: string, href: string) {
  return pathname === href || pathname.startsWith(`${href}/`);
}

const navItemClass =
  'relative z-10 rounded-md px-3.5 py-1.5 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground';

const highlightTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

function NavHighlight() {
  return (
    <motion.span
      layoutId="header-nav-highlight"
      className="absolute inset-0 -z-0 rounded-md border border-border bg-muted/50"
      transition={highlightTransition}
      aria-hidden
    />
  );
}

const whoWeAreLinks: MegaMenuLink[] = [
  {
    text: 'Who we are',
    shortDescription:
      'Learn about our mission, values, and the team driving engineering excellence at BlihOps.',
    href: '/who-we-are',
    icon: Building2,
    preview: <AboutUsMegaMenu />,
  },
  {
    text: 'Case studies',
    shortDescription:
      'Real outcomes from engineering partnerships and delivery work.',
    href: '/case-studies',
    icon: Newspaper,
    preview: (
      <AboutUsMegaMenu
        title="Case studies"
        description="Real challenges, focused teams, and clear operational progress."
      />
    ),
  },
  {
    text: 'Latest insights',
    shortDescription: 'Ideas and perspectives on building software that lasts.',
    href: '/insights',
    icon: Lightbulb,
    preview: (
      <AboutUsMegaMenu
        title="Latest insights"
        description="Practical thinking on automation, quality, reporting, and delivery."
      />
    ),
  },
];

export function Header() {
  const pathname = usePathname();
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const whoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const routeActiveId =
    primaryLinks.find((link) => isRouteActive(pathname, link.href))?.id ??
    trailingLinks.find((link) => isRouteActive(pathname, link.href))?.id ??
    (aboutHrefs.some((href) => isRouteActive(pathname, href)) ? 'about' : null);

  // Hover wins while interacting; otherwise keep highlight on the current route
  const activeNavId = whoOpen
    ? (hoveredNavId ?? 'about')
    : (hoveredNavId ?? routeActiveId);

  const clearWhoCloseTimer = useCallback(() => {
    if (whoCloseTimer.current) {
      clearTimeout(whoCloseTimer.current);
      whoCloseTimer.current = null;
    }
  }, []);

  const openWho = useCallback(() => {
    clearWhoCloseTimer();
    setWhoOpen(true);
    setHoveredNavId('about');
  }, [clearWhoCloseTimer]);

  const scheduleCloseWho = useCallback(() => {
    clearWhoCloseTimer();
    whoCloseTimer.current = setTimeout(() => setWhoOpen(false), 120);
  }, [clearWhoCloseTimer]);

  const closeAll = useCallback(() => {
    clearWhoCloseTimer();
    setWhoOpen(false);
    setMobileOpen(false);
    setMobileWhoOpen(false);
    setHoveredNavId(null);
  }, [clearWhoCloseTimer]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeAll();
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [closeAll]);

  useEffect(() => {
    return () => clearWhoCloseTimer();
  }, [clearWhoCloseTimer]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  return (
    <header
      ref={headerRef}
      className="sticky top-0 z-50 border-border bg-background"
    >
      <SectionWrapper className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="Blihop homepage"
          onClick={closeAll}
        >
          <Logo priority className="h-8 w-auto" />
        </Link>

        <nav
          className="relative hidden items-center rounded-md border border-border bg-transparent p-1 md:flex"
          aria-label="Primary"
          onMouseLeave={() => {
            if (!whoOpen) setHoveredNavId(null);
          }}
        >
          {primaryLinks.map((link) => {
            const isActive = activeNavId === link.id;
            const isCurrent = routeActiveId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(navItemClass, isActive && 'text-foreground')}
                onMouseEnter={() => setHoveredNavId(link.id)}
                onFocus={() => setHoveredNavId(link.id)}
              >
                {isActive ? <NavHighlight /> : null}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}

          <div
            className="relative"
            onMouseEnter={openWho}
            onMouseLeave={scheduleCloseWho}
          >
            <button
              type="button"
              aria-expanded={whoOpen}
              aria-controls={menuId}
              aria-haspopup="true"
              aria-current={routeActiveId === 'about' ? 'page' : undefined}
              onFocus={openWho}
              onMouseEnter={() => setHoveredNavId('about')}
              className={cn(
                'inline-flex items-center gap-1',
                navItemClass,
                activeNavId === 'about' && 'text-foreground',
              )}
            >
              {activeNavId === 'about' ? <NavHighlight /> : null}
              <span className="relative z-10 inline-flex items-center gap-1">
                About
                <ChevronDown
                  className={cn(
                    'size-3.5 transition-transform duration-200',
                    whoOpen && 'rotate-180',
                  )}
                />
              </span>
            </button>

            <AnimatePresence>
              {whoOpen ? (
                <motion.div
                  key="about-mega-menu"
                  className="absolute left-1/2 top-full z-50 mt-3 -translate-x-1/2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
                >
                  <MegaMenu
                    id={menuId}
                    label="About menu"
                    links={whoWeAreLinks}
                    onNavigate={() => setWhoOpen(false)}
                    additionalLink={{ href: '/contact', label: 'Contact' }}
                  />
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>

          {trailingLinks.map((link) => {
            const isActive = activeNavId === link.id;
            const isCurrent = routeActiveId === link.id;
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isCurrent ? 'page' : undefined}
                className={cn(navItemClass, isActive && 'text-foreground')}
                onMouseEnter={() => setHoveredNavId(link.id)}
                onFocus={() => setHoveredNavId(link.id)}
              >
                {isActive ? <NavHighlight /> : null}
                <span className="relative z-10">{link.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <BookCallButton
            calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
            namespace="blih-ops-desicovery-call"
            className="hidden h-8 rounded-md border border-border bg-background px-3 text-foreground hover:bg-muted hover:text-foreground xl:inline-flex"
          />
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'group/cta hidden sm:inline-flex',
            )}
          >
            Get a 2-week pilot
            <ArrowRight
              className="size-3.5 transition-transform group-hover/cta:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground md:hidden"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => {
              setMobileOpen((v) => !v);
              setWhoOpen(false);
            }}
          >
            {mobileOpen ? (
              <X className="size-5" />
            ) : (
              <Menu className="size-5" />
            )}
          </button>
        </div>
      </SectionWrapper>

      {mobileOpen ? (
        <div className="border-t border-border bg-background md:hidden">
          <SectionWrapper
            as="nav"
            className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-3"
            data-lenis-prevent
            aria-label="Mobile"
          >
            {primaryLinks.map((link) => {
              const isCurrent = routeActiveId === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'border-b border-border py-3.5 text-sm font-semibold',
                    isCurrent
                      ? 'bg-muted/50 text-foreground'
                      : 'text-foreground',
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="border-b border-border">
              <button
                type="button"
                aria-expanded={mobileWhoOpen}
                aria-current={routeActiveId === 'about' ? 'page' : undefined}
                onClick={() => setMobileWhoOpen((v) => !v)}
                className={cn(
                  'flex w-full items-center justify-between py-3.5 text-sm font-semibold text-foreground',
                  routeActiveId === 'about' && 'bg-muted/50',
                )}
              >
                About
                <ChevronDown
                  className={cn(
                    'size-4 transition-transform',
                    mobileWhoOpen && 'rotate-180',
                  )}
                />
              </button>
              {mobileWhoOpen ? (
                <div className="flex flex-col gap-1 pb-3 pl-2">
                  {whoWeAreLinks.map((item) => {
                    const isCurrent = isRouteActive(pathname, item.href);
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={closeAll}
                        aria-current={isCurrent ? 'page' : undefined}
                        className={cn(
                          'rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-muted hover:text-foreground',
                          isCurrent
                            ? 'bg-muted text-foreground'
                            : 'text-muted-foreground',
                        )}
                      >
                        {item.text}
                      </Link>
                    );
                  })}
                </div>
              ) : null}
            </div>

            {trailingLinks.map((link) => {
              const isCurrent = routeActiveId === link.id;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={closeAll}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={cn(
                    'border-b border-border py-3.5 text-sm font-semibold',
                    isCurrent
                      ? 'bg-muted/50 text-foreground'
                      : 'text-foreground',
                  )}
                >
                  {link.name}
                </Link>
              );
            })}

            <div className="space-y-2 pt-4 pb-2">
              <Link
                href="/pilot"
                onClick={closeAll}
                className={cn(buttonVariants(), 'group/cta w-full')}
              >
                Get a 2-week pilot
                <ArrowRight
                  className="size-4 transition-transform group-hover/cta:translate-x-0.5"
                  aria-hidden="true"
                />
              </Link>
              <BookCallButton
                calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
                namespace="blih-ops-desicovery-call"
                onClick={closeAll}
                className="w-full border border-border bg-background text-foreground hover:bg-muted hover:text-foreground"
              />
            </div>
          </SectionWrapper>
        </div>
      ) : null}
    </header>
  );
}
