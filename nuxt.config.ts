// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    // ...
    '@pinia/nuxt',
  ],

  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiMockLocal: process.env.API_MOCK_LOCAL,
    },
  },
})
