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
