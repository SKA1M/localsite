// src/app/[client]/page.tsx
//
// The landing page. One static page per client, generated at build time from
// its config. No runtime LLM, no DB — pure static output for speed + SEO.

import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getClient, allSlugs } from '@/lib/clients'
import { buildLocalBusinessJsonLd } from '@/lib/structured-data'
import BookingCTA from '@/components/BookingCTA'
import HeroImage from '@/components/HeroImage'
import { BASE_URL, DEFAULT_ACCENT } from '@/lib/config'

// Pre-render every client at build time.
export function generateStaticParams() {
  return allSlugs().map((client) => ({ client }))
}

// Per-client SEO metadata — title, description, Open Graph.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ client: string }>
}): Promise<Metadata> {
  const { client: slug } = await params
  const c = getClient(slug)
  if (!c) return {}

  const url = `${BASE_URL}/${c.slug}`
  return {
    title: c.seo.title,
    description: c.seo.description,
    alternates: { canonical: url },
    openGraph: {
      title: c.seo.title,
      description: c.seo.description,
      url,
      type: 'website',
      ...(c.seo.ogImage ? { images: [{ url: c.seo.ogImage }] } : {}),
    },
    twitter: {
      card: c.seo.ogImage ? 'summary_large_image' : 'summary',
      title: c.seo.title,
      description: c.seo.description,
    },
  }
}

export default async function LandingPage({
  params,
}: {
  params: Promise<{ client: string }>
}) {
  const { client: slug } = await params
  const c = getClient(slug)
  if (!c) notFound()

  const accent = c.accent ?? DEFAULT_ACCENT
  const url = `${BASE_URL}/${c.slug}`
  const jsonLd = buildLocalBusinessJsonLd(c, url)

  return (
    <main style={{ fontFamily: 'system-ui, sans-serif', color: '#1a1a1a' }}>
      {/* Structured data for local SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section
        style={{
          padding: '3.5rem 1.25rem 2.5rem',
          maxWidth: 720,
          margin: '0 auto',
          textAlign: 'center',
        }}
      >
        <p style={{ color: accent, fontWeight: 600, letterSpacing: 0.4, margin: 0 }}>
          {c.name} · {c.locality}
        </p>
        <h1 style={{ fontSize: 'clamp(1.8rem, 5vw, 2.6rem)', lineHeight: 1.15, margin: '0.75rem 0' }}>
          {c.hero.headline}
        </h1>
        <p style={{ fontSize: '1.1rem', color: '#444', maxWidth: 560, margin: '0 auto 1.5rem' }}>
          {c.hero.subhead}
        </p>
        <BookingCTA client={c} accent={accent} />
        {c.seo.ogImage && <HeroImage src={c.seo.ogImage} alt={c.name} />}
      </section>

      {/* Highlights */}
      {c.highlights.length > 0 && (
        <section style={{ maxWidth: 720, margin: '0 auto', padding: '0 1.25rem' }}>
          <ul
            style={{
              listStyle: 'none',
              padding: 0,
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.5rem',
              justifyContent: 'center',
            }}
          >
            {c.highlights.map((h) => (
              <li
                key={h}
                style={{
                  background: '#f3f4f6',
                  borderRadius: 999,
                  padding: '0.4rem 0.9rem',
                  fontSize: '0.9rem',
                }}
              >
                {h}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Content sections */}
      <div style={{ maxWidth: 680, margin: '0 auto', padding: '2.5rem 1.25rem' }}>
        {c.sections.map((s) => (
          <section key={s.title} style={{ marginBottom: '2rem' }}>
            <h2 style={{ fontSize: '1.3rem', marginBottom: '0.5rem' }}>{s.title}</h2>
            <p style={{ color: '#444', lineHeight: 1.6, margin: 0 }}>{s.body}</p>
          </section>
        ))}

        {/* Contact / hours footer */}
        <footer style={{ borderTop: '1px solid #eee', paddingTop: '1.5rem', color: '#555', fontSize: '0.95rem' }}>
          {c.address && (
            <p style={{ margin: '0 0 0.5rem' }}>
              {[c.address.street, c.address.locality, c.address.region, c.address.postalCode]
                .filter(Boolean)
                .join(', ')}
            </p>
          )}
          {c.hours?.map((h) => (
            <p key={h.days} style={{ margin: '0 0 0.25rem' }}>
              {h.days}: {h.opens}–{h.closes}
            </p>
          ))}
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', marginTop: '0.75rem' }}>
            {c.phone && <a href={`tel:${c.phone}`} style={{ color: accent }}>Call</a>}
            {c.instagram && (
              <a href={`https://instagram.com/${c.instagram}`} style={{ color: accent }} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            )}
            {c.googleReviewUrl && (
              <a href={c.googleReviewUrl} style={{ color: accent }} target="_blank" rel="noopener noreferrer">
                Reviews
              </a>
            )}
          </div>
        </footer>
      </div>
    </main>
  )
}
