import type { Metadata } from 'next';
import { notFound, redirect } from 'next/navigation';

import { SectionWrapper } from '@/components/layout/SectionWrapper';
import {
  CaseStudyDetail,
  CaseStudyRelated,
} from '@/components/sections/case-studies/CaseStudyDetail';
import { DetailConversionCta } from '@/components/sections/shared/DetailConversionCta';
import {
  caseStudies,
  getCaseStudyBySlug,
  getRelatedCaseStudies,
} from '@/content/case-studies';

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  return params.then(({ slug }) => {
    const study = getCaseStudyBySlug(slug);
    if (!study) {
      return { title: 'Case study not found' };
    }

    return {
      title: study.title,
      description: study.excerpt,
      alternates: { canonical: `/en/case-studies/${study.slug}` },
      openGraph: {
        title: `${study.title} | BlihOps`,
        description: study.excerpt,
        type: 'article',
        publishedTime: study.publishedAt,
        url: `https://blihops.com/en/case-studies/${study.slug}`,
        images: [{ url: study.heroImage }],
      },
      twitter: {
        card: 'summary_large_image',
        title: `${study.title} | BlihOps`,
        description: study.excerpt,
        images: [study.heroImage],
      },
    };
  });
}

export default async function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (locale !== 'en') redirect(`/en/case-studies/${slug}`);

  const study = getCaseStudyBySlug(slug);
  if (!study) notFound();

  const related = getRelatedCaseStudies(slug, 2);

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
