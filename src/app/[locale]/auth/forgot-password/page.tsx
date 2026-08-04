import { setRequestLocale } from 'next-intl/server';

import { AuthShell } from '@/components/sections/auth/AuthShell';
import { ForgotPasswordForm } from '@/components/sections/auth/forgot-password/ForgotPasswordForm';
import { createGenerateMetadata, noIndexRobots } from '@/i18n/metadata';

export const generateMetadata = async (args: {
  params: Promise<{ locale: string }>;
}) => {
  const base = await createGenerateMetadata(
    'forgotPassword',
    '/auth/forgot-password',
  )(args);
  return { ...base, robots: noIndexRobots };
};

export default async function ForgotPasswordPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AuthShell>
      <ForgotPasswordForm />
    </AuthShell>
  );
}
