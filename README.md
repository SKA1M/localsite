# LocalSite

Fast, mobile-first landing pages + Google Business Profile (GBP) optimization
for small local businesses. One Next.js app serves many client sites, each
**statically generated** from a config file — so the live sites are instant,
cheap to host, and have zero runtime dependencies.

The cost-aware `lib/llm` client (vendored from `ai-starter-kit`) powers two
**build-time** generator scripts: landing copy + SEO, and the GBP pack. The
deployed pages never call an LLM.

## The two honest constraints (read these)

1. **GBP is not auto-pushed.** Google's Business Profile API needs verified
   ownership + approval. v1 *generates* an optimization pack (description,
   categories, attributes, posts, NAP sheet, photo checklist) that you or the
   owner paste into GBP by hand. That's the real workflow today.
2. **No fake ratings in structured data.** `src/lib/structured-data.ts`
   deliberately omits `aggregateRating`. Injecting star ratings you don't have
   from a verified source violates Google's structured-data policy and risks a
   manual penalty. Add it only from real Google numbers.

## Stack

Next.js (App Router, static export-friendly) · TypeScript · vendored `lib/llm`.
Sites render with no DB and no runtime LLM. Supabase is touched only by the
generator scripts (to log LLM usage metadata).

## Workflow per client

1. Write the raw facts as JSON (see `scripts/inputs/` — create this folder):
   ```json
   {
     "slug": "beach-shack-goa",
     "name": "Banyan Beach Shack",
     "businessType": "Restaurant",
     "locality": "Palolem, Goa",
     "region": "Goa",
     "country": "IN",
     "vibe": "relaxed beach shack, fresh daily catch, sunset crowd",
     "offerings": ["fresh seafood", "vegetarian thalis", "tandoor", "cold beer"],
     "audience": "backpackers, couples, families"
   }
   ```
2. Generate the config (review & edit the output — never ship unread AI copy):
   ```bash
   npm run gen:content -- ./scripts/inputs/beach-shack-goa.json > src/content/clients/beach-shack-goa.ts
   ```
3. Fill in the TODOs (phone, WhatsApp, address, hours), then register it in
   `src/lib/clients.ts`.
4. Generate the GBP pack to hand the owner:
   ```bash
   npm run gen:gbp -- beach-shack-goa > gbp-beach-shack-goa.md
   ```
5. `npm run dev`, visit `/beach-shack-goa`. Deploy when happy.

An example client (`beach-shack-goa`) ships pre-wired so the app runs immediately.

## What's scaffolded vs. left to Claude Code

Done: config-driven static landing pages, per-client SEO metadata + Open Graph,
JSON-LD `LocalBusiness` structured data (no fake ratings), WhatsApp-first booking
CTA, content + GBP generator scripts via `lib/llm`, example client, root index.

---

### Claude Code prompt (paste at the repo root)

> This is LocalSite — a Next.js + TypeScript app that statically generates local
> business landing pages from config files in `src/content/clients/`, and uses a
> vendored cost-aware Anthropic client in `src/lib/llm` for two build-time
> generator scripts. Read the README's "two honest constraints" first:
> never auto-fake `aggregateRating`, and GBP content is generated for manual
> paste, not pushed via API.
>
> Finish these, running `npm run typecheck` after each:
> 1. Add `next.config.js` (enable `output: 'export'` for static hosting) and
>    `next-env.d.ts` so the app builds and exports cleanly.
> 2. Add a `not-found.tsx` and confirm `/[client]` 404s for unknown slugs.
> 3. Generate a `sitemap.ts` and `robots.ts` covering every client slug — these
>    matter for the local-SEO pitch.
> 4. Add a tiny image component using `next/image` with width/height so Core Web
>    Vitals (LCP/CLS) stay green; wire `ogImage` into the hero when present.
> 5. Add a Vitest unit test for `buildLocalBusinessJsonLd` asserting it never
>    emits `aggregateRating` or `review` keys (compliance regression guard).
> 6. Add a `validate-config` script that fails the build if any client config is
>    missing required SEO fields or has a description over 155 chars.
>
> Use the kit's `/quality-gate` command before finishing.
