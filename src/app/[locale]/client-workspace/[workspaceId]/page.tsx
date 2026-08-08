import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { noIndexRobots } from '@/i18n/metadata';
import { SignOutButton } from '@/components/sections/workspace/SignOutButton';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; workspaceId: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({
    locale,
    namespace: 'Metadata.clientWorkspace',
  });

  return {
    title: t('title'),
    description: t('description'),
    robots: noIndexRobots,
  };
}

export default async function ClientWorkspacePage({
  params,
}: {
  params: Promise<{ locale: string; workspaceId: string }>;
}) {
  const { locale, workspaceId } = await params;
  const t = await getTranslations({ locale, namespace: 'ClientWorkspace' });

  return (
    <main className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background px-4">
      <div className="flex flex-col items-center gap-1.5 text-center">
        <h1 className="font-heading text-2xl font-semibold tracking-[-0.02em] text-foreground">
          {t('title')}
        </h1>
        <p className="font-mono text-[10px] font-semibold tracking-[0.08em] text-muted-foreground uppercase">
          {t('idLabel')} {workspaceId}
        </p>
      </div>
      <SignOutButton label={t('signOut')} />
    </main>
  );
}
