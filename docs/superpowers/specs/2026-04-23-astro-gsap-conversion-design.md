# Triton Marine — Astro + GSAP Conversion — Design Spec

**Date:** 2026-04-23
**Status:** Approved (pending user review of this document)

## 1. Goal

Convert the existing static "Induste" HTML / jQuery / Bootstrap 5 template at `induste/` into a modern, bilingual Astro site with subtle GSAP animations, rebranded as **Triton Marine** — a Greek marine services company (boat repair, engine service, hull cleaning, etc.).

The new project lives in a new sibling folder `triton-marine/`. The existing `induste/` and `documentation/` folders remain untouched for reference.

## 2. Scope

### In scope
- 6 pages: home, about, services (list + detail), contact, 404
- Bilingual EN (default, at `/`) + GR (at `/gr/`) with a navbar language toggle
- Tailwind CSS styling with a custom "Deep Sea" palette
- Subtle GSAP animations (scroll reveals, hero text, stats counter, hero parallax)
- Web3Forms-powered contact form (access key added later by user)
- Curated Unsplash marine photography
- SEO: meta tags, Open Graph, sitemap, hreflang, JSON-LD `LocalBusiness`
- Vercel deployment target

### Out of scope (explicitly YAGNI)
- Blog, projects portfolio, pricing pages
- Content collections / CMS (Sanity, Contentful, Decap)
- Automated unit/integration tests (can add later if real logic appears)
- Page transitions between routes
- ScrollSmoother, custom cursor, Lottie, horizontal scroll
- Real brand materials — placeholder logo/palette until user provides them
- Real copy — Lorem Ipsum placeholders until user provides content

## 3. Tech stack

| Area | Choice |
|---|---|
| Framework | Astro 5.x |
| Language | TypeScript 5.x (strict) |
| Styling | Tailwind CSS 4.x via official Astro integration |
| Animation | GSAP 3.13+ core + ScrollTrigger + SplitText + ScrollToPlugin (all free) |
| Icons | `lucide-astro` |
| Fonts | `@fontsource-variable/fraunces` (headings), `@fontsource-variable/inter` (body) |
| i18n | Astro built-in i18n routing |
| Contact form | Web3Forms (third-party, client-side POST) |
| Deploy | Vercel (static output via `@astrojs/vercel`) |
| Sitemap | `@astrojs/sitemap` |
| Package manager | npm |
| Formatting/lint | prettier (with astro + tailwind plugins), eslint |

## 4. Project layout

```
tritonasmarine/
├── induste/                       # untouched reference
├── documentation/                 # untouched reference
├── change-log.txt
├── docs/superpowers/specs/        # this spec
└── triton-marine/                 # NEW Astro project
    ├── public/
    │   ├── favicon.svg
    │   ├── og-default.jpg
    │   └── images/                # curated Unsplash marine photos
    ├── src/
    │   ├── pages/
    │   │   ├── index.astro                     # EN home
    │   │   ├── about.astro
    │   │   ├── contact.astro
    │   │   ├── 404.astro
    │   │   ├── services/
    │   │   │   ├── index.astro                 # list
    │   │   │   └── [slug].astro                # detail (getStaticPaths)
    │   │   └── gr/
    │   │       ├── index.astro
    │   │       ├── about.astro
    │   │       ├── contact.astro
    │   │       ├── 404.astro
    │   │       └── services/
    │   │           ├── index.astro
    │   │           └── [slug].astro
    │   ├── layouts/
    │   │   └── BaseLayout.astro
    │   ├── components/
    │   │   ├── Header.astro
    │   │   ├── Footer.astro
    │   │   ├── LanguageSwitcher.astro
    │   │   ├── Hero.astro
    │   │   ├── ServiceCard.astro
    │   │   ├── ServicesGrid.astro
    │   │   ├── StatsBar.astro
    │   │   ├── CtaSection.astro
    │   │   ├── ContactForm.astro
    │   │   └── SeoHead.astro
    │   ├── data/
    │   │   └── services.ts
    │   ├── i18n/
    │   │   ├── en.json
    │   │   ├── gr.json
    │   │   └── utils.ts
    │   ├── scripts/
    │   │   ├── animations.ts
    │   │   └── contact.ts
    │   └── styles/
    │       └── global.css
    ├── astro.config.mjs
    ├── tailwind.config.mjs
    ├── tsconfig.json
    ├── package.json
    ├── .env.example
    ├── .gitignore
    └── README.md
```

### Simplifications chosen
- No content collections — services are a single TS array.
- No dynamic locale routing — each page has an explicit EN and GR twin under `src/pages/` and `src/pages/gr/`.
- One shared `BaseLayout.astro` for both locales.
- English slugs in both locales (e.g., `/services/engine-service` and `/gr/services/engine-service`) — simpler, minimal SEO cost on a 6-page site.

## 5. Data model

### `src/data/services.ts`

```ts
export type LocalizedString = { en: string; gr: string };

export type Service = {
  slug: string;                   // URL slug, English, used in both locales
  icon: string;                   // lucide icon name, e.g., "wrench"
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;  // Markdown-free plain paragraphs
  heroImage: string;              // path under /public/images/
};

export const services: Service[] = [ /* 6 entries (placeholder content) */ ];
```

### `src/i18n/en.json` / `gr.json`

Flat JSON of UI strings. Example keys:
```
nav.home, nav.about, nav.services, nav.contact
hero.cta_primary, hero.cta_secondary
form.name, form.email, form.phone, form.subject, form.message,
form.submit, form.sending, form.success, form.error,
form.not_configured
footer.copyright, footer.address_label
```

### `src/i18n/utils.ts`

```ts
export type Locale = "en" | "gr";
export function getLocaleFromUrl(url: URL): Locale;        // "/gr/..." → "gr"
export function t(locale: Locale, key: string): string;    // lookup in *.json
export function alternateUrl(url: URL, targetLocale: Locale): string; // for LanguageSwitcher
```

## 6. Visual direction

### Palette — "Deep Sea"

| Token | Hex | Use |
|---|---|---|
| `navy` | `#0B1E2D` | primary backgrounds, headings |
| `deep` | `#0F2A3D` | secondary backgrounds, cards |
| `teal` | `#1E8C8C` | primary accent, links, CTAs |
| `foam` | `#F4F6F7` | light section backgrounds |
| `sand` | `#E8DDC7` | subtle warm accent, overlays |
| `rust` | `#C2552D` | sparingly — key CTA accent |

Exposed as Tailwind theme tokens in `tailwind.config.mjs`.

### Typography

- Headings: **Fraunces** (variable, self-hosted via `@fontsource-variable/fraunces`)
- Body: **Inter** (variable, self-hosted via `@fontsource-variable/inter`)

### Layout language

- Content max-width ~1200px
- Sections alternate `foam` / `navy` backgrounds
- Cards: 1px `navy/10` border on foam, hover shadow only
- `rounded-lg` (8px) corners across the board
- Full-bleed hero images on home and service detail
- Consistent 8px spacing scale (Tailwind defaults)

### Placeholder logo

Text logo "Triton Marine" in Fraunces + inline SVG trident mark. Easy to swap for real logo later (single component: `Header.astro`).

## 7. GSAP animation plan

All GSAP setup lives in `src/scripts/animations.ts`, imported once per layout via a client-side `<script>`. Heavy plugins (SplitText) are imported only on pages that use them. Everything respects `prefers-reduced-motion`.

### Global (every page)
- Page-load fade-in on `<main>` (300ms, once)
- `[data-reveal]` scroll-reveal utility: fade + 20px translate-up on enter (ScrollTrigger)
- Smooth anchor scroll via ScrollToPlugin (600ms)

### Home page
- Hero headline: SplitText word-by-word reveal, 40ms stagger
- Subheading + CTAs: staggered fade-in after headline
- Hero image: slow infinite Ken Burns zoom (10s, ease in/out)
- Stats counter: number tween from 0 to target when StatsBar enters viewport
- Service card hover: Tailwind-only (no GSAP)

### Services list
- Grid stagger: service cards reveal on scroll, 60ms stagger

### Service detail
- Hero image parallax: 0.7× scroll speed (ScrollTrigger)

### About
- Scroll-reveal utility only

### Contact
- Form field focus: Tailwind transitions
- Submit state: disabled button + CSS spinner
- Success state: GSAP timeline — fade form out, fade thank-you message in (400ms)

### Not doing
- No page transitions, no ScrollSmoother, no custom cursor, no Lottie, no pinned/horizontal scroll.

## 8. i18n

- Astro config: `i18n: { defaultLocale: "en", locales: ["en", "gr"], routing: { prefixDefaultLocale: false } }`.
- URL scheme: `/` = EN, `/gr/` = GR.
- Every page exists as two explicit files (EN at `src/pages/...`, GR at `src/pages/gr/...`). Both import the same components and pass `locale` to `BaseLayout`.
- `<html lang="en">` / `<html lang="el">` set per page by `BaseLayout` based on `locale` prop.
- `LanguageSwitcher` in the header: toggles between the current page's EN and GR twin using a small route-mapping helper in `i18n/utils.ts`.
- Service data is one shared array; each entry has `name/shortDescription/longDescription: { en, gr }`.
- UI strings (nav, buttons, form labels, footer copy) live in `src/i18n/en.json` and `src/i18n/gr.json`.

## 9. SEO

- `SeoHead.astro` component accepts `{ title, description, locale, canonical }` props and renders:
  - `<title>`, `<meta name="description">`
  - Open Graph tags (`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`)
  - Twitter card tags
  - `<link rel="alternate" hreflang="en" href="...">`, `hreflang="el"`, `hreflang="x-default"`
  - Canonical URL
- `robots.txt` in `public/` — allows all, points to sitemap.
- Sitemap auto-generated via `@astrojs/sitemap` — includes both locales.
- JSON-LD `LocalBusiness` schema embedded on home and contact pages.
- One `<h1>` per page; semantic `<section>` / `<article>` / `<nav>` throughout.
- Shared OG image at `public/og-default.jpg` (sourced from Unsplash set).

## 10. Contact form (Web3Forms)

### Behavior

- Standard `<form>` in `ContactForm.astro` with fields: name, email, phone (optional), subject, message, honeypot (`botcheck`, hidden via Tailwind).
- Labels, placeholders, and error messages come from i18n JSON.
- On submit, client-side TS (`src/scripts/contact.ts`):
  1. Validates required fields + email format.
  2. POSTs JSON to `https://api.web3forms.com/submit` with the access key from `import.meta.env.PUBLIC_WEB3FORMS_KEY`.
  3. While pending: disables button, shows spinner.
  4. On success: GSAP fades form out, fades thank-you message in.
  5. On error: shows inline error banner, re-enables form.
- If the env var is empty or the placeholder value `your_key_here`, the form submit shows a "Contact form not yet configured" toast instead of submitting. This makes the pending setup obvious rather than silently broken.

### Env vars

- `.env.example` ships with:
  ```
  # Get a free access key at https://web3forms.com
  PUBLIC_WEB3FORMS_KEY=your_key_here
  ```
- User adds their real key to `.env` locally and to Vercel project env vars for production.

## 11. Testing and validation

No automated tests for this phase (content site, no business logic). Validation is via:

- `astro check` + `tsc --noEmit` + `eslint` + `prettier --check` — must pass clean on every build.
- `astro build` — must succeed with zero warnings.
- Manual QA checklist (documented in `README.md`):
  - Both locales render for all 6 pages
  - Language switcher preserves current page across locales
  - Services list → detail navigation works in both locales
  - Contact form: validation works; without a key, toast appears
  - 404 renders for bad URLs in both locales
  - Lighthouse targets: Performance ≥90, Accessibility ≥95, SEO ≥95, Best Practices ≥95
  - `prefers-reduced-motion` disables all GSAP
  - Keyboard navigation + focus rings visible
  - Responsive at 375px, 768px, 1280px

If real logic appears later (pricing calc, booking flow, etc.), Vitest is the chosen tool.

## 12. Deployment

- Vercel, static output via `@astrojs/vercel` adapter in static mode.
- Environment variables set in Vercel project settings: `PUBLIC_WEB3FORMS_KEY`.
- Custom domain wired up by user post-launch.
- Build command: `astro build`. Output: `dist/`.

## 13. Migration from the old template

- No direct code reuse — the old template is jQuery/Bootstrap and entirely industrial-themed.
- Reference-only: page structure and section ordering on the old home page may inform the new home page layout, but all markup, styles, and scripts are written fresh.
- Old images are not used (industrial photos don't fit marine services).
- Old `contact.php` is discarded.
- Old `induste/` folder remains on disk untouched for historical reference; new project is a sibling at `triton-marine/`.

## 14. Content handoff assumptions

Until the user provides real content and brand materials:

- Logo is a text + trident-SVG placeholder (Header.astro).
- Copy is Lorem Ipsum in both locales.
- Service names/slugs are placeholders (e.g., `engine-service`, `hull-cleaning`, `winterization`, `electronics`, `general-repair`, `inspection` — 6 entries).
- Photography is from a curated free Unsplash set committed to `public/images/`.
- Contact email/phone/address in Footer + Contact use placeholder values flagged with `TODO:` comments in the relevant data files.

All of these swap out via single-point edits (data file or config), not structural changes.

## 15. Risks and open questions

- **Fonts for Greek:** Fraunces and Inter both support Greek script; verified before inclusion.
- **Tailwind v4 vs v3:** As of 2026-04, Tailwind v4 is stable and the Astro integration supports it. Using v4.
- **GSAP licensing:** All plugins used are free (confirmed post-Webflow acquisition, April 2024).
- **Reduced motion:** Must be tested thoroughly — animations are central to the feel, but not at the cost of accessibility.
- **Real brand handoff:** User will provide logo, palette refinements, real copy, and real photography later. Design is structured so this is a localized swap, not a rewrite.
