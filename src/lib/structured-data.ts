// src/lib/structured-data.ts
//
// Build schema.org JSON-LD for local SEO. This is the single biggest on-page
// local-SEO lever after a correct title/meta: it tells Google exactly what the
// business is, where, when it's open, and how to contact it.
//
// DELIBERATELY OMITTED: aggregateRating / review. Injecting star ratings you
// don't actually have from a verified source violates Google's structured-data
// policies and risks a manual action. Add it ONLY from real Google data later.

import type { ClientConfig } from './types'

export function buildLocalBusinessJsonLd(c: ClientConfig, pageUrl: string) {
  const jsonLd: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': c.businessType,
    name: c.name,
    description: c.seo.description,
    url: pageUrl,
    ...(c.priceRange ? { priceRange: c.priceRange } : {}),
    ...(c.phone ? { telephone: c.phone } : {}),
    ...(c.seo.ogImage ? { image: c.seo.ogImage } : {}),
  }

  if (c.address) {
    jsonLd.address = {
      '@type': 'PostalAddress',
      ...(c.address.street ? { streetAddress: c.address.street } : {}),
      addressLocality: c.address.locality,
      addressRegion: c.address.region,
      ...(c.address.postalCode ? { postalCode: c.address.postalCode } : {}),
      addressCountry: c.address.country,
    }
    if (c.address.lat != null && c.address.lng != null) {
      jsonLd.geo = {
        '@type': 'GeoCoordinates',
        latitude: c.address.lat,
        longitude: c.address.lng,
      }
    }
  }

  if (c.hours?.length) {
    jsonLd.openingHoursSpecification = c.hours.map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: expandDays(h.days),
      opens: h.opens,
      closes: h.closes,
    }))
  }

  const sameAs: string[] = []
  if (c.instagram) sameAs.push(`https://instagram.com/${c.instagram}`)
  if (sameAs.length) jsonLd.sameAs = sameAs

  return jsonLd
}

// "Mo-Su" / "Mo-Fr" / "Sa" -> array of full day names schema.org expects.
const DAY_ORDER = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'] as const
const FULL: Record<string, string> = {
  Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday',
  Fr: 'Friday', Sa: 'Saturday', Su: 'Sunday',
}

function expandDays(spec: string): string[] {
  return spec.split(',').flatMap((part) => {
    const range = part.trim().split('-')
    if (range.length === 1) return [FULL[range[0]] ?? range[0]]
    const start = DAY_ORDER.indexOf(range[0] as (typeof DAY_ORDER)[number])
    const end = DAY_ORDER.indexOf(range[1] as (typeof DAY_ORDER)[number])
    if (start < 0 || end < 0) return []
    return DAY_ORDER.slice(start, end + 1).map((d) => FULL[d])
  })
}
