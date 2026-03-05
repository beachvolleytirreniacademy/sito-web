<template>
  <section ref="sectionRef" class="pt-24 pb-20 overflow-hidden bg-background-primary">
    <UContainer>
      
      <!-- INTRODUZIONE E DESCRIZIONE -->
      <div class="grid md:grid-cols-2 gap-12 items-center px-4 md:px-0 mb-20">
        
        <!-- Immagine -->
        <div class="relative order-2 md:order-1 mt-8 md:mt-0">
          <div ref="imageWrapperRef" class="relative z-10">
            <img
              src="https://placehold.co/600x700?text=Allenamenti+BVTA"
              alt="Allenamenti Beach Volley"
              class="rounded-lg shadow-xl w-full object-cover h-[500px] md:h-[600px]" 
            />
          </div>
          <div
            ref="shapeRef"
            class="absolute -left-4 md:-left-8 -bottom-4 md:-bottom-8 w-full h-full border-8 border-primary rounded-lg -z-10"
          ></div>
        </div>

        <!-- Testi -->
        <div class="space-y-6 order-1 md:order-2 text-white">
          <h2 
            ref="titleRef"
            class="text-3xl md:text-5xl font-bold text-primary mb-6"
          >
            Corsi e Allenamenti
          </h2>
          
          <div ref="contentRef" class="space-y-6">
            
            <div class="space-y-4">
              <h3 class="text-2xl font-bold text-white">
                Il tuo gruppo di allenamento ti aspetta
              </h3>
              <p class="text-gray-300 leading-relaxed text-lg">
                Sei in cerca di un gruppo con cui allenarti a beach volley d'inverno o d'estate? 
                Alla <span class="text-primary font-bold">BVTA</span> non importa il tuo livello di partenza: 
                che tu sia un principiante assoluto o un giocatore esperto, abbiamo il corso giusto per te.
              </p>
              <p class="text-gray-300 leading-relaxed">
                Organizziamo gruppi di allenamento sulle spiagge di <strong>Tirrenia</strong> e <strong>Pisa</strong>, 
                creando un ambiente dove la crescita tecnica si fonde con il divertimento e lo spirito di squadra.
              </p>
            </div>

            <div class="bg-white/5 border-l-4 border-primary p-6 rounded-r-xl mt-6">
              <h4 class="text-xl font-bold text-white mb-2 flex items-center gap-2">
                <UIcon name="i-heroicons-academic-cap" class="w-6 h-6 text-primary" />
                Partnership Tecnica
              </h4>
              <p class="text-gray-300 text-sm leading-relaxed">
                Per garantire la massima qualità didattica, i nostri corsi sono strutturati in stretta collaborazione con la 
                <span class="font-bold text-white">BVCA (Beach Volley Club Academy) di Viareggio</span>. 
                Questa sinergia ci permette di offrire metodologie di allenamento all'avanguardia e percorsi di crescita condivisi.
              </p>
            </div>

          </div>
        </div>
      </div>

      <!-- SEZIONE ALLENATORI -->
      <div ref="coachesSectionRef" class="mt-24">
        <div class="text-center mb-12">
          <h3 class="text-3xl font-bold text-white mb-4">Il Nostro Staff Tecnico</h3>
          <p class="text-gray-400 max-w-2xl mx-auto">
            Passione, competenza ed esperienza. I nostri coach sono pronti a seguirti passo dopo passo nel tuo percorso sulla sabbia.
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div 
            v-for="(coach, index) in coaches" 
            :key="index"
            class="coach-card bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-primary/50 transition-all duration-300 group"
          >
            <div class="h-64 overflow-hidden relative">
              <img 
                :src="coach.image" 
                :alt="coach.name"
                class="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              />
              <div class="absolute bottom-0 left-0 w-full bg-gradient-to-t from-black/80 to-transparent p-4 pt-12">
                <span class="text-primary font-bold text-sm uppercase tracking-wider">{{ coach.role }}</span>
              </div>
            </div>
            <div class="p-6">
              <h4 class="text-xl font-bold text-white mb-2">{{ coach.name }}</h4>
              <p class="text-gray-400 text-sm leading-relaxed mb-4">
                {{ coach.description }}
              </p>
              <div class="flex gap-2">
                 <UBadge v-for="tag in coach.tags" :key="tag" color="gray" variant="solid" size="xs">{{ tag }}</UBadge>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA FINALE -->
      <div class="mt-24 text-center">
        <div class="bg-gradient-to-r from-primary/20 to-orange-600/20 border border-primary/30 rounded-2xl p-8 md:p-12 max-w-4xl mx-auto relative overflow-hidden">
          <!-- Decorazione sfondo -->
          <div class="absolute -top-10 -right-10 w-32 h-32 bg-primary/20 rounded-full blur-3xl"></div>
          <div class="absolute -bottom-10 -left-10 w-32 h-32 bg-orange-500/20 rounded-full blur-3xl"></div>

          <h3 class="text-2xl md:text-3xl font-bold text-white mb-4 relative z-10">Vuoi unirti ai nostri corsi?</h3>
          <p class="text-gray-300 mb-8 max-w-xl mx-auto relative z-10">
            Contattaci per scoprire gli orari, i livelli disponibili e prenotare la tua prima lezione di prova gratuita.
          </p>
          
          <UButton 
            size="xl"
            color="primary"
            variant="solid"
            class="font-bold px-8 shadow-lg hover:scale-105 transition-transform relative z-10"
            @click="showModal = true"
          >
            Richiedi Informazioni
          </UButton>
        </div>
      </div>

    </UContainer>

    <!-- MODALE CONTATTI (Teleport) -->
    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/80 z-[9999] flex items-center justify-center p-4 backdrop-blur-sm">
        
        <div class="absolute inset-0" @click="showModal = false"></div>

        <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-0 relative animate-fade-in flex flex-col overflow-hidden z-10">
          
          <div class="bg-gray-50 p-5 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Contattaci</h3>
              <p class="text-sm text-gray-500">Info corsi e allenamenti</p>
            </div>
            <button @click="showModal = false" class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-6 space-y-4">
            <p class="text-gray-600 text-sm mb-2">
              Scegli il metodo che preferisci per scriverci. Ti risponderemo il prima possibile con tutte le info sui gruppi disponibili.
            </p>

            <!-- WhatsApp -->
            <a 
              :href="whatsappLink" 
              target="_blank"
              class="flex items-center p-4 rounded-xl border-2 border-transparent bg-green-50 hover:border-green-200 hover:bg-green-100 transition-all group cursor-pointer"
            >
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600 mr-4 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="w-7 h-7" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Scrivici su WhatsApp</h4>
                <p class="text-sm text-gray-600">Risposta rapida</p>
              </div>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </a>

            <!-- Email -->
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
                  {{ emailCopied ? 'Email Copiata!' : 'Invia una Email' }}
                </h4>
                <p class="text-sm text-gray-600 truncate max-w-[180px]">
                  beachvolleytirreniacademy@gmail.com
                </p>
              </div>
              
              <UIcon 
                v-if="!emailCopied"
                name="i-heroicons-document-duplicate" 
                class="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary group-hover:scale-110 transition-all" 
              />
            </div>

          </div>
          
          <div class="bg-gray-50 p-3 text-center border-t border-gray-100">
            <p class="text-xs text-gray-400">BVTA - Pisa / Tirrenia</p>
          </div>
        </div>
      </div>
    </Teleport>

  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Riferimenti DOM
const sectionRef = ref(null)
const imageWrapperRef = ref(null)
const shapeRef = ref(null)
const titleRef = ref(null)
const contentRef = ref(null)
const coachesSectionRef = ref(null)

// Stato Modale
const showModal = ref(false)
const emailCopied = ref(false)
const whatsappNumber = "393403336499" // Numero BVTA
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent("Ciao! Vorrei informazioni sui corsi di Beach Volley.")}`

// Dati Allenatori (Placeholder)
const coaches = ref([
  {
    name: "Marco Rossi",
    role: "Head Coach",
    description: "Fondatore della BVTA, allenatore federale di 2° livello con esperienza decennale nei campionati nazionali.",
    image: "https://placehold.co/400x500?text=Coach+Marco",
    tags: ["Agonismo", "Tecnica"]
  },
  {
    name: "Giulia Bianchi",
    role: "Istruttrice",
    description: "Specializzata nei corsi base e intermedi, porta in campo energia e passione per far crescere i nuovi talenti.",
    image: "https://placehold.co/400x500?text=Coach+Giulia",
    tags: ["Base", "Under 18"]
  },
  {
    name: "Luca Verdi",
    role: "Preparatore",
    description: "Si occupa della parte atletica e dei gruppi avanzati, focalizzandosi sulla strategia di gioco e la resistenza.",
    image: "https://placehold.co/400x500?text=Coach+Luca",
    tags: ["Avanzato", "Fisica"]
  }
])

// Funzioni Modale
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com')
    emailCopied.value = true
    setTimeout(() => { emailCopied.value = false }, 3000)
  } catch (err) {
    alert('Email: beachvolleytirreniacademy@gmail.com')
  }
}

onMounted(() => {
  // 1. Animazione Intro (Immagine e Testo)
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  })

  tl.from(imageWrapperRef.value, { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out' })
    .from(shapeRef.value, { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out' }, '<') 
    .from(titleRef.value, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '<0.1')
    .from(contentRef.value.children, { 
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'all' 
    }, '<0.2')

  // 2. Animazione Allenatori (Scatta quando si scrolla verso la griglia)
  gsap.from('.coach-card', {
    scrollTrigger: {
      trigger: coachesSectionRef.value,
      start: 'top 80%',
      toggleActions: 'play none none none'
    },
    opacity: 0,
    y: 40,
    duration: 0.6,
    stagger: 0.15,
    ease: 'power2.out'
  })
})
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
