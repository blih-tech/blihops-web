import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { routing } from '@/i18n/routing';

type MetadataNamespace =
  | 'services'
  | 'process'
  | 'about'
  | 'caseStudies'
  | 'insights'
  | 'contact'
  | 'pilot'
  | 'careers'
  | 'skills'
  | 'talent';

function getLocalizedPath(locale: string, pathname: string) {
  return `/${locale}${pathname}`;
}

export function createGenerateMetadata(
  namespace: MetadataNamespace,
  pathname: string,
) {
  return async ({
    params,
  }: {
    params: Promise<{ locale: string }>;
  }): Promise<Metadata> => {
    const { locale } = await params;
    const t = await getTranslations({
      locale,
      namespace: `Metadata.${namespace}`,
    });
    const title = t('title');
    const description = t('description');
    const openGraphTitle = t.has('openGraphTitle')
      ? t('openGraphTitle')
      : title;
    const openGraphDescription = t.has('openGraphDescription')
      ? t('openGraphDescription')
      : description;
    const socialImage = `/seo/og-${locale}.png`;

    return {
      title,
      description,
      alternates: {
        canonical: getLocalizedPath(locale, pathname),
        languages: Object.fromEntries(
          routing.locales.map((supportedLocale) => [
            supportedLocale,
            getLocalizedPath(supportedLocale, pathname),
          ]),
        ),
      },
      openGraph: {
        type: 'website',
        locale: locale === 'de' ? 'de_DE' : 'en_US',
        siteName: 'Blih Ops',
        title: openGraphTitle,
        description: openGraphDescription,
        url: getLocalizedPath(locale, pathname),
        images: [{ url: socialImage, alt: openGraphTitle }],
      },
      twitter: {
        card: 'summary_large_image',
        title: openGraphTitle,
        description: openGraphDescription,
        images: [{ url: socialImage, alt: openGraphTitle }],
      },
    };
  };
}
