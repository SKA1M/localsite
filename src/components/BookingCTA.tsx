// src/components/BookingCTA.tsx
//
// Primary call-to-action. Priority for an India-based hospitality business:
// explicit bookingUrl > WhatsApp click-to-chat > phone call. WhatsApp is how
// most Goa shacks/hostels actually take bookings, so it's the default.

import type { ClientConfig } from '@/lib/types'

function waLink(number: string, businessName: string) {
  const digits = number.replace(/[^\d]/g, '')
  const text = encodeURIComponent(
    `Hi ${businessName}, I'd like to book a table / room. `,
  )
  return `https://wa.me/${digits}?text=${text}`
}

export default function BookingCTA({
  client,
  accent,
}: {
  client: ClientConfig
  accent: string
}) {
  let href: string
  let label: string

  if (client.bookingUrl) {
    href = client.bookingUrl
    label = 'Book now'
  } else if (client.whatsapp) {
    href = waLink(client.whatsapp, client.name)
    label = 'Book on WhatsApp'
  } else if (client.phone) {
    href = `tel:${client.phone}`
    label = 'Call to book'
  } else {
    return null
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '0.85rem 1.6rem',
        borderRadius: 999,
        background: accent,
        color: '#fff',
        fontWeight: 600,
        textDecoration: 'none',
        fontSize: '1.05rem',
      }}
    >
      {label}
    </a>
  )
}
