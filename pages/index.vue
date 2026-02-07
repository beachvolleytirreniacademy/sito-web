<template lang="">
    <Main>
        <HeroSection id="hero" />
        <UpcomingEventSection 
            v-if="hasUpcomingEvents" 
            id="events" 
        />
        <PartnersSection id="partners" />
        <AboutSection id="about" />
        <StatsSection id="stats" />
        <NewsSection id="news" />
        <GallerySection id="gallery" />
        <ContactSection id="contact" />
    </Main>
</template>
<script setup>

// In index.vue
// Assicurati di avere questo import se non è auto-importato (in Nuxt solitamente lo è)
import { useHead } from '#imports'
// Importa un'immagine per la condivisione social (es. la stessa della hero o il logo)
import socialImage from '~/assets/images/hero.jpg' 

useHead({
  // Il titolo che appare nella scheda del browser
  title: 'Beach Volley Tirrenia Academy | Corsi e Tornei a Pisa',
  
  meta: [
    // 1. Descrizione base per Google (Max 160 caratteri)
    { 
      name: 'description', 
      content: 'BVTA è la scuola di Beach Volley a Tirrenia e Pisa. Corsi per principianti e avanzati, tornei estivi e invernali, campi all\'aperto e indoor.' 
    },
    
    // 2. Keywords (Meno usate oggi da Google, ma male non fanno)
    { 
      name: 'keywords', 
      content: 'Beach Volley Tirrenia, Corsi Beach Volley Pisa, Tornei Beach Volley Toscana, Scuola Beach Volley, BVTA' 
    },

    // --- SOCIAL META TAGS (Open Graph) ---
    // Questi servono per WhatsApp, Facebook, LinkedIn
    
    // Titolo Social (può essere più accattivante)
    { property: 'og:title', content: 'Entra nel mondo Beach Volley Tirrenia Academy' },
    
    // Descrizione Social
    { property: 'og:description', content: 'Unisciti alla nostra community! Corsi, tornei e divertimento tutto l\'anno sul litorale pisano.' },
    
    // Immagine di anteprima (DEVE essere un percorso assoluto o importato)
    { property: 'og:image', content: socialImage },
    
    // Tipo di sito
    { property: 'og:type', content: 'website' },
    
    // Lingua
    { property: 'og:locale', content: 'it_IT' }
  ],
  
  // Link Canonico (Dice a Google che questa è la pagina originale)
  link: [
    { rel: 'canonical', href: 'https://www.tiosito.it/' } // Sostituisci con il tuo vero dominio
  ]
})

import Main from "@/components/layout/Main.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import StatsSection from "@/components/sections/StatsSection.vue";
import NewsSection from "@/components/sections/NewsSection.vue";
import PartnersSection from "@/components/sections/PartnersSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import UpcomingEventSection from "@/components/sections/UpcomingEventSection.vue";
import GallerySection from "@/components/sections/GallerySection.vue";
import PastEventsSection from "@/components/sections/PastEventsSection.vue";
</script>