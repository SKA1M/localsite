import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LocalSite',
  robots: { index: false, follow: false },
}

export default function Home() {
  return (
    <main
      style={{
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        color: '#cbd5e1',
        textAlign: 'center',
      }}
    >
      <span style={{ fontSize: '1rem', fontWeight: 600, letterSpacing: '0.08em' }}>
        LocalSite
      </span>
    </main>
  )
}
