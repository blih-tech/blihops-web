import { getTranslations, setRequestLocale } from 'next-intl/server';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CompleteProfileForm } from '@/components/sections/talent-complete-profile/CompleteProfileForm';
import { createGenerateMetadata } from '@/i18n/metadata';

export const generateMetadata = createGenerateMetadata(
  'talentCompleteProfile',
  '/talent/complete-profile',
);

export default async function TalentCompleteProfilePage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  const token = typeof sp.token === 'string' ? sp.token : Array.isArray(sp.token) ? sp.token[0] : null;
  setRequestLocale(locale);
  const t = await getTranslations('TalentCompleteProfilePage');

  return (
    <main className="min-h-screen bg-background text-foreground">
      <section className="border-b border-border/80">
        <SectionWrapper className="py-10 md:py-14 lg:py-20">
          <div className="relative border-x border-border/80">
            <span
              aria-hidden="true"
              className="absolute -top-4 -left-px h-4 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 -left-3 h-px w-3 bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute -top-4 -right-px h-4 w-px bg-border"
            />
            <span
              aria-hidden="true"
              className="absolute top-0 -right-3 h-px w-3 bg-border"
            />

            <div className="flex items-center justify-between border-y border-border/80 px-5 py-3 font-mono text-[10px] tracking-[0.16em] text-muted-foreground uppercase sm:px-8">
              <span>{t('hero.label')}</span>
              <span>{t('hero.context')}</span>
            </div>

            <div className="mx-auto max-w-2xl border-t border-border/80 px-5 py-12 sm:px-8 md:py-16 lg:px-10 lg:py-20">
              <CompleteProfileForm token={token} />
            </div>
          </div>
        </SectionWrapper>
      </section>
    </main>
  );
}
