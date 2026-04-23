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
