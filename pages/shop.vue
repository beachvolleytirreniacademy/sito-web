<template lang="">
    <Main>
        <shopSection id="shop" />
        
    </Main>
</template>
<script setup>
import Main from "@/components/layout/Main.vue";
import shopSection from "@/components/sections/shopSection.vue";

// In pages/strutture.vue
import { useHead } from '#imports'
// Magari qui importi una foto specifica dei campi


useHead({
  // 1. TITOLO UNICO
  title: 'Shop Beach Volley Tirrenia Academy| Shop BVTA',
  
  meta: [
    // 2. DESCRIZIONE UNICA
    { 
      name: 'description', 
      content: 'Acquista o ordine il nostro abbigliamento personalizzato!' 
    },
    
    // Social (Open Graph) specifici per questa pagina
    { property: 'og:title', content: 'Visita i nostri prodotti nello shop BVTA' },
    { property: 'og:description', content: 'Scopri i nostri prodotti personalizzati imperdibili!' },
    

    //{ property: 'og:image', content: struttureImage },
  ],
  
  // 3. LINK CANONICO (Fondamentale: cambia l'URL finale!)
  link: [
    { rel: 'canonical', href: 'https://www.beachvolleytirreniacademy.it/shop' } 
  ]
})




</script>