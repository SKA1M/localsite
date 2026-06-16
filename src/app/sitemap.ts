import type { MetadataRoute } from 'next'
import { allClients } from '@/lib/clients'
import { BASE_URL } from '@/lib/config'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: 'monthly' as const, priority: 1 },
    ...allClients().map((c) => ({
      url: `${BASE_URL}/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
