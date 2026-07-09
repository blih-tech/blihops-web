'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import {
  Building2,
  ChevronDown,
  Lightbulb,
  Menu,
  Newspaper,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

import { Logo } from '@/components/layout/Logo';
import { MegaMenu, type MegaMenuLink } from '@/components/layout/MegaMenu';
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

function PreviewPanel({ className }: { className: string }) {
  return (
    <div className={`size-full min-h-36 rounded-xl ${className}`} aria-hidden />
  );
}

const whoWeAreLinks: MegaMenuLink[] = [
  {
    text: 'Who we are',
    shortDescription:
      'Learn about our mission, values, and the team driving engineering excellence at BlihOps.',
    href: '/who-we-are',
    icon: Building2,
    preview: <PreviewPanel className="bg-primary" />,
  },
  {
    text: 'Case studies',
    shortDescription:
      'Real outcomes from engineering partnerships and delivery work.',
    href: '/case-studies',
    icon: Newspaper,
    preview: <PreviewPanel className="bg-chart-2" />,
  },
  {
    text: 'Latest insights',
    shortDescription: 'Ideas and perspectives on building software that lasts.',
    href: '/insights',
    icon: Lightbulb,
    preview: <PreviewPanel className="bg-chart-4" />,
  },
];

export function Header() {
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const whoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const activeNavId = whoOpen ? (hoveredNavId ?? 'about') : hoveredNavId;

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
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
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
          {primaryLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                navItemClass,
                activeNavId === link.id && 'text-foreground',
              )}
              onMouseEnter={() => setHoveredNavId(link.id)}
              onFocus={() => setHoveredNavId(link.id)}
            >
              {activeNavId === link.id ? <NavHighlight /> : null}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}

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

          {trailingLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                navItemClass,
                activeNavId === link.id && 'text-foreground',
              )}
              onMouseEnter={() => setHoveredNavId(link.id)}
              onFocus={() => setHoveredNavId(link.id)}
            >
              {activeNavId === link.id ? <NavHighlight /> : null}
              <span className="relative z-10">{link.name}</span>
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'hidden sm:inline-flex',
            )}
          >
            Get free pilot
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
      </div>

      {mobileOpen ? (
        <div className="border-t border-border bg-background md:hidden">
          <nav
            className="mx-auto flex max-h-[calc(100dvh-4rem)] max-w-6xl flex-col overflow-y-auto px-4 py-3 sm:px-6"
            aria-label="Mobile"
          >
            {primaryLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="border-b border-border py-3.5 text-sm font-semibold text-foreground"
              >
                {link.name}
              </Link>
            ))}

            <div className="border-b border-border">
              <button
                type="button"
                aria-expanded={mobileWhoOpen}
                onClick={() => setMobileWhoOpen((v) => !v)}
                className="flex w-full items-center justify-between py-3.5 text-sm font-semibold text-foreground"
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
                  {whoWeAreLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={closeAll}
                      className="rounded-lg px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                    >
                      {item.text}
                    </Link>
                  ))}
                </div>
              ) : null}
            </div>

            {trailingLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeAll}
                className="border-b border-border py-3.5 text-sm font-semibold text-foreground"
              >
                {link.name}
              </Link>
            ))}

            <div className="pt-4 pb-2">
              <Link
                href="/pilot"
                onClick={closeAll}
                className={cn(buttonVariants(), 'w-full')}
              >
                Get free pilot
              </Link>
            </div>
          </nav>
        </div>
      ) : null}
    </header>
  );
}
