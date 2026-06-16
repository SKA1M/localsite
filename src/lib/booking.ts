import type { ClientConfig } from './types'

const FOOD_TYPES = new Set(['Restaurant', 'CafeOrCoffeeShop', 'BarOrPub'])
const STAY_TYPES = new Set(['LodgingBusiness', 'Hostel'])

function bookingMessage(businessType: ClientConfig['businessType']): string {
  if (FOOD_TYPES.has(businessType)) return "I'd like to book a table."
  if (STAY_TYPES.has(businessType)) return "I'd like to book a room."
  return "I'd like to get in touch."
}

function waLink(number: string, businessName: string, businessType: ClientConfig['businessType']) {
  const digits = number.replace(/[^\d]/g, '')
  const text = encodeURIComponent(`Hi ${businessName}, ${bookingMessage(businessType)} `)
  return `https://wa.me/${digits}?text=${text}`
}

export function getBookingCta(
  client: ClientConfig,
): { href: string; label: string } | null {
  if (client.bookingUrl) return { href: client.bookingUrl, label: 'Book now' }
  if (client.whatsapp) return { href: waLink(client.whatsapp, client.name, client.businessType), label: 'Book on WhatsApp' }
  if (client.phone) return { href: `tel:${client.phone}`, label: 'Call to book' }
  return null
}
