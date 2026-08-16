# Kaushal Mishra — Portfolio

Personal portfolio and résumé site for **Kaushal Mishra, Senior Frontend Engineer**.
Built with Next.js 16 (App Router), React 19, TypeScript and Tailwind CSS. Fully static —
every route prerenders at build time.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

```bash
npm run build   # production build
npm run start   # serve the production build
```

## Where the content lives

All copy is in one file: **`lib/data.ts`**. Nothing else needs editing to update the site.

| Export | Controls |
| --- | --- |
| `site` | Name, role, location, email, phone, GitHub, LinkedIn, résumé path, availability |
| `seo` | Page title, meta description, keyword list |
| `stats` | The four headline numbers under the hero |
| `capabilities` | The "What I do" cards |
| `experience` | Roles, bullets, tech chips, live demo links |
| `stack` | Technical skill groups |
| `liveProjects` / `landingProjects` / `collegeProjects` | The Projects section |
| `about` | About prose and the "How I work" principles |
| `faqs` | FAQ accordion — also emitted as FAQPage structured data |

Years of experience are calculated from `CAREER_START`, so the number never goes stale.

## Deploying

### Vercel (recommended)

1. Push this folder to a GitHub repository.
2. Import the repo at [vercel.com/new](https://vercel.com/new) — the Next.js preset is detected
   automatically, no build settings to change.
3. Add an environment variable:

   ```
   NEXT_PUBLIC_SITE_URL = https://your-real-domain.com
   ```

   Every canonical URL, Open Graph tag, sitemap entry and JSON-LD `@id` reads from this. Set it
   before you go live, then redeploy.
4. Attach your custom domain in **Project → Settings → Domains**.

Any Node host works too (`npm run build && npm run start`).

## After you deploy — the SEO checklist

The site ships with the on-page work already done. These steps are what actually get you
ranking for your own name:

1. **Set `NEXT_PUBLIC_SITE_URL`** to the live domain and redeploy.
2. **Google Search Console** — add the property, then either verify by DNS or set the
   `GOOGLE_SITE_VERIFICATION` env var (it renders the meta tag for you). Submit
   `https://your-domain.com/sitemap.xml`, then use *URL Inspection → Request indexing* on both
   `/` and `/resume`.
3. **Bing Webmaster Tools** — import the property straight from Search Console.
4. **Link to the domain from profiles you already control**: LinkedIn (Website field), GitHub
   profile URL, X/Twitter bio, dev.to, Stack Overflow. These backlinks are the strongest signal
   tying the name to the domain.
5. **Prefer a name-matching domain** (`kaushalmishra.dev` / `.com`) — exact-name domains rank
   noticeably better for name queries than a generic one.
6. **Keep `sameAs` accurate** in `lib/data.ts` (`site.github`, `site.linkedin`). Google uses it to
   merge this page with your existing profiles into one entity.

## What's already handled

- Per-route `metadata` with canonical URLs, Open Graph and Twitter cards
- Dynamically generated OG image (`app/opengraph-image.tsx`) and favicon (`app/icon.tsx`)
- JSON-LD `@graph`: `Person`, `ProfilePage`, `WebSite`, `ItemList` of projects, `FAQPage`,
  plus `BreadcrumbList` on `/resume`
- `sitemap.xml`, `robots.txt`, and a web manifest
- A second indexable page at `/resume` — more name-anchored text for search engines
- Semantic heading order, skip link, `prefers-reduced-motion` support, no-JS fallback
- Security headers in `next.config.js`

## Structure

```
app/
  layout.tsx            root metadata, fonts, theme script, JSON-LD
  page.tsx              home — section composition
  resume/page.tsx       indexable HTML résumé
  opengraph-image.tsx   generated social preview
  icon.tsx              generated favicon
  sitemap.ts robots.ts manifest.ts
components/             one file per section, plus Reveal / Spotlight / ThemeToggle
lib/data.ts             all content
public/                 résumé PDF
```

Dark by default with a light theme toggle; the choice persists in `localStorage` and is applied
before first paint so there is no flash.
