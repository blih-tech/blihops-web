import { Link } from '@/i18n/navigation';
import { ArrowRightIcon } from 'lucide-react';

import { BookCallButton } from '@/components/BookCallButton';
import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export function DetailConversionCta() {
  return (
    <section
      className="grid gap-8 border-t border-border py-12 md:grid-cols-[0.85fr_1.15fr] md:items-end md:gap-16 md:py-16"
      aria-label="Work with Blih Ops"
    >
      <div>
        <p className="font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase">
          Your operation, next
        </p>
        <h2 className="mt-5 max-w-md font-heading text-3xl leading-[1.05] font-semibold tracking-[-0.03em] text-foreground sm:text-4xl">
          Ready to make the work easier to run?
        </h2>
      </div>

      <div>
        <p className="max-w-lg text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
          Talk through the opportunity or test one focused workflow with clear
          success measures.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <BookCallButton
            calLink="blih-marketing-fzifjy/blih-ops-desicovery-call"
            namespace="blih-ops-desicovery-call"
            className="h-10 rounded-md border border-border bg-background px-4 text-foreground hover:bg-muted hover:text-foreground"
          />
          <Link
            href="/pilot"
            className={cn(
              buttonVariants({ size: 'lg' }),
              'group/cta bg-primary hover:bg-primary',
            )}
          >
            Get a 2-week pilot
            <ArrowRightIcon className="transition-transform group-hover/cta:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
