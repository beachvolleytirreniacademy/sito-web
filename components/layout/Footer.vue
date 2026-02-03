<template>
  <footer class="w-full bg-background-primary border-t border-gray-800">
    <UContainer class="py-12">
      
      <div class="flex flex-col items-center justify-center mb-10">
        
        <div class="flex items-center justify-center gap-4 w-full">
          <div class="hidden md:block h-px bg-gray-800 flex-grow"></div>
          
          <div class="flex items-center gap-6">
            <a 
              v-for="link in socialLinks" 
              :key="link.path" 
              :href="link.label === 'Email' ? undefined : link.path" 
              class="transition-all duration-300 hover:scale-110 cursor-pointer"
              :class="[
                link.label === 'Email' && emailCopied ? 'text-green-500' : 'text-gray-400 hover:text-primary'
              ]"
              :target="link.label === 'Email' ? undefined : '_blank'"
              @click="handleSocialClick(link, $event)"
              :title="link.label === 'Email' ? 'Copia Email' : link.label"
            >
              <UIcon 
                :name="(link.label === 'Email' && emailCopied) ? 'i-heroicons-check' : link.icon" 
                class="w-6 h-6" 
              />
            </a>
          </div>

          <div class="hidden md:block h-px bg-gray-800 flex-grow"></div>
        </div>
      </div>

      <div class="flex flex-col items-center justify-center mb-8">
        <h2 class="text-2xl font-bold text-white mb-4">BVTA</h2>
        <div class="text-gray-400 text-sm">
          © 2025 BVTA. Tutti i diritti riservati.
        </div>
        <p 
            v-if="emailCopied" 
            class="text-green-500 text-xs mt-2 animate-pulse"
        >
            Email copiata negli appunti!
        </p>
      </div>

    </UContainer>
  </footer>
</template>

<script setup>
import { useScrollTo } from '~/composables/useScrollTo'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router' 
import footerContent from '~/content/footer.json'

const { scrollToElement } = useScrollTo()
const route = useRoute()     
const router = useRouter()   

const socialLinks = ref(footerContent.socialLinks)
const emailCopied = ref(false) // Stato per gestire l'icona della copia

// Gestione click sui social
const handleSocialClick = async (link, event) => {
  // Se è l'Email
  if (link.label === 'Email') {
    event.preventDefault() // Blocca il comportamento standard del link
    
    try {
      // Copia il path (che nel JSON contiene l'indirizzo email)
      await navigator.clipboard.writeText(link.path)
      
      // Attiva lo stato "Copiato"
      emailCopied.value = true
      
      // Resetta dopo 3 secondi
      setTimeout(() => {
        emailCopied.value = false
      }, 3000)
      
    } catch (err) {
      console.error('Errore copia:', err)
      // Fallback: mostra un alert se la copia fallisce
      alert('Email: ' + link.path)
    }
  }
  // Se sono altri link (Instagram, WhatsApp), il comportamento standard (href + target_blank) funziona da solo
}

const handleNavClick = async (path, event) => {
  if (path.includes('#')) {
    event.preventDefault()
    const hashIndex = path.indexOf('#')
    const targetId = path.substring(hashIndex) 

    if (route.path === '/') {
      scrollToElement(targetId)
    } else {
      await router.push('/')
      setTimeout(() => {
        scrollToElement(targetId)
      }, 100)
    }
  }
}
</script>