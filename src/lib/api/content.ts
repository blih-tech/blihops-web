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
