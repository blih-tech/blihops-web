import { hasLocale } from 'next-intl';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

import { routing } from '@/i18n/routing';

export default async function RootPage() {
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') ?? '';
  const preferred =
    acceptLanguage.split(',')[0]?.trim().toLowerCase().slice(0, 2) ?? '';
  const locale = hasLocale(routing.locales, preferred)
    ? preferred
    : routing.defaultLocale;
  redirect(`/${locale}`);
}
