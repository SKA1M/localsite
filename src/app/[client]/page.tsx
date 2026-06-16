import type { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { getClient, allSlugs } from '@/lib/clients'
import { buildLocalBusinessJsonLd } from '@/lib/structured-data'
import { BASE_URL, DEFAULT_ACCENT } from '@/lib/config'
import { getBookingCta } from '@/lib/booking'
import BookingCTA from '@/components/BookingCTA'
import HeroImage from '@/components/HeroImage'
import styles from './page.module.css'

export function generateStaticParams() {
  return allSlugs().map((client) => ({ client }))
}

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
  const cta = getBookingCta(c)

  return (
    <main
      className={styles.page}
      style={{ '--accent': accent } as React.CSSProperties}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <span className={styles.heroLabel}>{c.name} · {c.locality}</span>
        <h1 className={styles.heroHeadline}>{c.hero.headline}</h1>
        <p className={styles.heroSubhead}>{c.hero.subhead}</p>
        <BookingCTA client={c} />
      </section>

      {/* ── Hero image ────────────────────────────────────── */}
      {c.seo.ogImage && (
        <div className={styles.heroImageWrap}>
          <HeroImage src={c.seo.ogImage} alt={c.name} />
        </div>
      )}

      {/* ── Highlights ────────────────────────────────────── */}
      {c.highlights.length > 0 && (
        <section className={styles.highlights}>
          <ul className={styles.chipList}>
            {c.highlights.map((h) => (
              <li key={h} className={styles.chip}>{h}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Menu (linked) ────────────────────────────────── */}
      {c.menuLinkUrl && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Menu</h2>
          <a
            href={c.menuLinkUrl}
            className={styles.menuLinkBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            View our current menu →
          </a>
        </section>
      )}

      {/* ── Menu (structured) ────────────────────────────── */}
      {!c.menuLinkUrl && c.menu && c.menu.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Menu</h2>
          {c.menu.map((cat) => (
            <div key={cat.category} className={styles.menuCategory}>
              <h3 className={styles.menuCategoryTitle}>{cat.category}</h3>
              <ul className={styles.menuItemList}>
                {cat.items.map((item) => (
                  <li key={item.name} className={styles.menuItem}>
                    <span className={styles.menuItemName}>{item.name}</span>
                    {item.price && (
                      <span className={styles.menuItemPrice}>{item.price}</span>
                    )}
                    {item.description && (
                      <p className={styles.menuItemDesc}>{item.description}</p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      )}

      {/* ── Amenities (Stay category) ─────────────────────── */}
      {c.amenities && c.amenities.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>What&apos;s included</h2>
          <ul className={styles.chipList}>
            {c.amenities.map((a) => (
              <li key={a} className={styles.chip}>{a}</li>
            ))}
          </ul>
        </section>
      )}

      {/* ── Gallery ───────────────────────────────────────── */}
      {c.gallery && c.gallery.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Gallery</h2>
          <div className={styles.galleryGrid}>
            {c.gallery.map((src, i) => (
              <div key={i} className={styles.galleryItem}>
                <Image
                  src={src}
                  alt={`${c.name} — photo ${i + 1}`}
                  fill
                  sizes="(max-width: 480px) 50vw, 33vw"
                  style={{ objectFit: 'cover' }}
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── Content sections ──────────────────────────────── */}
      {c.sections.map((s) => (
        <section key={s.title} className={styles.section}>
          <h2 className={styles.sectionTitle}>{s.title}</h2>
          <p className={styles.sectionBody}>{s.body}</p>
        </section>
      ))}

      {/* ── Reviews ───────────────────────────────────────── */}
      {/* reviewQuotes are owner-supplied testimonials — NOT scraped Google reviews.
          JSON-LD aggregateRating is deliberately omitted. See structured-data.ts. */}
      {c.reviewQuotes && c.reviewQuotes.length > 0 && (
        <div className={styles.reviewsBand}>
          <div className={styles.reviewsInner}>
            <h2 className={styles.sectionTitle}>What guests say</h2>
            <div className={styles.reviewsGrid}>
              {c.reviewQuotes.map((r, i) => (
                <blockquote key={i} className={styles.reviewCard}>
                  <p className={styles.reviewQuote}>"{r.quote}"</p>
                  <footer className={styles.reviewAuthor}>— {r.author}</footer>
                </blockquote>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Map ───────────────────────────────────────────── */}
      {c.address?.lat != null && c.address?.lng != null && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>Location</h2>
          <iframe
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${c.address.lng - 0.005},${c.address.lat - 0.003},${c.address.lng + 0.005},${c.address.lat + 0.003}&layer=mapnik&marker=${c.address.lat},${c.address.lng}`}
            className={styles.mapFrame}
            title={`Map — ${c.name}`}
          />
          <a
            href={c.mapsUrl ?? `https://www.openstreetmap.org/?mlat=${c.address.lat}&mlon=${c.address.lng}#map=17/${c.address.lat}/${c.address.lng}`}
            className={styles.mapLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Open in maps ↗
          </a>
        </section>
      )}

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className={styles.footer}>
        {c.address && (
          <p className={styles.footerAddress}>
            {[c.address.street, c.address.locality, c.address.region, c.address.postalCode]
              .filter(Boolean)
              .join(', ')}
          </p>
        )}
        {c.hours?.map((h) => (
          <p key={h.days} className={styles.footerHours}>
            {h.days}: {h.opens}–{h.closes}
          </p>
        ))}
        <div className={styles.footerLinks}>
          {c.phone && (
            <a href={`tel:${c.phone}`} className={styles.footerLink}>Call</a>
          )}
          {c.instagram && (
            <a
              href={`https://instagram.com/${c.instagram.replace(/^@/, '')}`}
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          )}
          {c.googleReviewUrl && (
            <a
              href={c.googleReviewUrl}
              className={styles.footerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Leave a review
            </a>
          )}
        </div>
      </footer>

      {/* ── Sticky mobile CTA ─────────────────────────────── */}
      {cta && (
        <div className={styles.stickyBar}>
          <a
            href={cta.href}
            className={styles.stickyBarBtn}
            target="_blank"
            rel="noopener noreferrer"
          >
            {cta.label}
          </a>
        </div>
      )}
    </main>
  )
}
