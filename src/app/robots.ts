import type { MetadataRoute } from 'next'
import { BASE_URL } from '@/lib/config'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/$', // block only the exact root (client roster) — client pages stay indexable
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  }
}
