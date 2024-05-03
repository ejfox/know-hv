import pkg from './package.json'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      title: pkg.name,
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: pkg.version }
      ]
    }
  },
  ssr: false, // for netlify deploy
  devtools: { enabled: true },
  modules: [
    // '@nuxtjs/supabase',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxt/ui',
    '@nuxt/content',
    '@vueuse/motion/nuxt',
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          'Delicious Handrawn': [400]
        }
      }
    ]
  ],
  // content: {
  //   documentDriven: true
  // },
  // supabase: {
  //   redirectOptions: {
  //     login: '/login',
  //     callback: '/confirm',
  //     exclude: ['/'],
  //   }
  // },
  runtimeConfig: {
    // add the openai api key to the runtime config
    WEATHER_KEY: process.env.WEATHER_KEY,
    MAPTILER_KEY: process.env.MAPTILER_KEY,
    public: {
      OPENAI_API_KEY: process.env.OPENAI_API_KEY,
      PRODUCTION: process.env.PRODUCTION
    }
  }
})
