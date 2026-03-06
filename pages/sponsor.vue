<template>
  <Main>
    <div class="pt-32 pb-24 min-h-screen bg-gray-50">
      <UContainer>
        
        <div class="mb-32">

          <div class="text-center max-w-3xl mx-auto mb-12">
            <h1 class="text-4xl font-bold text-primary mb-4">I Nostri Partner</h1>
            <p class="text-xl text-gray-500">Le aziende e le realtà che credono nel nostro progetto e supportano la crescita del beach volley.</p>
          </div>

          <div class="text-center mb-20">
          </div>
          
          <div class="space-y-24 md:space-y-32">
            <div 
              v-for="(partner, index) in partnersList" 
              :key="partner.id"
              class="flex flex-col md:flex-row items-center gap-12 md:gap-20 group"
              :class="{'md:flex-row-reverse': index % 2 !== 0}"
            >
              <div class="w-full md:w-5/12 flex justify-center items-center">
                <img 
                  :src="partner.imageUrl" 
                  :alt="`Logo ${partner.name}`" 
                  class="max-h-48 md:max-h-64 w-auto object-contain transition-all duration-500 ease-in-out transform group-hover:opacity-80 group-hover:scale-105"
                />
              </div>
              
              <div class="w-full md:w-7/12 text-center md:text-left space-y-6">
                <h3 class="text-3xl font-bold text-gray-900">{{ partner.name }}</h3>
                <div class="w-16 h-1 bg-primary mx-auto md:mx-0 rounded-full"></div>
                <p class="text-gray-600 leading-relaxed text-lg md:text-xl font-light">
                  {{ partner.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="max-w-4xl mx-auto relative mt-24">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-3xl blur opacity-20"></div>
          
          <div class="relative bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50">
            <div class="grid md:grid-cols-5 h-full">
              
              <div class="md:col-span-2 bg-primary p-10 flex flex-col justify-center text-white relative overflow-hidden">
                <div class="absolute top-0 right-0 -mt-4 -mr-4 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
                <div class="absolute bottom-0 left-0 -mb-4 -ml-4 w-32 h-32 bg-black/10 rounded-full blur-2xl"></div>
                
                <UIcon name="i-heroicons-hand-raised" class="w-16 h-16 mb-6 text-white/90 relative z-10" />
                <h2 class="text-3xl font-bold mb-3 relative z-10 leading-tight">Unisciti alla<br>Nostra Squadra</h2>
                <p class="text-primary-100 text-lg relative z-10 font-medium">Diventa partner ufficiale BVTA</p>
              </div>

              <div class="md:col-span-3 p-10 md:p-12 flex flex-col justify-between space-y-8 bg-white/50 backdrop-blur-sm">
                <div>
                  <h3 class="text-2xl font-bold text-gray-800 mb-4">Perché diventare sponsor?</h3>
                  <p class="text-gray-600 leading-relaxed mb-8">
                    La Beach Volley Tirrenia Academy non è solo sport, è una community. 
                    Sostenendoci, legherai il tuo brand a valori di salute, competizione e divertimento.
                  </p>

                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <li class="flex items-center text-gray-700">
                      <div class="p-1.5 bg-primary/10 rounded-full mr-3 text-primary">
                        <UIcon name="i-heroicons-check" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium">Logo su divise e campi</span>
                    </li>
                    <li class="flex items-center text-gray-700">
                      <div class="p-1.5 bg-primary/10 rounded-full mr-3 text-primary">
                        <UIcon name="i-heroicons-check" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium">Visibilità Social & Web</span>
                    </li>
                    <li class="flex items-center text-gray-700">
                      <div class="p-1.5 bg-primary/10 rounded-full mr-3 text-primary">
                        <UIcon name="i-heroicons-check" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium">Menzioni nei tornei</span>
                    </li>
                    <li class="flex items-center text-gray-700">
                      <div class="p-1.5 bg-primary/10 rounded-full mr-3 text-primary">
                        <UIcon name="i-heroicons-check" class="w-4 h-4" />
                      </div>
                      <span class="text-sm font-medium">Stand promozionali</span>
                    </li>
                  </ul>
                </div>

                <div class="pt-8 border-t border-gray-100">
                  <UButton 
                    @click="openModal"
                    size="xl"
                    block
                    color="primary"
                    variant="solid"
                    class="w-full bg-primary text-white hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-primary/40 hover:-translate-y-0.5 rounded-xl font-semibold text-lg"
                  >
                    <span class="mr-2">Parla con il Responsabile</span>
                    <UIcon name="i-heroicons-chat-bubble-left-right" class="w-5 h-5" />
                  </UButton>
                </div>
              </div>
              
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

            <a 
              :href= "whatsappLink" 
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
import { useHead } from '#imports'
import { ref } from 'vue'
import Main from "@/components/layout/Main.vue";

const whatsappNumber = "393313494020"
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Ciao! Vorrei informazioni sui corsi di Beach Volley.")}`

import partnersData from '@/content/partners.json' 
const partnersList = ref(partnersData.partners)

useHead({
  title: 'Sponsor Beach Volley Tirrenia Academy | Sponsor BVTA',
  meta: [
    { name: 'description', content: 'Diventa sponsor della Beach Volley Tirrenia Academy.' },
    { property: 'og:title', content: 'Diventa sponsor della Beach Volley Tirrenia Academy' },
    { property: 'og:description', content: 'Scopri le nostre offerte di collaborazione.' },
  ],
  link: [
    { rel: 'canonical', href: 'https://www.beachvolleytirreniacademy.it/sponsor' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' } 
  ]
})

const isOpen = ref(false)
const emailCopied = ref(false)

const openModal = () => {
  isOpen.value = true
  document.body.style.overflow = 'hidden'
  emailCopied.value = false
}

const closeModal = () => {
  isOpen.value = false
  document.body.style.overflow = ''
}

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com');
    emailCopied.value = true;
    setTimeout(() => {
      emailCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Impossibile copiare il testo: ', err);
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