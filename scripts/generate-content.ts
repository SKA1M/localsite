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
import { generate } from '../src/lib/llm/client'

interface BusinessFacts {
  slug: string
  name: string
  businessType: string
  locality: string
  region: string
  country: string
  vibe: string // free text: what makes the place special
  offerings: string[] // e.g. ["fresh seafood", "vegetarian thalis"]
  audience?: string // e.g. "backpackers, couples, families"
}

const SYSTEM = `You write concise, honest marketing copy and SEO metadata for small hospitality businesses (restaurants, cafes, hostels) in India.

Given JSON facts about ONE business, return ONLY a JSON object (no markdown, no preamble) with exactly these keys:
{
  "heroHeadline": string,        // <= 90 chars, specific and concrete, no hype clichés
  "heroSubhead": string,         // 1-2 sentences, includes how to book if implied
  "sections": [                  // 2-3 items
    { "title": string, "body": string }  // body 2-4 sentences, warm and specific
  ],
  "highlights": string[],        // 3-5 short chips, <= 4 words each
  "seoTitle": string,            // <= 60 chars, includes business name + place + category
  "seoDescription": string       // <= 155 chars, includes place + a call to action
}

Rules:
- Be truthful to the supplied facts. Invent nothing (no fake awards, no fake ratings).
- Local SEO: weave in the locality/region naturally, don't keyword-stuff.
- Plain, grounded language. No "nestled", "hidden gem", "culinary journey".
- Indian context: WhatsApp booking is normal; mention it if relevant.`

async function main() {
  const inputPath = process.argv[2]
  if (!inputPath) {
    console.error('Usage: npm run gen:content -- <facts.json>')
    process.exit(1)
  }

  const facts = JSON.parse(readFileSync(inputPath, 'utf8')) as BusinessFacts

  const result = await generate({
    userId: facts.slug,     // tenant key for usage logging
    tier: 'client',         // per-client budget cap (see lib/llm/budget.ts)
    kind: 'narrative',      // always routes to Sonnet — quality matters here
    systemPrompt: SYSTEM,
    userInput: JSON.stringify(facts),
  })

  // Strip any accidental code fences, then parse.
  const clean = result.text.replace(/```json|```/g, '').trim()
  let content: Record<string, unknown>
  try {
    content = JSON.parse(clean)
  } catch {
    console.error('Model did not return valid JSON. Raw output:\n', result.text)
    process.exit(1)
  }

  console.error(`\n✓ Generated via ${result.model} — cost $${result.costUsd.toFixed(5)}\n`)
  // Emit a paste-ready config skeleton to stdout.
  console.log(renderConfig(facts, content))
}

function renderConfig(facts: BusinessFacts, c: Record<string, any>): string {
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

const j = (s: unknown) => JSON.stringify(s ?? '')
const camel = (slug: string) =>
  slug.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
