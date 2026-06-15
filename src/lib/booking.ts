import type { ClientConfig } from './types'

function waLink(number: string, businessName: string) {
  const digits = number.replace(/[^\d]/g, '')
  const text = encodeURIComponent(`Hi ${businessName}, I'd like to book a table / room. `)
  return `https://wa.me/${digits}?text=${text}`
}

export function getBookingCta(
  client: ClientConfig,
): { href: string; label: string } | null {
  if (client.bookingUrl) return { href: client.bookingUrl, label: 'Book now' }
  if (client.whatsapp) return { href: waLink(client.whatsapp, client.name), label: 'Book on WhatsApp' }
  if (client.phone) return { href: `tel:${client.phone}`, label: 'Call to book' }
  return null
}
