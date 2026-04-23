import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://triton-marine.example.com",
  i18n: {
    defaultLocale: "en",
    locales: ["en", "gr"],
    routing: { prefixDefaultLocale: false },
  },
});
