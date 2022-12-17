// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxtjs/tailwindcss", "@nuxtjs/color-mode", "nuxt-headlessui"],
  headlessui: {
    prefix: "Headless",
  },
});
