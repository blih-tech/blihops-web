import type { Metadata } from 'next';
import { Inter, Source_Serif_4, JetBrains_Mono } from 'next/font/google';
import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SmoothScroll } from '@/components/layout/SmoothScroll';
import './globals.css';

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

export const metadata: Metadata = {
  metadataBase: new URL('https://blihops.com'),
  title: {
    default: 'BlihOps, AI-Powered Outsourcing',
    template: '%s | BlihOps',
  },
  description:
    'Blih Intelligent Operations — Ethiopia’s AI-powered outsourcing company. Managed customer support, back-office, IT, and automation with clear SLAs and a free 2-week pilot.',
  applicationName: 'BlihOps',
  keywords: [
    'BlihOps',
    'outsourcing',
    'AI outsourcing',
    'BPO',
    'customer support',
    'back-office',
    'Ethiopia',
    'managed services',
  ],
  authors: [{ name: 'Blih Intelligent Operations PLC' }],
  creator: 'BlihOps',
  publisher: 'Blih Intelligent Operations PLC',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://blihops.com',
    siteName: 'BlihOps',
    title: 'BlihOps — AI-Powered Outsourcing',
    description:
      'Managed operations with structure, automation, and SLA accountability. Serving Europe, Middle East & Africa from Addis Ababa.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BlihOps — AI-Powered Outsourcing',
    description:
      'Managed operations with structure, automation, and SLA accountability.',
    creator: '@blihops',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontSans.variable} ${fontSerif.variable} ${fontMono.variable} antialiased`}
      >
        <SmoothScroll>
          <Header />
          {children}
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
