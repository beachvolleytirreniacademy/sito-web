<template lang="">
    <Main>
        <UpcomingEventSection id="events" />
        <PastEventsSection id="pastEvents" />
        
    </Main>
</template>
<script setup>
import Main from "@/components/layout/Main.vue";
import UpcomingEventSection from "@/components/sections/UpcomingEventSection.vue";
import PastEventsSection from "@/components/sections/PastEventsSection.vue";

// In pages/strutture.vue
import { useHead } from '#imports'
// Magari qui importi una foto specifica dei campi
import struttureImage from '~/assets/images/campi-beach.jpg' 

useHead({
  // 1. TITOLO UNICO
  title: 'Eventi Beach Volley Tirrenia Academy| Eventi BVTA',
  
  meta: [
    // 2. DESCRIZIONE UNICA
    { 
      name: 'description', 
      content: 'Partecipa ai nostri eventi, tornei e non solo a Tirrenia (PI)!.' 
    },
    
    // Social (Open Graph) specifici per questa pagina
    { property: 'og:title', content: 'Partecipa ai nostri tornei di beach volley a Tirrenia' },
    { property: 'og:description', content: 'Scopri i nostri eventi.' },
    

    //{ property: 'og:image', content: struttureImage },
  ],
  
  // 3. LINK CANONICO (Fondamentale: cambia l'URL finale!)
  link: [
    { rel: 'canonical', href: 'https://www.beachvolleytirreniacademy.it/events' } 
  ]
})



</script>