import {
  getServices,
  localizeService,
  type LocaleCode,
} from '@/lib/api/content';
import {
  getFallbackServices,
  toServiceItem,
} from '@/lib/content/service-items';
import type { ServiceItem } from '@/content/services';

import { ServicesList } from './ServicesList';

/**
 * Server-side services list section. Prefers the API; falls back to the
 * static catalog when the API is unreachable or returns no services, so the
 * section always renders. The fetch runs at prerender/ISR time — no client
 * loading state needed.
 */
export async function ServicesListSection({ locale }: { locale: string }) {
  let items: ServiceItem[] = [];
  try {
    const services = await getServices();
    if (services.length > 0) {
      items = services.map((service) =>
        toServiceItem(localizeService(service, locale as LocaleCode)),
      );
    }
  } catch {
    items = [];
  }

  if (items.length === 0) {
    items = await getFallbackServices(locale as LocaleCode);
  }

  return <ServicesList services={items} />;
}
