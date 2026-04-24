# Real Content + Service Detail Page Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace remaining Lorem Ipsum copy across hero, about, and services with real Triton Marine content, then rebuild the per-service detail pages (`/services/[slug]`, `/gr/services/[slug]`) to match the Induste service-details layout (breadcrumb hero → intro → image gallery → "How it works" process strip → conclusion → CTA).

**Architecture:** Extend the `Service` type in `src/data/services.ts` with richer per-service fields (`eyebrow`, `intro` paragraphs, `galleryImages`, `processSteps`, `conclusion`). Introduce one new component, `ProcessSteps.astro`, for the 3-step horizontal process strip. Rewrite `[slug].astro` in both locales to compose the new layout using existing components (`PageHero`, `CtaSection`) plus the new process strip. Hero + about content lands via new i18n keys so EN/GR stay in sync with the existing pattern.

**Tech Stack:** Astro 5 • Tailwind v4 • TypeScript (strict) • lucide-astro • existing i18n utilities. No new dependencies.

**Reference:** Induste service-details.html layout (breadcrumb banner → single full-width column of intro + image gallery + dark-bg 3-step process strip + conclusion). We are dropping the "Download brochure" section (no brochures yet — pure YAGNI).

**Working directory:** `/Users/marios/Desktop/Cursor/tritonasmarine`. Astro project at repo root. Git repo on `main`.

---

## File plan

| Action | Path | Purpose |
|---|---|---|
| Modify | `src/i18n/en.json` | New hero values (real); new `about.hero_title/p1/p2/p3` keys |
| Modify | `src/i18n/gr.json` | Same keys in Greek |
| Modify | `src/pages/about.astro` | Swap hard-coded Lorem `<h1>` + 3 `<p>` for `t()` calls |
| Modify | `src/pages/gr/about.astro` | Same |
| Modify | `src/data/services.ts` | Extend `Service` type; replace Lorem shortDescription/longDescription with real copy; add `eyebrow`, `intro`, `galleryImages`, `processSteps`, `conclusion` for all 4 services in EN + GR |
| Create | `src/components/ProcessSteps.astro` | 3-step horizontal strip with icon + step number + title + description; dark bg; responsive (stacks on mobile) |
| Modify | `src/pages/services/[slug].astro` | Replace current minimal layout with PageHero → intro → gallery → ProcessSteps → conclusion → CtaSection |
| Modify | `src/pages/gr/services/[slug].astro` | Same, GR locale, `../../../` imports |

Unchanged components still in play: `BaseLayout`, `Header`, `Footer`, `PageHero`, `CtaSection`, `ServicesGrid`, `ServiceCard`, `StatsCompact`, `BookingForm`.

---

## Content writing principles

- **English** is plain, direct B2C marine-services voice — short sentences, no marketing fluff.
- **Greek** is a natural translation, not a literal one. Marine industry vocabulary (σκάφος, γάστρα, σέρβις, ναυπηγείο).
- Every service mentions **Patmos / Skala** by name at least once to reinforce local SEO.
- Lorem-derived paragraph shapes stay roughly the same length so the existing visual rhythm is preserved.

---

## Validation

Per-task: `npm run check` clean + targeted build of the affected pages. End-of-plan: full `format:check` + `lint` + `check` + `build`, and a visual walkthrough on http://localhost:4321 for `/services`, `/services/haul-out-launch`, `/services/parking-storage`, `/services/repairs`, `/services/construction` and their `/gr/` twins.

Commands run from the repo root unless noted.

---

## Task 1: Replace hero copy with real content

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/gr.json`

- [ ] **Step 1: Update EN hero keys**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/src/i18n/en.json`. Find these two lines and replace them in place (keep every other key untouched):

```json
  "hero.title": "Marine services from the heart of Patmos",
  "hero.subtitle": "Full-service yard for haul-out, winter storage, repairs, and custom construction — in Skala harbor, on the island of Patmos.",
```

- [ ] **Step 2: Update GR hero keys**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/src/i18n/gr.json`. Find and replace:

```json
  "hero.title": "Ναυτικές υπηρεσίες από την καρδιά της Πάτμου",
  "hero.subtitle": "Πλήρες ναυπηγείο για ανέλκυση, χειμερινή φύλαξη, επισκευές και κατασκευές — στο λιμάνι της Σκάλας, στην Πάτμο.",
```

- [ ] **Step 3: Validate**

```bash
node -e "JSON.parse(require('fs').readFileSync('src/i18n/en.json'))" && echo "en valid"
node -e "JSON.parse(require('fs').readFileSync('src/i18n/gr.json'))" && echo "gr valid"
npm run check
```

Expected: both `valid` print; `check` returns 0/0/0.

- [ ] **Step 4: Commit**

```bash
git add src/i18n/
git commit -m "content(hero): replace Lorem title/subtitle with Patmos-specific copy"
```

---

## Task 2: Replace About page Lorem with real content

Add 4 new i18n keys and swap hard-coded Lorem in both about pages.

**Files:**
- Modify: `src/i18n/en.json`
- Modify: `src/i18n/gr.json`
- Modify: `src/pages/about.astro`
- Modify: `src/pages/gr/about.astro`

- [ ] **Step 1: Add EN about keys**

Open `src/i18n/en.json`. Before the closing `}`, add (respecting trailing comma on the previous last key):

```json
  "about.hero_title": "A boatyard built on the harbor of Patmos",
  "about.p1": "Triton Marine is a family-run boatyard in Skala, on the Greek island of Patmos. We haul, store, repair, and build boats — for the local fleet, for visiting yachts, and for owners who've trusted us with their vessels for years.",
  "about.p2": "Our team is small and senior: shipwrights, engine technicians, and marine electricians who grew up around the harbor. We know the waters, the weather, and the quirks of every type of boat that calls the Dodecanese home.",
  "about.p3": "We operate year-round. Summer is launches, emergency repairs, and small-job turnarounds; winter is haul-outs, full refits, and custom builds. Whatever season you find us in, the goal is the same: get your boat back in the water, safe and running right."
```

- [ ] **Step 2: Add GR about keys**

Open `src/i18n/gr.json`. Add the Greek counterparts with the same comma rules:

```json
  "about.hero_title": "Ένα ναυπηγείο στο λιμάνι της Πάτμου",
  "about.p1": "Η Triton Marine είναι ένα οικογενειακό ναυπηγείο στη Σκάλα της Πάτμου. Ανελκύουμε, αποθηκεύουμε, επισκευάζουμε και κατασκευάζουμε σκάφη — για τον τοπικό στόλο, για τα σκάφη που επισκέπτονται το νησί, και για ιδιοκτήτες που μας εμπιστεύονται εδώ και χρόνια.",
  "about.p2": "Η ομάδα μας είναι μικρή και έμπειρη: ναυπηγοί, τεχνικοί μηχανών και ναυτικοί ηλεκτρολόγοι που μεγάλωσαν γύρω από το λιμάνι. Ξέρουμε τα νερά, τον καιρό και τις ιδιαιτερότητες κάθε τύπου σκάφους των Δωδεκανήσων.",
  "about.p3": "Δουλεύουμε όλο τον χρόνο. Το καλοκαίρι είναι καθελκύσεις, επείγουσες επισκευές και γρήγορες δουλειές· ο χειμώνας είναι ανελκύσεις, πλήρεις ανακαινίσεις και νέες κατασκευές. Όποια εποχή κι αν μας βρείτε, ο στόχος είναι ο ίδιος: να φέρουμε το σκάφος σας στο νερό, ασφαλές και σωστά ρυθμισμένο."
```

- [ ] **Step 3: Rewire EN about page**

Open `src/pages/about.astro`. Find the `<h1>` with the Lorem text and replace that element, plus the 3 `<p>` elements inside the two-column section, with calls to `t()`. The final file should contain:

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
  description="Triton Marine is a family-run boatyard in Skala harbor on the island of Patmos, serving the local fleet and visiting yachts."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-teal text-xs font-semibold tracking-[0.2em] uppercase" data-reveal>
        {t(locale, "about.heading")}
      </p>
      <h1 class="font-display mt-4 max-w-3xl text-5xl font-semibold sm:text-6xl" data-reveal>
        {t(locale, "about.hero_title")}
      </h1>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-2">
      <div class="overflow-hidden rounded-lg" data-reveal>
        <img
          src="/images/about.jpg"
          alt="Triton Marine crew"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="text-navy/80 space-y-4" data-reveal>
        <p>{t(locale, "about.p1")}</p>
        <p>{t(locale, "about.p2")}</p>
        <p>{t(locale, "about.p3")}</p>
      </div>
    </div>
  </section>

  <StatsBar locale={locale} />
  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: Rewire GR about page**

Open `src/pages/gr/about.astro` and apply the same rewrite, with the GR import paths and locale:

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
  description="Η Triton Marine είναι ένα οικογενειακό ναυπηγείο στο λιμάνι της Σκάλας στην Πάτμο, που εξυπηρετεί τον τοπικό στόλο και τα σκάφη που επισκέπτονται το νησί."
>
  <Header slot="header" locale={locale} />

  <section class="bg-navy text-foam">
    <div class="mx-auto max-w-[1200px] px-6 py-24">
      <p class="text-teal text-xs font-semibold tracking-[0.2em] uppercase" data-reveal>
        {t(locale, "about.heading")}
      </p>
      <h1 class="font-display mt-4 max-w-3xl text-5xl font-semibold sm:text-6xl" data-reveal>
        {t(locale, "about.hero_title")}
      </h1>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-12 px-6 py-20 md:grid-cols-2">
      <div class="overflow-hidden rounded-lg" data-reveal>
        <img
          src="/images/about.jpg"
          alt="Πλήρωμα Triton Marine"
          class="h-full w-full object-cover"
          loading="lazy"
        />
      </div>
      <div class="text-navy/80 space-y-4" data-reveal>
        <p>{t(locale, "about.p1")}</p>
        <p>{t(locale, "about.p2")}</p>
        <p>{t(locale, "about.p3")}</p>
      </div>
    </div>
  </section>

  <StatsBar locale={locale} />
  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 5: Validate**

```bash
npm run check
npm run build
```

Expected: `check` 0/0/0; `build` produces the same 20 pages (no structural change, just content).

- [ ] **Step 6: Commit**

```bash
git add src/i18n/ src/pages/about.astro src/pages/gr/about.astro
git commit -m "content(about): replace Lorem paragraphs with real Patmos-focused copy"
```

---

## Task 3: Extend the `Service` type with rich content fields

**Files:**
- Modify: `src/data/services.ts` (type definition only — array values come next task)

- [ ] **Step 1: Rewrite the type block and introduce `ProcessStep`**

Open `/Users/marios/Desktop/Cursor/tritonasmarine/src/data/services.ts` and replace the top of the file (imports + type definitions) with:

```ts
import type { Locale } from "../i18n/utils";

export type LocalizedString = Record<Locale, string>;

export type ProcessStep = {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type Service = {
  slug: string;
  icon: string;
  heroImage: string;
  name: LocalizedString;
  eyebrow: LocalizedString;
  shortDescription: LocalizedString;
  intro: LocalizedString[];
  galleryImages: string[];
  processSteps: ProcessStep[];
  conclusion: LocalizedString[];
};
```

Leave the `services` array in place for the next task — it'll fail to type-check until Task 4 lands, which is expected. Don't try to make it compile independently.

- [ ] **Step 2: Verify the type change type-checks in isolation**

Run a TypeScript-only dry check that ignores the object literal mismatch temporarily:

```bash
npx tsc --noEmit src/data/services.ts 2>&1 | head -20
```

Expected: errors about missing properties (`eyebrow`, `intro`, etc.) on existing `services` entries. This confirms the type definition was accepted and is enforcing the new shape. Do NOT commit yet — data gets filled in Task 4 and they ship together.

---

## Task 4: Populate `services.ts` with real per-service content (all 4 services, EN + GR)

This is the biggest content task. Writing 4 services × (intro + gallery + 3 process steps + conclusion) × 2 locales.

**Files:**
- Modify: `src/data/services.ts` (array body)

- [ ] **Step 1: Replace the entire `services` array**

In `/Users/marios/Desktop/Cursor/tritonasmarine/src/data/services.ts`, replace the `export const services: Service[] = [ ... ];` block (from `export const services` through the matching `];`) with this content. Everything else in the file (the imports, type definitions from Task 3, and the `getService` helper at the bottom) stays exactly as it was after Task 3.

```ts
export const services: Service[] = [
  {
    slug: "haul-out-launch",
    icon: "arrow-up-down",
    heroImage: "/images/engine-service.jpg",
    name: {
      en: "Haul-out & launch",
      gr: "Ανέλκυση – Καθέλκυση σκαφών",
    },
    eyebrow: {
      en: "Our core service",
      gr: "Η βασική μας υπηρεσία",
    },
    shortDescription: {
      en: "Year-round haul-outs and launches from Skala harbor, handled by a crew that knows the ramp and the weather.",
      gr: "Ανελκύσεις και καθελκύσεις όλο τον χρόνο από το λιμάνι της Σκάλας, από μια ομάδα που ξέρει τη ράμπα και τον καιρό.",
    },
    intro: [
      {
        en: "We haul out and launch boats of every size from the Skala harbor ramp, using equipment sized for the narrow quayside and the tidal range of the eastern Aegean.",
        gr: "Ανελκύουμε και καθελκύουμε σκάφη κάθε μεγέθους από τη ράμπα του λιμανιού της Σκάλας, με εξοπλισμό προσαρμοσμένο στη στενή προκυμαία και την παλίρροια του ανατολικού Αιγαίου.",
      },
      {
        en: "Whether you're dropping the boat off for winter storage or waking her up for the summer season, we handle the lift, the transport to and from the yard, and the pressure-wash on arrival.",
        gr: "Είτε αφήνετε το σκάφος για χειμερινή φύλαξη είτε το προετοιμάζετε για το καλοκαίρι, αναλαμβάνουμε την ανύψωση, τη μεταφορά από και προς το ναυπηγείο, και τον καθαρισμό με πιεστικό κατά την άφιξη.",
      },
      {
        en: "Every haul-out is scheduled around the weather window and the ferry timetable so your boat's out of the water as briefly as possible.",
        gr: "Κάθε ανέλκυση προγραμματίζεται με βάση τον καιρό και τα δρομολόγια των πλοίων, ώστε το σκάφος σας να είναι εκτός νερού για όσο το δυνατόν λιγότερο.",
      },
    ],
    galleryImages: ["/images/hero-home.jpg", "/images/general-repair.jpg"],
    processSteps: [
      {
        icon: "calendar",
        title: {
          en: "Book the date",
          gr: "Κλείστε ημερομηνία",
        },
        description: {
          en: "Send us your boat's specs and preferred window. We confirm the tide, the ramp slot, and any special lifting requirements.",
          gr: "Στείλτε μας τα χαρακτηριστικά του σκάφους και την προτιμώμενη ημερομηνία. Επιβεβαιώνουμε παλίρροια, διαθέσιμη ώρα στη ράμπα και τυχόν ειδικές απαιτήσεις ανύψωσης.",
        },
      },
      {
        icon: "arrow-up-from-line",
        title: {
          en: "Lift & transport",
          gr: "Ανύψωση & μεταφορά",
        },
        description: {
          en: "On the day, the trailer crane takes the boat off the water, straps it secure, and drives it to the yard.",
          gr: "Την ημέρα της εργασίας, η τροχόφρακτη γερανογέφυρα ανυψώνει το σκάφος, το ασφαλίζει με ιμάντες, και το μεταφέρει στο ναυπηγείο.",
        },
      },
      {
        icon: "anchor",
        title: {
          en: "Settle in the yard",
          gr: "Τοποθέτηση στο ναυπηγείο",
        },
        description: {
          en: "The boat is pressure-washed, inspected, and settled into its cradle. Keys returned, storage or service activated.",
          gr: "Το σκάφος καθαρίζεται, επιθεωρείται και τοποθετείται στο ικρίωμά του. Επιστροφή κλειδιών και έναρξη φύλαξης ή εργασιών.",
        },
      },
    ],
    conclusion: [
      {
        en: "Priority haul-out slots run November–April; priority launches run April–May. Book early for the seasonal rush — we coordinate hundreds of moves during each changeover window.",
        gr: "Οι προτεραιοποιημένες ανελκύσεις γίνονται Νοέμβριο–Απρίλιο· οι προτεραιοποιημένες καθελκύσεις Απρίλιο–Μάιο. Κλείστε νωρίς πριν την αιχμή — συντονίζουμε εκατοντάδες μετακινήσεις σε κάθε περίοδο.",
      },
      {
        en: "Request a date through the booking form below and we'll reply with your confirmation within one business day.",
        gr: "Ζητήστε ημερομηνία από τη φόρμα παρακάτω και θα σας απαντήσουμε εντός μίας εργάσιμης ημέρας.",
      },
    ],
  },
  {
    slug: "parking-storage",
    icon: "warehouse",
    heroImage: "/images/winterization.jpg",
    name: {
      en: "Parking & winter storage",
      gr: "Parking & Διαχειμαστήριο",
    },
    eyebrow: {
      en: "Secure, year-round",
      gr: "Ασφαλής φύλαξη, όλο τον χρόνο",
    },
    shortDescription: {
      en: "Covered and open-air dry storage a few minutes from the harbor, with power, fresh water, and a live caretaker on site.",
      gr: "Στεγασμένος και υπαίθριος χώρος φύλαξης λίγα λεπτά από το λιμάνι, με παροχή ρεύματος, νερού και μόνιμη παρουσία φύλακα.",
    },
    intro: [
      {
        en: "Our parking lot sits just above Skala, a short tow from the ramp. It takes everything from dinghies to 15-metre cruisers, with a dedicated winterization bay under cover for engines and delicate systems.",
        gr: "Ο χώρος φύλαξής μας βρίσκεται ακριβώς πάνω από τη Σκάλα, σε κοντινή απόσταση από τη ράμπα. Δέχεται από μικρές βάρκες έως σκάφη 15 μέτρων, με ειδικό χώρο χειμερινής προετοιμασίας για μηχανές και ευαίσθητα συστήματα.",
      },
      {
        en: "Every boat gets a pressure-wash on arrival, a cradle fit to its keel, and a full walk-through with a photo report so you know exactly how she's sitting before you leave the island.",
        gr: "Κάθε σκάφος καθαρίζεται με πιεστικό κατά την άφιξη, τοποθετείται σε ικρίωμα κομμένο στην καρίνα του, και γίνεται πλήρης επιθεώρηση με φωτογραφική αναφορά ώστε να ξέρετε πώς αφήσατε το σκάφος.",
      },
      {
        en: "Short-term parking and long-term wintering are both available. We can start service or maintenance work mid-storage if you want the boat ready for the next time you fly in.",
        gr: "Διαθέσιμη βραχυχρόνια φύλαξη και μακροχρόνιος διαχειμασμός. Μπορούμε να ξεκινήσουμε σέρβις ή συντήρηση κατά τη διάρκεια της φύλαξης, ώστε το σκάφος να είναι έτοιμο για την επόμενη φορά που θα έρθετε.",
      },
    ],
    galleryImages: ["/images/inspection.jpg", "/images/electronics.jpg"],
    processSteps: [
      {
        icon: "clipboard-list",
        title: {
          en: "Pre-storage check",
          gr: "Προέλεγχος",
        },
        description: {
          en: "Walk-through with the owner, photo inventory of rigging and equipment, and a quote if any work is needed before cradle.",
          gr: "Κοινή επιθεώρηση με τον ιδιοκτήτη, φωτογραφική καταγραφή εξοπλισμού, και προσφορά για τυχόν εργασίες πριν την τοποθέτηση στο ικρίωμα.",
        },
      },
      {
        icon: "warehouse",
        title: {
          en: "Store & protect",
          gr: "Φύλαξη & προστασία",
        },
        description: {
          en: "Cradle fit, engine winterization, fuel stabilization, covers on. Covered bay for anything sensitive to heat and salt.",
          gr: "Τοποθέτηση σε ικρίωμα, χειμερινή προετοιμασία μηχανής, σταθεροποίηση καυσίμου, τοποθέτηση καλυμμάτων. Στεγασμένος χώρος για ό,τι είναι ευαίσθητο σε ζέστη και αλάτι.",
        },
      },
      {
        icon: "shield-check",
        title: {
          en: "Monthly report",
          gr: "Μηνιαία αναφορά",
        },
        description: {
          en: "Live caretaker checks every boat monthly. Any concern triggers a photo report and a phone call so you're never surprised.",
          gr: "Ο φύλακας ελέγχει κάθε σκάφος μηνιαίως. Οποιοδήποτε θέμα συνοδεύεται από φωτογραφική αναφορά και τηλεφωνική ενημέρωση.",
        },
      },
    ],
    conclusion: [
      {
        en: "Rates depend on length overall and whether you want covered or open-air. Ask for a quote with your boat's dimensions and we'll send a one-page breakdown the same day.",
        gr: "Οι τιμές εξαρτώνται από το συνολικό μήκος και αν επιθυμείτε στεγασμένη ή υπαίθρια φύλαξη. Ζητήστε προσφορά με τις διαστάσεις του σκάφους και θα σας στείλουμε αναλυτική πρόταση την ίδια μέρα.",
      },
      {
        en: "Every storage contract includes haul-out, launch, and one pressure-wash — no hidden extras.",
        gr: "Κάθε συμβόλαιο φύλαξης περιλαμβάνει ανέλκυση, καθέλκυση και έναν καθαρισμό με πιεστικό — χωρίς κρυφές χρεώσεις.",
      },
    ],
  },
  {
    slug: "repairs",
    icon: "wrench",
    heroImage: "/images/general-repair.jpg",
    name: {
      en: "Repairs",
      gr: "Επισκευές",
    },
    eyebrow: {
      en: "Mechanical, electrical, structural",
      gr: "Μηχανολογικές, ηλεκτρολογικές, δομικές",
    },
    shortDescription: {
      en: "Engine, hull, rigging, and systems work — diagnosed honestly, priced up front, delivered on time.",
      gr: "Εργασίες σε μηχανές, γάστρες, εξάρτια και συστήματα — με ειλικρινή διάγνωση, σαφή τιμολόγηση και συνέπεια στις παραδόσεις.",
    },
    intro: [
      {
        en: "We repair everything that floats: outboards and inboards, diesels and petrols, hulls in fiberglass, aluminum, and traditional wood. Marine electrics too — nav, comms, battery banks, charging.",
        gr: "Επισκευάζουμε κάθε τι που πλέει: εξωλέμβιες και εσωλέμβιες μηχανές, diesel και βενζίνης, γάστρες από fiberglass, αλουμίνιο και παραδοσιακό ξύλο. Καθώς και ναυτικά ηλεκτρικά — ναυσιπλοΐα, επικοινωνίες, μπαταρίες, φόρτιση.",
      },
      {
        en: "Most jobs start with a diagnosis visit. We quote in writing before any work begins, and we don't start swinging tools until you've approved the scope and the price.",
        gr: "Οι περισσότερες εργασίες ξεκινούν με μια επίσκεψη διάγνωσης. Προσφέρουμε γραπτή προσφορά πριν ξεκινήσει οποιαδήποτε εργασία, και δεν αρχίζουμε πριν εγκρίνετε το αντικείμενο και την τιμή.",
      },
      {
        en: "For urgent work on visiting yachts, we reserve slots every summer week. Most systems issues are diagnosed within 24 hours of the boat arriving at the yard.",
        gr: "Για επείγουσες εργασίες σε σκάφη που επισκέπτονται το νησί, κρατάμε ειδικές θέσεις κάθε καλοκαιρινή εβδομάδα. Οι περισσότερες βλάβες διαγιγνώσκονται εντός 24 ωρών από την άφιξη στο ναυπηγείο.",
      },
    ],
    galleryImages: ["/images/engine-service.jpg", "/images/electronics.jpg"],
    processSteps: [
      {
        icon: "search",
        title: {
          en: "Diagnose",
          gr: "Διάγνωση",
        },
        description: {
          en: "On-site or at the yard. Scope of work and a fixed-price quote delivered in writing, usually same-day.",
          gr: "Επιτόπου ή στο ναυπηγείο. Περιγραφή εργασιών και προσφορά σε σταθερή τιμή, συνήθως αυθημερόν.",
        },
      },
      {
        icon: "wrench",
        title: {
          en: "Repair",
          gr: "Επισκευή",
        },
        description: {
          en: "Work starts after you approve. Daily progress photos if the job runs more than a couple of days.",
          gr: "Η εργασία ξεκινά μετά την έγκρισή σας. Καθημερινές φωτογραφίες προόδου όταν η εργασία διαρκεί πάνω από δύο ημέρες.",
        },
      },
      {
        icon: "check-circle",
        title: {
          en: "Test & sign off",
          gr: "Δοκιμή & παράδοση",
        },
        description: {
          en: "Sea trial if relevant, final walk-through, written warranty on parts we installed. Then keys back.",
          gr: "Δοκιμή στη θάλασσα αν ενδείκνυται, τελική επιθεώρηση μαζί, γραπτή εγγύηση για τα ανταλλακτικά που τοποθετήσαμε. Στη συνέχεια, επιστροφή κλειδιών.",
        },
      },
    ],
    conclusion: [
      {
        en: "We carry common parts in stock — filters, impellers, belts, zincs, batteries, fuel line. For anything special, we source through mainland suppliers and usually have parts on-island within 48 hours.",
        gr: "Διατηρούμε σε απόθεμα κοινά ανταλλακτικά — φίλτρα, πτερωτές, ιμάντες, ψευδάργυρους, μπαταρίες, γραμμές καυσίμου. Για ειδικά ανταλλακτικά, τα προμηθευόμαστε από ηπειρωτικούς προμηθευτές, συνήθως εντός 48 ωρών.",
      },
      {
        en: "If you're on the water now and something's wrong, phone the yard directly — we prioritize anything that puts a boat at risk of not making it home.",
        gr: "Εάν είστε στη θάλασσα αυτή τη στιγμή και έχετε πρόβλημα, τηλεφωνήστε απευθείας στο ναυπηγείο — δίνουμε προτεραιότητα σε κάθε περιστατικό που βάζει το σκάφος σε κίνδυνο να μην επιστρέψει.",
      },
    ],
  },
  {
    slug: "construction",
    icon: "hammer",
    heroImage: "/images/hull-cleaning.jpg",
    name: {
      en: "Construction",
      gr: "Κατασκευές",
    },
    eyebrow: {
      en: "Custom builds & refits",
      gr: "Κατασκευές & ανακαινίσεις",
    },
    shortDescription: {
      en: "Traditional-style wooden boats, composite hulls, and full refits of older vessels — built slowly, built right.",
      gr: "Παραδοσιακά ξύλινα σκάφη, σύνθετες γάστρες και πλήρεις ανακαινίσεις παλαιότερων σκαφών — με υπομονή και μεράκι.",
    },
    intro: [
      {
        en: "Construction is where the yard slows down. New builds and major refits take months, sometimes more than a year, and we only take on as many as we can finish properly each season.",
        gr: "Οι κατασκευές είναι ο τομέας όπου το ναυπηγείο ρυθμίζει διαφορετικά χρόνο. Οι νέες κατασκευές και οι μεγάλες ανακαινίσεις διαρκούν μήνες, μερικές φορές και πάνω από ένα χρόνο, και αναλαμβάνουμε μόνο όσες μπορούμε να ολοκληρώσουμε σωστά κάθε σεζόν.",
      },
      {
        en: "We build in traditional Greek styles — kaikia and trechandiri forms — as well as in modern composites. The crew does the shipwrighting, the engine fit-out, and the electrical install in-house.",
        gr: "Κατασκευάζουμε σε παραδοσιακούς ελληνικούς τύπους — καΐκια και τρεχαντήρια — αλλά και με σύγχρονα σύνθετα υλικά. Η ομάδα μας αναλαμβάνει την ξυλουργική, την τοποθέτηση μηχανής και την ηλεκτρολογική εγκατάσταση εσωτερικά.",
      },
      {
        en: "Every project starts with a conversation. What's the boat for, what's the budget, and what's the timeline? From that we produce a design brief and a staged build plan — no commitment until you're satisfied with both.",
        gr: "Κάθε έργο ξεκινά με μια συζήτηση. Για ποιον σκοπό προορίζεται το σκάφος, ποιος ο προϋπολογισμός, και πότε πρέπει να παραδοθεί; Από εκεί προχωρούμε σε σχεδιαστική πρόταση και κλιμακωτό πλάνο κατασκευής — χωρίς καμία δέσμευση μέχρι να είστε ικανοποιημένοι και με τα δύο.",
      },
    ],
    galleryImages: ["/images/winterization.jpg", "/images/about.jpg"],
    processSteps: [
      {
        icon: "pencil-ruler",
        title: {
          en: "Design & scope",
          gr: "Σχεδιασμός & προδιαγραφές",
        },
        description: {
          en: "Conversations with the owner, sketches, a design brief, cost estimate, and a build timeline. Nothing happens until you sign off.",
          gr: "Συζητήσεις με τον ιδιοκτήτη, σκίτσα, πρόταση σχεδιασμού, κοστολόγηση και χρονοδιάγραμμα. Τίποτα δεν προχωρά πριν την έγκρισή σας.",
        },
      },
      {
        icon: "hammer",
        title: {
          en: "Build",
          gr: "Κατασκευή",
        },
        description: {
          en: "Hull first, then deck and systems. Weekly progress reports with photos. Owner visits welcome at any stage.",
          gr: "Γάστρα πρώτα, μετά κατάστρωμα και συστήματα. Εβδομαδιαίες αναφορές προόδου με φωτογραφίες. Οι επισκέψεις του ιδιοκτήτη είναι ευπρόσδεκτες σε κάθε φάση.",
        },
      },
      {
        icon: "ship",
        title: {
          en: "Launch & handover",
          gr: "Καθέλκυση & παράδοση",
        },
        description: {
          en: "Sea trial with the full crew, handover documentation, and a 12-month warranty on all work we did in-house.",
          gr: "Δοκιμή στη θάλασσα με όλη την ομάδα, πλήρη τεκμηρίωση παράδοσης, και 12μηνη εγγύηση για κάθε εργασία που έγινε εσωτερικά.",
        },
      },
    ],
    conclusion: [
      {
        en: "We book construction and refit slots a year ahead. If you're planning a build for the next winter season, now is the time to start the conversation.",
        gr: "Κλείνουμε θέσεις κατασκευής και ανακαίνισης έναν χρόνο νωρίτερα. Αν σχεδιάζετε νέα κατασκευή για την επόμενη χειμερινή περίοδο, τώρα είναι η κατάλληλη στιγμή να ξεκινήσουμε τη συζήτηση.",
      },
      {
        en: "Reach out through the booking form below and tell us what you have in mind. We'll come back with a first-pass proposal within a week.",
        gr: "Επικοινωνήστε μέσω της φόρμας παρακάτω και πείτε μας τι έχετε στο μυαλό σας. Θα επανέλθουμε με μια πρώτη πρόταση εντός μίας εβδομάδας.",
      },
    ],
  },
];
```

- [ ] **Step 2: Validate**

```bash
npm run check
```

Expected: 0/0/0. Types and data now line up.

```bash
npm run build
```

Expected: 20 pages still build (no structural change yet — the [slug] template just isn't using the new fields yet, but type-checking passes because the type is complete).

- [ ] **Step 3: Commit the whole Task 3 + Task 4 block together**

```bash
git add src/data/services.ts
git commit -m "content(services): expand Service type and add real per-service content for all 4 services"
```

(Task 3 and 4 ship in one commit — Task 3 on its own doesn't compile, so this is intentional.)

---

## Task 5: Create `ProcessSteps.astro` component

Horizontal 3-step process strip with numbered badges, icons, titles, descriptions. Dark bg. Collapses to a single column on mobile.

**Files:**
- Create: `src/components/ProcessSteps.astro`

- [ ] **Step 1: Create the component**

Create `/Users/marios/Desktop/Cursor/tritonasmarine/src/components/ProcessSteps.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import type { ProcessStep } from "../data/services";
import {
  Calendar,
  ArrowUpFromLine,
  Anchor,
  ClipboardList,
  Warehouse,
  ShieldCheck,
  Search,
  Wrench,
  CheckCircle,
  PencilRuler,
  Hammer,
  Ship,
} from "lucide-astro";

const iconMap: Record<string, typeof Calendar> = {
  calendar: Calendar,
  "arrow-up-from-line": ArrowUpFromLine,
  anchor: Anchor,
  "clipboard-list": ClipboardList,
  warehouse: Warehouse,
  "shield-check": ShieldCheck,
  search: Search,
  wrench: Wrench,
  "check-circle": CheckCircle,
  "pencil-ruler": PencilRuler,
  hammer: Hammer,
  ship: Ship,
};

export interface Props {
  locale: Locale;
  heading: string;
  steps: ProcessStep[];
}

const { locale, heading, steps } = Astro.props;
---

<section class="bg-deep text-foam">
  <div class="mx-auto max-w-[1200px] px-6 py-20">
    <h2 class="font-display text-center text-4xl font-semibold" data-reveal>
      {heading}
    </h2>

    <ol class="mt-14 grid gap-10 md:grid-cols-3 md:gap-6">
      {
        steps.map((step, i) => {
          const Icon = iconMap[step.icon] ?? Calendar;
          return (
            <li class="relative flex flex-col items-center text-center" data-reveal>
              <div class="bg-teal text-foam flex h-16 w-16 items-center justify-center rounded-full">
                <Icon class="h-7 w-7" />
              </div>
              <div class="font-display text-teal/70 mt-4 text-3xl font-bold">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 class="font-display mt-2 text-xl font-semibold">{step.title[locale]}</h3>
              <p class="text-foam/80 mt-3 max-w-xs text-sm leading-relaxed">
                {step.description[locale]}
              </p>
            </li>
          );
        })
      }
    </ol>
  </div>
</section>
```

- [ ] **Step 2: Validate**

```bash
npm run check
```

Expected: 0/0/0.

- [ ] **Step 3: Commit**

```bash
git add src/components/ProcessSteps.astro
git commit -m "feat: add ProcessSteps component (3-step horizontal strip with icons)"
```

---

## Task 6: Redesign service detail pages (EN + GR)

The existing `PageHero` component's `titleKey` prop is typed as `keyof typeof en`, so it can't take a dynamic service name. We extend it with an optional raw `title` prop that takes precedence when provided (existing `titleKey` callers still work unchanged). Then we rewrite both detail pages.

**Files:**
- Modify: `src/components/PageHero.astro` (add optional `title` prop)
- Modify: `src/i18n/en.json` (add `process.how_it_works` key)
- Modify: `src/i18n/gr.json` (add `process.how_it_works` key)
- Modify: `src/pages/services/[slug].astro` (full rewrite)
- Modify: `src/pages/gr/services/[slug].astro` (full rewrite)

- [ ] **Step 1: Extend `PageHero.astro`**

Replace the entire contents of `/Users/marios/Desktop/Cursor/tritonasmarine/src/components/PageHero.astro`:

```astro
---
import type { Locale } from "../i18n/utils";
import { t, localizedPath } from "../i18n/utils";
import { ChevronRight } from "lucide-astro";

export interface Props {
  locale: Locale;
  title?: string;
  titleKey?: keyof typeof import("../i18n/en.json");
  backgroundImage: string;
  crumbs: { labelKey: keyof typeof import("../i18n/en.json"); href?: string }[];
}

const { locale, title, titleKey, backgroundImage, crumbs } = Astro.props;
const resolvedTitle = title ?? (titleKey ? t(locale, titleKey) : "");
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
      {resolvedTitle}
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

- [ ] **Step 2: Add `process.how_it_works` i18n keys**

In `src/i18n/en.json`, append (mind the comma on the previous last key):

```json
  "process.how_it_works": "How it works"
```

In `src/i18n/gr.json`:

```json
  "process.how_it_works": "Πώς λειτουργεί"
```

- [ ] **Step 3: Rewrite EN `[slug].astro`**

Replace the entire contents of `/Users/marios/Desktop/Cursor/tritonasmarine/src/pages/services/[slug].astro`:

```astro
---
import BaseLayout from "../../layouts/BaseLayout.astro";
import Header from "../../components/Header.astro";
import Footer from "../../components/Footer.astro";
import PageHero from "../../components/PageHero.astro";
import ProcessSteps from "../../components/ProcessSteps.astro";
import CtaSection from "../../components/CtaSection.astro";
import { services } from "../../data/services";
import { t } from "../../i18n/utils";

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

  <PageHero
    locale={locale}
    title={service.name.en}
    backgroundImage={service.heroImage}
    crumbs={[
      { labelKey: "breadcrumb.home", href: "/" },
      { labelKey: "breadcrumb.services", href: "/services" },
      { labelKey: "breadcrumb.services" },
    ]}
  />

  <section class="bg-foam">
    <div class="mx-auto max-w-[900px] px-6 py-20">
      <p class="text-teal text-xs font-semibold tracking-[0.2em] uppercase" data-reveal>
        {service.eyebrow.en}
      </p>
      <h2 class="font-display text-navy mt-3 text-4xl font-semibold sm:text-5xl" data-reveal>
        {service.shortDescription.en}
      </h2>
      <div class="text-navy/80 mt-6 space-y-4 text-lg leading-relaxed" data-reveal>
        {service.intro.map((p) => <p>{p.en}</p>)}
      </div>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-6 px-6 pb-10 md:grid-cols-2">
      {
        service.galleryImages.map((src) => (
          <div class="overflow-hidden rounded-lg" data-reveal>
            <img src={src} alt="" class="h-full w-full object-cover" loading="lazy" />
          </div>
        ))
      }
    </div>
  </section>

  <ProcessSteps
    locale={locale}
    heading={t(locale, "process.how_it_works")}
    steps={service.processSteps}
  />

  <section class="bg-foam">
    <div class="mx-auto max-w-[900px] px-6 py-20">
      <div class="text-navy/80 space-y-4 text-lg leading-relaxed" data-reveal>
        {service.conclusion.map((p) => <p>{p.en}</p>)}
      </div>
    </div>
  </section>

  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 4: Rewrite GR `[slug].astro`**

Replace the entire contents of `/Users/marios/Desktop/Cursor/tritonasmarine/src/pages/gr/services/[slug].astro`:

```astro
---
import BaseLayout from "../../../layouts/BaseLayout.astro";
import Header from "../../../components/Header.astro";
import Footer from "../../../components/Footer.astro";
import PageHero from "../../../components/PageHero.astro";
import ProcessSteps from "../../../components/ProcessSteps.astro";
import CtaSection from "../../../components/CtaSection.astro";
import { services } from "../../../data/services";
import { t } from "../../../i18n/utils";

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

  <PageHero
    locale={locale}
    title={service.name.gr}
    backgroundImage={service.heroImage}
    crumbs={[
      { labelKey: "breadcrumb.home", href: "/" },
      { labelKey: "breadcrumb.services", href: "/services" },
      { labelKey: "breadcrumb.services" },
    ]}
  />

  <section class="bg-foam">
    <div class="mx-auto max-w-[900px] px-6 py-20">
      <p class="text-teal text-xs font-semibold tracking-[0.2em] uppercase" data-reveal>
        {service.eyebrow.gr}
      </p>
      <h2 class="font-display text-navy mt-3 text-4xl font-semibold sm:text-5xl" data-reveal>
        {service.shortDescription.gr}
      </h2>
      <div class="text-navy/80 mt-6 space-y-4 text-lg leading-relaxed" data-reveal>
        {service.intro.map((p) => <p>{p.gr}</p>)}
      </div>
    </div>
  </section>

  <section class="bg-foam">
    <div class="mx-auto grid max-w-[1200px] gap-6 px-6 pb-10 md:grid-cols-2">
      {
        service.galleryImages.map((src) => (
          <div class="overflow-hidden rounded-lg" data-reveal>
            <img src={src} alt="" class="h-full w-full object-cover" loading="lazy" />
          </div>
        ))
      }
    </div>
  </section>

  <ProcessSteps
    locale={locale}
    heading={t(locale, "process.how_it_works")}
    steps={service.processSteps}
  />

  <section class="bg-foam">
    <div class="mx-auto max-w-[900px] px-6 py-20">
      <div class="text-navy/80 space-y-4 text-lg leading-relaxed" data-reveal>
        {service.conclusion.map((p) => <p>{p.gr}</p>)}
      </div>
    </div>
  </section>

  <CtaSection locale={locale} />

  <Footer slot="footer" locale={locale} />
</BaseLayout>
```

- [ ] **Step 5: Validate**

```bash
npm run check
npm run build
```

Expected: `check` 0/0/0; `build` produces 20 pages total (8 service detail routes — 4 slugs × 2 locales — plus the fixed routes). Look in `dist/services/haul-out-launch/`, `dist/services/parking-storage/`, `dist/services/repairs/`, `dist/services/construction/` and their `/gr/services/...` twins.

- [ ] **Step 6: Commit**

```bash
git add src/components/PageHero.astro src/i18n/ src/pages/services/[slug].astro src/pages/gr/services/[slug].astro
git commit -m "feat(services): redesign service detail pages in Induste layout (intro, gallery, process, conclusion)"
```

---

## Task 7: Final validation pass

- [ ] **Step 1: Clean full validator suite**

```bash
rm -rf dist .astro .vercel
npm run format
npm run format:check
npm run lint
npm run check
npm run build
```

All five must exit 0. `build` must produce 20 pages.

- [ ] **Step 2: Visual walkthrough**

Start (or keep) the dev server: `npm run dev`. Open each in a browser:

- http://localhost:4321/ — new hero title + subtitle show Patmos-specific copy
- http://localhost:4321/about — real paragraphs, no Lorem
- http://localhost:4321/services/haul-out-launch — new layout: hero → eyebrow+title+intro → 2-image gallery → process strip (3 steps with icons + numbers) → conclusion → CTA
- http://localhost:4321/services/parking-storage — same structure, parking-specific content
- http://localhost:4321/services/repairs — repairs content
- http://localhost:4321/services/construction — construction content
- http://localhost:4321/gr/services/haul-out-launch — GR twin, Greek copy throughout
- Language switcher preserves the exact service slug across locales
- Breadcrumb trail on a service detail reads: Home › Services › Services (current, teal), linking back to Home and /services

Kill the server when done.

- [ ] **Step 3: Commit any formatting fixes**

If `npm run format` produced changes:

```bash
git add -A
git commit -m "chore: final formatting pass after services redesign"
```

Otherwise skip.

- [ ] **Step 4: Push**

```bash
git push
```

Expected: push succeeds; Vercel auto-deploys.

---

## Self-review

**Spec coverage:**

| Requirement | Task(s) |
|---|---|
| Hero Lorem → real | T1 |
| About Lorem → real | T2 |
| Services Lorem → real (shortDescription and detail content) | T3 + T4 |
| Service detail pages match Induste service-details layout | T5 + T6 |
| Breadcrumb hero on each service page | T6 (reuses PageHero, extended with dynamic title) |
| 2-image gallery per service | T4 (galleryImages field) + T6 (render) |
| "How it works" 3-step process section | T5 (component) + T4 (data) + T6 (render) |
| Conclusion section | T4 (data) + T6 (render) |
| Bilingual EN/GR throughout | T1–T6 (every content field has `en`+`gr`) |

Explicitly NOT in scope (per YAGNI): download-brochure section (no brochures yet), per-service booking form on the detail page (global CTA links to /contact already), 4th photo per service (existing image pool is sufficient).

**Placeholder scan:** No "TBD", "TODO", "fill in later" in any task. Every code block is complete.

**Type consistency:** `Service`, `ProcessStep`, `LocalizedString` match across T3, T4, T5, T6. `data-reveal` hook reused consistently. Icon names in `processSteps` data (T4) match exactly the keys in the iconMap (T5). Image paths in `galleryImages` reference files that exist in `public/images/`.
