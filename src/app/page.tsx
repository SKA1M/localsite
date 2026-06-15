// src/app/page.tsx — simple index listing the live client sites.
import Link from 'next/link'
import { allClients } from '@/lib/clients'

export default function Home() {
  const clients = allClients()
  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', maxWidth: 640, margin: '0 auto', padding: '3rem 1.25rem' }}>
      <h1>LocalSite</h1>
      <p style={{ color: '#666' }}>Landing pages, built fast for local businesses.</p>
      <ul>
        {clients.map((c) => (
          <li key={c.slug} style={{ margin: '0.5rem 0' }}>
            <Link href={`/${c.slug}`}>{c.name}</Link> — {c.locality}
          </li>
        ))}
      </ul>
    </main>
  )
}
