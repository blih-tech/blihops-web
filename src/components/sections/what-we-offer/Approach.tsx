import { Link } from '@/i18n/navigation';
import { CornerDownRightIcon } from 'lucide-react';
import { useTranslations } from 'next-intl';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const steps = [
  {
    step: '01',
    key: 'processFirst',
  },
  {
    step: '02',
    key: 'aiWhereItCounts',
  },
  {
    step: '03',
    key: 'dedicatedPods',
  },
  {
    step: '04',
    key: 'fullVisibility',
  },
] as const;

type ApproachProps = {
  className?: string;
};

export function Approach({ className }: ApproachProps) {
  const t = useTranslations('ServicesPage.approach');
  const tActions = useTranslations('Shared.actions');

  return (
    <section
      className={cn('w-full py-16 md:py-24', className)}
      aria-label={t('ariaLabel')}
    >
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-6 lg:gap-16">
        <div className="col-span-2 h-fit space-y-5 lg:sticky lg:top-28">
          <p className="font-sans text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {t('eyebrow')}
          </p>
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t('title')}
          </h2>
          <p className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
            {t('description')}
          </p>
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'h-auto gap-2 px-0 font-sans text-sm font-medium text-foreground hover:bg-transparent hover:text-primary',
            )}
          >
            <CornerDownRightIcon className="size-4 text-primary" />
            {tActions('getFreePilot')}
          </Link>
        </div>

        <ul className="relative col-span-4 w-full">
          {steps.map((item) => (
            <li
              key={item.step}
              className="relative flex flex-col gap-6 border-t border-border py-8 md:flex-row md:gap-10 md:py-10"
            >
              <CornerMark className="absolute top-6 right-0 text-primary md:top-8" />
              <div className="flex size-12 shrink-0 items-center justify-center border border-border bg-muted font-mono text-sm font-medium tracking-tight text-foreground">
                {item.step}
              </div>
              <div className="min-w-0 flex-1 pr-8">
                <h3 className="mb-3 font-heading text-xl font-semibold tracking-tight text-foreground md:text-2xl">
                  {t(`steps.${item.key}.title`)}
                </h3>
                <p className="font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
                  {t(`steps.${item.key}.description`)}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CornerMark({ className }: { className?: string }) {
  return (
    <svg
      width="22"
      height="20"
      viewBox="0 0 22 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      <line
        x1="0.6"
        y1="2.57"
        x2="21.58"
        y2="2.57"
        stroke="currentColor"
        strokeWidth="3"
      />
      <line
        x1="19.58"
        y1="19.62"
        x2="19.58"
        y2="4.57"
        stroke="currentColor"
        strokeWidth="3"
      />
    </svg>
  );
}
