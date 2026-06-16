// src/content/clients/sea-breeze-shack-test.ts  — REVIEW & EDIT before shipping
import type { ClientConfig } from '@/lib/types'

export const seaBreezeShackTest: ClientConfig = {
  slug: "sea-breeze-shack-test",
  name: "Sea Breeze Shack",
  businessType: "Restaurant" as ClientConfig['businessType'],
  tagline: "Whole Grilled Pomfret & Sunset Views Above Vagator's Black Rocks",
  locality: "Vagator",
  region: "Goa",
  country: "India",
  phone: "+919823456789",
  whatsapp: "+919823456789",
  instagram: "seabreezeshack",
  googleReviewUrl: "https://g.page/r/CdXkP2mQ8vNaEBM/review",
  mapsUrl: "https://maps.app.goo.gl/VagatorBeachGoa",
  priceRange: "$$",
  hours: [{ days: 'Mo-Su', opens: '11:00', closes: '23:00' }],
  // TODO: address (street + postalCode) — add when confirmed

  hero: {
    headline: "Whole Grilled Pomfret & Sunset Views Above Vagator's Black Rocks",
    subhead: "A family-run Goa shack open since 2009, serving fresh catch and Goan classics. Walk in or WhatsApp ahead to hold a table before sunset.",
  },
  sections: [
  {
    "title": "What We're Known For",
    "body": "The whole grilled pomfret is ordered by nearly every table — caught fresh, marinated simply, cooked over open flame. Pair it with sol kadi or a kokum cooler to balance the heat. Prawn balchão and Goan fish curry rice round out a menu that hasn't needed much changing in fifteen years."
  },
  {
    "title": "The Setting",
    "body": "The shack sits above the black rocks at Vagator, open to the sea breeze on all sides. Sunsets here run long and unhurried — the kind that make the last round stretch into one more. It's an informal, no-fuss space that works for families, couples, and solo diners equally."
  },
  {
    "title": "How to find us",
    "body": "Take the lane off Ozran Beach Road towards the black rocks viewpoint — we're the shack with the blue-and-white striped awning, 50m before the cliff edge."
  }
],
  highlights: ["Fresh grilled pomfret","Open-air seating","Sunset rock views","Family-run since 2009","Goan coastal menu"],
  menu: [
    {
      category: 'Seafood & Mains',
      items: [
        { name: 'Grilled whole pomfret', price: '₹480' },
        { name: 'Prawn balchão', price: '₹320' },
        { name: 'Fish curry rice', price: '₹180' },
        { name: 'Crab xec xec', price: '₹540' },
        { name: 'Vegetable cafreal', price: '₹220' },
      ],
    },
    {
      category: 'Drinks',
      items: [
        { name: 'Kokum cooler', price: '₹80' },
        { name: 'Kingfisher', price: '₹120' },
      ],
    },
  ],

  // TODO: gallery — add absolute image URLs once photos are ready
  // gallery: [],

  // TODO: reviewQuotes — add owner-supplied testimonials if available
  // reviewQuotes: [{ quote: '...', author: '...' }],

  seo: {
    title: "Sea Breeze Shack Vagator – Seafood Restaurant Goa",
    description: "Sea Breeze Shack in Vagator, Goa serves whole grilled pomfret, prawn balchão, and sol kadi with open-air sunset views. WhatsApp to book your table.",
    // TODO: ogImage — add absolute URL once a hero photo is ready
  },
}
