# Services Page — Induste Layout Redesign

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the Services list page (`/services` + `/gr/services`) to match the layout of `induste/service-list.html` — breadcrumb hero, full-width alternating service rows, 3-stat counter bar, 2-column booking form section — while keeping the project's Deep Sea palette, marine copy, bilingual EN/GR, and existing architecture.

**Architecture:** Add four new components (`PageHero`, `ServiceRow`, `ServicesList`, `StatsCompact`, `BookingForm`) and rewrite both services index pages to compose them. Keep the existing `ServicesGrid` component unchanged (still used on home) — the new alternating layout is a separate component. Booking form posts to Web3Forms using the same `PUBLIC_WEB3FORMS_KEY` env var already wired up; reuses the existing client-side submit script with minimal extensions for the new dropdown.

**Tech Stack:** Astro 5 • Tailwind v4 • lucide-astro icons • existing i18n utilities • existing Web3Forms integration.

**Reference:** original page at `induste/service-list.html`. Deep Sea palette and marine service list (6 services) already defined in the repo.

**Working directory:** `/Users/marios/Desktop/Cursor/tritonasmarine`. Commits land on `main`.

---

## File plan

| Action | Path | Purpose |
|---|---|---|
| Create | `triton-marine/src/components/PageHero.astro` | Reusable breadcrumb hero — dark overlay, title, breadcrumb trail |
| Create | `triton-marine/src/components/ServiceRow.astro` | Single full-width service block with icon + title + short desc + CTA; supports `reversed` prop for alternation |
| Create | `triton-marine/src/components/ServicesList.astro` | Maps `services` array to `ServiceRow`, flipping `reversed` on every other row |
| Create | `triton-marine/src/components/StatsCompact.astro` | 3-stat counter row — icon + animated number + label, on foam bg, matching Induste's visual |
| Create | `triton-marine/src/components/BookingForm.astro` | 5-field form + service dropdown; reuses Web3Forms submit via the same `[data-contact-form]` selector so `src/scripts/contact.ts` handles it |
| Modify | `triton-marine/src/i18n/en.json` | Add breadcrumb, booking, stats-compact, form.location keys |
| Modify | `triton-marine/src/i18n/gr.json` | Same keys in Greek |
| Modify | `triton-marine/src/pages/services/index.astro` | Full rewrite composing PageHero + ServicesList + StatsCompact + BookingForm section |
| Modify | `triton-marine/src/pages/gr/services/index.astro` | GR twin |

Not touched: `ServicesGrid.astro`, `ServiceCard.astro` (still used on home + about), `StatsBar.astro` (still used on home + about).

---

## Validation approach

Per-task: `npm run check` must exit 0. End-of-plan: full validator suite (`format:check`, `lint`, `check`, `build`) + visual walk-through on `http://localhost:4321/services` and `/gr/services`.

Work from `/Users/marios/Desktop/Cursor/tritonasmarine` for `git` commands; from `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine` for `npm` commands.

---

## Task 1: Add new i18n keys for breadcrumb, booking, stats-compact, form.location

**Files:**
- Modify: `triton-marine/src/i18n/en.json`
- Modify: `triton-marine/src/i18n/gr.json`

- [ ] **Step 1: Add EN keys**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/i18n/en.json`. Keep every existing key. Add the following new keys (insert them before the closing `}`; the JSON order doesn't matter, but keep the file valid):

```json
  "breadcrumb.home": "Home",
  "breadcrumb.services": "Services",
  "services.details": "Details",
  "stats_compact.clients": "Happy clients",
  "stats_compact.services": "Services completed",
  "stats_compact.partners": "Marina partners",
  "booking.eyebrow": "BOOK NOW",
  "booking.title": "Book a service",
  "booking.subtitle": "Tell us what you need and where your boat is. A technician will call you back within one business day.",
  "booking.submit": "Request booking",
  "form.location": "Location / marina",
  "form.select_service": "Select a service",
```

Make sure the previous last key still has a trailing comma and the new block's last key does NOT have a trailing comma before the closing `}`.

- [ ] **Step 2: Add GR keys**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/i18n/gr.json`. Add the Greek counterparts:

```json
  "breadcrumb.home": "Αρχική",
  "breadcrumb.services": "Υπηρεσίες",
  "services.details": "Λεπτομέρειες",
  "stats_compact.clients": "Ευχαριστημένοι πελάτες",
  "stats_compact.services": "Εργασίες ολοκληρωμένες",
  "stats_compact.partners": "Συνεργαζόμενες μαρίνες",
  "booking.eyebrow": "ΚΛΕΙΣΤΕ ΡΑΝΤΕΒΟΥ",
  "booking.title": "Κλείστε ραντεβού",
  "booking.subtitle": "Πείτε μας τι χρειάζεστε και πού βρίσκεται το σκάφος σας. Ένας τεχνικός θα σας καλέσει εντός μίας εργάσιμης ημέρας.",
  "booking.submit": "Υποβολή αιτήματος",
  "form.location": "Τοποθεσία / μαρίνα",
  "form.select_service": "Επιλέξτε υπηρεσία",
```

- [ ] **Step 3: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && echo "en.json valid"
node -e "JSON.parse(require('fs').readFileSync('src/i18n/gr.json'))" && echo "gr.json valid"
npm run check
```

Expected: both "valid" messages print; `check` shows `0 errors, 0 warnings, 0 hints`.

- [ ] **Step 4: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/i18n/
git commit -m "feat(i18n): add strings for breadcrumb, booking, stats-compact"
```

---

## Task 2: Create `PageHero.astro` component (breadcrumb hero)

**Files:**
- Create: `triton-marine/src/components/PageHero.astro`

- [ ] **Step 1: Create the file**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/PageHero.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";
import { ChevronRight } from "lucide-astro";

export interface Props {
  locale: Locale;
  titleKey: keyof typeof import("../i18n/en.json");
  backgroundImage: string;
  crumbs: { labelKey: keyof typeof import("../i18n/en.json"); href?: string }[];
}

const { locale, titleKey, backgroundImage, crumbs } = Astro.props;
---

<section class="relative isolate overflow-hidden">
  <div class="absolute inset-0 -z-10">
    <img
      src={backgroundImage}
      alt=""
      class="h-full w-full object-cover"
      loading="eager"
      fetchpriority="high"
    />
    <div class="from-navy/80 via-navy/70 to-navy/80 absolute inset-0 bg-gradient-to-b"></div>
  </div>

  <div class="mx-auto max-w-[1200px] px-6 py-28 text-foam">
    <h1
      class="font-display text-5xl font-semibold tracking-tight sm:text-6xl md:text-7xl"
      data-reveal
    >
      {t(locale, titleKey)}
    </h1>

    <nav class="mt-6 flex flex-wrap items-center gap-2 text-sm" aria-label="Breadcrumb" data-reveal>
      {
        crumbs.map((crumb, i) => (
          <>
            {i > 0 && <ChevronRight class="h-4 w-4 text-foam/50" aria-hidden="true" />}
            {crumb.href ? (
              <a href={localizedPath(locale, crumb.href)} class="text-foam/70 hover:text-teal">
                {t(locale, crumb.labelKey)}
              </a>
            ) : (
              <span class="text-teal font-medium">{t(locale, crumb.labelKey)}</span>
            )}
          </>
        ))
      }
    </nav>
  </div>
</section>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings, 0 hints`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/components/PageHero.astro
git commit -m "feat: add PageHero component for breadcrumb banners"
```

---

## Task 3: Create `ServiceRow.astro` component (alternating service block)

**Files:**
- Create: `triton-marine/src/components/ServiceRow.astro`

- [ ] **Step 1: Create the file**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/ServiceRow.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";
import type { Service } from "../data/services";
import {
  ArrowRight,
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
  reversed?: boolean;
}

const { service, locale, reversed = false } = Astro.props;
const Icon = iconMap[service.icon] ?? Wrench;
const href = localizedPath(locale, `/services/${service.slug}`);
const bgClass = reversed ? "bg-navy text-foam" : "bg-foam text-navy";
const titleHoverClass = reversed ? "group-hover:text-teal" : "group-hover:text-teal";
const descClass = reversed ? "text-foam/75" : "text-navy/70";
const dividerClass = reversed ? "border-foam/10" : "border-navy/10";
---

<article class={`group border-b ${dividerClass} ${bgClass}`}>
  <a
    href={href}
    class={`mx-auto flex max-w-[1200px] flex-col items-start gap-8 px-6 py-16 md:gap-12 md:py-20 ${reversed ? "md:flex-row-reverse" : "md:flex-row"} md:items-center`}
    data-reveal
  >
    <div
      class={`flex h-24 w-24 flex-none items-center justify-center rounded-lg ${reversed ? "bg-foam/10 text-teal" : "bg-teal/10 text-teal"} transition group-hover:bg-teal group-hover:text-foam`}
    >
      <Icon class="h-12 w-12" />
    </div>

    <div class="flex-1">
      <h3 class={`font-display text-3xl font-semibold transition sm:text-4xl ${titleHoverClass}`}>
        {service.name[locale]}
      </h3>
      <p class={`mt-3 max-w-2xl text-base ${descClass}`}>
        {service.shortDescription[locale]}
      </p>
    </div>

    <span
      class={`inline-flex flex-none items-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold uppercase tracking-wide transition ${
        reversed
          ? "border-foam/40 text-foam group-hover:border-teal group-hover:bg-teal"
          : "border-navy/20 text-navy group-hover:border-teal group-hover:bg-teal group-hover:text-foam"
      }`}
    >
      {t(locale, "services.details")}
      <ArrowRight class="h-4 w-4" />
    </span>
  </a>
</article>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings, 0 hints`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/components/ServiceRow.astro
git commit -m "feat: add ServiceRow component with reversed variant for alternation"
```

---

## Task 4: Create `ServicesList.astro` component (maps services with alternation)

**Files:**
- Create: `triton-marine/src/components/ServicesList.astro`

- [ ] **Step 1: Create the file**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/ServicesList.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { services } from "../data/services";
import ServiceRow from "./ServiceRow.astro";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
---

<section class="border-t border-navy/10">
  {services.map((service, i) => <ServiceRow service={service} locale={locale} reversed={i % 2 === 1} />)}
</section>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings, 0 hints`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/components/ServicesList.astro
git commit -m "feat: add ServicesList wrapper with alternating rows"
```

---

## Task 5: Create `StatsCompact.astro` component (3 stats with icons)

**Files:**
- Create: `triton-marine/src/components/StatsCompact.astro`

- [ ] **Step 1: Create the file**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/StatsCompact.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t } from "../i18n/utils";
import { Users, CheckCircle2, Anchor } from "lucide-astro";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;

const stats = [
  { key: "stats_compact.clients", value: 2500, suffix: "+", Icon: Users },
  { key: "stats_compact.services", value: 5800, suffix: "+", Icon: CheckCircle2 },
  { key: "stats_compact.partners", value: 7, suffix: "", Icon: Anchor },
] as const;
---

<section class="bg-foam">
  <div class="mx-auto grid max-w-[1200px] gap-8 px-6 py-16 md:grid-cols-3 md:divide-x md:divide-navy/10">
    {
      stats.map(({ key, value, suffix, Icon }) => (
        <div class="flex items-center gap-5 md:px-8" data-reveal>
          <div class="flex h-14 w-14 flex-none items-center justify-center rounded-lg bg-teal/10 text-teal">
            <Icon class="h-7 w-7" />
          </div>
          <div>
            <div
              class="font-display text-4xl font-semibold text-navy"
              data-stat-counter
              data-stat-target={value}
              data-stat-suffix={suffix}
            >
              0{suffix}
            </div>
            <p class="mt-1 text-sm uppercase tracking-wide text-navy/60">{t(locale, key)}</p>
          </div>
        </div>
      ))
    }
  </div>
</section>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings, 0 hints`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/components/StatsCompact.astro
git commit -m "feat: add StatsCompact (3-stat with icons) component"
```

---

## Task 6: Create `BookingForm.astro` component

Form posts to Web3Forms using the existing `[data-contact-form]` selector. The existing `src/scripts/contact.ts` picks up this form automatically because it queries all elements with `data-contact-form`. We extend the payload slightly — `location` and `service` fields are included in the form and get sent through `FormData` keys (no script change needed, since the script grabs required fields explicitly; additional fields go through via the payload builder below).

Wait — read carefully: the existing script only sends `name`, `email`, `subject`, `message`, and optionally `phone`. We need it to also send `location` and `service`. That requires a small extension to `contact.ts` OR we include `location` / `service` by concatenating them into `message` / `subject` on the client side (no script change).

**Decision:** Concatenate approach keeps the script untouched and avoids coupling the contact form changes with the booking form.

- On submit, the booking form sets a hidden `subject` to "Booking: [selected service]" and a hidden `message` composed from the location + service + any note.
- No change to `src/scripts/contact.ts` required.

**Files:**
- Create: `triton-marine/src/components/BookingForm.astro`

- [ ] **Step 1: Create the file**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/components/BookingForm.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t } from "../i18n/utils";
import { services } from "../data/services";
import { Calendar } from "lucide-astro";

export interface Props {
  locale: Locale;
}
const { locale } = Astro.props;
---

<form
  class="space-y-4"
  data-contact-form
  data-locale={locale}
  data-msg-success={t(locale, "form.success")}
  data-msg-error={t(locale, "form.error")}
  data-msg-not-configured={t(locale, "form.not_configured")}
  data-msg-required={t(locale, "form.validation.required")}
  data-msg-email={t(locale, "form.validation.email")}
  novalidate
>
  <input type="hidden" name="from_name" value="Triton Marine booking" />

  <div class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.name")}</span>
      <input
        type="text"
        name="name"
        required
        class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:ring-2 focus:ring-teal/30 focus:outline-none"
      />
    </label>
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.email")}</span>
      <input
        type="email"
        name="email"
        required
        class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:ring-2 focus:ring-teal/30 focus:outline-none"
      />
    </label>
  </div>

  <div class="grid gap-4 md:grid-cols-2">
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.phone")}</span>
      <input
        type="tel"
        name="phone"
        class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:ring-2 focus:ring-teal/30 focus:outline-none"
      />
    </label>
    <label class="block">
      <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "form.location")}</span>
      <input
        type="text"
        name="location"
        required
        class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:ring-2 focus:ring-teal/30 focus:outline-none"
      />
    </label>
  </div>

  <label class="block">
    <span class="mb-1 block text-sm font-medium text-navy">{t(locale, "nav.services")}</span>
    <select
      name="service"
      required
      class="block w-full rounded-lg border border-navy/20 bg-foam px-4 py-3 text-navy transition focus:border-teal focus:ring-2 focus:ring-teal/30 focus:outline-none"
    >
      <option value="">{t(locale, "form.select_service")}</option>
      {services.map((s) => <option value={s.slug}>{s.name[locale]}</option>)}
    </select>
  </label>

  <input type="hidden" name="subject" data-booking-subject value="" />
  <input type="hidden" name="message" data-booking-message value="" />

  <input type="checkbox" name="botcheck" class="hidden" tabindex="-1" autocomplete="off" aria-hidden="true" />

  <div class="flex items-center gap-4 pt-2">
    <button
      type="submit"
      data-booking-submit
      class="inline-flex items-center gap-2 rounded-lg bg-teal px-6 py-3 text-sm font-semibold uppercase tracking-wide text-foam transition hover:bg-navy disabled:cursor-not-allowed disabled:opacity-60"
      data-contact-submit
    >
      <Calendar class="h-4 w-4" />
      <span data-contact-submit-label>{t(locale, "booking.submit")}</span>
      <span
        class="hidden h-4 w-4 animate-spin rounded-full border-2 border-foam border-t-transparent"
        data-contact-spinner
        aria-hidden="true"></span>
    </button>
    <p class="text-sm text-rust" data-contact-error role="alert" aria-live="polite"></p>
  </div>

  <p class="hidden text-sm font-medium text-teal" data-contact-success role="status" aria-live="polite"></p>
</form>

<script>
  // Compose subject + message from the booking fields before submit so the Web3Forms email
  // contains the service slug, location, and phone without changing the shared contact script.
  document.querySelectorAll<HTMLFormElement>("form[data-contact-form]").forEach((form) => {
    if (!form.querySelector("[data-booking-subject]")) return; // not a booking form
    form.addEventListener(
      "submit",
      () => {
        const service = (form.querySelector('[name="service"]') as HTMLSelectElement | null)?.value ?? "";
        const location = (form.querySelector('[name="location"]') as HTMLInputElement | null)?.value ?? "";
        const phone = (form.querySelector('[name="phone"]') as HTMLInputElement | null)?.value ?? "";
        const subject = form.querySelector<HTMLInputElement>("[data-booking-subject]");
        const message = form.querySelector<HTMLInputElement>("[data-booking-message]");
        if (subject) subject.value = `Booking: ${service || "unspecified"}`;
        if (message) {
          message.value = [
            `Service: ${service || "(not selected)"}`,
            `Location: ${location || "(not provided)"}`,
            `Phone: ${phone || "(not provided)"}`,
          ].join("\n");
        }
      },
      true, // capture phase — runs before the shared contact.ts handler
    );
  });
</script>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
```

Expected: `0 errors, 0 warnings, 0 hints`.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/components/BookingForm.astro
git commit -m "feat: add BookingForm component with service dropdown and Web3Forms reuse"
```

---

## Task 7: Rewrite EN services page

**Files:**
- Modify: `triton-marine/src/pages/services/index.astro`

- [ ] **Step 1: Replace the file**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/services/index.astro` and replace the entire contents with:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import PageHero from "../../components/PageHero.astro";
import ServicesList from "../../components/ServicesList.astro";
import StatsCompact from "../../components/StatsCompact.astro";
import BookingForm from "../../components/BookingForm.astro";
import { t } from "../../i18n/utils";

const locale = "en" as const;
---

<BaseLayout
  locale={locale}
  title="Services — Triton Marine"
  description="All marine services offered by Triton Marine."
>
  <Header slot="header" locale={locale} />

  <PageHero
    locale={locale}
    titleKey="nav.services"
    backgroundImage="/images/hero-home.jpg"
    crumbs={[
      { labelKey: "breadcrumb.home", href: "/" },
      { labelKey: "breadcrumb.services" },
    ]}
  />

  <ServicesList locale={locale} />

  <StatsCompact locale={locale} />

  <section class="bg-deep text-foam">
    <div class="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 md:grid-cols-[5fr_7fr] md:gap-16">
      <div data-reveal>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          {t(locale, "booking.eyebrow")}
        </p>
        <h2 class="mt-4 font-display text-4xl font-semibold sm:text-5xl">
          {t(locale, "booking.title")}
        </h2>
        <p class="mt-4 text-foam/80">
          {t(locale, "booking.subtitle")}
        </p>
      </div>
      <div class="rounded-lg bg-foam p-8" data-reveal>
        <BookingForm locale={locale} />
      </div>
    </div>
  </section>

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
npm run build
```

Expected: both clean. Build output still shows 22 pages. Open `http://localhost:4321/services` in the already-running dev server — you should see: breadcrumb hero → 6 alternating service blocks → 3-stat counter row → 2-col booking section.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/pages/services/index.astro
git commit -m "feat(services): rewrite EN services page in Induste layout"
```

---

## Task 8: Rewrite GR services page

**Files:**
- Modify: `triton-marine/src/pages/gr/services/index.astro`

- [ ] **Step 1: Replace the file**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/triton-marine/src/pages/gr/services/index.astro` and replace the entire contents with:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Header from "../../../components/Header.astro";
import Footer from "../../../components/Footer.astro";
import PageHero from "../../../components/PageHero.astro";
import ServicesList from "../../../components/ServicesList.astro";
import StatsCompact from "../../../components/StatsCompact.astro";
import BookingForm from "../../../components/BookingForm.astro";
import { t } from "../../../i18n/utils";

const locale = "gr" as const;
---

<BaseLayout
  locale={locale}
  title="Υπηρεσίες — Triton Marine"
  description="Όλες οι ναυτικές υπηρεσίες της Triton Marine."
>
  <Header slot="header" locale={locale} />

  <PageHero
    locale={locale}
    titleKey="nav.services"
    backgroundImage="/images/hero-home.jpg"
    crumbs={[
      { labelKey: "breadcrumb.home", href: "/" },
      { labelKey: "breadcrumb.services" },
    ]}
  />

  <ServicesList locale={locale} />

  <StatsCompact locale={locale} />

  <section class="bg-deep text-foam">
    <div class="mx-auto grid max-w-[1200px] gap-10 px-6 py-20 md:grid-cols-[5fr_7fr] md:gap-16">
      <div data-reveal>
        <p class="text-xs font-semibold uppercase tracking-[0.2em] text-teal">
          {t(locale, "booking.eyebrow")}
        </p>
        <h2 class="mt-4 font-display text-4xl font-semibold sm:text-5xl">
          {t(locale, "booking.title")}
        </h2>
        <p class="mt-4 text-foam/80">
          {t(locale, "booking.subtitle")}
        </p>
      </div>
      <div class="rounded-lg bg-foam p-8" data-reveal>
        <BookingForm locale={locale} />
      </div>
    </div>
  </section>

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 2: Validate**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
npm run check
npm run build
```

Expected: clean. Open `http://localhost:4321/gr/services` — same layout as EN with Greek copy.

- [ ] **Step 3: Commit**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/src/pages/gr/services/index.astro
git commit -m "feat(services): rewrite GR services page in Induste layout"
```

---

## Task 9: Final validation pass

- [ ] **Step 1: Clean build + full validator suite**

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine/triton-marine
rm -rf dist .astro .vercel
npm run format
npm run format:check
npm run lint
npm run check
npm run build
```

Expected: every command exits 0. `format:check` says `All matched files use Prettier code style!`. `check` says `0 errors, 0 warnings, 0 hints`. `build` produces 22 pages.

- [ ] **Step 2: Visual walkthrough**

Dev server should already be running (restart with `npm run dev` if not). Visit each of these and confirm the layout matches the Induste reference, using the Deep Sea palette:

- `http://localhost:4321/services` — EN
- `http://localhost:4321/gr/services` — GR

Check specifically:
1. Breadcrumb hero: dark overlay, "Services" h1, "Home › Services" breadcrumb (teal active state).
2. 6 service rows, alternating: row 1/3/5 on foam bg with navy text, row 2/4/6 on navy bg with foam text. Icon on the left for odd rows, right for even rows (flipped by `reversed`). Each row clickable.
3. StatsCompact: 3 stats side-by-side, counters animate when scrolled into view (same hook system as StatsBar — `data-stat-counter`).
4. Booking section: dark `bg-deep` section, left column has BOOK NOW eyebrow + title + subtitle, right column has a foam card with the 5-field booking form.
5. Switching language via navbar preserves the `/services` vs `/gr/services` route.
6. Submitting the booking form (without setting the env key) shows the existing "Contact form is not yet configured" message.

- [ ] **Step 3: Commit any final formatting fixes (if any)**

If `git status` shows staged changes from `npm run format`:

```bash
cd /Users/marios/Desktop/Cursor/tritonasmarine
git add triton-marine/
git commit -m "chore: final formatting pass for services page redesign"
```

If nothing is staged, skip this step.

---

## Self-review

**Spec coverage:**

| Design element | Task |
|---|---|
| Breadcrumb hero (background, title, crumb trail) | T2 + T7/T8 |
| 6 alternating service blocks (icon + title + desc + CTA, reversed every other) | T3 + T4 + T7/T8 |
| 3-stat counter with icons | T5 + T7/T8 |
| 2-col booking form section (eyebrow, title, subtitle, 5-field form + dropdown) | T6 + T7/T8 |
| Deep Sea palette | T3, T5, T6, T7/T8 (Tailwind theme already wired) |
| Bilingual EN/GR | T1 + T7 + T8 |
| Web3Forms submission | T6 (reuses existing `[data-contact-form]` + `src/scripts/contact.ts`) |

Skipped intentionally (per decisions): logo carousel (Q3 = B).

**Placeholder scan:** No "TBD", "TODO", "handle edge cases", or unspecified code. Every step has exact file contents or exact commands.

**Type consistency:** `Locale`, `Service`, `t()`, `localizedPath()` used consistently; new components use the same prop naming as existing ones (`locale`, `service`). Data attributes `[data-reveal]`, `[data-contact-form]`, `[data-stat-counter]`, `[data-contact-submit]`, `[data-contact-submit-label]`, `[data-contact-spinner]`, `[data-contact-error]`, `[data-contact-success]` all match what `animations.ts` and `contact.ts` already consume.
