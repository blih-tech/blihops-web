import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import {
  InsightDetail,
  InsightRelated,
} from '@/components/sections/insights/InsightDetail';
import { DetailConversionCta } from '@/components/sections/shared/DetailConversionCta';
import {
  getInsightBySlug,
  getRelatedInsights,
  insights,
} from '@/content/insights';

export function generateStaticParams() {
  return insights.map((insight) => ({ slug: insight.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);

  if (!insight) return { title: 'Insight not found' };

  return {
    title: insight.title,
    description: insight.excerpt,
    authors: [{ name: insight.author }],
    alternates: { canonical: `/insights/${insight.slug}` },
    openGraph: {
      title: `${insight.title} | BlihOps`,
      description: insight.excerpt,
      type: 'article',
      publishedTime: insight.publishedAt,
      authors: [insight.author],
      url: `https://blihops.com/insights/${insight.slug}`,
      images: [{ url: insight.heroImage }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `${insight.title} | BlihOps`,
      description: insight.excerpt,
      images: [insight.heroImage],
    },
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const insight = getInsightBySlug(slug);
  if (!insight) notFound();

  const related = getRelatedInsights(slug, 2);

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <InsightDetail insight={insight} />
        <DetailConversionCta />
        <InsightRelated insights={related} />
      </SectionWrapper>
    </main>
  );
}
