// https://nuxt.com/docs/api/configuration/nuxt-config
import vuetify, { transformAssetUrls } from "vite-plugin-vuetify";
import api_key from "./api_key.js";

export default defineNuxtConfig({
  ssr: true,
  experimental: {
    payloadExtraction: false,
    defaults: {
      nuxtLink: {
        activeClass: "router-link-active",
      },
    },
  },
  build: {
    transpile: ["vuetify"],
  },
  app: {
    head: {
      link: [
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swa",
        },
      ],
      script: [{ src: "https://accounts.google.com/gsi/client" }],
    },
  },

  css: ["~/assets/css/main.css"],
  devtools: { enabled: true },
  plugins: ["~/plugins/emptyRecipe.js"],
  modules: [
    "@pinia/nuxt",
    "@prisma/nuxt",
    (_options, nuxt) => {
      nuxt.hooks.hook("vite:extendConfig", (config) => {
        // @ts-expect-error
        config.plugins.push(
          vuetify(
            { autoImport: true },
           
          )
        );
      });
    },
    "nuxt-auth-utils"
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls,
      },
    },
  },
});
