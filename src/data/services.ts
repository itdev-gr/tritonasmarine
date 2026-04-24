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
