import type { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const BASE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.jsontotoon.site'

const base = BASE_URL.replace(/\/$/, '')

const appDir = path.join(process.cwd(), 'app')

function hasPageFile(dir: string) {
  const candidates = ['page.tsx', 'page.jsx', 'page.js', 'page.ts']
  return candidates.some((file) => fs.existsSync(path.join(dir, file)))
}

function collectRoutesFromAppDir(): string[] {
  const routes = new Set<string>()

  if (hasPageFile(appDir)) {
    routes.add('/')
  }

  function walk(currentDir: string, baseRoute: string) {
    const entries = fs.readdirSync(currentDir, { withFileTypes: true })

    for (const entry of entries) {
      if (!entry.isDirectory()) continue

      if (entry.name.startsWith('.') || entry.name === 'api' || entry.name === 'sitemap.xml') {
        continue
      }

      const isRouteGroup = entry.name.startsWith('(') && entry.name.endsWith(')')
      const isDynamicSegment = entry.name.startsWith('[') && entry.name.endsWith(']')

      const segment = isRouteGroup
        ? ''
        : isDynamicSegment
        ? ''
        : `/${entry.name}`

      const nextBaseRoute = baseRoute + segment
      const nextDir = path.join(currentDir, entry.name)

      if (hasPageFile(nextDir) && nextBaseRoute) {
        routes.add(nextBaseRoute)
      }

      walk(nextDir, nextBaseRoute)
    }
  }

  walk(appDir, '')

  return Array.from(routes)
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const lastModified = new Date()

  const staticAndDynamicRoutes = collectRoutesFromAppDir()

  return staticAndDynamicRoutes.map((route) => ({
    url: `${base}${route}`,
    lastModified,
    changeFrequency: route === '/' ? 'weekly' : 'monthly',
    priority: route === '/' ? 1 : 0.7,
  }))
}

