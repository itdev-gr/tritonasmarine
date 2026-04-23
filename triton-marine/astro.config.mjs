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
