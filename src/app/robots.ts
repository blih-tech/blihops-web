import type { MetadataRoute } from 'next';

const baseUrl = 'https://blihops.com';

export default function robots(): MetadataRoute.Robots {
  const isProduction =
    process.env.VERCEL_ENV === 'production' &&
    process.env.VERCEL_PROJECT_PRODUCTION_URL === 'blihops.com';

  return {
    rules: {
      userAgent: '*',
      ...(isProduction ? { allow: '/' } : { disallow: '/' }),
    },
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
