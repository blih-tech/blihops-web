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
        title: t.has('openGraphTitle') ? t('openGraphTitle') : title,
        description: t.has('openGraphDescription')
          ? t('openGraphDescription')
          : description,
        url: getLocalizedPath(locale, pathname),
      },
    };
  };
}
