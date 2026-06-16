import type { Metadata } from 'next'
import { BASE_URL } from '@/lib/config'
import styles from './page.module.css'

const TITLE = 'LocalSite — Google-ready landing pages for Goa restaurants & cafes'
const DESCRIPTION =
  'Fast, mobile-first landing pages for Goa restaurants, cafes, and hostels. Rank on Google, take bookings on WhatsApp. Ready in under a day.'

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: BASE_URL },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: BASE_URL,
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: TITLE,
    description: DESCRIPTION,
  },
}

const FEATURES = [
  {
    title: 'Mobile landing page',
    body: 'Clean, fast, and beautiful. Loads in under a second on any connection — optimised for the tourist tapping from their phone the moment they land in Goa.',
  },
  {
    title: 'Local SEO + structured data',
    body: 'Schema.org markup, canonical URLs, and proper metadata so Google knows exactly what you are, where you are, and when you open.',
  },
  {
    title: 'WhatsApp booking flow',
    body: 'Your primary CTA opens a WhatsApp chat with a pre-filled message. No booking-system fees, no logins — the way your customers already book.',
  },
  {
    title: 'Google Business Profile pack',
    body: 'A ready-to-paste description, category picks, post ideas, and a NAP consistency sheet. Everything to make your GBP listing work harder on Google Maps.',
  },
] as const

const STEPS = [
  {
    title: 'Share your details',
    body: 'Tell me about your business — name, location, what makes you special, a few photos. A short form or a WhatsApp voice note works fine.',
  },
  {
    title: 'I build and publish your page',
    body: 'I write the copy, wire up the SEO, and publish your page — usually within a day. You review before anything goes live.',
  },
  {
    title: 'Get found and take bookings',
    body: "Your page goes live and your GBP pack lands in your inbox. Tourists find you on Google; they book on WhatsApp.",
  },
] as const

export default function Home() {
  const rawWa = process.env.NEXT_PUBLIC_CONTACT_WHATSAPP ?? ''
  const waDigits = rawWa.replace(/[^\d]/g, '')
  const waHref = waDigits
    ? `https://wa.me/${waDigits}?text=${encodeURIComponent(
        "Hi, I'd like to learn more about getting a LocalSite page for my business.",
      )}`
    : null
  const emailHref = process.env.NEXT_PUBLIC_CONTACT_EMAIL
    ? `mailto:${process.env.NEXT_PUBLIC_CONTACT_EMAIL}`
    : null

  return (
    <main className={styles.page}>

      {/* ── Hero ──────────────────────────────────────────── */}
      <section className={styles.hero}>
        <span className={styles.eyebrow}>LocalSite · Goa & India</span>
        <h1 className={styles.heroHeadline}>
          Your restaurant deserves more than an Instagram bio.
        </h1>
        <p className={styles.heroSub}>
          Hundreds of great Goa restaurants, cafes, and hostels run entirely on
          Instagram — invisible to the tourists searching Google right now.
          LocalSite gives you a proper landing page that loads in under a second,
          ranks on Google, and turns searchers into WhatsApp bookings.
        </p>
        {(waHref || emailHref) && (
          <div className={styles.ctaRow}>
            {waHref && (
              <a href={waHref} className={styles.btnWhatsApp} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            )}
            {emailHref && (
              <a href={emailHref} className={styles.btnEmail}>
                Send an email
              </a>
            )}
          </div>
        )}
      </section>

      {/* ── What you get ──────────────────────────────────── */}
      <section className={styles.features}>
        <h2 className={styles.sectionTitle}>What you get</h2>
        <div className={styles.featuresGrid}>
          {FEATURES.map((f) => (
            <div key={f.title} className={styles.featureCard}>
              <h3 className={styles.featureTitle}>{f.title}</h3>
              <p className={styles.featureBody}>{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── How it works ──────────────────────────────────── */}
      <div className={styles.howBand}>
        <div className={styles.howInner}>
          <h2 className={styles.sectionTitle}>How it works</h2>
          <ol className={styles.steps}>
            {STEPS.map((s, i) => (
              <li key={s.title} className={styles.step}>
                <span className={styles.stepNumber} aria-hidden="true">{i + 1}</span>
                <div>
                  <p className={styles.stepTitle}>{s.title}</p>
                  <p className={styles.stepBody}>{s.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      {/* ── Contact CTA ───────────────────────────────────── */}
      <section className={styles.ctaBand}>
        <h2 className={styles.ctaHeadline}>Ready to get found on Google?</h2>
        <p className={styles.ctaSub}>
          Tell me about your business and I'll show you what a LocalSite page
          looks like for you — no commitment.
        </p>
        {(waHref || emailHref) && (
          <div className={styles.ctaRow}>
            {waHref && (
              <a href={waHref} className={styles.btnWhatsApp} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp
              </a>
            )}
            {emailHref && (
              <a href={emailHref} className={styles.btnEmail}>
                Send an email
              </a>
            )}
          </div>
        )}
      </section>

      {/* ── Footer ────────────────────────────────────────── */}
      <footer className={styles.footer}>
        © {new Date().getFullYear()} LocalSite
      </footer>

    </main>
  )
}
