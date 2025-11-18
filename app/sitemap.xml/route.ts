import type { MetadataRoute } from 'next'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jsontotoon.site'
const base = BASE_URL.replace(/\/$/, '')

const staticRoutes = ['/', '/about', '/faq', '/contact', '/privacy', '/terms']

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date()

  return staticRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}

