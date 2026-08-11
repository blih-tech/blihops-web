import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CareerDetail } from '@/components/sections/careers/CareerDetail';
import { noIndexRobots } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import {
  getCareerBySlug,
  getCareers,
  type CareerDetail as CareerDetailData,
} from '@/lib/api/content';

type CareerPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const roles = await getCareers();
    return routing.locales.flatMap((locale) =>
      roles.map((role) => ({ locale, slug: role.slug })),
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const role = await getCareerBySlug(slug);

    return {
      title: `${role.title} - Careers`,
      description: role.summary,
      robots: noIndexRobots,
      alternates: { canonical: `/${locale}/careers/${role.slug}` },
      openGraph: {
        title: `${role.title} at Blih Ops`,
        description: role.summary,
        url: `https://blihops.com/${locale}/careers/${role.slug}`,
      },
    };
  } catch {
    return { title: 'Role not found', robots: noIndexRobots };
  }
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { locale, slug } = await params;

  let role: CareerDetailData;

  try {
    role = await getCareerBySlug(slug);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CareerDetail role={role} />
      </SectionWrapper>
    </main>
  );
}
