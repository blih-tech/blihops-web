import { setRequestLocale } from 'next-intl/server';

import { AuthShell } from '@/components/sections/auth/AuthShell';
import { SignInForm } from '@/components/sections/auth/sign-in/SignInForm';
import { createGenerateMetadata, noIndexRobots } from '@/i18n/metadata';

export const generateMetadata = async (args: {
  params: Promise<{ locale: string }>;
}) => {
  const base = await createGenerateMetadata('signIn', '/auth/sign-in')(args);
  return { ...base, robots: noIndexRobots };
};

export default async function SignInPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <AuthShell>
      <SignInForm />
    </AuthShell>
  );
}
