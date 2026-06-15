import type { MetadataRoute } from 'next'
import { allClients } from '@/lib/clients'
import { BASE_URL } from '@/lib/config'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, changeFrequency: 'weekly', priority: 1 },
    ...allClients().map((c) => ({
      url: `${BASE_URL}/${c.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
