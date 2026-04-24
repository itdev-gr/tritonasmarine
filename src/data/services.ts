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
    slug: "haul-out-launch",
    icon: "arrow-up-down",
    heroImage: "/images/engine-service.jpg",
    name: {
      en: "Haul-out & launch",
      gr: "Ανέλκυση – Καθέλκυση σκαφών",
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
    slug: "parking-storage",
    icon: "warehouse",
    heroImage: "/images/winterization.jpg",
    name: {
      en: "Parking & winter storage",
      gr: "Parking & Διαχειμαστήριο",
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
    slug: "repairs",
    icon: "wrench",
    heroImage: "/images/general-repair.jpg",
    name: {
      en: "Repairs",
      gr: "Επισκευές",
    },
    shortDescription: {
      en: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      gr: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    },
    longDescription: {
      en: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      gr: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
  },
  {
    slug: "construction",
    icon: "hammer",
    heroImage: "/images/hull-cleaning.jpg",
    name: {
      en: "Construction",
      gr: "Κατασκευές",
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
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}
