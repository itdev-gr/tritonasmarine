# Triton Marine — Astro + GSAP Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the existing static "Induste" jQuery/Bootstrap template with a new Astro + Tailwind + GSAP bilingual (GR/EN) marine services site named "Triton Marine", deployed to Vercel.

**Architecture:** Vanilla Astro with explicit EN/GR page twins (no content collections, no CMS). Services live in a single TypeScript data file. UI strings in JSON i18n files. Subtle GSAP animations (ScrollTrigger, SplitText, ScrollToPlugin) loaded once via BaseLayout. Contact form posts client-side to Web3Forms with an access key from an env var.

**Tech Stack:** Astro 5.x • TypeScript (strict) • Tailwind CSS 4.x • GSAP 3.13+ • `@astrojs/sitemap` • `@astrojs/vercel` • `lucide-astro` • `@fontsource-variable/fraunces` & `@fontsource-variable/inter` • Web3Forms (third-party form submission).

**Spec:** `docs/superpowers/specs/2026-04-23-astro-gsap-conversion-design.md`

**Working directory:** All commands run from `/Users/marios/Desktop/Cursor/tritonasmarine` unless otherwise stated.

---

## Conventions used throughout this plan

- **Validation (not TDD):** This is a content/presentational site with no business logic. "Tests" here mean `astro check`, `astro build`, visual verification via `npm run dev`, and the Lighthouse pass at the end. Each task's last step before commit is the relevant validator.
- **Twin pages:** Every page has an EN version at `src/pages/...` and a GR version at `src/pages/gr/...`. Both are shown in full.
- **Relative imports:** GR pages nested one deeper — imports use `../../components/...` vs `../components/...` for EN pages.
- **Commits:** Use conventional commit prefixes (`feat:`, `chore:`, `style:`, `docs:`).

---

## Task 1: Initialize git repo and scaffold Astro project

**Files:**
- Create: `/Users/marios/Desktop/Cursor/tritonasmarine/.gitignore`
- Create: `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/package.json`
- Create: `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/tsconfig.json`
- Create: `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/astro.config.mjs`
- Create: `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/env.d.ts`
- Create: `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/.gitignore`

- [ ] **Step 1: Initialize git repo at project root**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git init -b main
```

Expected: `Initialized empty Git repository in /Users/marios/Desktop/Cursor/tritonasmarine/.git/`

- [ ] **Step 2: Create root `.gitignore`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/.gitignore`:

```
.DS_Store
.env
.env.local
.env.production
node_modules/
dist/
.astro/
.vercel/
```

- [ ] **Step 3: Create the `triton-marine/` project directory**

```bash
mkdir -p /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/{pages,layouts,components,data,i18n,scripts,styles}
mkdir -p /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/services
mkdir -p /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/services
mkdir -p /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/images
```

- [ ] **Step 4: Create `triton-marine/package.json`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/package.json`:

```json
{
  "name": "triton-marine",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "preview": "astro preview",
    "check": "astro check",
    "lint": "eslint . --ext .js,.ts,.astro",
    "format": "prettier --write \"**/*.{js,ts,astro,json,md,css}\"",
    "format:check": "prettier --check \"**/*.{js,ts,astro,json,md,css}\""
  },
  "dependencies": {
    "astro": "^5.6.0"
  },
  "devDependencies": {
    "@astrojs/check": "^0.9.0",
    "typescript": "^5.7.0"
  }
}
```

- [ ] **Step 5: Create `triton-marine/tsconfig.json` (strict mode)**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/tsconfig.json`:

```json
{
  "extends": "astro/tsconfigs/strict",
  "include": [".astro/types.d.ts", "**/*"],
  "exclude": ["dist"],
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "~/*": ["src/*"]
    }
  }
}
```

- [ ] **Step 6: Create `triton-marine/astro.config.mjs` (minimal for now)**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://triton-marine.example.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
    routing: { prefixDefaultLocale: false },
  },
});
```

- [ ] **Step 7: Create `triton-marine/src/env.d.ts`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/env.d.ts`:

```ts
/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_WEB3FORMS_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
```

- [ ] **Step 8: Create `triton-marine/.gitignore`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/.gitignore`:

```
node_modules/
dist/
.astro/
.vercel/
.env
.env.local
.env.production
```

- [ ] **Step 9: Create a minimal placeholder index page so Astro can boot**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/index.astro`:

```astro
---
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Triton Marine</title>
  </head>
  <body>
    <h1>Triton Marine — scaffold</h1>
  </body>
</html>
```

- [ ] **Step 10: Install dependencies**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install
```

Expected: completes with no errors, creates `node_modules/` and `package-lock.json`.

- [ ] **Step 11: Run dev server to verify scaffold works**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Expected: output like `astro  v5.x.x ready in ...ms` and `Local  http://localhost:4321/`. Open it; you should see "Triton Marine — scaffold". Kill the server with Ctrl+C.

- [ ] **Step 12: Run `astro check` to validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 13: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add .gitignore triton-marine/
git commit -m "chore: scaffold Astro + TypeScript project"
```

---

## Task 2: Install and configure Tailwind CSS v4

**Files:**
- Modify: `triton-marine/package.json` (add tailwind deps)
- Modify: `triton-marine/astro.config.mjs` (add Vite tailwind plugin)
- Create: `triton-marine/src/styles/global.css`
- Modify: `triton-marine/src/pages/index.astro` (import global css)

- [ ] **Step 1: Install Tailwind packages**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install tailwindcss@^4 @tailwindcss/vite@^4
```

Expected: installs complete, `package.json` updated.

- [ ] **Step 2: Update `astro.config.mjs` to wire Tailwind into Vite**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/astro.config.mjs` with:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://triton-marine.example.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
    routing: { prefixDefaultLocale: false },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Create `src/styles/global.css` with Tailwind v4 config + design tokens**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/styles/global.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy: #0b1e2d;
  --color-deep: #0f2a3d;
  --color-teal: #1e8c8c;
  --color-foam: #f4f6f7;
  --color-sand: #e8ddc7;
  --color-rust: #c2552d;

  --font-sans: "Inter Variable", ui-sans-serif, system-ui, sans-serif;
  --font-display: "Fraunces Variable", ui-serif, Georgia, serif;

  --radius-lg: 0.5rem;
}

@layer base {
  html {
    scroll-behavior: smooth;
  }

  body {
    @apply bg-foam text-navy font-sans antialiased;
  }

  h1,
  h2,
  h3,
  h4 {
    @apply font-display;
  }

  :focus-visible {
    @apply outline-2 outline-teal outline-offset-2;
  }

  @media (prefers-reduced-motion: reduce) {
    html {
      scroll-behavior: auto;
    }

    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
}
```

- [ ] **Step 4: Import global CSS in the placeholder page to verify Tailwind works**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/index.astro` with:

```astro
---
import "../styles/global.css";
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Triton Marine</title>
  </head>
  <body>
    <h1 class="text-4xl font-display text-navy p-8">Triton Marine — Tailwind works</h1>
    <p class="text-teal px-8">Accent color test.</p>
  </body>
</html>
```

- [ ] **Step 5: Run dev server and verify Tailwind classes apply**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Expected: `http://localhost:4321/` shows the heading using the navy color, teal paragraph, padded layout. If colors are unstyled, Tailwind is not wired up. Kill with Ctrl+C.

- [ ] **Step 6: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire up Tailwind v4 with Deep Sea design tokens"
```

---

## Task 3: Install and wire up Fraunces + Inter variable fonts

**Files:**
- Modify: `triton-marine/package.json` (add fontsource deps)
- Modify: `triton-marine/src/styles/global.css` (add @import for fonts)

- [ ] **Step 1: Install variable font packages**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install @fontsource-variable/fraunces @fontsource-variable/inter
```

Expected: installs complete.

- [ ] **Step 2: Import fonts at the top of `src/styles/global.css`**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/styles/global.css` and add these three lines at the very top (before `@import "tailwindcss"`):

```css
@import "@fontsource-variable/inter";
@import "@fontsource-variable/fraunces";
@import "tailwindcss";
```

(Everything below `@import "tailwindcss";` stays as in Task 2.)

- [ ] **Step 3: Run dev server and verify fonts load**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Open http://localhost:4321/ and inspect the H1 — computed `font-family` should include `"Fraunces Variable"`. The paragraph's computed `font-family` should include `"Inter Variable"`. Kill the server.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add Fraunces and Inter variable fonts"
```

---

## Task 4: Create i18n utilities (locale detection, translation helper, alternate URL)

**Files:**
- Create: `triton-marine/src/i18n/en.json`
- Create: `triton-marine/src/i18n/gr.json`
- Create: `triton-marine/src/i18n/utils.ts`

- [ ] **Step 1: Create EN UI strings**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/i18n/en.json`:

```json
{
  "nav.home": "Home",
  "nav.about": "About",
  "nav.services": "Services",
  "nav.contact": "Contact",
  "hero.eyebrow": "Marine services you can trust",
  "hero.title": "Lorem ipsum dolor sit amet",
  "hero.subtitle": "Consectetur adipiscing elit. Phasellus euismod arcu non ligula rhoncus, at placerat sapien tincidunt.",
  "hero.cta_primary": "Our services",
  "hero.cta_secondary": "Contact us",
  "services.heading": "What we do",
  "services.learn_more": "Learn more",
  "stats.boats": "Boats serviced",
  "stats.years": "Years at sea",
  "stats.technicians": "Technicians",
  "stats.partners": "Marina partners",
  "cta.title": "Ready to take care of your boat?",
  "cta.subtitle": "Request a quote and a technician will contact you within one business day.",
  "cta.button": "Get a quote",
  "about.heading": "About Triton Marine",
  "contact.heading": "Contact",
  "contact.subheading": "Send us a message and we'll get back to you.",
  "form.name": "Name",
  "form.email": "Email",
  "form.phone": "Phone (optional)",
  "form.subject": "Subject",
  "form.message": "Message",
  "form.submit": "Send message",
  "form.sending": "Sending…",
  "form.success": "Thank you — your message has been sent.",
  "form.error": "Something went wrong. Please try again or email us directly.",
  "form.not_configured": "Contact form is not yet configured. Please email us directly.",
  "form.validation.required": "This field is required.",
  "form.validation.email": "Please enter a valid email address.",
  "footer.tagline": "Marine services on the Greek coast.",
  "footer.rights": "All rights reserved.",
  "footer.address_label": "Address",
  "footer.phone_label": "Phone",
  "footer.email_label": "Email",
  "notfound.title": "Page not found",
  "notfound.subtitle": "The page you're looking for doesn't exist or has moved.",
  "notfound.cta": "Go home",
  "lang.toggle.to_gr": "ΕΛ",
  "lang.toggle.to_en": "EN"
}
```

- [ ] **Step 2: Create GR UI strings**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/i18n/gr.json`:

```json
{
  "nav.home": "Αρχική",
  "nav.about": "Σχετικά",
  "nav.services": "Υπηρεσίες",
  "nav.contact": "Επικοινωνία",
  "hero.eyebrow": "Αξιόπιστες ναυτικές υπηρεσίες",
  "hero.title": "Lorem ipsum dolor sit amet",
  "hero.subtitle": "Consectetur adipiscing elit. Phasellus euismod arcu non ligula rhoncus, at placerat sapien tincidunt.",
  "hero.cta_primary": "Οι υπηρεσίες μας",
  "hero.cta_secondary": "Επικοινωνία",
  "services.heading": "Τι κάνουμε",
  "services.learn_more": "Μάθετε περισσότερα",
  "stats.boats": "Σκάφη",
  "stats.years": "Χρόνια εμπειρίας",
  "stats.technicians": "Τεχνικοί",
  "stats.partners": "Συνεργαζόμενες μαρίνες",
  "cta.title": "Έτοιμοι να φροντίσετε το σκάφος σας;",
  "cta.subtitle": "Ζητήστε προσφορά και ένας τεχνικός θα επικοινωνήσει μαζί σας εντός μίας εργάσιμης ημέρας.",
  "cta.button": "Ζητήστε προσφορά",
  "about.heading": "Σχετικά με την Triton Marine",
  "contact.heading": "Επικοινωνία",
  "contact.subheading": "Στείλτε μας μήνυμα και θα σας απαντήσουμε.",
  "form.name": "Όνομα",
  "form.email": "Email",
  "form.phone": "Τηλέφωνο (προαιρετικό)",
  "form.subject": "Θέμα",
  "form.message": "Μήνυμα",
  "form.submit": "Αποστολή",
  "form.sending": "Αποστολή…",
  "form.success": "Ευχαριστούμε — το μήνυμά σας εστάλη.",
  "form.error": "Κάτι πήγε στραβά. Δοκιμάστε ξανά ή στείλτε μας email απευθείας.",
  "form.not_configured": "Η φόρμα επικοινωνίας δεν έχει ρυθμιστεί ακόμα. Στείλτε μας email απευθείας.",
  "form.validation.required": "Το πεδίο είναι υποχρεωτικό.",
  "form.validation.email": "Παρακαλώ εισάγετε έγκυρο email.",
  "footer.tagline": "Ναυτικές υπηρεσίες στις ελληνικές ακτές.",
  "footer.rights": "Με επιφύλαξη παντός δικαιώματος.",
  "footer.address_label": "Διεύθυνση",
  "footer.phone_label": "Τηλέφωνο",
  "footer.email_label": "Email",
  "notfound.title": "Η σελίδα δεν βρέθηκε",
  "notfound.subtitle": "Η σελίδα που ψάχνετε δεν υπάρχει ή έχει μετακινηθεί.",
  "notfound.cta": "Αρχική",
  "lang.toggle.to_gr": "ΕΛ",
  "lang.toggle.to_en": "EN"
}
```

- [ ] **Step 3: Create i18n utilities**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/i18n/utils.ts`:

```ts
import en from "./en.json";
import gr from "./gr.json";

export type Locale = "en" | "gr";
export const LOCALES: Locale[] = ["en", "gr"];
export const DEFAULT_LOCALE: Locale = "en";

const dictionaries: Record<Locale, Record<string, string>> = { en, gr };

export function getLocaleFromUrl(url: URL): Locale {
  const first = url.pathname.split("/").filter(Boolean)[0];
  return first === "gr" ? "gr" : "en";
}

export function t(locale: Locale, key: keyof typeof en): string {
  const dict = dictionaries[locale];
  return dict[key] ?? dictionaries.en[key] ?? key;
}

export function localizedPath(locale: Locale, path: string): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return locale === "en" ? clean : `/gr${clean}`;
}

export function alternateUrl(url: URL, targetLocale: Locale): string {
  const current = getLocaleFromUrl(url);
  if (current === targetLocale) return url.pathname;
  if (current === "en" && targetLocale === "gr") {
    return url.pathname === "/" ? "/gr/" : `/gr${url.pathname}`;
  }
  const withoutGr = url.pathname.replace(/^\/gr/, "");
  return withoutGr === "" ? "/" : withoutGr;
}

export function htmlLang(locale: Locale): string {
  return locale === "gr" ? "el" : "en";
}
```

- [ ] **Step 4: Run `astro check` to verify JSON imports type-check**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 5: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add i18n utilities and EN/GR string tables"
```

---

## Task 5: Create the services data file

**Files:**
- Create: `triton-marine/src/data/services.ts`

- [ ] **Step 1: Create `src/data/services.ts`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/data/services.ts`:

```ts
import type { Locale } from "../i18n/utils";

export type LocalizedString = Record<Locale, string>;

export type Service = {
  slug: string;
  icon: string;
  heroImage: string;
  name: LocalizedString;
  shortDescription: LocalizedString;
  longDescription: LocalizedString;
};

export const services: Service[] = [
  {
    slug: "engine-service",
    icon: "wrench",
    heroImage: "/images/engine-service.jpg",
    name: {
      en: "Engine service",
      gr: "Συντήρηση κινητήρα",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Phasellus euismod arcu non ligula rhoncus, at placerat sapien tincidunt. Vivamus efficitur, risus nec tincidunt hendrerit, massa erat aliquet lorem, at dignissim ligula arcu at dolor. Nullam non lorem at elit sagittis volutpat.",
      gr: "Phasellus euismod arcu non ligula rhoncus, at placerat sapien tincidunt. Vivamus efficitur, risus nec tincidunt hendrerit, massa erat aliquet lorem, at dignissim ligula arcu at dolor. Nullam non lorem at elit sagittis volutpat.",
    },
  },
  {
    slug: "hull-cleaning",
    icon: "droplets",
    heroImage: "/images/hull-cleaning.jpg",
    name: {
      en: "Hull cleaning",
      gr: "Καθαρισμός γάστρας",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      gr: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
  },
  {
    slug: "winterization",
    icon: "snowflake",
    heroImage: "/images/winterization.jpg",
    name: {
      en: "Winterization",
      gr: "Χειμερινή προετοιμασία",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
      gr: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.",
    },
  },
  {
    slug: "electronics",
    icon: "radio",
    heroImage: "/images/electronics.jpg",
    name: {
      en: "Marine electronics",
      gr: "Ναυτικά ηλεκτρονικά",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
      gr: "Curabitur pretium tincidunt lacus. Nulla gravida orci a odio. Nullam varius, turpis et commodo pharetra, est eros bibendum elit, nec luctus magna felis sollicitudin mauris.",
    },
  },
  {
    slug: "general-repair",
    icon: "hammer",
    heroImage: "/images/general-repair.jpg",
    name: {
      en: "General repair",
      gr: "Γενικές επισκευές",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Integer in sapien. Fusce tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam posuere.",
      gr: "Integer in sapien. Fusce tellus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Aliquam posuere.",
    },
  },
  {
    slug: "inspection",
    icon: "clipboard-check",
    heroImage: "/images/inspection.jpg",
    name: {
      en: "Inspection & survey",
      gr: "Επιθεώρηση",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
      gr: "Nam eget dui. Etiam rhoncus. Maecenas tempus, tellus eget condimentum rhoncus, sem quam semper libero, sit amet adipiscing sem neque sed ipsum.",
    },
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
```

- [ ] **Step 2: Run `astro check` to verify types**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add services data with 6 placeholder entries"
```

---

## Task 6: Add curated Unsplash marine photos to `public/images/`

**Files:**
- Create: `triton-marine/public/images/hero-home.jpg`
- Create: `triton-marine/public/images/engine-service.jpg`
- Create: `triton-marine/public/images/hull-cleaning.jpg`
- Create: `triton-marine/public/images/winterization.jpg`
- Create: `triton-marine/public/images/electronics.jpg`
- Create: `triton-marine/public/images/general-repair.jpg`
- Create: `triton-marine/public/images/inspection.jpg`
- Create: `triton-marine/public/images/about.jpg`
- Create: `triton-marine/public/og-default.jpg`
- Create: `triton-marine/public/images/CREDITS.md`

- [ ] **Step 1: Download 9 Unsplash photos via curl**

Each URL below is a free Unsplash CDN link. Run these from inside the project:

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/images

curl -L "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=2000&q=80&fm=jpg" -o hero-home.jpg
curl -L "https://images.unsplash.com/photo-1520443240718-fce21901db79?w=1600&q=80&fm=jpg" -o engine-service.jpg
curl -L "https://images.unsplash.com/photo-1520646924857-bb3492b8550c?w=1600&q=80&fm=jpg" -o hull-cleaning.jpg
curl -L "https://images.unsplash.com/photo-1494791368093-85217fbbf8de?w=1600&q=80&fm=jpg" -o winterization.jpg
curl -L "https://images.unsplash.com/photo-1505489435671-80a165c60816?w=1600&q=80&fm=jpg" -o electronics.jpg
curl -L "https://images.unsplash.com/photo-1534008897995-27a23e859048?w=1600&q=80&fm=jpg" -o general-repair.jpg
curl -L "https://images.unsplash.com/photo-1527152260-8ac3fb8d7912?w=1600&q=80&fm=jpg" -o inspection.jpg
curl -L "https://images.unsplash.com/photo-1530053969600-caed2596d242?w=1600&q=80&fm=jpg" -o about.jpg

cd ..
curl -L "https://images.unsplash.com/photo-1502933691298-84fc14542831?w=1200&h=630&fit=crop&q=80&fm=jpg" -o og-default.jpg
```

Expected: each file downloads successfully. Check sizes with `ls -lh public/images/` — each should be 100-500KB.

> If any specific Unsplash URL returns a 404 (they occasionally rotate), swap in any other free Unsplash photo of a boat, marina, sea, or hull by searching unsplash.com and using the "Download free" URL. The exact photo choice isn't load-bearing — we're establishing slots.

- [ ] **Step 2: Document photo credits**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/images/CREDITS.md`:

```markdown
# Image Credits

All images sourced from Unsplash (https://unsplash.com) under the Unsplash License.

- hero-home.jpg, og-default.jpg — Unsplash
- engine-service.jpg — Unsplash
- hull-cleaning.jpg — Unsplash
- winterization.jpg — Unsplash
- electronics.jpg — Unsplash
- general-repair.jpg — Unsplash
- inspection.jpg — Unsplash
- about.jpg — Unsplash

Replace with proprietary / licensed photography before production launch.
```

- [ ] **Step 3: Verify files exist**

```bash
ls /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/images/
ls /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/og-default.jpg
```

Expected: lists 8 `.jpg` files + `CREDITS.md` in images/, and og-default.jpg in public/.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/public/
git commit -m "feat: add curated Unsplash marine photography"
```

---

## Task 7: Install and set up icons via `lucide-astro`

**Files:**
- Modify: `triton-marine/package.json` (add lucide-astro)

- [ ] **Step 1: Install lucide-astro**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install lucide-astro
```

Expected: installs complete.

- [ ] **Step 2: Sanity test — render one icon in the placeholder home page**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/index.astro`:

```astro
---
import "../styles/global.css";
import { Wrench } from "lucide-astro";
---
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Triton Marine</title>
  </head>
  <body class="p-8">
    <h1 class="text-4xl font-display text-navy">Triton Marine</h1>
    <Wrench class="w-6 h-6 text-teal mt-4" />
    <p class="text-teal mt-2">Icon test.</p>
  </body>
</html>
```

- [ ] **Step 3: Run `npm run dev` and verify the wrench icon renders**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Open http://localhost:4321/ — a teal wrench SVG should appear. Kill the server.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "chore: add lucide-astro icon library"
```

---

## Task 8: Create `SeoHead.astro` component

**Files:**
- Create: `triton-marine/src/components/SeoHead.astro`

- [ ] **Step 1: Create `SeoHead.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/SeoHead.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { htmlLang } from "../i18n/utils";

export interface Props {
  title: string;
  description: string;
  locale: Locale;
  canonicalPath: string;
  alternatePath: string;
  ogImage?: string;
}

const { title, description, locale, canonicalPath, alternatePath, ogImage = "/og-default.jpg" } = Astro.props;

const siteUrl = Astro.site?.toString().replace(/\/$/, "") ?? "";
const canonical = `${siteUrl}${canonicalPath}`;
const alternateEn = locale === "en" ? canonical : `${siteUrl}${alternatePath}`;
const alternateGr = locale === "gr" ? canonical : `${siteUrl}${alternatePath}`;
const ogImageUrl = ogImage.startsWith("http") ? ogImage : `${siteUrl}${ogImage}`;
const ogLocale = locale === "gr" ? "el_GR" : "en_US";
---

<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta http-equiv="X-UA-Compatible" content="ie=edge" />
<title>{title}</title>
<meta name="description" content={description} />
<link rel="canonical" href={canonical} />
<link rel="alternate" hreflang="en" href={alternateEn} />
<link rel="alternate" hreflang="el" href={alternateGr} />
<link rel="alternate" hreflang="x-default" href={locale === "en" ? canonical : alternateEn} />

<meta property="og:type" content="website" />
<meta property="og:title" content={title} />
<meta property="og:description" content={description} />
<meta property="og:url" content={canonical} />
<meta property="og:image" content={ogImageUrl} />
<meta property="og:locale" content={ogLocale} />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content={title} />
<meta name="twitter:description" content={description} />
<meta name="twitter:image" content={ogImageUrl} />

<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<meta name="htmlLang" content={htmlLang(locale)} />
```

- [ ] **Step 2: Create a minimal SVG favicon**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/favicon.svg`:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <rect width="32" height="32" rx="6" fill="#0B1E2D" />
  <path d="M16 6 L16 26 M10 10 L16 6 L22 10 M10 14 L22 14 M12 22 L20 22" stroke="#1E8C8C" stroke-width="2" stroke-linecap="round" fill="none" />
</svg>
```

- [ ] **Step 3: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add SeoHead component and favicon"
```

---

## Task 9: Create `BaseLayout.astro`

**Files:**
- Create: `triton-marine/src/layouts/BaseLayout.astro`

- [ ] **Step 1: Create `BaseLayout.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/layouts/BaseLayout.astro`:

```astro
---
import "../styles/global.css";
import SeoHead from "../components/SeoHead.astro";
import type { Locale } from "../i18n/utils";
import { htmlLang, alternateUrl } from "../i18n/utils";

export interface Props {
  title: string;
  description: string;
  locale: Locale;
  ogImage?: string;
}

const { title, description, locale, ogImage } = Astro.props;
const canonicalPath = Astro.url.pathname;
const alternatePath = alternateUrl(Astro.url, locale === "en" ? "gr" : "en");
---

<!doctype html>
<html lang={htmlLang(locale)}>
  <head>
    <SeoHead
      title={title}
      description={description}
      locale={locale}
      canonicalPath={canonicalPath}
      alternatePath={alternatePath}
      ogImage={ogImage}
    />
    <slot name="head" />
  </head>
  <body>
    <slot name="header" />
    <main class="min-h-screen">
      <slot />
    </main>
    <slot name="footer" />
  </body>
</html>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add BaseLayout with SEO and slot hooks"
```

---

## Task 10: Create `LanguageSwitcher.astro`

**Files:**
- Create: `triton-marine/src/components/LanguageSwitcher.astro`

- [ ] **Step 1: Create `LanguageSwitcher.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/LanguageSwitcher.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, alternateUrl } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;

const targetLocale: Locale = locale === "en" ? "gr" : "en";
const href = alternateUrl(Astro.url, targetLocale);
const label = targetLocale === "gr" ? t(locale, "lang.toggle.to_gr") : t(locale, "lang.toggle.to_en");
---

<a
  href={href}
  class="inline-flex items-center gap-1 rounded-lg border border-navy/20 px-3 py-1.5 text-sm font-semibold text-navy transition hover:bg-navy hover:text-foam"
  aria-label={`Switch language to ${targetLocale === "gr" ? "Greek" : "English"}`}
>
  {label}
</a>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add LanguageSwitcher component"
```

---

## Task 11: Create `Header.astro`

**Files:**
- Create: `triton-marine/src/components/Header.astro`

- [ ] **Step 1: Create `Header.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/Header.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";
import LanguageSwitcher from "./LanguageSwitcher.astro";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;

const nav = [
  { key: "nav.home", href: localizedPath(locale, "/") },
  { key: "nav.about", href: localizedPath(locale, "/about") },
  { key: "nav.services", href: localizedPath(locale, "/services") },
  { key: "nav.contact", href: localizedPath(locale, "/contact") },
] as const;
---

<header class="sticky top-0 z-40 border-b border-navy/10 bg-foam/90 backdrop-blur">
  <div class="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-4">
    <a href={localizedPath(locale, "/")} class="flex items-center gap-2" aria-label="Triton Marine home">
      <svg viewBox="0 0 32 32" class="h-8 w-8" aria-hidden="true">
        <rect width="32" height="32" rx="6" fill="#0B1E2D" />
        <path d="M16 6 L16 26 M10 10 L16 6 L22 10 M10 14 L22 14 M12 22 L20 22" stroke="#1E8C8C" stroke-width="2" stroke-linecap="round" fill="none" />
      </svg>
      <span class="font-display text-xl font-semibold tracking-tight">Triton Marine</span>
    </a>

    <nav class="hidden items-center gap-6 md:flex" aria-label="Primary">
      {
        nav.map((item) => (
          <a
            href={item.href}
            class="text-sm font-medium text-navy/80 transition hover:text-teal"
          >
            {t(locale, item.key)}
          </a>
        ))
      }
    </nav>

    <div class="flex items-center gap-3">
      <LanguageSwitcher locale={locale} />
      <a
        href={localizedPath(locale, "/contact")}
        class="hidden rounded-lg bg-teal px-4 py-2 text-sm font-semibold text-foam transition hover:bg-navy md:inline-flex"
      >
        {t(locale, "nav.contact")}
      </a>
    </div>
  </div>

  <nav class="flex justify-center gap-5 border-t border-navy/10 px-6 py-2 md:hidden" aria-label="Primary (mobile)">
    {
      nav.map((item) => (
        <a href={item.href} class="text-sm font-medium text-navy/80">
          {t(locale, item.key)}
        </a>
      ))
    }
  </nav>
</header>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add Header component with primary nav and language switcher"
```

---

## Task 12: Create `Footer.astro`

**Files:**
- Create: `triton-marine/src/components/Footer.astro`

- [ ] **Step 1: Create `Footer.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/Footer.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;

const year = new Date().getFullYear();

const nav = [
  { key: "nav.home", href: localizedPath(locale, "/") },
  { key: "nav.about", href: localizedPath(locale, "/about") },
  { key: "nav.services", href: localizedPath(locale, "/services") },
  { key: "nav.contact", href: localizedPath(locale, "/contact") },
] as const;
---

<footer class="bg-navy text-foam">
  <div class="mx-auto grid max-w-[1200px] gap-10 px-6 py-16 md:grid-cols-4">
    <div>
      <div class="flex items-center gap-2">
        <svg viewBox="0 0 32 32" class="h-8 w-8" aria-hidden="true">
          <rect width="32" height="32" rx="6" fill="#F4F6F7" />
          <path d="M16 6 L16 26 M10 10 L16 6 L22 10 M10 14 L22 14 M12 22 L20 22" stroke="#1E8C8C" stroke-width="2" stroke-linecap="round" fill="none" />
        </svg>
        <span class="font-display text-xl font-semibold">Triton Marine</span>
      </div>
      <p class="mt-3 text-sm text-foam/70">{t(locale, "footer.tagline")}</p>
    </div>

    <nav aria-label="Footer navigation">
      <h2 class="text-sm font-semibold uppercase tracking-wide text-foam/60">{t(locale, "nav.services")}</h2>
      <ul class="mt-3 space-y-2 text-sm">
        {
          nav.map((item) => (
            <li>
              <a href={item.href} class="text-foam/85 transition hover:text-teal">
                {t(locale, item.key)}
              </a>
            </li>
          ))
        }
      </ul>
    </nav>

    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-foam/60">{t(locale, "footer.address_label")}</h2>
      <p class="mt-3 text-sm text-foam/85">Placeholder address<br />Placeholder city, Greece</p>
      <p class="mt-3 text-sm">
        <span class="text-foam/60">{t(locale, "footer.phone_label")}:</span>
        <a href="tel:+300000000000" class="ml-1 text-foam/85 hover:text-teal">+30 000 000 0000</a>
      </p>
      <p class="text-sm">
        <span class="text-foam/60">{t(locale, "footer.email_label")}:</span>
        <a href="mailto:hello@triton-marine.example" class="ml-1 text-foam/85 hover:text-teal">hello@triton-marine.example</a>
      </p>
    </div>

    <div>
      <h2 class="text-sm font-semibold uppercase tracking-wide text-foam/60">Hours</h2>
      <p class="mt-3 text-sm text-foam/85">Mon – Fri: 08:00 – 18:00<br />Sat: 09:00 – 14:00<br />Sun: Closed</p>
    </div>
  </div>

  <div class="border-t border-foam/10">
    <div class="mx-auto flex max-w-[1200px] flex-col items-center justify-between gap-2 px-6 py-6 text-xs text-foam/60 md:flex-row">
      <p>© {year} Triton Marine. {t(locale, "footer.rights")}</p>
      <p>Made with Astro &amp; GSAP.</p>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add Footer component"
```

---

## Task 13: Scaffold all 12 page stubs using BaseLayout + Header + Footer

This task creates every page file as a minimal shell. Each stub imports BaseLayout, Header, Footer, passes locale + title + description. Content is a single `<h1>` placeholder — real content comes in later tasks.

**Files:** (all under `triton-marine/src/pages/`)
- Replace: `index.astro` (currently the Tailwind sanity test)
- Create: `about.astro`
- Create: `contact.astro`
- Create: `404.astro`
- Create: `services/index.astro`
- Create: `services/[slug].astro`
- Create: `gr/index.astro`
- Create: `gr/about.astro`
- Create: `gr/contact.astro`
- Create: `gr/404.astro`
- Create: `gr/services/index.astro`
- Create: `gr/services/[slug].astro`

- [ ] **Step 1: EN — `src/pages/index.astro`**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Triton Marine — Marine services you can trust"
  description="Triton Marine provides professional marine services along the Greek coast: engine service, hull cleaning, winterization, electronics, and more."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Home (EN) — content coming soon</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: EN — `src/pages/about.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/about.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="About — Triton Marine"
  description="Learn about Triton Marine — our story, our crew, and the coast we serve."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">About (EN) — content coming soon</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: EN — `src/pages/contact.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/contact.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Contact — Triton Marine"
  description="Get in touch with Triton Marine — request a quote or ask a question."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Contact (EN) — content coming soon</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: EN — `src/pages/404.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/404.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Page not found — Triton Marine"
  description="The page you're looking for doesn't exist."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">404 (EN) — content coming soon</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 5: EN — `src/pages/services/index.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/services/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Services — Triton Marine"
  description="All marine services offered by Triton Marine."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Services (EN) — content coming soon</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 6: EN — `src/pages/services/[slug].astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/services/[slug].astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import { services } from "../../data/services";

export function getStaticPaths() {
  return services.map((s) => ({ params: { slug: s.slug } }));
}

const locale = "en" as const;
const { slug } = Astro.params;
const service = services.find((s) => s.slug === slug)!;
---
<BaseLayout
  locale={locale}
  title={`${service.name.en} — Triton Marine`}
  description={service.shortDescription.en}
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">{service.name.en} (EN) — content coming soon</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 7: GR — `src/pages/gr/index.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Triton Marine — Ναυτικές υπηρεσίες στις ελληνικές ακτές"
  description="Η Triton Marine προσφέρει επαγγελματικές ναυτικές υπηρεσίες: συντήρηση κινητήρα, καθαρισμός γάστρας, χειμερινή προετοιμασία, ηλεκτρονικά, και άλλα."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Αρχική (GR) — περιεχόμενο σύντομα</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 8: GR — `src/pages/gr/about.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/about.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Σχετικά — Triton Marine"
  description="Μάθετε για την Triton Marine — την ιστορία μας, το πλήρωμά μας, και την ακτή που εξυπηρετούμε."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Σχετικά (GR) — περιεχόμενο σύντομα</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 9: GR — `src/pages/gr/contact.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/contact.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Επικοινωνία — Triton Marine"
  description="Επικοινωνήστε με την Triton Marine — ζητήστε προσφορά ή κάντε μια ερώτηση."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Επικοινωνία (GR) — περιεχόμενο σύντομα</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 10: GR — `src/pages/gr/404.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/404.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Η σελίδα δεν βρέθηκε — Triton Marine"
  description="Η σελίδα που ψάχνετε δεν υπάρχει."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">404 (GR) — περιεχόμενο σύντομα</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 11: GR — `src/pages/gr/services/index.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/services/index.astro`:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Header from "../../../components/Header.astro";
import Footer from "../../../components/Footer.astro";
const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Υπηρεσίες — Triton Marine"
  description="Όλες οι ναυτικές υπηρεσίες της Triton Marine."
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">Υπηρεσίες (GR) — περιεχόμενο σύντομα</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 12: GR — `src/pages/gr/services/[slug].astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/services/[slug].astro`:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Header from "../../../components/Header.astro";
import Footer from "../../../components/Footer.astro";
import { services } from "../../../data/services";

export function getStaticPaths() {
  return services.map((s) => ({ params: { slug: s.slug } }));
}

const locale = "gr" as const;
const { slug } = Astro.params;
const service = services.find((s) => s.slug === slug)!;
---
<BaseLayout
  locale={locale}
  title={`${service.name.gr} — Triton Marine`}
  description={service.shortDescription.gr}
>
  <Header slot="header" locale={locale} />
  <h1 class="mx-auto max-w-[1200px] p-8 text-4xl font-display">{service.name.gr} (GR) — περιεχόμενο σύντομα</h1>
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 13: Build and verify all pages render**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run build
```

Expected: build succeeds. Look for these routes in the output:
- `/index.html`, `/about/index.html`, `/contact/index.html`, `/404.html`
- `/services/index.html`, `/services/engine-service/index.html` (and 5 more service slugs)
- `/gr/index.html`, `/gr/about/index.html`, `/gr/contact/index.html`, `/gr/404.html`
- `/gr/services/index.html`, `/gr/services/engine-service/index.html` (and 5 more)

- [ ] **Step 14: Visual sanity check via dev server**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Visit each of the 12 routes. Each should render the header, placeholder h1, and footer. The language switcher in the header should toggle between EN and GR and stay on the same page. Kill the server.

- [ ] **Step 15: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: scaffold all 12 page stubs with BaseLayout, Header, Footer"
```

---

## Task 14: Create `Hero.astro` component

**Files:**
- Create: `triton-marine/src/components/Hero.astro`

- [ ] **Step 1: Create `Hero.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/Hero.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
---

<section class="relative isolate overflow-hidden bg-navy text-foam">
  <div class="absolute inset-0 -z-10">
    <img
      src="/images/hero-home.jpg"
      alt=""
      class="h-full w-full object-cover opacity-60"
      data-hero-image
      loading="eager"
      fetchpriority="high"
    />
    <div class="absolute inset-0 bg-gradient-to-b from-navy/60 via-navy/40 to-navy"></div>
  </div>

  <div class="mx-auto flex min-h-[80vh] max-w-[1200px] flex-col justify-center px-6 py-24">
    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
      {t(locale, "hero.eyebrow")}
    </p>
    <h1 class="mt-6 max-w-3xl font-display text-5xl font-semibold leading-tight sm:text-6xl md:text-7xl" data-hero-title>
      {t(locale, "hero.title")}
    </h1>
    <p class="mt-6 max-w-xl text-lg text-foam/85" data-reveal>
      {t(locale, "hero.subtitle")}
    </p>
    <div class="mt-10 flex flex-wrap gap-3" data-reveal>
      <a
        href={localizedPath(locale, "/services")}
        class="rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-foam transition hover:bg-foam hover:text-navy"
      >
        {t(locale, "hero.cta_primary")}
      </a>
      <a
        href={localizedPath(locale, "/contact")}
        class="rounded-lg border border-foam/40 px-6 py-3 text-sm font-semibold text-foam transition hover:bg-foam hover:text-navy"
      >
        {t(locale, "hero.cta_secondary")}
      </a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add Hero component with GSAP reveal hooks"
```

---

## Task 15: Create `ServiceCard.astro` and `ServicesGrid.astro`

**Files:**
- Create: `triton-marine/src/components/ServiceCard.astro`
- Create: `triton-marine/src/components/ServicesGrid.astro`

- [ ] **Step 1: Create `ServiceCard.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/ServiceCard.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";
import type { Service } from "../data/services";
import {
  Wrench,
  Droplets,
  Snowflake,
  Radio,
  Hammer,
  ClipboardCheck,
} from "lucide-astro";

const iconMap: Record<string, typeof Wrench> = {
  wrench: Wrench,
  droplets: Droplets,
  snowflake: Snowflake,
  radio: Radio,
  hammer: Hammer,
  "clipboard-check": ClipboardCheck,
};

export interface Props {
  service: Service;
  locale: Locale;
}
const { service, locale } = Astro.props;
const Icon = iconMap[service.icon] ?? Wrench;
const href = localizedPath(locale, `/services/${service.slug}`);
---

<a
  href={href}
  class="group flex flex-col rounded-lg border border-navy/10 bg-foam p-6 transition hover:-translate-y-1 hover:shadow-lg"
  data-reveal
>
  <div class="flex h-12 w-12 items-center justify-center rounded-lg bg-teal/10 text-teal transition group-hover:bg-teal group-hover:text-foam">
    <Icon class="h-6 w-6" />
  </div>
  <h3 class="mt-5 font-display text-xl font-semibold text-navy">{service.name[locale]}</h3>
  <p class="mt-2 text-sm text-navy/70">{service.shortDescription[locale]}</p>
  <span class="mt-6 text-sm font-semibold text-teal transition group-hover:text-navy">
    {t(locale, "services.learn_more")} →
  </span>
</a>
```

- [ ] **Step 2: Create `ServicesGrid.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/ServicesGrid.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t } from "../i18n/utils";
import { services } from "../data/services";
import ServiceCard from "./ServiceCard.astro";

export interface Props {
  locale: Locale;
  withHeading?: boolean;
}
const { locale, withHeading = true } = Astro.props;
---

<section class="bg-foam py-20">
  <div class="mx-auto max-w-[1200px] px-6">
    {
      withHeading && (
        <h2 class="max-w-2xl font-display text-4xl font-semibold text-navy" data-reveal>
          {t(locale, "services.heading")}
        </h2>
      )
    }
    <div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3" data-services-grid>
      {services.map((service) => <ServiceCard service={service} locale={locale} />)}
    </div>
  </div>
</section>
```

- [ ] **Step 3: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add ServiceCard and ServicesGrid components"
```

---

## Task 16: Create `StatsBar.astro` component

**Files:**
- Create: `triton-marine/src/components/StatsBar.astro`

- [ ] **Step 1: Create `StatsBar.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/StatsBar.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;

const stats = [
  { key: "stats.boats", value: 500, suffix: "+" },
  { key: "stats.years", value: 28, suffix: "" },
  { key: "stats.technicians", value: 12, suffix: "" },
  { key: "stats.partners", value: 7, suffix: "" },
] as const;
---

<section class="bg-deep text-foam">
  <div class="mx-auto grid max-w-[1200px] grid-cols-2 gap-8 px-6 py-16 md:grid-cols-4">
    {
      stats.map((stat) => (
        <div class="text-center" data-reveal>
          <div
            class="font-display text-5xl font-semibold text-teal"
            data-stat-counter
            data-stat-target={stat.value}
            data-stat-suffix={stat.suffix}
          >
            0{stat.suffix}
          </div>
          <p class="mt-2 text-sm uppercase tracking-wide text-foam/70">
            {t(locale, stat.key)}
          </p>
        </div>
      ))
    }
  </div>
</section>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add StatsBar component with GSAP counter hooks"
```

---

## Task 17: Create `CtaSection.astro` component

**Files:**
- Create: `triton-marine/src/components/CtaSection.astro`

- [ ] **Step 1: Create `CtaSection.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/CtaSection.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
---

<section class="bg-navy text-foam">
  <div class="mx-auto flex max-w-[1200px] flex-col items-start gap-6 px-6 py-20 md:flex-row md:items-center md:justify-between">
    <div class="max-w-2xl" data-reveal>
      <h2 class="font-display text-3xl font-semibold sm:text-4xl">{t(locale, "cta.title")}</h2>
      <p class="mt-3 text-foam/80">{t(locale, "cta.subtitle")}</p>
    </div>
    <a
      href={localizedPath(locale, "/contact")}
      class="rounded-lg bg-rust px-6 py-3 text-sm font-semibold text-foam transition hover:bg-teal"
      data-reveal
    >
      {t(locale, "cta.button")}
    </a>
  </div>
</section>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add CtaSection component"
```

---

## Task 18: Wire home page content (EN + GR)

**Files:**
- Modify: `triton-marine/src/pages/index.astro`
- Modify: `triton-marine/src/pages/gr/index.astro`

- [ ] **Step 1: Replace `src/pages/index.astro` with full home content**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/index.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import Hero from "../components/Hero.astro";
import ServicesGrid from "../components/ServicesGrid.astro";
import StatsBar from "../components/StatsBar.astro";
import CtaSection from "../components/CtaSection.astro";

const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Triton Marine — Marine services you can trust"
  description="Triton Marine provides professional marine services along the Greek coast: engine service, hull cleaning, winterization, electronics, and more."
>
  <Header slot="header" locale={locale} />
  <Hero locale={locale} />
  <ServicesGrid locale={locale} />
  <StatsBar locale={locale} />
  <CtaSection locale={locale} />
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Replace `src/pages/gr/index.astro` with full home content**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import Hero from "../../components/Hero.astro";
import ServicesGrid from "../../components/ServicesGrid.astro";
import StatsBar from "../../components/StatsBar.astro";
import CtaSection from "../../components/CtaSection.astro";

const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Triton Marine — Ναυτικές υπηρεσίες στις ελληνικές ακτές"
  description="Η Triton Marine προσφέρει επαγγελματικές ναυτικές υπηρεσίες: συντήρηση κινητήρα, καθαρισμός γάστρας, χειμερινή προετοιμασία, ηλεκτρονικά, και άλλα."
>
  <Header slot="header" locale={locale} />
  <Hero locale={locale} />
  <ServicesGrid locale={locale} />
  <StatsBar locale={locale} />
  <CtaSection locale={locale} />
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Run dev server and check both home pages**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Open http://localhost:4321/ and http://localhost:4321/gr/. Both should show: hero with photo, services grid, stats bar, CTA, footer. Switching languages preserves the route (`/` ↔ `/gr/`). Kill the server.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire full home page content in EN and GR"
```

---

## Task 19: Wire About page content (EN + GR)

**Files:**
- Modify: `triton-marine/src/pages/about.astro`
- Modify: `triton-marine/src/pages/gr/about.astro`

- [ ] **Step 1: Replace `src/pages/about.astro`**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/about.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import CtaSection from "../components/CtaSection.astro";
import StatsBar from "../components/StatsBar.astro";
import { t } from "../i18n/utils";

const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="About — Triton Marine"
  description="Learn about Triton Marine — our story, our crew, and the coast we serve."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
        {t(locale, "about.heading")}
      </p>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        Lorem ipsum dolor sit amet
      </h1>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-2">
      <div class="overflow-hidden rounded-lg" data-reveal>
        <img src="/images/about.jpg" alt="Triton Marine crew" class="h-full w-full object-cover" loading="lazy" />
      </div>
      <div class="space-y-4 text-navy/80" data-reveal>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod arcu non ligula rhoncus, at placerat sapien tincidunt.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  </section>

  <StatsBar locale={locale} />
  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Replace `src/pages/gr/about.astro`**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/about.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import CtaSection from "../../components/CtaSection.astro";
import StatsBar from "../../components/StatsBar.astro";
import { t } from "../../i18n/utils";

const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Σχετικά — Triton Marine"
  description="Μάθετε για την Triton Marine — την ιστορία μας, το πλήρωμά μας, και την ακτή που εξυπηρετούμε."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
        {t(locale, "about.heading")}
      </p>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        Lorem ipsum dolor sit amet
      </h1>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-2">
      <div class="overflow-hidden rounded-lg" data-reveal>
        <img src="/images/about.jpg" alt="Πλήρωμα Triton Marine" class="h-full w-full object-cover" loading="lazy" />
      </div>
      <div class="space-y-4 text-navy/80" data-reveal>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus euismod arcu non ligula rhoncus, at placerat sapien tincidunt.</p>
        <p>Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
        <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
      </div>
    </div>
  </section>

  <StatsBar locale={locale} />
  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Visual check**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Open http://localhost:4321/about and http://localhost:4321/gr/about. Both show: navy hero band, two-column image + text section, stats bar, CTA, footer. Kill the server.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire About page content in EN and GR"
```

---

## Task 20: Wire Services list and detail pages (EN + GR)

**Files:**
- Modify: `triton-marine/src/pages/services/index.astro`
- Modify: `triton-marine/src/pages/services/[slug].astro`
- Modify: `triton-marine/src/pages/gr/services/index.astro`
- Modify: `triton-marine/src/pages/gr/services/[slug].astro`

- [ ] **Step 1: EN — services list**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/services/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import ServicesGrid from "../../components/ServicesGrid.astro";
import CtaSection from "../../components/CtaSection.astro";
import { t } from "../../i18n/utils";

const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Services — Triton Marine"
  description="All marine services offered by Triton Marine."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
        {t(locale, "nav.services")}
      </p>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        {t(locale, "services.heading")}
      </h1>
    </div>
  </section>

  <ServicesGrid locale={locale} withHeading={false} />
  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: EN — service detail**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/services/[slug].astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import CtaSection from "../../components/CtaSection.astro";
import { services } from "../../data/services";
import { t, localizedPath } from "../../i18n/utils";

export function getStaticPaths() {
  return services.map((s) => ({ params: { slug: s.slug } }));
}

const locale = "en" as const;
const { slug } = Astro.params;
const service = services.find((s) => s.slug === slug)!;
---
<BaseLayout
  locale={locale}
  title={`${service.name.en} — Triton Marine`}
  description={service.shortDescription.en}
>
  <Header slot="header" locale={locale} />

  <section class="relative isolate overflow-hidden bg-navy text-foam">
    <div class="absolute inset-0 -z-10">
      <img
        src={service.heroImage}
        alt=""
        class="h-full w-full object-cover opacity-50"
        data-hero-parallax
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy"></div>
    </div>
    <div class="mx-auto max-w-[1200px] px-6 py-28">
      <a href={localizedPath(locale, "/services")} class="text-sm font-semibold text-teal hover:text-foam">
        ← {t(locale, "nav.services")}
      </a>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        {service.name.en}
      </h1>
      <p class="mt-4 max-w-2xl text-foam/85" data-reveal>
        {service.shortDescription.en}
      </p>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto max-w-[900px] px-6 py-20">
      <p class="text-lg leading-relaxed text-navy/80" data-reveal>
        {service.longDescription.en}
      </p>
    </div>
  </section>

  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: GR — services list**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/services/index.astro`:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Header from "../../../components/Header.astro";
import Footer from "../../../components/Footer.astro";
import ServicesGrid from "../../../components/ServicesGrid.astro";
import CtaSection from "../../../components/CtaSection.astro";
import { t } from "../../../i18n/utils";

const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Υπηρεσίες — Triton Marine"
  description="Όλες οι ναυτικές υπηρεσίες της Triton Marine."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
        {t(locale, "nav.services")}
      </p>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        {t(locale, "services.heading")}
      </h1>
    </div>
  </section>

  <ServicesGrid locale={locale} withHeading={false} />
  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: GR — service detail**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/services/[slug].astro`:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Header from "../../../components/Header.astro";
import Footer from "../../../components/Footer.astro";
import CtaSection from "../../../components/CtaSection.astro";
import { services } from "../../../data/services";
import { t, localizedPath } from "../../../i18n/utils";

export function getStaticPaths() {
  return services.map((s) => ({ params: { slug: s.slug } }));
}

const locale = "gr" as const;
const { slug } = Astro.params;
const service = services.find((s) => s.slug === slug)!;
---
<BaseLayout
  locale={locale}
  title={`${service.name.gr} — Triton Marine`}
  description={service.shortDescription.gr}
>
  <Header slot="header" locale={locale} />

  <section class="relative isolate overflow-hidden bg-navy text-foam">
    <div class="absolute inset-0 -z-10">
      <img
        src={service.heroImage}
        alt=""
        class="h-full w-full object-cover opacity-50"
        data-hero-parallax
        loading="eager"
      />
      <div class="absolute inset-0 bg-gradient-to-b from-navy/60 to-navy"></div>
    </div>
    <div class="mx-auto max-w-[1200px] px-6 py-28">
      <a href={localizedPath(locale, "/services")} class="text-sm font-semibold text-teal hover:text-foam">
        ← {t(locale, "nav.services")}
      </a>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        {service.name.gr}
      </h1>
      <p class="mt-4 max-w-2xl text-foam/85" data-reveal>
        {service.shortDescription.gr}
      </p>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto max-w-[900px] px-6 py-20">
      <p class="text-lg leading-relaxed text-navy/80" data-reveal>
        {service.longDescription.gr}
      </p>
    </div>
  </section>

  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 5: Visual check**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Check: `/services`, `/services/engine-service`, `/gr/services`, `/gr/services/engine-service`. Click each card from the grid; verify detail pages render with hero image + description. Language switcher preserves the current slug. Kill the server.

- [ ] **Step 6: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire Services list and detail pages in EN and GR"
```

---

## Task 21: Create `ContactForm.astro` component

**Files:**
- Create: `triton-marine/src/components/ContactForm.astro`

- [ ] **Step 1: Create `ContactForm.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/ContactForm.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
---

<form
  class="space-y-5"
  data-contact-form
  data-locale={locale}
  data-msg-success={t(locale, "form.success")}
  data-msg-error={t(locale, "form.error")}
  data-msg-not-configured={t(locale, "form.not_configured")}
  data-msg-required={t(locale, "form.validation.required")}
  data-msg-email={t(locale, "form.validation.email")}
  novalidate
>
  <input type="hidden" name="from_name" value="Triton Marine website" />
  <input type="hidden" name="subject_prefix" value="[Triton Marine]" />

  <div class="grid gap-5 md:grid-cols-2">
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.name")}</span>
      <input
        type="text"
        name="name"
        required
        class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
      />
    </label>
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.email")}</span>
      <input
        type="email"
        name="email"
        required
        class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
      />
    </label>
  </div>

  <label class="block">
    <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.phone")}</span>
    <input
      type="tel"
      name="phone"
      class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
    />
  </label>

  <label class="block">
    <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.subject")}</span>
    <input
      type="text"
      name="subject"
      required
      class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
    />
  </label>

  <label class="block">
    <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.message")}</span>
    <textarea
      name="message"
      rows="5"
      required
      class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:outline-none focus:ring-2 focus:ring-teal/30"
    ></textarea>
  </label>

  <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

  <div class="flex items-center gap-4">
    <button
      type="submit"
      class="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-foam transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      data-contact-submit
    >
      <span data-contact-submit-label>{t(locale, "form.submit")}</span>
      <span class="hidden h-4 w-4 animate-spin rounded-full border-2 border-foam border-t-transparent" data-contact-spinner aria-hidden="true"></span>
    </button>
    <p class="text-sm text-rust" data-contact-error role="alert" aria-live="polite"></p>
  </div>

  <p class="hidden text-sm font-medium text-teal" data-contact-success role="status" aria-live="polite"></p>
</form>
```

- [ ] **Step 2: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add ContactForm component (UI only)"
```

---

## Task 22: Wire Contact page content (EN + GR)

**Files:**
- Modify: `triton-marine/src/pages/contact.astro`
- Modify: `triton-marine/src/pages/gr/contact.astro`

- [ ] **Step 1: EN contact page**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/contact.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import ContactForm from "../components/ContactForm.astro";
import { t } from "../i18n/utils";

const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Contact — Triton Marine"
  description="Get in touch with Triton Marine — request a quote or ask a question."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
        {t(locale, "contact.heading")}
      </p>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        {t(locale, "contact.subheading")}
      </h1>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-[2fr_1fr]">
      <div data-reveal>
        <ContactForm locale={locale} />
      </div>
      <aside class="space-y-6 text-sm text-navy/80" data-reveal>
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wide text-navy/60">{t(locale, "footer.address_label")}</h2>
          <p class="mt-2">Placeholder address<br />Placeholder city, Greece</p>
        </div>
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wide text-navy/60">{t(locale, "footer.phone_label")}</h2>
          <p class="mt-2"><a href="tel:+300000000000" class="hover:text-teal">+30 000 000 0000</a></p>
        </div>
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wide text-navy/60">{t(locale, "footer.email_label")}</h2>
          <p class="mt-2"><a href="mailto:hello@triton-marine.example" class="hover:text-teal">hello@triton-marine.example</a></p>
        </div>
      </aside>
    </div>
  </section>

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: GR contact page**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/contact.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import ContactForm from "../../components/ContactForm.astro";
import { t } from "../../i18n/utils";

const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Επικοινωνία — Triton Marine"
  description="Επικοινωνήστε με την Triton Marine — ζητήστε προσφορά ή κάντε μια ερώτηση."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal" data-reveal>
        {t(locale, "contact.heading")}
      </p>
      <h1 class="mt-4 max-w-3xl font-display text-5xl font-semibold sm:text-6xl" data-reveal>
        {t(locale, "contact.subheading")}
      </h1>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-[2fr_1fr]">
      <div data-reveal>
        <ContactForm locale={locale} />
      </div>
      <aside class="space-y-6 text-sm text-navy/80" data-reveal>
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wide text-navy/60">{t(locale, "footer.address_label")}</h2>
          <p class="mt-2">Placeholder διεύθυνση<br />Placeholder πόλη, Ελλάδα</p>
        </div>
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wide text-navy/60">{t(locale, "footer.phone_label")}</h2>
          <p class="mt-2"><a href="tel:+300000000000" class="hover:text-teal">+30 000 000 0000</a></p>
        </div>
        <div>
          <h2 class="text-xs font-semibold uppercase tracking-wide text-navy/60">{t(locale, "footer.email_label")}</h2>
          <p class="mt-2"><a href="mailto:hello@triton-marine.example" class="hover:text-teal">hello@triton-marine.example</a></p>
        </div>
      </aside>
    </div>
  </section>

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Visual check (form UI only — submit does nothing yet)**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Visit `/contact` and `/gr/contact`. Form renders with all fields + aside. Kill server.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire Contact pages in EN and GR"
```

---

## Task 23: Wire 404 pages (EN + GR)

**Files:**
- Modify: `triton-marine/src/pages/404.astro`
- Modify: `triton-marine/src/pages/gr/404.astro`

- [ ] **Step 1: EN 404**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/404.astro`:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import { t, localizedPath } from "../i18n/utils";

const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Page not found — Triton Marine"
  description="The page you're looking for doesn't exist."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-start justify-center px-6 py-24">
      <p class="font-display text-[10rem] font-semibold leading-none text-teal">404</p>
      <h1 class="mt-4 font-display text-4xl font-semibold sm:text-5xl">{t(locale, "notfound.title")}</h1>
      <p class="mt-3 max-w-xl text-foam/80">{t(locale, "notfound.subtitle")}</p>
      <a
        href={localizedPath(locale, "/")}
        class="mt-8 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-foam transition hover:bg-foam hover:text-navy"
      >
        {t(locale, "notfound.cta")}
      </a>
    </div>
  </section>

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: GR 404**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/404.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import { t, localizedPath } from "../../i18n/utils";

const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Η σελίδα δεν βρέθηκε — Triton Marine"
  description="Η σελίδα που ψάχνετε δεν υπάρχει."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto flex min-h-[60vh] max-w-[1200px] flex-col items-start justify-center px-6 py-24">
      <p class="font-display text-[10rem] font-semibold leading-none text-teal">404</p>
      <h1 class="mt-4 font-display text-4xl font-semibold sm:text-5xl">{t(locale, "notfound.title")}</h1>
      <p class="mt-3 max-w-xl text-foam/80">{t(locale, "notfound.subtitle")}</p>
      <a
        href={localizedPath(locale, "/")}
        class="mt-8 rounded-lg bg-teal px-6 py-3 text-sm font-semibold text-foam transition hover:bg-foam hover:text-navy"
      >
        {t(locale, "notfound.cta")}
      </a>
    </div>
  </section>

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 3: Visual check**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Visit http://localhost:4321/definitely-not-a-page and http://localhost:4321/gr/definitely-not-a-page. Both render the 404 layout. Kill server.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire 404 pages in EN and GR"
```

---

## Task 24: Install GSAP and create `animations.ts`

**Files:**
- Modify: `triton-marine/package.json` (add gsap)
- Create: `triton-marine/src/scripts/animations.ts`
- Modify: `triton-marine/src/layouts/BaseLayout.astro` (load animations script)

- [ ] **Step 1: Install GSAP**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install gsap
```

Expected: installs complete.

- [ ] **Step 2: Create `src/scripts/animations.ts`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/scripts/animations.ts`:

```ts
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, SplitText);

function prefersReducedMotion(): boolean {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function pageFadeIn() {
  const main = document.querySelector("main");
  if (!main) return;
  gsap.fromTo(main, { autoAlpha: 0.6 }, { autoAlpha: 1, duration: 0.3, ease: "power1.out" });
}

function scrollReveals() {
  const els = document.querySelectorAll<HTMLElement>("[data-reveal]");
  els.forEach((el) => {
    gsap.fromTo(
      el,
      { autoAlpha: 0, y: 20 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.7,
        ease: "power2.out",
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      },
    );
  });
}

function heroTitleReveal() {
  const el = document.querySelector<HTMLElement>("[data-hero-title]");
  if (!el) return;
  const split = new SplitText(el, { type: "words" });
  gsap.from(split.words, {
    autoAlpha: 0,
    y: 30,
    duration: 0.8,
    stagger: 0.04,
    ease: "power3.out",
  });
}

function heroKenBurns() {
  const img = document.querySelector<HTMLElement>("[data-hero-image]");
  if (!img) return;
  gsap.fromTo(
    img,
    { scale: 1 },
    {
      scale: 1.08,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    },
  );
}

function heroParallax() {
  const img = document.querySelector<HTMLElement>("[data-hero-parallax]");
  if (!img) return;
  gsap.to(img, {
    yPercent: -15,
    ease: "none",
    scrollTrigger: {
      trigger: img,
      start: "top top",
      end: "bottom top",
      scrub: true,
    },
  });
}

function statsCounters() {
  const counters = document.querySelectorAll<HTMLElement>("[data-stat-counter]");
  counters.forEach((el) => {
    const target = Number(el.dataset.statTarget ?? "0");
    const suffix = el.dataset.statSuffix ?? "";
    const obj = { value: 0 };
    gsap.to(obj, {
      value: target,
      duration: 1.5,
      ease: "power2.out",
      scrollTrigger: {
        trigger: el,
        start: "top 85%",
        toggleActions: "play none none none",
      },
      onUpdate: () => {
        el.textContent = `${Math.round(obj.value)}${suffix}`;
      },
    });
  });
}

function servicesGridStagger() {
  const grid = document.querySelector<HTMLElement>("[data-services-grid]");
  if (!grid) return;
  const cards = grid.querySelectorAll<HTMLElement>("[data-reveal]");
  cards.forEach((card) => card.removeAttribute("data-reveal"));
  gsap.fromTo(
    cards,
    { autoAlpha: 0, y: 20 },
    {
      autoAlpha: 1,
      y: 0,
      duration: 0.7,
      stagger: 0.06,
      ease: "power2.out",
      scrollTrigger: {
        trigger: grid,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    },
  );
}

function smoothAnchorScroll() {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const href = link.getAttribute("href");
      if (!href || href === "#") return;
      const target = document.querySelector(href);
      if (!target) return;
      event.preventDefault();
      gsap.to(window, { duration: 0.6, scrollTo: target, ease: "power2.inOut" });
    });
  });
}

export function initAnimations() {
  if (prefersReducedMotion()) return;
  servicesGridStagger();
  scrollReveals();
  heroTitleReveal();
  heroKenBurns();
  heroParallax();
  statsCounters();
  smoothAnchorScroll();
  pageFadeIn();
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAnimations);
  } else {
    initAnimations();
  }
}
```

- [ ] **Step 3: Load `animations.ts` from BaseLayout**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/layouts/BaseLayout.astro` and add a `<script>` tag just before the closing `</body>` tag (Astro will bundle, tree-shake, and ship it as its own asset). Replace the entire file with:

```astro
---
import "../styles/global.css";
import SeoHead from "../components/SeoHead.astro";
import type { Locale } from "../i18n/utils";
import { htmlLang, alternateUrl } from "../i18n/utils";

export interface Props {
  title: string;
  description: string;
  locale: Locale;
  ogImage?: string;
}

const { title, description, locale, ogImage } = Astro.props;
const canonicalPath = Astro.url.pathname;
const alternatePath = alternateUrl(Astro.url, locale === "en" ? "gr" : "en");
---

<!doctype html>
<html lang={htmlLang(locale)}>
  <head>
    <SeoHead
      title={title}
      description={description}
      locale={locale}
      canonicalPath={canonicalPath}
      alternatePath={alternatePath}
      ogImage={ogImage}
    />
    <slot name="head" />
  </head>
  <body>
    <slot name="header" />
    <main class="min-h-screen">
      <slot />
    </main>
    <slot name="footer" />
    <script>
      import "../scripts/animations";
    </script>
  </body>
</html>
```

- [ ] **Step 4: Visual check — animations should fire**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

On http://localhost:4321/: hero title words stagger in, hero image slowly zooms, scrolling reveals content as it enters viewport, stats count up from 0 when StatsBar enters the viewport. On a service detail page, the hero image parallaxes on scroll. Turn on "Reduce motion" in macOS System Settings → Accessibility → Display and reload — animations should not fire. Kill server.

- [ ] **Step 5: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 6: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add GSAP animations with prefers-reduced-motion gating"
```

---

## Task 25: Wire Web3Forms contact form submission

**Files:**
- Create: `triton-marine/.env.example`
- Create: `triton-marine/src/scripts/contact.ts`
- Modify: `triton-marine/src/layouts/BaseLayout.astro` (load contact script)

- [ ] **Step 1: Create `.env.example`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/.env.example`:

```
# Get a free access key at https://web3forms.com
# Then copy this file to .env and fill the value
PUBLIC_WEB3FORMS_KEY=your_key_here
```

- [ ] **Step 2: Create `src/scripts/contact.ts`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/scripts/contact.ts`:

```ts
const PLACEHOLDER_KEY = "your_key_here";
const ENDPOINT = "https://api.web3forms.com/submit";

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function setError(form: HTMLFormElement, message: string) {
  const el = form.querySelector<HTMLElement>("[data-contact-error]");
  if (el) el.textContent = message;
}

function clearError(form: HTMLFormElement) {
  const el = form.querySelector<HTMLElement>("[data-contact-error]");
  if (el) el.textContent = "";
}

function setSubmitting(form: HTMLFormElement, submitting: boolean) {
  const btn = form.querySelector<HTMLButtonElement>("[data-contact-submit]");
  const spinner = form.querySelector<HTMLElement>("[data-contact-spinner]");
  const label = form.querySelector<HTMLElement>("[data-contact-submit-label]");
  if (!btn || !spinner || !label) return;
  btn.disabled = submitting;
  spinner.classList.toggle("hidden", !submitting);
  const locale = form.dataset.locale;
  if (submitting) {
    label.textContent = locale === "gr" ? "Αποστολή…" : "Sending…";
  } else {
    label.textContent = locale === "gr" ? "Αποστολή" : "Send message";
  }
}

function showSuccess(form: HTMLFormElement) {
  const success = form.parentElement?.querySelector<HTMLElement>("[data-contact-success]")
    ?? form.querySelector<HTMLElement>("[data-contact-success]");
  const message = form.dataset.msgSuccess ?? "Thanks!";
  if (!success) return;
  success.textContent = message;
  success.classList.remove("hidden");
  form.style.display = "none";
}

async function submit(form: HTMLFormElement) {
  clearError(form);

  const formData = new FormData(form);
  const botcheck = formData.get("botcheck");
  if (botcheck) return;

  const name = String(formData.get("name") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const subject = String(formData.get("subject") ?? "").trim();
  const message = String(formData.get("message") ?? "").trim();

  if (!name || !email || !subject || !message) {
    setError(form, form.dataset.msgRequired ?? "Required.");
    return;
  }
  if (!isEmail(email)) {
    setError(form, form.dataset.msgEmail ?? "Invalid email.");
    return;
  }

  const key = import.meta.env.PUBLIC_WEB3FORMS_KEY;
  if (!key || key === PLACEHOLDER_KEY) {
    setError(form, form.dataset.msgNotConfigured ?? "Contact form not configured.");
    return;
  }

  setSubmitting(form, true);

  const payload: Record<string, string> = {
    access_key: key,
    name,
    email,
    subject,
    message,
  };
  const phone = String(formData.get("phone") ?? "").trim();
  if (phone) payload.phone = phone;

  try {
    const res = await fetch(ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify(payload),
    });
    const data: { success?: boolean; message?: string } = await res.json().catch(() => ({}));

    if (res.ok && data.success) {
      showSuccess(form);
    } else {
      setError(form, form.dataset.msgError ?? "Error.");
      setSubmitting(form, false);
    }
  } catch {
    setError(form, form.dataset.msgError ?? "Error.");
    setSubmitting(form, false);
  }
}

export function initContactForms() {
  const forms = document.querySelectorAll<HTMLFormElement>("[data-contact-form]");
  forms.forEach((form) => {
    form.addEventListener("submit", (event) => {
      event.preventDefault();
      void submit(form);
    });
  });
}

if (typeof window !== "undefined") {
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initContactForms);
  } else {
    initContactForms();
  }
}
```

- [ ] **Step 3: Load contact script from BaseLayout**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/layouts/BaseLayout.astro` and add a second `<script>` tag next to the animations one. The final `<body>` block should read:

```astro
  <body>
    <slot name="header" />
    <main class="min-h-screen">
      <slot />
    </main>
    <slot name="footer" />
    <script>
      import "../scripts/animations";
    </script>
    <script>
      import "../scripts/contact";
    </script>
  </body>
```

- [ ] **Step 4: Test the "not configured" path**

Do NOT create a `.env` file (or leave `PUBLIC_WEB3FORMS_KEY=your_key_here`).

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run dev
```

Fill the form on `/contact` with valid values and submit. Expected: red inline error says "Contact form is not yet configured. Please email us directly." The form is not sent. Kill server.

- [ ] **Step 5: Run `astro check`**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings`.

- [ ] **Step 6: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: wire Web3Forms contact submission with not-configured fallback"
```

---

## Task 26: Add `@astrojs/sitemap` integration

**Files:**
- Modify: `triton-marine/package.json`
- Modify: `triton-marine/astro.config.mjs`

- [ ] **Step 1: Install sitemap integration**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install @astrojs/sitemap
```

- [ ] **Step 2: Update `astro.config.mjs` to enable sitemap**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://triton-marine.example.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", gr: "el" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

- [ ] **Step 3: Build and verify sitemap**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run build
ls dist/sitemap-*.xml dist/sitemap-index.xml
```

Expected: `sitemap-index.xml` and at least one `sitemap-0.xml` generated in `dist/`.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add @astrojs/sitemap integration"
```

---

## Task 27: Add `robots.txt` and JSON-LD `LocalBusiness` schema

**Files:**
- Create: `triton-marine/public/robots.txt`
- Create: `triton-marine/src/components/LocalBusinessSchema.astro`
- Modify: `triton-marine/src/pages/index.astro` (include schema)
- Modify: `triton-marine/src/pages/gr/index.astro` (include schema)
- Modify: `triton-marine/src/pages/contact.astro` (include schema)
- Modify: `triton-marine/src/pages/gr/contact.astro` (include schema)

- [ ] **Step 1: Create `public/robots.txt`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/public/robots.txt`:

```
User-agent: *
Allow: /

Sitemap: https://triton-marine.example.com/sitemap-index.xml
```

- [ ] **Step 2: Create `LocalBusinessSchema.astro`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/LocalBusinessSchema.astro`:

```astro
---
import type { Locale } from "../i18n/utils";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;

const site = Astro.site?.toString().replace(/\/$/, "") ?? "";

const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Triton Marine",
  description:
    locale === "gr"
      ? "Ναυτικές υπηρεσίες στις ελληνικές ακτές."
      : "Marine services on the Greek coast.",
  url: site,
  telephone: "+30 000 000 0000",
  email: "hello@triton-marine.example",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Placeholder address",
    addressLocality: "Placeholder city",
    addressCountry: "GR",
  },
  image: `${site}/og-default.jpg`,
  priceRange: "€€",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      opens: "08:00",
      closes: "18:00",
    },
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: "Saturday",
      opens: "09:00",
      closes: "14:00",
    },
  ],
};
---
<script type="application/ld+json" set:html={JSON.stringify(schema)}></script>
```

- [ ] **Step 3: Include schema on EN home page**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/index.astro` and add the import + slot use. Replace the full file with:

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
import Header from "../components/Header.astro";
import Footer from "../components/Footer.astro";
import Hero from "../components/Hero.astro";
import ServicesGrid from "../components/ServicesGrid.astro";
import StatsBar from "../components/StatsBar.astro";
import CtaSection from "../components/CtaSection.astro";
import LocalBusinessSchema from "../components/LocalBusinessSchema.astro";

const locale = "en" as const;
---
<BaseLayout
  locale={locale}
  title="Triton Marine — Marine services you can trust"
  description="Triton Marine provides professional marine services along the Greek coast: engine service, hull cleaning, winterization, electronics, and more."
>
  <LocalBusinessSchema slot="head" locale={locale} />
  <Header slot="header" locale={locale} />
  <Hero locale={locale} />
  <ServicesGrid locale={locale} />
  <StatsBar locale={locale} />
  <CtaSection locale={locale} />
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: Include schema on GR home page**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/index.astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import Hero from "../../components/Hero.astro";
import ServicesGrid from "../../components/ServicesGrid.astro";
import StatsBar from "../../components/StatsBar.astro";
import CtaSection from "../../components/CtaSection.astro";
import LocalBusinessSchema from "../../components/LocalBusinessSchema.astro";

const locale = "gr" as const;
---
<BaseLayout
  locale={locale}
  title="Triton Marine — Ναυτικές υπηρεσίες στις ελληνικές ακτές"
  description="Η Triton Marine προσφέρει επαγγελματικές ναυτικές υπηρεσίες: συντήρηση κινητήρα, καθαρισμός γάστρας, χειμερινή προετοιμασία, ηλεκτρονικά, και άλλα."
>
  <LocalBusinessSchema slot="head" locale={locale} />
  <Header slot="header" locale={locale} />
  <Hero locale={locale} />
  <ServicesGrid locale={locale} />
  <StatsBar locale={locale} />
  <CtaSection locale={locale} />
  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 5: Include schema on EN contact page**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/contact.astro`. Add the import and the slot:

Find this line:
```astro
import { t } from "../i18n/utils";
```

Below it, add:
```astro
import LocalBusinessSchema from "../components/LocalBusinessSchema.astro";
```

Find this line:
```astro
  <Header slot="header" locale={locale} />
```

Immediately before it, add:
```astro
  <LocalBusinessSchema slot="head" locale={locale} />
```

- [ ] **Step 6: Include schema on GR contact page**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/contact.astro`.

Find this line:
```astro
import { t } from "../../i18n/utils";
```

Below it, add:
```astro
import LocalBusinessSchema from "../../components/LocalBusinessSchema.astro";
```

Find this line:
```astro
  <Header slot="header" locale={locale} />
```

Immediately before it, add:
```astro
  <LocalBusinessSchema slot="head" locale={locale} />
```

- [ ] **Step 7: Build and verify JSON-LD appears in output**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run build
grep -l "application/ld+json" dist/index.html dist/gr/index.html dist/contact/index.html dist/gr/contact/index.html
```

Expected: all 4 files listed.

- [ ] **Step 8: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add robots.txt and LocalBusiness JSON-LD schema"
```

---

## Task 28: Add Vercel adapter for deployment

**Files:**
- Modify: `triton-marine/package.json`
- Modify: `triton-marine/astro.config.mjs`

- [ ] **Step 1: Install Vercel adapter**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install @astrojs/vercel
```

- [ ] **Step 2: Update `astro.config.mjs`**

Replace `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/astro.config.mjs`:

```js
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/static";

export default defineConfig({
  site: "https://triton-marine.example.com",
  output: "static",
  adapter: vercel({
    webAnalytics: { enabled: false },
  }),
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", gr: "el" },
      },
    }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
});
```

> If `@astrojs/vercel/static` is not a valid subpath in the installed version (Astro 5 collapsed the Vercel adapter into a single entry), replace the import line with `import vercel from "@astrojs/vercel";` and remove the `output: "static"` line — the single-entry adapter defaults to static.

- [ ] **Step 3: Build with the adapter**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run build
```

Expected: build completes, creates `.vercel/output/` directory with Vercel-ready output.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "feat: add Vercel static adapter"
```

---

## Task 29: Add ESLint + Prettier tooling

**Files:**
- Modify: `triton-marine/package.json`
- Create: `triton-marine/.prettierrc.json`
- Create: `triton-marine/.prettierignore`
- Create: `triton-marine/eslint.config.js`

- [ ] **Step 1: Install tooling**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm install -D prettier prettier-plugin-astro prettier-plugin-tailwindcss eslint eslint-plugin-astro @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

- [ ] **Step 2: Create `.prettierrc.json`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/.prettierrc.json`:

```json
{
  "plugins": ["prettier-plugin-astro", "prettier-plugin-tailwindcss"],
  "overrides": [
    {
      "files": "*.astro",
      "options": { "parser": "astro" }
    }
  ],
  "printWidth": 100,
  "semi": true,
  "singleQuote": false,
  "trailingComma": "all"
}
```

- [ ] **Step 3: Create `.prettierignore`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/.prettierignore`:

```
dist/
node_modules/
.astro/
.vercel/
public/images/
```

- [ ] **Step 4: Create `eslint.config.js`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/eslint.config.js`:

```js
import tsParser from "@typescript-eslint/parser";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import astroPlugin from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", "node_modules/**", ".astro/**", ".vercel/**"],
  },
  {
    files: ["**/*.ts"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: "latest", sourceType: "module" },
    },
    plugins: { "@typescript-eslint": tsPlugin },
    rules: {
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
    },
  },
  ...astroPlugin.configs.recommended,
];
```

- [ ] **Step 5: Run formatter and lint**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run format
npm run lint
```

Expected: `format` rewrites files to canonical style; `lint` completes with no errors (warnings OK).

- [ ] **Step 6: Run full validator suite**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run format:check && npm run lint && npm run check && npm run build
```

Expected: all four pass.

- [ ] **Step 7: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "chore: add prettier and eslint tooling"
```

---

## Task 30: Write README with dev/build commands and QA checklist

**Files:**
- Create: `triton-marine/README.md`

- [ ] **Step 1: Create `triton-marine/README.md`**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/README.md`:

````markdown
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
| `npm run build` | Production build to `dist/` |
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
````

- [ ] **Step 2: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "docs: add README with scripts and QA checklist"
```

---

## Task 31: Final validation pass

- [ ] **Step 1: Clean build + all validators**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
rm -rf dist .astro .vercel
npm run format:check
npm run lint
npm run check
npm run build
```

Expected: each command exits 0. Build output includes both `dist/` (for reference) or `.vercel/output/` (depending on adapter) — and includes every page route listed in the README table.

- [ ] **Step 2: Preview the production build**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run preview
```

Open the printed URL (usually http://localhost:4321/ or similar) and click through every QA checklist item from the README. Kill the server.

- [ ] **Step 3: Run Lighthouse via Chrome DevTools**

Open http://localhost:4321/ in Chrome with the dev server running (`npm run dev`). DevTools → Lighthouse tab → Analyze page load (Mobile + Desktop, all categories). Record scores. Targets: Performance ≥90, Accessibility ≥95, SEO ≥95, Best Practices ≥95. Repeat for `/services`, `/services/engine-service`, `/contact`, `/gr/`.

If any score misses the target, file a follow-up note in the repo (`docs/lighthouse-followup.md`) with the failing audit — don't block the launch unless Accessibility or SEO is below 85.

- [ ] **Step 4: Final commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add -A
git status
```

If anything is staged (e.g., formatting fixes):
```bash
git commit -m "chore: final formatting and validation pass"
```

If nothing is staged, skip the commit.

---

## Appendix A — Self-review (for plan author)

**Spec coverage:**

| Spec section | Implemented in task(s) |
|---|---|
| §2 In scope — 6 pages | 13, 18, 19, 20, 22, 23 |
| §2 In scope — bilingual EN/GR routing | 4, 13, all page tasks |
| §2 In scope — Tailwind + Deep Sea palette | 2, 3 |
| §2 In scope — subtle GSAP animations | 24 |
| §2 In scope — Web3Forms contact | 21, 22, 25 |
| §2 In scope — Unsplash photography | 6 |
| §2 In scope — SEO (meta, OG, sitemap, hreflang, JSON-LD) | 8, 9, 26, 27 |
| §2 In scope — Vercel deploy | 28 |
| §3 Tech stack | 1, 2, 3, 7, 24, 26, 28, 29 |
| §4 Project layout | 1 (dirs), 5–29 (files) |
| §5 Data model (Service type) | 5 |
| §5 i18n util signatures | 4 |
| §6 Placeholder logo | 11 (Header), 8 (favicon) |
| §7 GSAP animation plan | 24 |
| §8 i18n routing + LanguageSwitcher | 4, 10, 11, 13 |
| §9 SEO (SeoHead, hreflang, sitemap, JSON-LD) | 8, 26, 27 |
| §10 Contact form (Web3Forms, honeypot, fallback) | 21, 25 |
| §11 Testing/validation (astro check, Lighthouse) | 29, 30, 31 |
| §12 Deployment | 28, 30 |
| §13 Migration — old template untouched | 1 (sibling folder) |
| §14 Content handoff — Lorem Ipsum, placeholder logo, credits | 5, 6, 8, 11 |

No gaps identified.

**Placeholder scan:** No "TBD", "TODO" (except one literal `placeholder` string in Footer address, intentional per spec §14), no "implement later", no vague steps.

**Type consistency checked:**
- `Service` type fields match across `services.ts` (Task 5), `ServiceCard.astro` (Task 15), `[slug].astro` EN/GR (Tasks 13, 20).
- `Locale` type imported consistently from `i18n/utils.ts`.
- Function signatures `t()`, `localizedPath()`, `alternateUrl()`, `htmlLang()`, `getLocaleFromUrl()` used identically across tasks.
- Data attributes (`data-reveal`, `data-hero-title`, `data-hero-image`, `data-hero-parallax`, `data-stat-counter`, `data-stat-target`, `data-stat-suffix`, `data-services-grid`, `data-contact-form`, `data-contact-error`, `data-contact-success`, `data-contact-submit`, `data-contact-submit-label`, `data-contact-spinner`, `data-locale`, `data-msg-*`) are defined in component tasks and consumed in `animations.ts` / `contact.ts` (Tasks 24, 25).

Plan is internally consistent and self-contained.





