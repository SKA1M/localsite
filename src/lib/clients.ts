// src/lib/clients.ts
//
// Central registry of all client sites. Add a new business by creating
// src/content/clients/<slug>.ts and importing it here. Kept explicit (not
// glob magic) so the build is predictable and tree-shakeable.

import type { ClientConfig } from './types'
import { beachShackGoa } from '@/content/clients/beach-shack-goa'
import { seaBreezeShackTest } from '@/content/clients/sea-breeze-shack-test'

const ALL: ClientConfig[] = [
  beachShackGoa,
  seaBreezeShackTest,
]

const BY_SLUG = new Map(ALL.map((c) => [c.slug, c]))

export function getClient(slug: string): ClientConfig | undefined {
  return BY_SLUG.get(slug)
}

export function allClients(): ClientConfig[] {
  return ALL
}

export function allSlugs(): string[] {
  return ALL.map((c) => c.slug)
}
