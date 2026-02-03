<template>
  <section ref="sectionRef" class="pt-24 pb-12 overflow-hidden bg-background-primary">
    <UContainer>
      <div class="grid md:grid-cols-2 gap-12 items-start px-4 md:px-0">
        
        <div class="relative order-2 md:order-1 mt-8 md:mt-0">
          <div ref="imageWrapperRef" class="relative z-10">
            <img
              :src="content.image"
              alt="Beach Volley Action"
              class="rounded-lg shadow-xl w-full object-cover h-[600px]" 
            />
          </div>
          <div
            ref="shapeRef"
            class="absolute -left-4 md:-left-8 -bottom-4 md:-bottom-8 w-full h-full border-8 border-primary rounded-lg -z-10"
          ></div>
        </div>

        <div class="space-y-6 order-1 md:order-2 text-white">
          <h2 
            ref="titleRef"
            class="text-3xl md:text-4xl font-bold text-primary mb-6"
          >
            {{ content.title }}
          </h2>
          
          <div ref="contentRef" class="space-y-8">
            
            <div class="space-y-3">
              <h3 class="text-xl font-bold text-white border-l-4 border-primary pl-3">
                Dalla passione alla professione
              </h3>
              <p class="text-gray-300 leading-relaxed">
                La Beach Volley Tirrenia Academy (BVTA) nasce nel 2024, frutto dell'esperienza e della visione condivisa di un gruppo di amici uniti da una profonda passione per la sabbia. Quella che è iniziata come una piccola associazione sportiva si è evoluta rapidamente in un punto di riferimento per il beach volley sul litorale pisano, trasformando l'entusiasmo in una struttura organizzativa solida e professionale.
              </p>
            </div>
            <div></div>
            <div class="space-y-3">
              <h3 class="text-xl font-bold text-white border-l-4 border-primary pl-3">
                La Nostra Missione
              </h3>
              <p class="text-gray-300 leading-relaxed">
                Il nostro obiettivo è duplice: promuovere la cultura del beach volley nel nostro territorio e posizionarci come leader nell'organizzazione di eventi sportivi di rilievo. Non ci limitiamo a diffondere uno sport; lavoriamo quotidianamente per creare una comunità coesa, convinti che l'attività agonistica sia un potente strumento di crescita personale, inclusione sociale e lealtà.
              </p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-colors duration-300 group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 bg-orange-500/20 rounded-lg text-orange-400 group-hover:text-orange-300 transition-colors">
                    <UIcon name="i-heroicons-sun" class="w-6 h-6" />
                  </div>
                  <h3 class="font-bold text-lg text-white">Stagione Estiva</h3>
                </div>
                <p class="text-sm text-gray-400 leading-relaxed">
                  Grandi tornei come la <span class="text-primary font-semibold">Gughina Summer Cup</span>. 
                  Nel 2025 record di <span class="text-white font-bold">140 giocatori</span> partecipanti.
                </p>
              </div>

              <div class="bg-white/5 border border-white/10 rounded-xl p-5 hover:border-primary/50 transition-colors duration-300 group">
                <div class="flex items-center gap-3 mb-3">
                  <div class="p-2 bg-blue-500/20 rounded-lg text-blue-400 group-hover:text-blue-300 transition-colors">
                    <UIcon name="i-heroicons-trophy" class="w-6 h-6" />
                  </div>
                  <h3 class="font-bold text-lg text-white">Stagione Invernale</h3>
                </div>
                <p class="text-sm text-gray-400 leading-relaxed">
                  Eccellenza nel circuito AIBVC. Finali a Cesenatico 2025 raggiunte con un 
                  <span class="text-white font-bold">5° e 9° posto</span> nazionale.
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import aboutContent from '~/content/about.json'
import aboutImage from '~/assets/images/about.jpg' 

gsap.registerPlugin(ScrollTrigger)

// Riferimenti agli elementi DOM
const sectionRef = ref(null) // NUOVO: Riferimento all'intera sezione
const imageWrapperRef = ref(null)
const shapeRef = ref(null)
const titleRef = ref(null)
const contentRef = ref(null)

const content = ref({
  ...aboutContent,
  image: aboutImage
})

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value, // MODIFICA FONDAMENTALE: Trigger sulla sezione intera, non sulla foto
      start: 'top 75%',          // Parte quando la sezione entra bene nello schermo
      toggleActions: 'play none none none' // MODIFICA: 'none' finale impedisce il reverse (non scompare scrollando su)
    }
  })

  // Le animazioni partono tutte insieme ma con leggero ordine logico
  
  // 1. Immagine (Appare)
  tl.from(imageWrapperRef.value, {
    opacity: 0,
    x: -30,
    duration: 0.6,
    ease: 'power3.out'
  })
  
  // 2. Forma (Insieme alla foto)
  .from(shapeRef.value, {
    opacity: 0,
    x: -30,
    duration: 0.6,
    ease: 'power3.out'
  }, '<') 

  // 3. Titolo (Insieme alla foto)
  .from(titleRef.value, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    ease: 'power3.out'
  }, '<0.1')

  // 4. Testi (Insieme alla foto, cascata veloce)
  .from(contentRef.value.children, {
    opacity: 0,
    y: 20,
    duration: 0.5,
    stagger: 0.05, 
    ease: 'power3.out',
    clearProps: 'all'
  }, '<0.2')
})
</script>