import type { MetadataRoute } from 'next';

import { routing } from '@/i18n/routing';

const baseUrl = 'https://blihops.com';
const paths = [
  '',
  '/what-we-offer',
  '/how-we-work',
  '/who-we-are',
  '/case-studies',
  '/insights',
  '/careers',
  '/contact',
  '/skills',
  '/talent',
  '/pilot',
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return paths.flatMap((path) => {
    const languages = {
      ...Object.fromEntries(
        routing.locales.map((locale) => [
          locale,
          `${baseUrl}/${locale}${path}`,
        ]),
      ),
      'x-default': `${baseUrl}/${routing.defaultLocale}${path}`,
    };

    return routing.locales.map((locale) => ({
      url: `${baseUrl}/${locale}${path}`,
      alternates: { languages },
    }));
  });
}
