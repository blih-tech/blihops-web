import { setRequestLocale } from 'next-intl/server';

import { AuthShell } from '@/components/sections/auth/AuthShell';
import { AcceptInvitationForm } from '@/components/sections/auth/accept-invitation/AcceptInvitationForm';
import { createGenerateMetadata, noIndexRobots } from '@/i18n/metadata';

export const generateMetadata = async (args: {
  params: Promise<{ locale: string }>;
}) => {
  const base = await createGenerateMetadata(
    'acceptInvitation',
    '/auth/accept-invitation',
  )(args);
  return { ...base, robots: noIndexRobots };
};

export default async function AcceptInvitationPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const { locale } = await params;
  const sp = await searchParams;
  setRequestLocale(locale);

  // TODO: Resolve the invitee email from the token stored in the DB
  // (blihop-api) so clients and talents share this page. Mock until wired.
  const invitedEmail = 'alex@company.com';

  // TODO: Replace this transient URL-query mock with real token validation
  // once the accept-invitation endpoint is wired. Append ?invalid=1 to
  // preview the invalid-invitation variant.
  const tokenInvalid = typeof sp.invalid === 'string' && sp.invalid === '1';

  return (
    <AuthShell>
      <AcceptInvitationForm
        invalidToken={tokenInvalid}
        invitedEmail={invitedEmail}
      />
    </AuthShell>
  );
}
