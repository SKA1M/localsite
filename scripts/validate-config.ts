// Runs at prebuild: fails fast if any client config has missing SEO fields
// or a meta description over 155 chars (the point where Google truncates).
import { allClients } from '../src/lib/clients'

const clients = allClients()
let errors = 0

for (const c of clients) {
  if (!c.seo.title) {
    console.error(`[${c.slug}] Missing seo.title`)
    errors++
  }
  if (!c.seo.description) {
    console.error(`[${c.slug}] Missing seo.description`)
    errors++
  } else if (c.seo.description.length > 155) {
    console.error(
      `[${c.slug}] seo.description is ${c.seo.description.length} chars (max 155): "${c.seo.description}"`,
    )
    errors++
  }
}

if (errors > 0) {
  console.error(`\n${errors} config error(s). Fix before building.`)
  process.exit(1)
}
console.log(`✓ ${clients.length} client config(s) valid.`)
