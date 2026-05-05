import type { Locale } from "../i18n/utils";

export type LocalizedString = Record<Locale, string>;

export type ProcessStep = {
  icon: string;
  title: LocalizedString;
  description: LocalizedString;
};

export type Faq = {
  question: LocalizedString;
  answer: LocalizedString;
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
  faqs: Faq[];
};

export const services: Service[] = [
  {
    slug: "haul-out-launch",
    icon: "arrow-up-down",
    heroImage: "/images/engine-service.webp",
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
    galleryImages: ["/images/services/haul-out-1.jpg", "/images/services/haul-out-2.jpg"],
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
    faqs: [
      {
        question: {
          en: "How far in advance should I book a haul-out?",
          gr: "Πόσο νωρίτερα πρέπει να κλείσω ανέλκυση;",
        },
        answer: {
          en: "For the winter rush (November–December) and spring launches (April–May), at least 4 weeks ahead. Off-season, one week is usually enough.",
          gr: "Για την αιχμή του χειμώνα (Νοέμβριος–Δεκέμβριος) και τις ανοιξιάτικες καθελκύσεις (Απρίλιος–Μάιος), τουλάχιστον 4 εβδομάδες νωρίτερα. Εκτός εποχής, συνήθως αρκεί μία εβδομάδα.",
        },
      },
      {
        question: {
          en: "What boat sizes can you lift?",
          gr: "Τι μεγέθη σκαφών μπορείτε να ανελκύσετε;",
        },
        answer: {
          en: "Anything up to 15 metres LOA and around 12 tonnes dry weight. Beyond that, we can still help — we coordinate with a partner yard on the mainland for larger vessels.",
          gr: "Σκάφη μέχρι 15 μέτρα μήκος και περίπου 12 τόνους βάρος. Για μεγαλύτερα σκάφη, συνεργαζόμαστε με ναυπηγείο στην ηπειρωτική χώρα.",
        },
      },
      {
        question: {
          en: "What's included in the haul-out price?",
          gr: "Τι περιλαμβάνει η τιμή της ανέλκυσης;",
        },
        answer: {
          en: "Lift, transport to the yard, pressure-wash, and cradle set-up. Storage and any repair work are priced separately.",
          gr: "Ανύψωση, μεταφορά στο ναυπηγείο, καθαρισμός με πιεστικό και τοποθέτηση στο ικρίωμα. Η φύλαξη και τυχόν εργασίες τιμολογούνται ξεχωριστά.",
        },
      },
      {
        question: {
          en: "What happens if the weather turns on my scheduled day?",
          gr: "Τι γίνεται αν ο καιρός χαλάσει την προγραμματισμένη ημέρα;",
        },
        answer: {
          en: "We move the appointment — safely. You get a call the day before if the forecast looks borderline, and we reschedule for the next workable window at no extra charge.",
          gr: "Μεταθέτουμε το ραντεβού — με ασφάλεια. Θα σας καλέσουμε την προηγούμενη ημέρα αν η πρόγνωση είναι οριακή και θα επανακαθορίσουμε τη νέα ημερομηνία χωρίς επιπλέον χρέωση.",
        },
      },
    ],
  },
  {
    slug: "parking-storage",
    icon: "warehouse",
    heroImage: "/images/winterization.webp",
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
    galleryImages: ["/images/services/storage-1.jpg", "/images/services/storage-2.jpg"],
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
    faqs: [
      {
        question: {
          en: "Covered or open-air — what's the price difference?",
          gr: "Στεγασμένη ή υπαίθρια φύλαξη — ποια η διαφορά στην τιμή;",
        },
        answer: {
          en: "Covered storage runs roughly 40–50% more than open-air. It's worth it for wooden boats, boats with sensitive electronics, and anything you won't be checking on for more than a few months.",
          gr: "Η στεγασμένη φύλαξη κοστίζει περίπου 40–50% παραπάνω από την υπαίθρια. Αξίζει για ξύλινα σκάφη, σκάφη με ευαίσθητα ηλεκτρονικά, και για ό,τι δεν θα ελέγχετε για αρκετούς μήνες.",
        },
      },
      {
        question: {
          en: "Can I visit my boat during storage?",
          gr: "Μπορώ να επισκεφθώ το σκάφος μου κατά τη διάρκεια της φύλαξης;",
        },
        answer: {
          en: "Any time during yard hours. Just give us a heads-up so we can have a ladder ready. Out-of-hours access can be arranged for long-stay owners.",
          gr: "Οποιαδήποτε στιγμή εντός ωραρίου. Ειδοποιήστε μας ώστε να έχουμε σκάλα έτοιμη. Για μακροχρόνιους ιδιοκτήτες μπορεί να κανονιστεί και πρόσβαση εκτός ωραρίου.",
        },
      },
      {
        question: {
          en: "Do you handle insurance during storage?",
          gr: "Αναλαμβάνετε την ασφάλιση κατά τη φύλαξη;",
        },
        answer: {
          en: "The yard carries public liability, but the boat itself should stay on your own hull policy. Ask your insurer about a laid-up rate — most give a significant discount for wintered boats.",
          gr: "Το ναυπηγείο έχει ασφάλιση αστικής ευθύνης, αλλά το σκάφος πρέπει να παραμένει στην ασφάλισή σας. Ρωτήστε τον ασφαλιστή σας για τιμή φύλαξης — τα περισσότερα συμβόλαια προσφέρουν σημαντική έκπτωση για σκάφη σε διαχειμασμό.",
        },
      },
      {
        question: {
          en: "Can I have work done while my boat's in storage?",
          gr: "Μπορούν να γίνουν εργασίες κατά τη διάρκεια της φύλαξης;",
        },
        answer: {
          en: "Absolutely — and that's usually when the bigger jobs get done. Tell us what you want done and when, and we'll schedule it to finish before your next launch.",
          gr: "Ναι, και συνήθως τότε γίνονται οι μεγαλύτερες εργασίες. Πείτε μας τι θέλετε και πότε, και θα το προγραμματίσουμε ώστε να ολοκληρωθεί πριν την επόμενη καθέλκυση.",
        },
      },
    ],
  },
  {
    slug: "repairs",
    icon: "wrench",
    heroImage: "/images/general-repair.webp",
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
    galleryImages: ["/images/services/repairs-1.jpg", "/images/services/repairs-2.jpg"],
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
    faqs: [
      {
        question: {
          en: "Do you work on all engine brands?",
          gr: "Εργάζεστε σε όλες τις μάρκες μηχανών;",
        },
        answer: {
          en: "Yes — Volvo Penta, Yanmar, Mercruiser, Yamaha, Mercury, Honda, Suzuki, Tohatsu, Cummins. For parts we source through the mainland dealer network.",
          gr: "Ναι — Volvo Penta, Yanmar, Mercruiser, Yamaha, Mercury, Honda, Suzuki, Tohatsu, Cummins. Τα ανταλλακτικά τα προμηθευόμαστε μέσω του δικτύου αντιπροσώπων στην ηπειρωτική χώρα.",
        },
      },
      {
        question: {
          en: "What's the typical turnaround?",
          gr: "Ποιος είναι ο συνήθης χρόνος παράδοσης;",
        },
        answer: {
          en: "Routine service in a day. Diagnostic + repair for most system issues runs 2–5 days. Anything needing ordered parts adds 48–72 hours for delivery to the island.",
          gr: "Το τυπικό σέρβις σε μία ημέρα. Διάγνωση και επισκευή για τα περισσότερα προβλήματα συστημάτων 2–5 ημέρες. Ό,τι χρειάζεται παραγγελία ανταλλακτικών προσθέτει 48–72 ώρες για παράδοση στο νησί.",
        },
      },
      {
        question: {
          en: "Do you offer emergency service for visiting yachts?",
          gr: "Προσφέρετε επείγουσα εξυπηρέτηση σε σκάφη που επισκέπτονται το νησί;",
        },
        answer: {
          en: "Yes — we reserve slots every summer week for visiting yachts. Call directly and we'll diagnose same-day if we can. Engine-down emergencies take top priority.",
          gr: "Ναι — κρατάμε θέσεις κάθε καλοκαιρινή εβδομάδα για σκάφη που επισκέπτονται το νησί. Καλέστε απευθείας και θα κάνουμε διάγνωση αυθημερόν όπου είναι δυνατό. Οι περιπτώσεις μηχανής σε βλάβη έχουν την υψηλότερη προτεραιότητα.",
        },
      },
      {
        question: {
          en: "Is the work warranted?",
          gr: "Καλύπτεται η εργασία με εγγύηση;",
        },
        answer: {
          en: "12 months on labour for anything we do in-house. Parts carry their manufacturer warranty. Written certificate delivered at handover.",
          gr: "12 μήνες εγγύηση εργασίας για ό,τι γίνεται εσωτερικά. Τα ανταλλακτικά καλύπτονται από την εγγύηση του κατασκευαστή. Δίνεται γραπτό πιστοποιητικό κατά την παράδοση.",
        },
      },
    ],
  },
  {
    slug: "construction",
    icon: "hammer",
    heroImage: "/images/hull-cleaning.webp",
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
    galleryImages: ["/images/services/construction-1.jpg", "/images/services/construction-2.jpg"],
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
    faqs: [
      {
        question: {
          en: "How long does a new build take?",
          gr: "Πόσο διαρκεί μια νέα κατασκευή;",
        },
        answer: {
          en: "A 6–8 metre traditional hull is 4–6 months. A 10–12 metre cruiser or a full refit of a similar-size vessel is 9–14 months. We give a realistic timeline once the design is agreed.",
          gr: "Μια παραδοσιακή γάστρα 6–8 μέτρων χρειάζεται 4–6 μήνες. Ένα σκάφος αναψυχής 10–12 μέτρων ή μια πλήρης ανακαίνιση παρόμοιου μεγέθους χρειάζεται 9–14 μήνες. Δίνουμε ρεαλιστικό χρονοδιάγραμμα μόλις εγκριθεί ο σχεδιασμός.",
        },
      },
      {
        question: {
          en: "Can I commission a traditional wooden boat?",
          gr: "Μπορώ να παραγγείλω παραδοσιακό ξύλινο σκάφος;",
        },
        answer: {
          en: "Yes — kaikia, trechandiri, and smaller traditional forms are core to what we do. We use locally sourced timber where possible and classical carvel or lapstrake construction.",
          gr: "Ναι — καΐκια, τρεχαντήρια, και μικρότεροι παραδοσιακοί τύποι είναι κομμάτι της βασικής μας δραστηριότητας. Χρησιμοποιούμε τοπικά ξύλα όπου είναι δυνατό και κλασικές τεχνικές κατασκευής.",
        },
      },
      {
        question: {
          en: "What are the payment milestones?",
          gr: "Ποιες είναι οι δόσεις πληρωμής;",
        },
        answer: {
          en: "Typically 25% on contract, 25% at hull completion, 25% at systems fit-out, 25% at sea-trial handover. We're flexible — tell us what works for you and we'll structure it accordingly.",
          gr: "Συνήθως 25% με την υπογραφή, 25% στην ολοκλήρωση γάστρας, 25% στην τοποθέτηση συστημάτων, 25% με τη δοκιμή παράδοσης. Είμαστε ευέλικτοι — πείτε μας τι σας εξυπηρετεί και θα προσαρμόσουμε το πρόγραμμα ανάλογα.",
        },
      },
      {
        question: {
          en: "Can I visit the yard during construction?",
          gr: "Μπορώ να επισκεφθώ το ναυπηγείο κατά την κατασκευή;",
        },
        answer: {
          en: "Absolutely — we welcome it. Many owners fly in at key milestones (hull complete, deck fitted, launch). We also send weekly photo updates throughout the build.",
          gr: "Φυσικά — το καλωσορίζουμε. Πολλοί ιδιοκτήτες επισκέπτονται σε βασικά σημεία της κατασκευής (ολοκλήρωση γάστρας, τοποθέτηση καταστρώματος, καθέλκυση). Επίσης στέλνουμε εβδομαδιαίες φωτογραφίες σε όλη τη διάρκεια του έργου.",
        },
      },
    ],
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
