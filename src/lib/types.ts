// src/lib/types.ts
//
// The shape of a single client's landing site. One config object per business
// lives in src/content/clients/<slug>.ts. Onboarding a new business = adding a
// config file, not touching app code.

/** schema.org type used for JSON-LD structured data (local SEO). */
export type BusinessType =
  | 'Restaurant'
  | 'CafeOrCoffeeShop'
  | 'BarOrPub'
  | 'LodgingBusiness'
  | 'Hostel'
  | 'LocalBusiness'

export interface BusinessHours {
  /** e.g. "Mo-Fr", "Sa", "Su" — schema.org dayOfWeek shorthand */
  days: string
  /** 24h, e.g. "09:00" */
  opens: string
  /** 24h, e.g. "23:00" */
  closes: string
}

export interface ClientConfig {
  slug: string
  name: string
  businessType: BusinessType
  /** One-line tagline shown under the business name. */
  tagline: string
  /** Town/area, e.g. "Palolem, Goa" — used in copy and SEO. */
  locality: string
  region: string // e.g. "Goa"
  country: string // ISO, e.g. "IN"

  // ----- Contact / booking. WhatsApp is the primary CTA for India. -----
  /** Full intl phone for click-to-call + WhatsApp, e.g. "+919876543210". */
  phone?: string
  /** If set, the hero CTA opens a WhatsApp chat. */
  whatsapp?: string
  /** Optional external booking link (overrides WhatsApp/phone as primary CTA). */
  bookingUrl?: string
  /** Public Google review URL — links out, never gated (see project #1). */
  googleReviewUrl?: string
  instagram?: string

  // ----- Address (for JSON-LD LocalBusiness + GBP NAP consistency) -----
  address?: {
    street?: string
    locality: string
    region: string
    postalCode?: string
    country: string // ISO
    lat?: number
    lng?: number
  }

  hours?: BusinessHours[]
  /** "$", "$$", "$$$" — schema.org priceRange. */
  priceRange?: string

  // ----- Content (hand-written OR produced by scripts/generate-content.ts) -----
  hero: {
    headline: string
    subhead: string
  }
  sections: Array<{
    title: string
    body: string
  }>
  highlights: string[] // short bullet points, e.g. "Beachfront seating"

  // ----- SEO -----
  seo: {
    title: string // <title>
    description: string // <meta name="description">
    /** Absolute URL to a hero/OG image. */
    ogImage?: string
  }

  /** Brand accent color (hex) for light theming. */
  accent?: string
}
