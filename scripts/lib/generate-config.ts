import { generate } from '../../src/lib/llm/client'

export interface BusinessFacts {
  slug: string
  name: string
  businessType: string
  /** Broad category bucket — informs copy tone ('food' | 'stay' | 'other'). */
  category?: string
  locality: string
  region: string
  country: string
  vibe: string
  offerings: string[]
  audience?: string
}

export interface GeneratedContent {
  heroHeadline: string
  heroSubhead: string
  sections: Array<{ title: string; body: string }>
  highlights: string[]
  seoTitle: string
  seoDescription: string
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

export async function generateClientContent(
  facts: BusinessFacts,
): Promise<{ content: GeneratedContent; model: string; costUsd: number }> {
  const result = await generate({
    userId: facts.slug,
    tier: 'client',
    kind: 'narrative',
    systemPrompt: SYSTEM,
    userInput: JSON.stringify(facts),
  })

  const clean = result.text.replace(/```json|```/g, '').trim()
  let content: GeneratedContent
  try {
    content = JSON.parse(clean)
  } catch {
    throw new Error(`Model did not return valid JSON. Raw output:\n${result.text}`)
  }

  return { content, model: result.model, costUsd: result.costUsd }
}

export const j = (s: unknown) => JSON.stringify(s ?? '')
export const camel = (slug: string) =>
  slug.replace(/-([a-z])/g, (_, ch) => ch.toUpperCase())
