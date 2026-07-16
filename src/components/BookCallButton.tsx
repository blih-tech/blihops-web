'use client';

import { useEffect, type MouseEventHandler, type ReactNode } from 'react';
import { getCalApi } from '@calcom/embed-react';
import { useTranslations } from 'next-intl';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

type BookCallButtonProps = {
  calLink: string;
  namespace?: string;
  children?: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
};

export function BookCallButton({
  calLink,
  namespace = 'discovery-call',
  children,
  className,
  onClick,
}: BookCallButtonProps) {
  const t = useTranslations('Shared.actions');

  useEffect(() => {
    async function configureCal() {
      const cal = await getCalApi({ namespace });

      cal('ui', {
        theme: 'light',
        cssVarsPerTheme: {
          light: { 'cal-brand': '#375fef' },
          dark: { 'cal-brand': '#4340f5' },
        },
        hideEventTypeDetails: true,
        layout: 'month_view',
      });
      cal('preload', { calLink, type: 'modal' });
    }

    void configureCal();
  }, [calLink, namespace]);

  return (
    <Button
      type="button"
      size="lg"
      data-cal-namespace={namespace}
      data-cal-link={calLink}
      data-cal-config='{"layout":"month_view","useSlotsViewOnSmallScreen":"true","theme":"light"}'
      onClick={onClick}
      className={cn(
        'h-12 cursor-pointer rounded-none bg-foreground px-5 text-background hover:bg-primary hover:text-primary-foreground',
        className,
      )}
    >
      {children ?? t('bookCall')}
    </Button>
  );
}
