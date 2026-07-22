import type { Metadata } from 'next';
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import { routing } from '@/i18n/routing';

const fontSans = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

const fontSerif = Source_Serif_4({
  subsets: ['latin'],
  variable: '--font-source-serif',
});

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
});

type LocaleLayoutProps = Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params,
}: Pick<LocaleLayoutProps, 'params'>): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'Metadata.global' });
  const socialImage = `/seo/og-${locale}.png`;
  const isProduction =
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL === 'blihops.com';

  return {
    metadataBase: new URL('https://blihops.com'),
    title: {
      default: t('defaultTitle'),
      template: t('titleTemplate', { title: '%s' }),
    },
    description: t('description'),
    applicationName: 'Blih Ops',
    authors: [{ name: 'Blih Intelligent Operations PLC' }],
    creator: 'Blih Ops',
    publisher: 'Blih Intelligent Operations PLC',
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((supportedLocale) => [
          supportedLocale,
          `/${supportedLocale}`,
        ]),
      ),
    },
    openGraph: {
      type: 'website',
      locale: locale === 'de' ? 'de_DE' : 'en_US',
      url: `/${locale}`,
      siteName: 'Blih Ops',
      title: t('openGraphTitle'),
      description: t('openGraphDescription'),
      images: [{ url: socialImage, alt: t('openGraphTitle') }],
    },
    twitter: {
      card: 'summary_large_image',
      title: t('twitterTitle'),
      description: t('twitterDescription'),
      images: [{ url: socialImage, alt: t('openGraphTitle') }],
    },
    robots: {
      index: isProduction,
      follow: isProduction,
    },
  };
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: LocaleLayoutProps) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <NextIntlClientProvider>
          <SmoothScroll>
            <Header />
            {children}
            <Footer />
          </SmoothScroll>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
