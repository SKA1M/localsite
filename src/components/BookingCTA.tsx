import type { ClientConfig } from '@/lib/types'
import { getBookingCta } from '@/lib/booking'

export default function BookingCTA({ client }: { client: ClientConfig }) {
  const cta = getBookingCta(client)
  if (!cta) return null

  return (
    <a
      href={cta.href}
      target="_blank"
      rel="noopener noreferrer"
      style={{
        display: 'inline-block',
        padding: '0.9rem 2rem',
        borderRadius: 999,
        background: 'var(--accent)',
        color: '#fff',
        fontWeight: 700,
        textDecoration: 'none',
        fontSize: '1.05rem',
      }}
    >
      {cta.label}
    </a>
  )
}
