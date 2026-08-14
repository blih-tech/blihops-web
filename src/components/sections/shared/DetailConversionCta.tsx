import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

import { BookCallButton } from '@/components/BookCallButton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export async function DetailConversionCta() {
  const t = await getTranslations('Shared.detailCta');

  return (
    <section
      className="grid gap-8 border-t border-border py-12 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-16 md:py-16"
      aria-label={t('ariaLabel')}
    >
      <div>
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          {t('eyebrow')}
        </p>
        <h2 className="mt-5 max-w-md font-heading text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          {t('title')}
        </h2>
      </div>

      <div>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          {t('description')}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <BookCallButton
            calLink="yonatane-mk-sa4cic/discovery-call"
            namespace="discovery-call"
            className="h-10 rounded-md border border-border bg-background px-4 text-foreground hover:bg-muted hover:text-foreground"
          />
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group/cta bg-primary hover:bg-primary',
            )}
          >
            {t('pilotCta')}
            <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
