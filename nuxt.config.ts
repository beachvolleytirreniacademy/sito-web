export default defineNuxtConfig({
  app: {
    head: {
      // NUOVO: Imposta la lingua italiana per aiutare Google a capire il target
      htmlAttrs: {
        lang: 'it'
      },
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },

  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },

  modules: [
    "@nuxt/ui",
    "@nuxtjs/sitemap", // NUOVO: Crea automaticamente sitemap.xml
    "@nuxtjs/robots"   // NUOVO: Crea automaticamente robots.txt
  ],

  // NUOVO: Configurazione Sito (Obbligatoria per far funzionare la Sitemap)
  site: {
    url: 'https://www.beachvolleytirreniacademy.it', // IMPORTANTE: Sostituisci con il tuo vero dominio quando pubblichi!
    name: 'Beach Volley Tirrenia Academy',
  },

  // NUOVO: Configurazione specifica della Sitemap (opzionale, ma consigliata)
  sitemap: {
    exclude: [
        '/admin/**',   // Esclude la dashboard e tutte le sottopagine admin
        '/login',      // Esclude il login
    ],
    defaults: {
      priority: 0.8,
      changefreq: 'weekly'
    }
  },

  plugins: [
    '~/plugins/gsap.client.ts'
  ],

  build: {
    transpile: ['gsap']
  },

  css: ['~/assets/css/main.css'],

  ui: {
    theme: {
        colors: ['primary', 'secondary', 'accent', 'neutral'],
        transitions: true,
    },
  }
});