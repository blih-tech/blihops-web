'use client';

import { useCallback, useEffect, useId, useRef, useState } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import {
  ArrowRight,
  ChevronDown,
  Lightbulb,
  Menu,
  Newspaper,
  Users,
  X,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useTranslations } from 'next-intl';

import { BookCallButton } from '@/components/BookCallButton';
import { AboutUsMegaMenu } from '@/components/layout/AboutUsMegaMenu';
import { LocaleSwitcher } from '@/components/layout/LocaleSwitcher';
import { Logo } from '@/components/layout/Logo';
import { MegaMenu, type MegaMenuLink } from '@/components/layout/MegaMenu';
import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const primaryLinks = [
  { id: 'services', href: '/what-we-offer' },
  { id: 'process', href: '/how-we-work' },
] as const;

const trailingLinks = [
  { id: 'careers', href: '/careers' },
  { id: 'skills', href: '/skills' },
  { id: 'talent', href: '/talent' },
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

export function Header() {
  const pathname = usePathname();
  const t = useTranslations('Shared.header');
  const tActions = useTranslations('Shared.actions');
  const [whoOpen, setWhoOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileWhoOpen, setMobileWhoOpen] = useState(false);
  const [hoveredNavId, setHoveredNavId] = useState<string | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const whoCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const menuId = useId();

  const whoWeAreLinks: MegaMenuLink[] = [
    {
      text: t('aboutMenu.whoWeAre.label'),
      shortDescription: t('aboutMenu.whoWeAre.description'),
      href: '/who-we-are',
      icon: Users,
      preview: <AboutUsMegaMenu />,
    },
    {
      text: t('aboutMenu.caseStudies.label'),
      shortDescription: t('aboutMenu.caseStudies.description'),
      href: '/case-studies',
      icon: Newspaper,
      preview: (
        <AboutUsMegaMenu
          title={t('aboutMenu.caseStudies.label')}
          description={t('aboutMenu.caseStudies.previewDescription')}
        />
      ),
    },
    {
      text: t('aboutMenu.insights.label'),
      shortDescription: t('aboutMenu.insights.description'),
      href: '/insights',
      icon: Lightbulb,
      preview: (
        <AboutUsMegaMenu
          title={t('aboutMenu.insights.label')}
          description={t('aboutMenu.insights.previewDescription')}
        />
      ),
    },
  ];

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
          aria-label={t('homeAriaLabel')}
          onClick={closeAll}
        >
          <Logo priority className="h-8 w-auto" />
        </Link>

        <nav
          className="relative hidden items-center rounded-md border border-border bg-transparent p-1 lg:flex"
          aria-label={t('primaryNavAriaLabel')}
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
                <span className="relative z-10">{t(`links.${link.id}`)}</span>
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
                {t('links.about')}
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
                    label={t('aboutMenu.ariaLabel')}
                    links={whoWeAreLinks}
                    onNavigate={() => setWhoOpen(false)}
                    additionalLink={{
                      href: '/contact',
                      label: t('aboutMenu.contact'),
                    }}
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
                <span className="relative z-10">{t(`links.${link.id}`)}</span>
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <LocaleSwitcher />
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'sm' }),
              'group/cta hidden sm:inline-flex',
            )}
          >
            {tActions('getPilot')}
            <ArrowRight
              className="size-3.5 transition-transform group-hover/cta:translate-x-0.5"
              aria-hidden="true"
            />
          </Link>

          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-md border border-border bg-background text-foreground lg:hidden"
            aria-label={
              mobileOpen ? t('closeMenuAriaLabel') : t('openMenuAriaLabel')
            }
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
        <div className="border-t border-border bg-background lg:hidden">
          <SectionWrapper
            as="nav"
            className="flex max-h-[calc(100dvh-4rem)] flex-col overflow-y-auto py-3"
            data-lenis-prevent
            aria-label={t('mobileNavAriaLabel')}
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
                  {t(`links.${link.id}`)}
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
                {t('links.about')}
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
                  {t(`links.${link.id}`)}
                </Link>
              );
            })}

            <div className="space-y-2 pt-4 pb-2">
              <Link
                href="/pilot"
                onClick={closeAll}
                className={cn(buttonVariants(), 'group/cta w-full')}
              >
                {tActions('getPilot')}
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
