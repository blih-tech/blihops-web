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

  const token = typeof sp.token === 'string' ? sp.token : undefined;
  const tokenError = typeof sp.error === 'string' ? sp.error : undefined;
  const tokenInvalid = token === undefined || tokenError !== undefined;

  return (
    <AuthShell>
      <ResetPasswordForm invalidToken={tokenInvalid} token={token ?? ''} />
    </AuthShell>
  );
}
