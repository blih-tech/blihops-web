import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import {
  InsightDetail,
  InsightRelated,
} from '@/components/sections/insights/InsightDetail';
import { DetailConversionCta } from '@/components/sections/shared/DetailConversionCta';
import { noIndexRobots } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import {
  getInsightBySlug,
  getInsights,
  getRelatedInsights,
  localizeInsightDetail,
  type LocaleCode,
  type LocalizedInsightDetail,
} from '@/lib/api/content';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const insights = await getInsights();
    return routing.locales.flatMap((locale) =>
      insights.map((insight) => ({
        locale,
        slug: insight.slugs[locale as LocaleCode],
      })),
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;

  try {
    const detail = await getInsightBySlug(slug);
    const insight = localizeInsightDetail(detail, locale as LocaleCode);

    const images =
      insight.media.type === 'image' ? [{ url: insight.media.url }] : undefined;

    return {
      title: insight.title,
      description: insight.excerpt,
      robots: noIndexRobots,
      authors: [{ name: insight.author }],
      alternates: { canonical: `/${locale}/insights/${slug}` },
      openGraph: {
        title: `${insight.title} | Blih Ops`,
        description: insight.excerpt,
        type: 'article',
        publishedTime: insight.createdAt,
        authors: [insight.author],
        url: `https://blihops.com/${locale}/insights/${slug}`,
        images,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${insight.title} | Blih Ops`,
        description: insight.excerpt,
        images,
      },
    };
  } catch {
    return { title: 'Insight not found', robots: noIndexRobots };
  }
}

export default async function InsightDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let insight: LocalizedInsightDetail;
  let related: Awaited<ReturnType<typeof getRelatedInsights>> = [];

  try {
    const detail = await getInsightBySlug(slug);
    insight = localizeInsightDetail(detail, locale as LocaleCode);
    related = await getRelatedInsights(slug, locale as LocaleCode, 2);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <InsightDetail insight={insight} />
        <DetailConversionCta />
        {related.length > 0 ? <InsightRelated insights={related} /> : null}
      </SectionWrapper>
    </main>
  );
}
