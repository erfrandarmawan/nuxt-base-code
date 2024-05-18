// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  modules: ["@pinia/nuxt"],

  runtimeConfig: {
    public: {
      BASE_API_URL: process.env.NUXT_PUBLIC_BASE_API_URL || "",
    }
  }
})
