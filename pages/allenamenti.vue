<template>
  <Main>
    <div class="pt-6 pb-20 min-h-screen bg-gray-50 overflow-hidden">
      <UContainer>
        
        <!-- HEADER CENTRALE (Stile Strutture) -->
        <div class="text-center max-w-3xl mx-auto mb-12">
          
          <<div class="flex items-center justify-center gap-4 md:gap-6 mb-8 px-6 md:px-0">
            <img 
              src="/logobvta.png" 
              alt="Logo BVTA" 
              class="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
            
            <span class="text-2xl md:text-3xl font-light text-primary">✕</span>
            
            <img 
              src="/logobvca.png" 
              alt="Logo BVCA" 
              class="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
            />
          </div>

          <h1 class="text-4xl font-bold text-primary mb-4">{{ pageTitle }}</h1>
          <p class="text-xl text-gray-500">{{ pageDescription }}</p>
        </div>

        <!-- SEZIONE INTRO + BVCA -->
        <div class="grid md:grid-cols-2 gap-12 items-center mb-24">
          <!-- Immagine con Overlay BVCA -->
          <div class="relative order-2 md:order-1">
            <div class="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-gray-200 group">
              <video
                autoplay
                loop
                muted
                playsinline
                class="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
              >
                <source src="/coach/videoallenamento.mov" type="video/mp4" />
                Il tuo browser non supporta il tag video.
              </video>

              <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none"></div>
              
              <div class="absolute bottom-6 left-6 right-6">
                <div class="bg-primary/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                  <h3 class="text-white font-bold flex items-center gap-2">
                    <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" />
                    Partnership Tecnica
                  </h3>
                  <p class="text-white/90 text-sm mt-1">
                    In collaborazione con <strong>BVCA </strong> di Viareggio per il beach volley d'eccellenza.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <!-- Testo Descrittivo -->
          <div class="space-y-8 order-1 md:order-2">
            <div class="space-y-4">
              <h3 class="text-2xl font-bold text-gray-900">
                Dall'amatore all'agonista
              </h3>
              <p class="text-gray-600 leading-relaxed text-lg">
                Alla <span class="text-primary font-bold">BVTA</span> crediamo che il beach volley sia per tutti. 
                Insieme alla <span class="text-red-700 font-bold">BVCA</span> organizziamo gruppi di allenamento differenziati per livello sia d'Estate che d'Inverno.
              </p>
                <ul class="flex flex-col gap-6">
                  <li class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span class="text-gray-700">Gruppi invernali ed estivi attivi tutto l'anno.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span class="text-gray-700">Programmi tecnici condivisi con gli allenatori e i giocatori BVCA.</span>
                  </li>
                  <li class="flex items-start gap-3">
                    <UIcon name="i-heroicons-check-circle" class="w-6 h-6 text-primary flex-shrink-0 mt-0.5" />
                    <span class="text-gray-700">Tornei interni e ritrovi sociali per divertirci insieme.</span>
                  </li>
                </ul>
            </div>
          </div>
        </div>

        <!-- SEZIONE ALLENATORI -->
        <div class="mb-24">
          <div class="text-center mb-12">
            <h2 class="text-3xl font-bold text-primary mb-4">Il Nostro Staff</h2>
            <div class="w-24 h-1 bg-primary mx-auto rounded-full"></div>
            <p class="text-gray-600 mt-4 max-w-2xl mx-auto">
              Passione e competenza al tuo servizio. I nostri allenatori <span class="text-red-700 font-bold">BVCA</span> e <span class="text-primary font-bold">BVTA</span> ti seguiranno passo dopo passo.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div 
              v-for="(coach, index) in coaches" 
              :key="index"
              class="bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 group hover:-translate-y-2 shadow-sm hover:shadow-md"
            >
              <div class="h-72 overflow-hidden relative">
                <img 
                  :src="coach.image" 
                  :alt="coach.name"
                  class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-90"></div>
                <div class="absolute bottom-4 left-4">
                  <span class="bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2 inline-block shadow-sm">{{ coach.role }}</span>
                  <h4 class="text-xl font-bold text-white">{{ coach.name }}</h4>
                </div>
              </div>
              <div class="p-6">
                <p class="text-gray-600 text-sm leading-relaxed mb-4">
                  {{ coach.description }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- CTA FINALE -->
        <div class="text-center">
          <div class="bg-gradient-to-r from-primary/10 to-orange-600/10 border border-primary/20 rounded-3xl p-10 md:p-16 relative overflow-hidden">
            <!-- Effetti sfondo -->
            <div class="absolute top-0 right-0 -mt-10 -mr-10 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
            <div class="absolute bottom-0 left-0 -mb-10 -ml-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl"></div>
            
            <div class="relative z-10 max-w-2xl mx-auto">
              <h3 class="text-3xl font-bold text-gray-900 mb-6">Pronto a scendere in campo?</h3>
              <p class="text-gray-600 mb-8 text-lg">
                Contattaci per scoprire gli orari dei corsi e i livelli dei gruppi disponibili.
              </p>
              <UButton 
                size="xl"
                block
                color="primary"
                variant="solid"
                class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300 shadow-lg hover:shadow-primary/30"
                @click="showModal = true"
              >
                Richiedi Informazioni
              </UButton>
            </div>
          </div>
        </div>

      </UContainer>

      <!-- MODALE CONTATTI -->
      <Teleport to="body">
        <div v-if="showModal" class="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
          <div class="absolute inset-0" @click="showModal = false"></div>
          <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-0 relative animate-fade-in flex flex-col overflow-hidden z-10">
            
            <div class="bg-gray-50 p-5 border-b border-gray-100 flex justify-between items-center">
              <div>
                <h3 class="text-xl font-bold text-gray-900">Contattaci</h3>
                <p class="text-sm text-gray-700">Info corsi e allenamenti</p>
              </div>
              <button @click="showModal = false" class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors">
                <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
              </button>
            </div>

            <div class="p-6 space-y-4">
              <a 
                :href="whatsappLink" 
                target="_blank"
                class="flex items-center p-4 rounded-xl border-2 border-transparent bg-green-50 hover:border-green-200 hover:bg-green-100 transition-all group cursor-pointer"
              >
                <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600 mr-4 group-hover:scale-110 transition-transform">
                  <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="w-7 h-7" />
                </div>
                <div>
                  <h4 class="font-bold text-gray-900">WhatsApp</h4>
                  <p class="text-sm text-gray-600">Risposta rapida</p>
                </div>
                <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600" />
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
                  <h4 class="font-bold text-gray-900">{{ emailCopied ? 'Email Copiata!' : 'Email' }}</h4>
                  <p class="text-sm text-gray-600">beachvolleytirreniacademy@gmail.com</p>
                </div>
                <UIcon v-if="!emailCopied" name="i-heroicons-document-duplicate" class="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary" />
              </div>
            </div>
            
            <div class="bg-gray-50 p-3 text-center border-t border-gray-100">
              <p class="text-xs text-gray-900">BVTA - Pisa / Tirrenia</p>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
  </Main>
</template>

<script setup>
import { ref } from 'vue'
import { useHead } from '#imports'
import Main from "@/components/layout/Main.vue"

// SEO
useHead({
  title: 'Corsi e Allenamenti Beach Volley Pisa e Tirrenia | BVTA',
  meta: [
    { name: 'description', content: 'Unisciti ai nostri corsi di Beach Volley a Tirrenia e Pisa. Allenamenti per tutti i livelli in collaborazione con BVCA Viareggio.' },
    { property: 'og:title', content: 'Corsi Beach Volley BVTA' },
    { property: 'og:description', content: 'Allenamenti invernali ed estivi a Tirrenia.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.beachvolleytirreniacademy.it/allenamenti' }
  ]
})

// Dati Pagina
const pageTitle = "Corsi e Allenamenti"
const pageDescription = "Sei in cerca di un gruppo con cui allenarti a beach volley d'inverno o d'estate? Unisciti alla nostra community."

// Stato Modale
const showModal = ref(false)
const emailCopied = ref(false)
const whatsappNumber = "393313494020"
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Ciao! Vorrei informazioni sui corsi di Beach Volley.")}`

// Dati Allenatori
const coaches = ref([
  {
    name: "Eugenio Amore",
    role: "Head Coach",
    description: "Fondatore della BVCA, allenatore storico e grandissimo giocatore di beach volley. Eugenio ha rappresentato l'Italia alle olimpiadi di Pechino 2008 in coppia con Riccardo Lione.",
    image: "/coach/eugenioamore.jpg"
  },
  {
    name: "Claudia Puccinelli",
    role: "Coach",
    description: "Specializzata nei corsi intermedi e avanzati, porta in campo energia e passione per far crescere i nuovi talenti. Claudia partecipa al campionato italiano ed è in top 30 nella classifica assoluta, dopo il raggiungimento del 13esimo posto nelle finali di Settembre 2025.",
    image: "/coach/puccinelli.jpg"
  },
  {
    name: "Eleonora Gili",
    role: "Coach",
    description: "Giocatrice veterana del campionato italiano e non solo. Ha avuto grandi risultati negli anni passati rimanendo sempre nelle posizione piu alte della classifica assoluta.",
    image: "/coach/gili.jpeg"
  },
  {
    name: "Davide Seminara",
    role: "Coach e Presidente",
    description: "Allenatore e presidente della BVTA. Ex calciatore di Serie C che da alcuni anni ha messo il beach volley al centro diventando un giocatore esperto con ottimi risultati nei circuiti AIBVC nazionali.",
    image: "/coach/seminara3.jpg"
  },
  {
    name: "Alessio Antonelli",
    role: "Coach",
    description: "Giocatore esperto cresciuto nella BVCA che compete nei tornei nazionali da piu di dieci anni. Si occupa di alcuni gruppi di livello base e avanzato.",
    image: "/coach/aleanto.jpeg"
  },
  {
    name: "Matteo Marini",
    role: "Coach",
    description: "Talento pisano diviso tra beach volley e pallavolo indoor. Oggi compete nel campionato di Serie B di pallavolo e nel campionato italiano di beach volley.",
    image: "/coach/marini.jpeg"
  }
])

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com')
    emailCopied.value = true
    setTimeout(() => { emailCopied.value = false }, 3000)
  } catch (err) {
    alert('Email: beachvolleytirreniacademy@gmail.com')
  }
}
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.8s ease-out forwards;
  opacity: 0;
  transform: translateY(20px);
}
.delay-100 {
  animation-delay: 0.1s;
}
@keyframes fadeInUp {
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
