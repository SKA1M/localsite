// scripts/generate-content.ts
//
// Turn a few facts about a business into a ready-to-edit client config:
// hero headline/subhead, content sections, highlights, and SEO title/meta.
//
// Uses the vendored cost-aware lib/llm client (routes to Sonnet for this
// narrative task, logs usage to Supabase keyed by the client slug).
//
// Usage:
//   npm run gen:content -- ./scripts/inputs/beach-shack-goa.json
//
// The input JSON is the raw facts; output is printed as a .ts config you paste
// into src/content/clients/ (review + edit before shipping — never publish
// unread AI copy for a real business).

import { readFileSync } from 'node:fs'
import { generateClientContent, j, camel } from './lib/generate-config'
import type { BusinessFacts, GeneratedContent } from './lib/generate-config'

async function main() {
  const inputPath = process.argv[2]
  if (!inputPath) {
    console.error('Usage: npm run gen:content -- <facts.json>')
    process.exit(1)
  }

  const facts = JSON.parse(readFileSync(inputPath, 'utf8')) as BusinessFacts

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
  console.log(renderConfig(facts, content))
}

function renderConfig(facts: BusinessFacts, c: GeneratedContent): string {
  return `// src/content/clients/${facts.slug}.ts  — REVIEW & EDIT before shipping
import type { ClientConfig } from '@/lib/types'

export const ${camel(facts.slug)}: ClientConfig = {
  slug: ${j(facts.slug)},
  name: ${j(facts.name)},
  businessType: ${j(facts.businessType)} as ClientConfig['businessType'],
  tagline: ${j(c.heroHeadline)},
  locality: ${j(facts.locality)},
  region: ${j(facts.region)},
  country: ${j(facts.country)},
  // TODO: fill phone / whatsapp / address / hours / priceRange
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
