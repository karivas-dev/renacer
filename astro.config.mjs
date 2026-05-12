// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  vite: {
      plugins: [tailwindcss()],
  },

  prefetch: true,

  image: {
      service: {
          entrypoint: 'astro/assets/services/sharp',
          config: {
              jpeg: {
                  mozjpeg: true,
                  progressive: true,
              }
          }
      }
  },

  integrations: [vue()],
});