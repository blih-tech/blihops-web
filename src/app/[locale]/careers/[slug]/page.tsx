import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import { CareerDetail } from '@/components/sections/careers/CareerDetail';
import { careerRoles, getCareerRoleBySlug } from '@/content/careers';

type CareerPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return careerRoles.map((role) => ({ slug: role.slug }));
}

export async function generateMetadata({
  params,
}: CareerPageProps): Promise<Metadata> {
  const { slug } = await params;
  const role = getCareerRoleBySlug(slug);

  if (!role) return { title: 'Role not found' };

  return {
    title: `${role.title} - Careers`,
    description: role.summary,
    alternates: { canonical: `/careers/${role.slug}` },
    openGraph: {
      title: `${role.title} at BlihOps`,
      description: role.summary,
      url: `/careers/${role.slug}`,
    },
  };
}

export default async function CareerDetailPage({ params }: CareerPageProps) {
  const { slug } = await params;
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
