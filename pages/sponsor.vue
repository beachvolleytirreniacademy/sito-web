<template>
  <Main>
    <div class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        <div class="max-w-3xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          
          <div class="bg-primary p-12 text-center text-white relative overflow-hidden">
            <div class="absolute inset-0 bg-gradient-to-tr from-black/20 to-transparent"></div>
            <UIcon name="i-heroicons-hand-raised" class="w-16 h-16 mb-4 text-white/90 relative z-10" />
            <h1 class="text-4xl font-bold mb-2 relative z-10">Unisciti a Noi</h1>
            <p class="text-primary-100 text-lg relative z-10">Diventa partner ufficiale BVTA</p>
          </div>

          <div class="p-8 md:p-12 space-y-6">
            <h2 class="text-2xl font-bold text-gray-800">Perché diventare sponsor?</h2>
            <p class="text-gray-600 leading-relaxed">
              La Beach Volley Tirrenia Academy non è solo sport, è una community. 
              Sostenendoci, legherai il tuo brand a valori di salute, competizione e divertimento.
            </p>

            <ul class="grid md:grid-cols-2 gap-4 mt-6">
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-check-badge" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Logo su divise e striscioni campi</span>
              </li>
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-globe-alt" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Visibilità Social & Web</span>
              </li>
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-megaphone" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Menzioni durante i tornei</span>
              </li>
              <li class="flex items-start text-gray-700 bg-gray-50 p-3 rounded-lg">
                <UIcon name="i-heroicons-gift" class="text-primary mr-3 w-6 h-6 flex-shrink-0" />
                <span class="text-sm">Stand promozionali agli eventi</span>
              </li>
            </ul>

            <div class="pt-8 mt-4 border-t border-gray-100 text-center">
              <p class="text-gray-500 mb-6">Pronto a scendere in campo con noi?</p>
              
              <UButton 
                @click="openModal"
                size="xl"
                block
                color="primary"
                variant="solid"
                class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300 shadow-lg hover:shadow-primary/30"
              >
                <span class="mr-2">Parla con il Responsabile Sponsor</span>
                <UIcon name="i-heroicons-chat-bubble-left-right" />
              </UButton>
            </div>
          </div>
        </div>
      </UContainer>
    </div>

    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>

        <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          <div class="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Contattaci Direttamente</h3>
              <p class="text-sm text-gray-500 mt-1">Scegli il canale che preferisci</p>
            </div>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-8 space-y-6">
            
            <div 
              @click="copyEmail"
              class="flex items-center p-4 rounded-xl border-2 border-transparent bg-primary/5 hover:border-primary/30 hover:bg-primary/10 transition-all group cursor-pointer"
            >
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center shadow-sm mr-4 transition-all duration-300"
                :class="emailCopied ? 'bg-green-500 text-white scale-110' : 'bg-white text-primary group-hover:scale-110'"
              >
                <UIcon :name="emailCopied ? 'i-heroicons-check' : 'i-heroicons-envelope'" class="w-6 h-6" />
              </div>
              
              <div>
                <h4 class="font-bold text-gray-900">
                  {{ emailCopied ? 'Indirizzo Copiato!' : 'Copia indirizzo Email' }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ emailCopied ? 'Incolla nella tua mail preferita.' : 'beachvolleytirreniacademy@gmail.com' }}
                </p>
              </div>
              
              <UIcon 
                v-if="!emailCopied"
                name="i-heroicons-document-duplicate" 
                class="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary group-hover:scale-110 transition-all" 
              />
            </div>

            <a 
              href="https://wa.me/393403336499" 
              target="_blank"
              class="flex items-center p-4 rounded-xl border-2 border-transparent bg-green-50 hover:border-green-200 hover:bg-green-100 transition-all group"
            >
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600 mr-4 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Scrivici su WhatsApp</h4>
                <p class="text-sm text-gray-600">Risposta rapida per info veloci.</p>
              </div>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </a>

          </div>

          <div class="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p class="text-xs text-gray-400">
              Saremo felici di organizzare un incontro conoscitivo.
            </p>
          </div>

        </div>
      </div>
    </Teleport>

  </Main>
</template>

<script setup>
import { ref } from 'vue'
import Main from "@/components/layout/Main.vue";

const isOpen = ref(false)
const emailCopied = ref(false) // Stato per gestire l'animazione di copia

const openModal = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  emailCopied.value = false // Reset stato
}

const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

// Funzione "Copia negli appunti"
const copyEmail = async () => {
  try {
    // API moderna del browser per copiare
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com');
    
    // Attiva l'animazione di successo
    emailCopied.value = true;
    
    // Dopo 3 secondi rimette lo stato normale
    setTimeout(() => {
      emailCopied.value = false;
    }, 3000);
    
  } catch (err) {
    console.error('Impossibile copiare il testo: ', err);
    // Fallback in caso di errore (es. browser vecchissimi), mostriamo un alert
    alert('Email: beachvolleytirreniacademy@gmail.com');
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>