import { setRequestLocale } from 'next-intl/server';

import { AuthShell } from '@/components/sections/auth/AuthShell';
import { ResetPasswordForm } from '@/components/sections/auth/reset-password/ResetPasswordForm';
import { createGenerateMetadata, noIndexRobots } from '@/i18n/metadata';

export const generateMetadata = async (args: {
  params: Promise<{ locale: string }>;
}) => {
  const base = await createGenerateMetadata(
    'resetPassword',
    '/auth/reset-password',
  )(args);
  return { ...base, robots: noIndexRobots };
};

export default async function ResetPasswordPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  // TODO: Replace this transient URL-query mock with real token validation
  // once the reset endpoint is wired to blihop-api. For now, append ?invalid=1
  // to the reset-password URL to preview the invalid-token variant.
  const tokenInvalid = typeof sp.invalid === 'string' && sp.invalid === '1';

  return (
    <AuthShell>
      <ResetPasswordForm invalidToken={tokenInvalid} />
    </AuthShell>
  );
}
