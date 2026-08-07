'use client';

import { usePathname } from '@/i18n/navigation';

import { Footer } from '@/components/layout/Footer';
import { Header } from '@/components/layout/Header';
import { SmoothScroll } from '@/components/layout/SmoothScroll';

type SiteChromeProps = {
  children: React.ReactNode;
};

export function SiteChrome({ children }: SiteChromeProps) {
  const pathname = usePathname();
  const isAuthRoute = pathname.startsWith('/auth');
  const isWorkspaceRoute =
    pathname.startsWith('/talent-portal') ||
    pathname.startsWith('/client-workspace');

  if (isAuthRoute || isWorkspaceRoute) {
    return <>{children}</>;
  }

  return (
    <SmoothScroll>
      <Header />
      {children}
      <Footer />
    </SmoothScroll>
  );
}
