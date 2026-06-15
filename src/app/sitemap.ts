import type { MetadataRoute } from 'next'
import { allClients } from '@/lib/clients'
import { BASE_URL } from '@/lib/config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  // Root / is intentionally excluded — it's a private placeholder, not public content.
  return allClients().map((c) => ({
    url: `${BASE_URL}/${c.slug}`,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))
}
