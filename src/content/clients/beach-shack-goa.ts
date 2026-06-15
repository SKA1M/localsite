// src/content/clients/beach-shack-goa.ts
//
// Example client config. Copy this file, rename, and edit to onboard a business.
// The `hero`, `sections`, `highlights`, and `seo` fields can be hand-written or
// produced by `npm run gen:content -- <slug>` (see scripts/generate-content.ts).

import type { ClientConfig } from '@/lib/types'

export const beachShackGoa: ClientConfig = {
  slug: 'beach-shack-goa',
  name: 'Banyan Beach Shack',
  businessType: 'Restaurant',
  tagline: 'Fresh Goan seafood, feet in the sand',
  locality: 'Palolem, Goa',
  region: 'Goa',
  country: 'IN',

  phone: '+919876543210',
  whatsapp: '+919876543210',
  googleReviewUrl: 'https://g.page/r/EXAMPLE/review',
  instagram: 'banyanbeachshack',

  address: {
    street: 'Palolem Beach Rd',
    locality: 'Palolem',
    region: 'Goa',
    postalCode: '403702',
    country: 'IN',
    lat: 15.0099,
    lng: 74.0233,
  },

  hours: [
    { days: 'Mo-Su', opens: '08:00', closes: '23:30' },
  ],
  priceRange: '$$',

  hero: {
    headline: 'Goan seafood, grilled over coals, right on Palolem Beach',
    subhead:
      'Catch-of-the-day thalis, wood-fired prawns, and cold beer as the sun goes down. Walk-ins welcome — book a sunset table on WhatsApp.',
  },
  sections: [
    {
      title: 'What to expect',
      body: 'A relaxed shack on the sand serving the day’s fresh catch the Goan way — recheado, balchão, and butter-garlic — alongside vegetarian thalis, tandoor, and proper filter coffee. Lanterns after dark, no rush, table for as long as you like.',
    },
    {
      title: 'Find us',
      body: 'Mid-way along Palolem Beach, look for the big banyan tree and the blue lanterns. Two minutes’ walk from the main road; tuk-tuks know us by name.',
    },
  ],
  highlights: [
    'Beachfront seating',
    'Fresh daily catch',
    'Vegetarian & vegan options',
    'Sunset bookings on WhatsApp',
  ],

  seo: {
    title: 'Banyan Beach Shack — Seafood Restaurant on Palolem Beach, Goa',
    description:
      'Fresh Goan seafood grilled on Palolem Beach. Daily catch, thalis, tandoor, cold beer, and sunset tables. Book on WhatsApp. Open daily 8am–11:30pm.',
    // ogImage: add an absolute URL once a real photo is available
  },

  accent: '#0e7490',
}
