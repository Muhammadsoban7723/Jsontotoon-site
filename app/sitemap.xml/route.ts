const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jsontotoon.site'

const base = BASE_URL.replace(/\/$/, '')

const staticRoutes = ['/', '/about', '/faq', '/contact', '/privacy', '/terms']

function buildSitemapXml() {
  const lastModified = new Date().toISOString()

  const urls = staticRoutes
    .map((route) => {
      const changeFrequency = route === '/' ? 'weekly' : 'monthly'
      const priority = route === '/' ? 1 : 0.7

      return `
    <url>
      <loc>${base}${route}</loc>
      <lastmod>${lastModified}</lastmod>
      <changefreq>${changeFrequency}</changefreq>
      <priority>${priority}</priority>
    </url>`
    })
    .join('')

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${urls}
</urlset>`
}

export function GET() {
  const body = buildSitemapXml()

  return new Response(body, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

