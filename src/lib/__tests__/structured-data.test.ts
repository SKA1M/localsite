import { describe, it, expect } from 'vitest'
import { buildLocalBusinessJsonLd } from '../structured-data'
import type { ClientConfig } from '../types'

const client: ClientConfig = {
  slug: 'test-biz',
  name: 'Test Business',
  businessType: 'LocalBusiness',
  tagline: 'A test business',
  locality: 'Test City',
  region: 'Test Region',
  country: 'IN',
  hero: { headline: 'Headline', subhead: 'Subhead' },
  sections: [],
  highlights: [],
  seo: { title: 'Test Business — Test City', description: 'A test business in Test City.' },
}

const jsonLdString = JSON.stringify(buildLocalBusinessJsonLd(client, 'https://example.com/test-biz'))

describe('buildLocalBusinessJsonLd — compliance guard', () => {
  it('never emits aggregateRating', () => {
    expect(jsonLdString).not.toContain('aggregateRating')
  })

  it('never emits review', () => {
    expect(jsonLdString).not.toContain('"review"')
  })
})
