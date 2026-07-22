import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CareerDetail } from '@/components/sections/careers/CareerDetail';
import { careerRoles, getCareerRoleBySlug } from '@/content/careers';
import { noIndexRobots } from '@/i18n/metadata';

type CareerPageProps = {
  params: Promise<{ locale: string; slug: string }>;
};

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRoleBySlug(slug);

  if (!role) return { title: 'Role not found', robots: noIndexRobots };

  return {
    title: `${role.title} - Careers`,
    description: role.summary,
    robots: noIndexRobots,
    alternates: { canonical: `/en/careers/${role.slug}` },
    openGraph: {
      title: `${role.title} at Blih Ops`,
      description: role.summary,
      url: `/en/careers/${role.slug}`,
    },
  };
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { locale, slug } = await params;
  if (locale !== 'en') redirect(`/en/careers/${slug}`);

  const role = getCareerRoleBySlug(slug);

  if (!role) notFound();

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CareerDetail role={role} />
      </SectionWrapper>
    </main>
  );
}
