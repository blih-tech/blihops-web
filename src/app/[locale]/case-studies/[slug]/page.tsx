import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import {
  CaseStudyDetail,
  CaseStudyRelated,
} from '@/components/sections/case-studies/CaseStudyDetail';
import { DetailConversionCta } from '@/components/sections/shared/DetailConversionCta';
import { noIndexRobots } from '@/i18n/metadata';
import { routing } from '@/i18n/routing';
import {
  getCaseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
  localizeCaseStudyDetail,
  type LocaleCode,
  type LocalizedCaseStudyDetail,
} from '@/lib/api/content';

export const dynamicParams = true;

export async function generateStaticParams() {
  try {
    const studies = await getCaseStudies();
    return routing.locales.flatMap((locale) =>
      studies.map((study) => ({
        locale,
        slug: study.slugs[locale as LocaleCode],
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
    const detail = await getCaseStudyBySlug(slug);
    const study = localizeCaseStudyDetail(detail, locale as LocaleCode);

    const images =
      study.media.type === 'image' ? [{ url: study.media.url }] : undefined;

    return {
      title: study.title,
      description: study.summary,
      robots: noIndexRobots,
      alternates: { canonical: `/${locale}/case-studies/${slug}` },
      openGraph: {
        title: `${study.title} | Blih Ops`,
        description: study.summary,
        type: 'article',
        publishedTime: study.createdAt,
        url: `https://blihops.com/${locale}/case-studies/${slug}`,
        images,
      },
      twitter: {
        card: 'summary_large_image',
        title: `${study.title} | Blih Ops`,
        description: study.summary,
        images,
      },
    };
  } catch {
    return { title: 'Case study not found', robots: noIndexRobots };
  }
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;

  let study: LocalizedCaseStudyDetail;
  let related: Awaited<ReturnType<typeof getRelatedCaseStudies>> = [];

  try {
    const detail = await getCaseStudyBySlug(slug);
    study = localizeCaseStudyDetail(detail, locale as LocaleCode);
    related = await getRelatedCaseStudies(slug, locale as LocaleCode, 2);
  } catch {
    notFound();
  }

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SectionWrapper>
        <CaseStudyDetail study={study} />
        <DetailConversionCta />
        {related.length > 0 ? <CaseStudyRelated studies={related} /> : null}
      </SectionWrapper>
    </main>
  );
}
