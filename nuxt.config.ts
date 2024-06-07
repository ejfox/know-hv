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
          'Delicious Handrawn': [400],
          Gelasio: [400, 500, 600, 700]
        }
      }
    ],
    '@unlok-co/nuxt-stripe'
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
  stripe: {
    // Server
    server: {
      // key: "sk_test_123",
      key: process.env.STRIPE_SECRET_KEY,
      options: {
        // your api options override for stripe server side
        // https://github.com/stripe/stripe-node?tab=readme-ov-file#configuration
      }
      // CLIENT
    },
    client: {
      // key: "pk_test_123",
      key: process.env.STRIPE_PUBLISHABLE_KEY,
      // your api options override for stripe client side https://stripe.com/docs/js/initializing#init_stripe_js-options
      options: {}
    }
  },
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
