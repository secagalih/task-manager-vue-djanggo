// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiBase: import.meta.env.NUXT_PUBLIC_API_BASE || 'http://localhost:8000/api'
    }
  },
  modules: ['vuetify-nuxt-module'],
  vuetify:{
    vuetifyOptions:{
      theme: {
        defaultTheme: 'dark'
      },
      icons:{
        defaultSet:'mdi'
      }
    }
  }
})