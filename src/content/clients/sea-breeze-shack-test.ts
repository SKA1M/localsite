// src/content/clients/sea-breeze-shack-test.ts  — REVIEW & EDIT before shipping
import type { ClientConfig } from '@/lib/types'

export const seaBreezeShackTest: ClientConfig = {
  slug: "sea-breeze-shack-test",
  name: "Sea Breeze Shack",
  businessType: "Restaurant" as ClientConfig['businessType'],
  tagline: "Whole Grilled Pomfret Above Vagator's Black Rocks",
  locality: "Vagator",
  region: "Goa",
  country: "India",
  phone: "+919823456789",
  whatsapp: "+919823456789",
  instagram: "seabreezeshack",
  googleReviewUrl: "https://g.page/r/CdXkP2mQ8vNaEBM/review",
  mapsUrl: "https://maps.app.goo.gl/VagatorBeachGoa",
  priceRange: "$$",
  // TODO: address
  hours: [{ days: 'Mo-Su', opens: '11:00', closes: '23:00' }],

  hero: {
    headline: "Whole Grilled Pomfret Above Vagator's Black Rocks",
    subhead: "A family-run Goan shack serving fresh seafood and cold kokum coolers since 2009. Walk in or WhatsApp ahead to claim a sunset-facing table.",
  },
  sections: [
  {
    "title": "What's on the Plate",
    "body": "The menu is built around what the boats bring in. Whole grilled pomfret and prawn balchão are the regulars, alongside a classic Goan fish curry rice that's been on the menu since day one. Wash it down with sol kadi or a kokum cooler made in-house."
  },
  {
    "title": "The Setting",
    "body": "The shack sits open-air above Vagator's black rock shoreline, so the breeze and the view come free with every meal. Sunsets here tend to stretch long — most guests end up staying well past the last round."
  },
  {
    "title": "Family-Run Since 2009",
    "body": "Sea Breeze Shack has been run by the same family for over fifteen years, and it shows in the consistency of the food and the unhurried pace of service. It's the kind of place regulars return to every Goa trip."
  },
  {
    "title": "How to find us",
    "body": "Take the lane off Ozran Beach Road towards the black rocks viewpoint — we're the shack with the blue-and-white striped awning, 50m before the cliff edge."
  }
],
  highlights: ["Whole grilled pomfret","Sunset sea views","Open-air shack","Family-run since 2009","Prawn balchão"],
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
    title: "Sea Breeze Shack – Seafood Restaurant in Vagator, Goa",
    description: "Fresh grilled pomfret, prawn balchão and Goan fish curry at Sea Breeze Shack in Vagator. Family-run since 2009. Walk in or WhatsApp for a table.",
    // TODO: ogImage — add absolute URL once a hero photo is ready
  },
}
