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

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
