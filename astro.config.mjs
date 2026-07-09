// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: process.env.SITE_URL,
  base: process.env.BASE_URL,
  vite: {
    plugins: [tailwindcss()],
  },

  prefetch: true,

  image: {
    service: {
      entrypoint: "astro/assets/services/sharp",
      config: {
        jpeg: {
          mozjpeg: true,
          progressive: true,
        },
      },
    },
  },
});
