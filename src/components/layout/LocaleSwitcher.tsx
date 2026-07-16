'use client';

import { useTransition } from 'react';
import { useLocale, useTranslations } from 'next-intl';

import { usePathname, useRouter } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';
import { cn } from '@/lib/utils';

type Locale = (typeof routing.locales)[number];

const localeOptions = [
  { locale: 'en', code: 'EN', nameKey: 'english' },
  { locale: 'de', code: 'DE', nameKey: 'german' },
] as const;

function CountryIcon({ locale }: { locale: Locale }) {
  if (locale === 'de') {
    return (
      <svg viewBox="0 0 24 16" className="h-3 w-[18px]" aria-hidden>
        <path fill="#18181b" d="M0 0h24v5.34H0z" />
        <path fill="#dc2626" d="M0 5.33h24v5.34H0z" />
        <path fill="#facc15" d="M0 10.66h24V16H0z" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 16" className="h-3 w-[18px]" aria-hidden>
      <path fill="#fff" d="M0 0h24v16H0z" />
      <path
        fill="#dc2626"
        d="M0 0h24v2H0zm0 4h24v2H0zm0 4h24v2H0zm0 4h24v2H0z"
      />
      <path fill="#1d4ed8" d="M0 0h10v8H0z" />
      <path
        fill="#fff"
        d="M2 1h1v1H2zm3 0h1v1H5zm3 0h1v1H8zM3.5 3h1v1h-1zm3 0h1v1h-1zM2 5h1v1H2zm3 0h1v1H5zm3 0h1v1H8z"
      />
    </svg>
  );
}

export function LocaleSwitcher({ className }: { className?: string }) {
  const currentLocale = useLocale();
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('Shared.localeSelector');
  const [isPending, startTransition] = useTransition();

  function changeLocale(locale: Locale) {
    if (locale === currentLocale) return;

    startTransition(() => {
      router.replace(pathname, { locale });
    });
  }

  return (
    <div
      role="group"
      aria-label={t('label')}
      className={cn(
        'flex h-8 items-center rounded-md border border-border bg-background p-0.5',
        isPending && 'opacity-60',
        className,
      )}
    >
      {localeOptions.map((option) => {
        const isActive = option.locale === currentLocale;
        const language = t(`locales.${option.nameKey}`);

        return (
          <button
            key={option.locale}
            type="button"
            aria-label={
              isActive
                ? t('current', { language })
                : t('switchTo', { language })
            }
            aria-pressed={isActive}
            disabled={isPending || isActive}
            onClick={() => changeLocale(option.locale)}
            className={cn(
              'inline-flex h-6 items-center gap-1.5 rounded-sm px-2 text-[11px] font-semibold transition-colors',
              isActive
                ? 'bg-foreground text-background'
                : 'text-muted-foreground hover:bg-muted hover:text-foreground',
            )}
          >
            <CountryIcon locale={option.locale} />
            <span>{option.code}</span>
          </button>
        );
      })}
    </div>
  );
}
