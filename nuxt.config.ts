export default defineNuxtConfig({
  app: {
    head: {
      link: [
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  compatibilityDate: "2024-11-01",
  devtools: { enabled: true },
  modules: ["@nuxt/ui"],
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