'use client';

import {
  useState,
  type ComponentType,
  type ReactNode,
  type SVGProps,
} from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

import { cn } from '@/lib/utils';

export type MegaMenuIcon = ComponentType<SVGProps<SVGSVGElement>>;

export type MegaMenuLink = {
  text: string;
  shortDescription: string;
  href: string;
  icon: MegaMenuIcon;
  /** Content shown on the right when this link is active / hovered */
  preview?: ReactNode;
};

export type MegaMenuAdditionalLink = {
  href: string;
  label: string;
};

export type MegaMenuProps = {
  links: MegaMenuLink[];
  id?: string;
  label?: string;
  onNavigate?: () => void;
  additionalLink?: MegaMenuAdditionalLink;
  className?: string;
};

const highlightTransition = {
  type: 'spring' as const,
  stiffness: 400,
  damping: 30,
};

function DefaultPreview() {
  return (
    <div className="size-full min-h-36 rounded-xl bg-primary" aria-hidden />
  );
}

export function MegaMenu({
  links,
  id,
  label = 'Menu',
  onNavigate,
  additionalLink,
  className,
}: MegaMenuProps) {
  const [activeHref, setActiveHref] = useState(links[0]?.href ?? '');
  const active =
    links.find((link) => link.href === activeHref) ?? links[0] ?? null;

  if (links.length === 0) return null;

  return (
    <div
      id={id}
      role="region"
      aria-label={label}
      className={cn(
        'w-[min(42rem,calc(100vw-2rem))] min-w-[26rem] overflow-hidden rounded-2xl border border-border bg-background shadow-lg',
        className,
      )}
    >
      <div className="grid sm:grid-cols-[1.15fr_0.85fr]">
        <div className="flex flex-col p-2">
          <ul className="relative space-y-0.5">
            {links.map((link) => {
              const Icon = link.icon;
              const isActive = link.href === active?.href;

              return (
                <li key={link.href} className="relative">
                  <Link
                    href={link.href}
                    onClick={onNavigate}
                    onMouseEnter={() => setActiveHref(link.href)}
                    onFocus={() => setActiveHref(link.href)}
                    className="relative z-10 flex items-center gap-3 rounded-xl p-2.5"
                  >
                    {isActive ? (
                      <motion.span
                        layoutId="mega-menu-highlight"
                        className="absolute inset-0 -z-0 rounded-xl border border-border bg-muted/60"
                        transition={highlightTransition}
                        aria-hidden
                      />
                    ) : null}
                    <span className="relative z-10 flex size-9 shrink-0 items-center justify-center rounded-lg border border-border bg-muted/60 text-foreground">
                      <Icon className="size-4" />
                    </span>
                    <span className="relative z-10 min-w-0">
                      <span className="block text-sm font-semibold text-foreground">
                        {link.text}
                      </span>
                      <span className="mt-0.5 block text-xs leading-relaxed text-muted-foreground">
                        {link.shortDescription}
                      </span>
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {additionalLink ? (
            <Link
              href={additionalLink.href}
              onClick={onNavigate}
              className="group/additional mt-1 inline-flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground hover:underline"
            >
              {additionalLink.label}
              <ArrowRight className="size-3.5 transition-transform group-hover/additional:translate-x-1" />
            </Link>
          ) : null}
        </div>

        <div className="hidden border-l border-border bg-muted/30 p-3.5 sm:block">
          <div className="flex h-full min-h-36 items-stretch justify-stretch">
            {active?.preview ?? <DefaultPreview />}
          </div>
        </div>
      </div>
    </div>
  );
}
