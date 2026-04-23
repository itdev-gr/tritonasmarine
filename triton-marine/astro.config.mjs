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
