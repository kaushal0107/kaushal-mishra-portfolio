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

### Dates are calculated, not typed

Nothing about timing is hardcoded. Each role carries only ISO `start` and (if it ended) `end`
dates; the displayed range (`Aug 2025 — Present`), the duration (`1 yr 1 mo`) and the "current"
badge are all derived. Total years of experience come from `CAREER_START`.

Durations count both the first and last month, matching LinkedIn's convention. Open-ended roles
measure to today and re-measure on every build — so redeploying is all it takes to stay current.
The start date is used only for these calculations; it is never shown on the site.

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

## After you deploy — the SEO playbook

The on-page work is finished. What's left is off-page, and it's the part that actually decides
rankings.

### Be realistic about which queries are winnable

| Query type | Example | Realistic? |
| --- | --- | --- |
| Your name | `Kaushal Mishra`, `Kaushal Mishra resume` | **Yes — this is the goal.** Expect page 1 in weeks, #1 within a few months with the steps below. |
| Name + skill | `Kaushal Mishra React developer` | **Yes**, quickly. |
| Long-tail + local | `senior frontend engineer Mumbai portfolio`, `Next.js SSE streaming engineer India` | **Yes**, with time. Low volume, but the traffic is people who want to hire. |
| Head terms | `frontend developer`, `software engineer` | **No.** Those SERPs belong to Indeed, LinkedIn Jobs, Naukri and Wikipedia. No personal site ranks there, and chasing them wastes effort. |

The site targets the first three deliberately. Recruiters who find you almost always search your
name after seeing a CV or a profile — that is the query that matters.

### Do these, in order

1. **Set `NEXT_PUBLIC_SITE_URL`** to the live domain and redeploy. Nothing else works until the
   canonical URLs are correct.
2. **Use a name-matching domain** — `kaushalmishra.dev` or `.com`. This is the single largest
   factor for name queries; a generic domain measurably underperforms.
3. **Google Search Console** — add the property, verify by DNS or via the
   `GOOGLE_SITE_VERIFICATION` env var (it renders the meta tag for you). Submit
   `/sitemap.xml`, then *URL Inspection → Request indexing* on `/` and `/resume`.
4. **Bing Webmaster Tools** — import straight from Search Console. Bing also feeds ChatGPT search.
5. **Backlinks from profiles you already control.** This is the highest-leverage step and costs
   nothing: LinkedIn Website field, GitHub profile URL, X/Twitter bio, dev.to, Stack Overflow,
   Peerlist, and your email signature. Google uses these to merge the site, your name and your
   profiles into a single entity — which is precisely what makes you rank for your own name.
6. **Keep `site.github` / `site.linkedin` accurate** in `lib/data.ts`. They are emitted as
   schema.org `sameAs` and as `rel="me"` links; both are identity signals.
7. **Redeploy every few months.** Role durations and years of experience recompute at build time,
   and a fresh `lastmod` encourages recrawling.

### What's already handled on-page

- Title under 60 characters so Google shows it in full; name and role both in the `<h1>`
- `Person` schema with six honest job-title variants (Senior Frontend Engineer through Software
  Engineer), degrees as `hasCredential`, languages, work location, and `sameAs` identity links
- `FAQPage` schema on eight questions phrased the way people actually search — including
  "software engineer or frontend developer", location/remote, and where to find the résumé
- `/resume` as a second indexable page, plus the PDF listed in the sitemap (PDFs rank for
  `<name> resume` queries)
- `ProfilePage`, `WebSite`, `ItemList` of projects, and `BreadcrumbList` on `/resume`
- Generated OG image, sitemap with image entry, robots, manifest, canonicals
- Fully static rendering and a hero that paints without waiting for JavaScript, which keeps LCP low

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
