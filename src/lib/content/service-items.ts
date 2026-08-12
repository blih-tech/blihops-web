import 'server-only';

import { getTranslations } from 'next-intl/server';

import {
  services as staticServices,
  type ServiceItem,
} from '@/content/services';
import type { LocaleCode, LocalizedService } from '@/lib/api/content';

/**
 * Maps an API service (resolved for one locale) into the client-facing
 * ServiceItem shape. `id` becomes the locale-aware slug so section anchors
 * (`/what-we-offer#<slug>`) and React keys stay stable per locale. The icon
 * stays a whitelist KEY — components are resolved client-side to cross the
 * RSC boundary.
 */
export function toServiceItem(service: LocalizedService): ServiceItem {
  return {
    id: service.slug,
    title: service.title,
    subtitle: service.subtitle,
    shortDescription: service.shortDescription,
    details: service.details,
    tag: service.tag,
    href: `/what-we-offer#${service.slug}`,
    icon: service.icon,
    image: service.imageUrl,
    body: service.body,
    features: service.features,
    whoThisIsFor: service.whoThisIsFor,
  };
}

const serviceMessageKeys = {
  'customer-support': 'customerSupport',
  'back-office': 'backOffice',
  'it-software': 'itSoftware',
  'ai-automation': 'aiAutomation',
  'data-reporting': 'dataReporting',
} as const;

/**
 * Static fallback used when the API is unreachable or returns no services.
 * Localizes the static catalog through the i18n messages, mirroring the old
 * client-side behavior.
 */
export async function getFallbackServices(
  locale: LocaleCode,
): Promise<ServiceItem[]> {
  const t = await getTranslations({ locale, namespace: 'Shared.services' });

  return staticServices.map((service) => {
    const key =
      serviceMessageKeys[service.id as keyof typeof serviceMessageKeys];
    if (key === undefined) {
      return service;
    }
    return {
      ...service,
      title: t(`${key}.title`),
      subtitle: t(`${key}.subtitle`),
      shortDescription: t(`${key}.shortDescription`),
      details: t(`${key}.details`),
      tag: t(`${key}.tag`),
      body: t(`${key}.body`),
      features: t.raw(`${key}.features`) as string[],
      whoThisIsFor: t(`${key}.whoThisIsFor`),
    };
  });
}
