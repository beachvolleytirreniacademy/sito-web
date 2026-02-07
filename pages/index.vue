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
        <NewsSection v-if="hasNews" id="news" />
        <GallerySection id="gallery" />
        <ContactSection id="contact" />
    </Main>
</template>

<script setup>
// Import necessari per la logica Vue
import { ref, onMounted } from 'vue'; // IMPORTANTE: serve per la reattività e il ciclo di vita
import { useHead } from '#imports';
import socialImage from '~/assets/images/hero.jpg';

// Import componenti
import Main from "@/components/layout/Main.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import StatsSection from "@/components/sections/StatsSection.vue";
import NewsSection from "@/components/sections/NewsSection.vue";
import PartnersSection from "@/components/sections/PartnersSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import UpcomingEventSection from "@/components/sections/UpcomingEventSection.vue";
import GallerySection from "@/components/sections/GallerySection.vue";
// import PastEventsSection from "@/components/sections/PastEventsSection.vue"; // Non usato nel template sopra

// Import Client API
import { EventsClient } from '~/api/event_client';
import { NewsClient } from '~/api/news_client';

// --- STATO REATTIVO ---
// Di base è false, così la sezione è nascosta finché non controlliamo
const hasUpcomingEvents = ref(false);
const hasNews = ref(false);


// --- LOGICA DI CONTROLLO EVENTI ---
const checkFutureEvents = async () => {
  try {
    // Chiamiamo il client per ottenere gli eventi futuri
    const data = await EventsClient.getFutureEvents();

    // Se i dati esistono E l'array contiene almeno un evento
    if (data && data.length > 0) {
      hasUpcomingEvents.value = true;
      
    } else {
      hasUpcomingEvents.value = false;
      
    }
  } catch (error) {
    console.error("Errore nel controllo eventi:", error);
    // In caso di errore nascondiamo la sezione per sicurezza
    hasUpcomingEvents.value = false;
  }
};

// LOGICA CONTROLLO NEWS
const checkNews = async () => {
  try {
    // Chiamiamo il client per ottenere gli eventi futuri
    const data = await NewsClient.getAll();

    // Se i dati esistono E l'array contiene almeno un evento
    if (data && data.length > 0) {
      hasNews.value = true;
      
    } else {
      hasNews.value = false;
      
    }
  } catch (error) {
    console.error("Errore nel controllo news:", error);
    // In caso di errore nascondiamo la sezione per sicurezza
    hasNews.value = false;
  }
};

// --- CICLO DI VITA ---
// Eseguiamo il controllo appena il componente è montato nel browser
onMounted(() => {
  checkFutureEvents();
  checkNews();
});

// --- SEO (Metadati) ---
useHead({
  title: 'Beach Volley Tirrenia Academy | Corsi e Tornei a Pisa',
  meta: [
    { 
      name: 'description', 
      content: 'BVTA è la scuola di Beach Volley a Tirrenia e Pisa. Corsi per principianti e avanzati, tornei estivi e invernali, campi all\'aperto e indoor.' 
    },
    { 
      name: 'keywords', 
      content: 'Beach Volley Tirrenia, Corsi Beach Volley Pisa, Tornei Beach Volley Toscana, Scuola Beach Volley, BVTA' 
    },
    // Open Graph
    { property: 'og:title', content: 'Entra nel mondo Beach Volley Tirrenia Academy' },
    { property: 'og:description', content: 'Unisciti alla nostra community! Corsi, tornei e divertimento tutto l\'anno sul litorale pisano.' },
    { property: 'og:image', content: socialImage },
    { property: 'og:type', content: 'website' },
    { property: 'og:locale', content: 'it_IT' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.beachvolleytirreniacademy.it/' } 
  ]
})
</script>