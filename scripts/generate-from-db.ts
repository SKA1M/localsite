// scripts/generate-from-db.ts
//
// Build a client config draft by pulling a row from the Supabase `clients` table.
//
// Usage:
//   npm run gen:from-db -- beach-shack-goa
//
// Reads NEXT_PUBLIC_SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY from the environment.
// Writes the draft to src/content/clients/<slug>.ts — review it, fill the TODOs,
// register the export in src/lib/clients.ts, then commit.

import { writeFileSync } from 'node:fs'
import path from 'node:path'
import { createClient } from '@supabase/supabase-js'
import { generateClientContent, j, camel } from './lib/generate-config'
import type { BusinessFacts, GeneratedContent } from './lib/generate-config'

interface SiteFacts {
  businessType?: string
  tagline?: string
  locality?: string
  region?: string
  country?: string
  phone?: string
  whatsapp?: string
  instagram?: string
  vibe?: string
  offerings?: string[]
  audience?: string
}

interface ClientRow {
  slug: string
  name: string
  google_review_url: string | null
  services: string[] | null
  site_facts: SiteFacts | null
}

async function main() {
  const slug = process.argv[2]
  if (!slug) {
    console.error('Usage: npm run gen:from-db -- <slug>')
    process.exit(1)
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!supabaseUrl || !serviceKey) {
    console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY')
    process.exit(1)
  }

  const db = createClient(supabaseUrl, serviceKey)

  const { data: row, error } = await db
    .from('clients')
    .select('slug, name, google_review_url, services, site_facts')
    .eq('slug', slug)
    .single<ClientRow>()

  if (error || !row) {
    console.error(`Could not fetch client "${slug}":`, error?.message ?? 'not found')
    process.exit(1)
  }

  const sf = row.site_facts ?? {}
  const facts: BusinessFacts = {
    slug: row.slug,
    name: row.name,
    businessType: sf.businessType ?? 'restaurant',
    locality: sf.locality ?? '',
    region: sf.region ?? '',
    country: sf.country ?? 'India',
    vibe: sf.vibe ?? '',
    offerings: sf.offerings ?? row.services ?? [],
    audience: sf.audience,
  }

  let content: GeneratedContent
  let model: string
  let costUsd: number
  try {
    ;({ content, model, costUsd } = await generateClientContent(facts))
  } catch (e) {
    console.error(e instanceof Error ? e.message : e)
    process.exit(1)
  }

  console.error(`\n✓ Generated via ${model} — cost $${costUsd.toFixed(5)}\n`)

  const outPath = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    '../src/content/clients',
    `${slug}.ts`,
  )
  writeFileSync(outPath, renderConfig(row, sf, content))

  console.log(`
Draft written to src/content/clients/${slug}.ts

Next steps:
  1. Open the file, review every line of AI copy — edit freely.
  2. Fill the TODO fields (address, hours, priceRange, ogImage).
  3. Add the export to src/lib/clients.ts so the page gets built.
  4. Run: npm run dev  →  open http://localhost:3000/${slug}
  5. Run: npm run build  →  confirm no type errors.
  6. Commit and deploy.
`)
}

function renderConfig(row: ClientRow, sf: SiteFacts, c: GeneratedContent): string {
  const phone = sf.phone ? `  phone: ${j(sf.phone)},\n` : '  // TODO: phone\n'
  const whatsapp = sf.whatsapp ? `  whatsapp: ${j(sf.whatsapp)},\n` : '  // TODO: whatsapp\n'
  const instagram = sf.instagram ? `  instagram: ${j(sf.instagram)},\n` : ''
  const reviewUrl = row.google_review_url
    ? `  googleReviewUrl: ${j(row.google_review_url)},\n`
    : ''

  return `// src/content/clients/${row.slug}.ts  — REVIEW & EDIT before shipping
import type { ClientConfig } from '@/lib/types'

export const ${camel(row.slug)}: ClientConfig = {
  slug: ${j(row.slug)},
  name: ${j(row.name)},
  businessType: ${j(sf.businessType ?? 'restaurant')} as ClientConfig['businessType'],
  tagline: ${j(c.heroHeadline)},
  locality: ${j(sf.locality ?? '')},
  region: ${j(sf.region ?? '')},
  country: ${j(sf.country ?? 'India')},
${phone}${whatsapp}${instagram}${reviewUrl}  // TODO: address, hours, priceRange, ogImage
  hero: {
    headline: ${j(c.heroHeadline)},
    subhead: ${j(c.heroSubhead)},
  },
  sections: ${JSON.stringify(c.sections, null, 2)},
  highlights: ${JSON.stringify(c.highlights)},
  seo: {
    title: ${j(c.seoTitle)},
    description: ${j(c.seoDescription)},
  },
}
`
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
