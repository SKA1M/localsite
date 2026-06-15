import Link from 'next/link'
import { DEFAULT_ACCENT } from '@/lib/config'

export default function NotFound() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        maxWidth: 640,
        margin: '0 auto',
        padding: '4rem 1.25rem',
        textAlign: 'center',
      }}
    >
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>404</h1>
      <p style={{ color: '#555', marginBottom: '1.5rem' }}>
        This page doesn't exist or the business has moved.
      </p>
      <Link href="/" style={{ color: DEFAULT_ACCENT }}>
        Back to home
      </Link>
    </main>
  )
}
