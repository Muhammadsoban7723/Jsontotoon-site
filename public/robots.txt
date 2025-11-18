import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jsontotoon.site'

const sitemapUrl = `${BASE_URL.replace(/\/$/, '')}/sitemap.xml`

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/'],
    },
    sitemap: sitemapUrl,
  }
}

