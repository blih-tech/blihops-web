import 'server-only';

import { apiFetch } from '../api';

export type LocaleCode = 'en' | 'de';

export type Media = {
  type: 'image' | 'video';
  url: string;
  alt?: string;
};

export type Category = {
  id: string;
  name: string;
};

export type ContentTag = {
  id: string;
  name: string;
};

export type CaseStudySectionKey = 'challenge' | 'approach' | 'outcome';

export type CaseStudyLocaleContent = {
  title: string;
  slug: string;
  summary: string;
  body: Record<CaseStudySectionKey, string>;
};

export type CaseStudyDetail = {
  id: string;
  client: string;
  category: Category | null;
  media: Media;
  status: 'DRAFT' | 'PUBLISHED';
  tags: ContentTag[];
  content: { en: CaseStudyLocaleContent; de: CaseStudyLocaleContent };
  createdAt: string;
  updatedAt: string;
};

/** A case study detail resolved for one locale. */
export type LocalizedCaseStudyDetail = {
  id: string;
  client: string;
  category: Category | null;
  media: Media;
  tags: ContentTag[];
  createdAt: string;
  updatedAt: string;
  title: string;
  summary: string;
  body: Record<CaseStudySectionKey, string>;
};

export type CaseStudyListItem = {
  id: string;
  slugs: { en: string; de: string };
  titles: { en: string; de: string };
  summaries: { en: string; de: string };
  client: string;
  category: Category | null;
  media: Media;
  tags: ContentTag[];
  createdAt: string;
};

/** A case study resolved for one locale (slug/title/summary). */
export type LocalizedCaseStudy = {
  id: string;
  slug: string;
  title: string;
  summary: string;
  client: string;
  category: Category | null;
  media: Media;
  tags: ContentTag[];
  createdAt: string;
};

export type InsightListItem = {
  id: string;
  slugs: { en: string; de: string };
  titles: { en: string; de: string };
  excerpts: { en: string; de: string };
  author: string;
  readTimeMinutes: number;
  category: Category | null;
  media: Media;
  tags: ContentTag[];
  createdAt: string;
};

/** An insight resolved for one locale. */
export type LocalizedInsight = {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  author: string;
  readTimeMinutes: number;
  category: Category | null;
  media: Media;
  tags: ContentTag[];
  createdAt: string;
};

export type InsightSection = { section: string; content: string };

export type InsightLocaleContent = {
  title: string;
  slug: string;
  excerpt: string;
  body: InsightSection[];
};

export type InsightDetail = {
  id: string;
  author: string;
  readTimeMinutes: number;
  category: Category | null;
  media: Media;
  status: 'DRAFT' | 'PUBLISHED';
  tags: ContentTag[];
  content: { en: InsightLocaleContent; de: InsightLocaleContent };
  createdAt: string;
  updatedAt: string;
};

/** An insight detail resolved for one locale; section titles come from CMS. */
export type LocalizedInsightDetail = {
  id: string;
  author: string;
  readTimeMinutes: number;
  category: Category | null;
  media: Media;
  tags: ContentTag[];
  createdAt: string;
  updatedAt: string;
  title: string;
  excerpt: string;
  body: InsightSection[];
};

export type CareerListItem = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  createdAt: string;
};

export type CareerDetail = {
  id: string;
  title: string;
  slug: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  overview: string[];
  responsibilities: string[];
  requirements: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
};

export type FaqLocaleContent = { question: string; answer: string };

export type Faq = {
  id: string;
  isActive: boolean;
  displayOrder: number;
  content: { en: FaqLocaleContent; de: FaqLocaleContent };
};

/** An FAQ resolved for one locale. */
export type LocalizedFaq = {
  id: string;
  question: string;
  answer: string;
};

export type ServicesHero = {
  id: string;
  videoUrl: string;
  coverUrl: string;
  altLabel: string;
  lastUpdatedAt: string;
};

type PaginationMeta = Record<string, unknown>;

type ListResponse<T> = { items: T[]; meta: PaginationMeta };

const CONTENT_TTL_SECONDS = 60 * 60; // 1 hour ISR

export async function getCategories(): Promise<Category[]> {
  const { items } = await apiFetch<ListResponse<Category>>(
    '/api/v1/content/categories',
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:categories'] },
    },
  );
  return items;
}

export async function getCaseStudies(): Promise<CaseStudyListItem[]> {
  const { items } = await apiFetch<ListResponse<CaseStudyListItem>>(
    '/api/v1/content/case-studies?pageSize=100',
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:case-studies'] },
    },
  );
  return items;
}

export async function getCaseStudyBySlug(
  slug: string,
): Promise<CaseStudyDetail> {
  const { data } = await apiFetch<{ data: CaseStudyDetail }>(
    `/api/v1/content/case-studies/${encodeURIComponent(slug)}`,
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:case-studies'] },
    },
  );
  return data;
}

export async function getInsights(): Promise<InsightListItem[]> {
  const { items } = await apiFetch<ListResponse<InsightListItem>>(
    '/api/v1/content/insights?pageSize=100',
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:insights'] },
    },
  );
  return items;
}

export function localizeInsight(
  insight: InsightListItem,
  locale: LocaleCode,
): LocalizedInsight {
  const isDe = locale === 'de';
  return {
    id: insight.id,
    slug: isDe ? insight.slugs.de || insight.slugs.en : insight.slugs.en,
    title: isDe ? insight.titles.de || insight.titles.en : insight.titles.en,
    excerpt: isDe
      ? insight.excerpts.de || insight.excerpts.en
      : insight.excerpts.en,
    author: insight.author,
    readTimeMinutes: insight.readTimeMinutes,
    category: insight.category,
    media: insight.media,
    tags: insight.tags,
    createdAt: insight.createdAt,
  };
}

export async function getInsightBySlug(slug: string): Promise<InsightDetail> {
  const { data } = await apiFetch<{ data: InsightDetail }>(
    `/api/v1/content/insights/${encodeURIComponent(slug)}`,
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:insights'] },
    },
  );
  return data;
}

export function localizeInsightDetail(
  detail: InsightDetail,
  locale: LocaleCode,
): LocalizedInsightDetail {
  const isDe = locale === 'de';
  const content = isDe
    ? (detail.content.de ?? detail.content.en)
    : detail.content.en;
  return {
    id: detail.id,
    author: detail.author,
    readTimeMinutes: detail.readTimeMinutes,
    category: detail.category,
    media: detail.media,
    tags: detail.tags,
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
    title: content.title,
    excerpt: content.excerpt,
    body: content.body,
  };
}

/**
 * Related insights share at least one tag; the rest are filled with the most
 * recent published insights. Reuses the cached public list.
 */
export async function getRelatedInsights(
  slug: string,
  locale: LocaleCode,
  limit = 2,
): Promise<LocalizedInsight[]> {
  const all = await getInsights();
  const current = all.find(
    (insight) => insight.slugs.en === slug || insight.slugs.de === slug,
  );
  if (!current) return [];

  const others = all.filter((insight) => insight.id !== current.id);
  const currentTagIds = new Set(current.tags.map((tag) => tag.id));
  const byTags = others.filter((insight) =>
    insight.tags.some((tag) => currentTagIds.has(tag.id)),
  );
  const rest = others.filter((insight) => !byTags.includes(insight));

  return [...byTags, ...rest]
    .slice(0, limit)
    .map((insight) => localizeInsight(insight, locale));
}

export async function getCareers(): Promise<CareerListItem[]> {
  const { items } = await apiFetch<ListResponse<CareerListItem>>(
    '/api/v1/content/careers?pageSize=100',
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:careers'] },
    },
  );
  return items;
}

export async function getCareerBySlug(slug: string): Promise<CareerDetail> {
  const { data } = await apiFetch<{ data: CareerDetail }>(
    `/api/v1/content/careers/${encodeURIComponent(slug)}`,
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:careers'] },
    },
  );
  return data;
}

export async function getFaqs(): Promise<Faq[]> {
  const { items } = await apiFetch<ListResponse<Faq>>(
    '/api/v1/content/faqs?pageSize=100',
    {
      next: { revalidate: CONTENT_TTL_SECONDS, tags: ['content:faqs'] },
    },
  );
  return items;
}

export function localizeFaq(faq: Faq, locale: LocaleCode): LocalizedFaq {
  const isDe = locale === 'de';
  const content = isDe ? (faq.content.de ?? faq.content.en) : faq.content.en;
  return { id: faq.id, question: content.question, answer: content.answer };
}

export async function getServicesHero(): Promise<ServicesHero | null> {
  const { data } = await apiFetch<{ data: ServicesHero | null }>(
    '/api/v1/content/services-hero',
    {
      next: {
        revalidate: CONTENT_TTL_SECONDS,
        tags: ['content:services-hero'],
      },
    },
  );
  return data;
}

export function localizeCaseStudy(
  study: CaseStudyListItem,
  locale: LocaleCode,
): LocalizedCaseStudy {
  const isDe = locale === 'de';
  return {
    id: study.id,
    slug: isDe ? study.slugs.de || study.slugs.en : study.slugs.en,
    title: isDe ? study.titles.de || study.titles.en : study.titles.en,
    summary: isDe
      ? study.summaries.de || study.summaries.en
      : study.summaries.en,
    client: study.client,
    category: study.category,
    media: study.media,
    tags: study.tags,
    createdAt: study.createdAt,
  };
}

export function localizeCaseStudyDetail(
  detail: CaseStudyDetail,
  locale: LocaleCode,
): LocalizedCaseStudyDetail {
  const isDe = locale === 'de';
  const content = isDe
    ? (detail.content.de ?? detail.content.en)
    : detail.content.en;
  return {
    id: detail.id,
    client: detail.client,
    category: detail.category,
    media: detail.media,
    tags: detail.tags,
    createdAt: detail.createdAt,
    updatedAt: detail.updatedAt,
    title: content.title,
    summary: content.summary,
    body: content.body,
  };
}

/**
 * Related studies share at least one tag; the rest are filled with the most
 * recent published studies. Reuses the cached public list.
 */
export async function getRelatedCaseStudies(
  slug: string,
  locale: LocaleCode,
  limit = 2,
): Promise<LocalizedCaseStudy[]> {
  const all = await getCaseStudies();
  const current = all.find(
    (study) => study.slugs.en === slug || study.slugs.de === slug,
  );
  if (!current) return [];

  const others = all.filter((study) => study.id !== current.id);
  const currentTagIds = new Set(current.tags.map((tag) => tag.id));
  const byTags = others.filter((study) =>
    study.tags.some((tag) => currentTagIds.has(tag.id)),
  );
  const rest = others.filter((study) => !byTags.includes(study));

  return [...byTags, ...rest]
    .slice(0, limit)
    .map((study) => localizeCaseStudy(study, locale));
}
