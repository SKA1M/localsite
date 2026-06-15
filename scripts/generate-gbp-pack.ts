// scripts/generate-gbp-pack.ts
//
// Generate a Google Business Profile optimization pack: a ready-to-paste
// description, category suggestions, attributes, post ideas, and a NAP
// (Name/Address/Phone) consistency sheet.
//
// IMPORTANT: This does NOT push to Google. The Business Profile API requires
// verified ownership and approval; v1 produces content the owner pastes in
// manually. The pack is the deliverable you hand the client.
//
// Usage:
//   npm run gen:gbp -- <client-slug> > gbp-<slug>.md

import { getClient } from '../src/lib/clients'
import { generate } from '../src/lib/llm/client'

const SYSTEM = `You are a local-SEO specialist preparing a Google Business Profile (GBP) optimization pack for a small hospitality business.

Given the business config JSON, produce a MARKDOWN document with these sections:

## Business description
A 720-750 character GBP "from the business" description. Truthful to the facts, naturally includes the locality and primary category, no keyword stuffing, no fake claims.

## Primary & secondary categories
The single best primary GBP category, plus 2-4 secondary categories, with one line each on why.

## Attributes to enable
Bullet list of GBP attributes likely to apply (e.g. "Outdoor seating", "Serves vegetarian", "Accepts UPI"), based only on the facts given. Mark any that are guesses as "(confirm)".

## NAP consistency sheet
The exact Name, Address, Phone the owner should use IDENTICALLY across GBP, the website, Instagram, and directories. Flag that inconsistent NAP hurts local ranking.

## First 5 Google Posts
Five short post ideas (title + 1-2 sentence body each) the owner can publish over the first month.

## Photo checklist
A short prioritized list of photos to upload (exterior, interior, food/rooms, team) and why each matters for ranking.

Rules: invent nothing not in the facts; mark guesses "(confirm)". No fake reviews or ratings. Plain language.`

async function main() {
  const slug = process.argv[2]
  if (!slug) {
    console.error('Usage: npm run gen:gbp -- <client-slug>')
    process.exit(1)
  }

  const client = getClient(slug)
  if (!client) {
    console.error(`No client config found for slug: ${slug}`)
    process.exit(1)
  }

  const result = await generate({
    userId: client.slug,
    tier: 'client',
    kind: 'synthesis',   // multi-part document → Sonnet
    systemPrompt: SYSTEM,
    userInput: JSON.stringify(client),
  })

  console.error(`\n✓ GBP pack via ${result.model} — cost $${result.costUsd.toFixed(5)}\n`)
  console.log(result.text)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
