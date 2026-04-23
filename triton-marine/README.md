# Triton Marine

Bilingual (EN/GR) marine services site. Built with Astro, Tailwind, and GSAP.

## Getting started

```bash
npm install
npm run dev
```

Dev server runs at http://localhost:4321/. Greek version at http://localhost:4321/gr/.

## Environment variables

Copy `.env.example` to `.env` and fill in values:

- `PUBLIC_WEB3FORMS_KEY` — access key from https://web3forms.com/ (free tier fine). Without this, the contact form shows a "not yet configured" message instead of submitting.

## Scripts

| Command | What it does |
|---------|--------------|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Production build to `dist/` and `.vercel/output/` |
| `npm run preview` | Preview the production build |
| `npm run check` | Run `astro check` (type check + diagnostics) |
| `npm run lint` | ESLint |
| `npm run format` | Format all files with Prettier |
| `npm run format:check` | Check Prettier formatting without writing |

## Routes

| Route | Purpose |
|-------|---------|
| `/` | Home (EN) |
| `/about` | About |
| `/services` | Services list |
| `/services/[slug]` | Service detail (6 services) |
| `/contact` | Contact form |
| `/gr/...` | Greek mirrors of all the above |
| `/404` | Not found |

## Manual QA checklist (run before each deploy)

- [ ] Home page renders in EN and GR; hero image loads, title reveals, stats count up.
- [ ] Every nav link works in both locales.
- [ ] Language switcher preserves the current page when toggling locales.
- [ ] Services list → detail → back-nav works in both locales.
- [ ] Contact form validation: empty required fields block submission.
- [ ] Without `PUBLIC_WEB3FORMS_KEY` set, form shows "not yet configured" error on submit.
- [ ] With key set, successful submission fades form out and shows thank-you message.
- [ ] 404 page renders for a bad URL in both locales.
- [ ] Lighthouse (desktop + mobile) — all categories ≥90.
- [ ] macOS System Settings → Accessibility → Display → "Reduce motion" disables all animations.
- [ ] Keyboard Tab navigation reaches all interactive elements; focus rings visible.
- [ ] Resize at 375px, 768px, 1280px — no layout breakage.
- [ ] `npm run format:check && npm run lint && npm run check && npm run build` — all pass.

## Deployment

Deployed to Vercel via `@astrojs/vercel`. Set `PUBLIC_WEB3FORMS_KEY` in Vercel project environment variables.

## Content & brand

Content is currently Lorem Ipsum placeholder. Logo is a placeholder SVG trident. Photography is sourced from Unsplash (see `public/images/CREDITS.md`). Replace with real brand materials before production launch.
