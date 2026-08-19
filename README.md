# Er. Raja Dey — Civil Engineer

A production-grade, **Notion-powered portfolio for civil engineers, structural engineers, architects, surveyors, GIS engineers, construction companies and infrastructure consultants**.

Built to look like an expensive agency site and to be operated by a non-technical engineer: **every word, image and case study is editable in Notion** — no code touched after deploying.

![Stack](https://img.shields.io/badge/Next.js-15-black) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-v4-38bdf8) ![CMS](https://img.shields.io/badge/CMS-Notion-000) ![Deploy](https://img.shields.io/badge/Deploy-Vercel-black)

---

## ✦ Why it's different

| | |
|---|---|
| **Runs instantly** | Ships with realistic showcase content (bridges, highways, metro viaducts, GIS atlases). Deploy first, connect Notion later. |
| **Notion-first CMS** | 20 database types — projects, services, blog, testimonials, FAQs, gallery, SEO, navigation… all discovered **by title**. |
| **ISR + on-demand revalidate** | Content caches for 1 hour; a single webhook call refreshes it instantly. |
| **Agency-grade design** | Dark/light mode, Framer Motion reveals, counters, mega menu, ⌘K search, glassmorphism, marble-smooth lightboxes. |
| **Engineering-specific features** | Before/after comparison slider, construction-phase timeline, project pins on Leaflet maps, print-ready project sheets, RFC-quality project schema. |
| **SEO machinery** | Dynamic metadata, JSON-LD (Organization, Person, CreativeWork, BlogPosting, FAQPage, BreadcrumbList, Review), sitemap, robots, RSS, OG images. |

---

## 1 · Quick start (no Notion needed)

```bash
pnpm install        # or npm install / yarn
pnpm dev            # http://localhost:3000
```

The site immediately runs on the bundled showcase content. To deploy: push to GitHub and import into Vercel — no environment variables required.

## 2 · Connect Notion (5 minutes)

1. **Create an integration** → [notion.so/my-integrations](https://www.notion.so/my-integrations) → copy the *Internal Integration Secret*.
2. **Create your content databases** in Notion (titles matter — see §3). Put them on one root page for tidiness.
3. **Share the page** (⋯ → *Add connections* → your integration).
4. Set env vars in Vercel / `.env.local`:

```env
NOTION_TOKEN=secret_xxxxxxxx
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
REVALIDATE_SECRET=<any random string>
```

That's it — databases are **discovered automatically by name** (e.g. a database titled `Projects`). Prefer explicit IDs? Set `NOTION_DB_PROJECTS=...` etc. (see `.env.example` — every database has an override).

> **Instant updates:** everything is ISR-cached for `REVALIDATE_SECONDS` (default 3600). For immediate refreshes, call
> `POST /api/revalidate?secret=<REVALIDATE_SECRET>` from a Notion automation or n8n/Make webhook.

## 3 · Notion database schemas

Property names are matched **case- and spacing-insensitively**, and everything is optional — missing fields fall back to sensible values (or the bundled sample) rather than breaking the build.

### Content databases (one row per entry)

| Database | Key properties |
|---|---|
| **Projects** | Title · Slug · Category (select) · Client · Budget · Duration · Role · Location · Latitude/Longitude (numbers) · Status (select: Completed / In Progress / Design) · Software & Tags (multi-select) · Problem, Solution, Challenges, Deliverables, Lessons Learned (text, one per line) · Process (text, `Step Title :: description` per line) · Hero Image, Gallery, Before Image, After Image (files) · Videos & Documents (text, `Name \| URL` per line) · Featured, Published (checkbox) · SEO Title, SEO Description |
| **Services** | Title · Slug · Icon (any of `landmark, route, radar, globe2, waves, hardhat, building2, draftingcompass`) · Description · Benefits (lines) · Process (`Title :: desc` lines) · Deliverables (lines) · FAQs (`Question :: Answer` lines) · Image · Pricing · Featured |
| **Blog** | Title · Slug · Author · Date · Category · Tags · Excerpt · Featured Image · Featured · Published · SEO fields — **write the article in the page body**; it's rendered rich via react-notion-x |
| **Testimonials** | Client Name · Company · Role · Rating (1–5) · Review |
| **Gallery** | Caption · Category (select) · Image |
| **FAQs** | Question · Answer |
| **Experience** | Role · Company · Location · Start/End · Current (checkbox) · Description (lines) |
| **Education** | Degree · Institution · Location · Start/End · Grade · Notes |
| **Skills** | Group · Name · Level (0–100) |
| **Certifications** | Name · Issuer · Year · Credential ID |
| **Awards** | Title · Issuer · Year · Description |
| **Research Papers** | Title · Venue · Year · Authors (lines) · Abstract · URL |

### Site-wide databases (first row is the config)

| Database | Key properties |
|---|---|
| **Site Settings** | Company Name · Person · Role · Tagline · Description · Email · Phone · WhatsApp · Address · Office Hours (lines) · Location · Map Center (`lat, lng`) · Resume URL · Clients (lines) · SEO Title/Description/Keywords |
| **Home** | Eyebrow · Headline (lines; last line gets the gradient) · Subline · Primary/Secondary CTA Label + URL · Stats (lines: `value \| suffix \| label`) |
| **About** | Biography (paragraphs separated by blank lines) · Mission · Vision · Values (`Title :: desc` lines) · Memberships (lines) |
| **Navigation** | Label · URL · Description |
| **Footer** | Label · URL · Group (select) |
| **Social Links** | Label · URL · Icon (linkedin, github, twitter, youtube, instagram) |
| **SEO** | (per-database overrides also supported per row: SEO Title / SEO Description) |

> Project and Blog **page bodies** are rendered with react-notion-x (rich text, code highlighting, images, collections) when connected — structured properties still drive the design sections around them.

## 4 · Other environment variables

| Variable | Purpose |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Canonical origin — sitemap, OG URLs, RSS |
| `RESEND_API_KEY` + `CONTACT_TO` + `CONTACT_FROM` | Delivers contact-form email via [Resend](https://resend.com) (without them the form still validates and logs) |
| `NEXT_PUBLIC_GA_ID` / `NEXT_PUBLIC_CLARITY_ID` | Analytics — **loaded only after cookie consent** |
| `REVALIDATE_SECONDS` | ISR window (default 3600) |
| `REVALIDATE_SECRET` | Protects `/api/revalidate` |

## 5 · Architecture

```
app/                     App Router — pages, layouts, sitemap/robots/RSS, API routes
components/
  ui/                    shadcn-style primitives (button, card, dialog, tabs, accordion…)
  layout/                header (mega menu, search, mobile), footer, breadcrumbs, theme
  shared/                reveal/counter/CTA/newsletter/cookie banner/print/…
features/                domain blocks: home sections, projects, blog, map, gallery, media, contact, about, notion renderer, testimonials
lib/                     config, utils, SEO helpers, JSON-LD, formatting, **fallback showcase content**
notion/                  CMS layer — client, db registry/discovery, property extractors, mappers, cached getters, record maps
hooks/                   use-debounce, use-media-query
utils/                   groupBy, uniq, clamp…
types/                   CMS domain types (1:1 with Notion databases)
styles/                  Tailwind v4 tokens + third-party skins + print rules
```

**Data flow:** Page (RSC) → cached getter (`unstable_cache`, tag `cms`) → Notion query → mapper → typed domain object → fallback merge. Missing token/database/rows ⇒ showcase content, never a broken build.

**Performance:** static generation + ISR, `next/image` AVIF/WebP everywhere, `optimizePackageImports`, dynamic imports for Leaflet / lightbox / Notion third-party renderers, zero blocking third-party scripts (consent-gated analytics).

**Accessibility:** semantic landmarks, labelled controls, keyboard-navigable mega menu / search / before-after slider / carousel, `prefers-reduced-motion` respected, token-based contrast to WCAG AA.

## 6 · Scripts

```bash
pnpm dev         # develop
pnpm build       # production build
pnpm start       # serve build
pnpm typecheck   # strict TS check
```

## 7 · Customisation cheat-sheet

| Want | Where |
|---|---|
| Brand colors, radius, dark palette | `styles/globals.css` → `:root` / `.dark` tokens |
| Fonts | `app/layout.tsx` (Inter + Manrope via `next/font`) |
| Home page sections | `app/page.tsx` + `features/home/*` |
| Project page layout | `app/projects/[slug]/page.tsx` |
| Showcase content | `lib/fallback/*` |
| Property-name synonyms | `notion/mappers.ts` |

---

Deployed on Vercel, edited in Notion, judged by Lighthouse (target: 95+ across the board).
