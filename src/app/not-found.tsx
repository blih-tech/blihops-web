import Link from 'next/link';

import { buttonVariants } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <main className="flex min-h-screen flex-col items-center justify-center bg-background px-4 py-20 text-foreground sm:px-6">
          <div className="relative flex w-full max-w-lg flex-col items-center text-center">
            <p
              aria-hidden
              className="mb-4 font-heading text-7xl font-semibold tracking-tighter text-muted-foreground/20 md:text-8xl"
            >
              404
            </p>
            <h1 className="font-heading text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
              Page not found
            </h1>
            <p className="mt-3 max-w-sm font-sans text-sm leading-relaxed text-muted-foreground md:text-base">
              That route doesn&apos;t exist or it moved.
            </p>
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: 'lg' }),
                'mt-8 hover:bg-primary',
              )}
            >
              Go home
            </Link>
          </div>
        </main>
      </body>
    </html>
  );
}
