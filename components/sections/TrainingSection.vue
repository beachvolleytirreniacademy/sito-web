<template>
  <section ref="sectionRef" class="pt-24 pb-20 overflow-hidden bg-background-primary">
    <UContainer>
      
      <div class="grid md:grid-cols-2 gap-12 items-center px-4 md:px-0">
        
        <div class="relative order-2 md:order-1 mt-8 md:mt-0">
          
          <div ref="imageWrapperRef" class="relative z-10 rounded-2xl overflow-hidden shadow-xl group">
            <video
                autoplay
                loop
                muted
                playsinline
                class="w-full h-[400px] md:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" 
              >
                <source src="/coach/videoallenamentopiccolo.mov" type="video/mp4" />
                Il tuo browser non supporta il tag video.
              </video>
            
            <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none"></div>
            
            <div 
              ref="badgeRef"
              class="absolute bottom-6 left-6 right-6"
            >
              <div class="bg-primary/90 backdrop-blur-sm p-4 rounded-xl border border-white/20 shadow-lg">
                <h3 class="text-white font-bold flex items-center gap-2">
                  <UIcon name="i-heroicons-academic-cap" class="w-6 h-6" />
                  Partnership Tecnica
                </h3>
                <p class="text-white/90 text-sm mt-1">
                  In collaborazione con <strong>BVCA</strong> di Viareggio per il beach volley d'eccellenza.
                </p>
              </div>
            </div>
          </div>
          
          <div
            ref="shapeRef"
            class="absolute -left-4 md:-left-8 -bottom-4 md:-bottom-8 w-full h-full border-8 border-primary rounded-2xl -z-10"
          ></div>
        </div>

        <div class="space-y-6 order-1 md:order-2 text-white">
          <h2 
            ref="titleRef"
            class="text-3xl md:text-5xl font-bold text-primary mb-6"
          >
            Corsi e Allenamenti
          </h2>
          
                   <div ref="contentRef" class="space-y-6">
            <p class="text-gray-200 leading-relaxed text-lg md:text-xl">
              Sei in cerca di un gruppo con cui allenarti a beach volley d'inverno o d'estate? 
              Unisciti a noi!
            </p>
            
            <div class="pt-4">
              <UButton 
                to="/allenamenti"
                size="xl"
                color="primary"
                variant="solid"
                class="font-bold text-color-white bg-primary px-8 shadow-lg hover:scale-105 hover:bg-primary transition-transform"
                trailing-icon="i-heroicons-arrow-right"
              >
                Scopri di più
              </UButton>
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

gsap.registerPlugin(ScrollTrigger)

// Riferimenti DOM
const sectionRef = ref(null)
const imageWrapperRef = ref(null)
const shapeRef = ref(null)
const titleRef = ref(null)
const contentRef = ref(null)
const badgeRef = ref(null)

onMounted(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: sectionRef.value,
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  })

  // Animazione contenitore immagine e forma
  tl.from(imageWrapperRef.value, { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out' })
    .from(shapeRef.value, { opacity: 0, x: -30, duration: 0.6, ease: 'power3.out' }, '<') 
    // Animazione dell'etichetta (appare dal basso)
    .from(badgeRef.value, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.2')
    // Animazione testi
    .from(titleRef.value, { opacity: 0, y: 20, duration: 0.5, ease: 'power3.out' }, '<0.1')
    .from(contentRef.value.children, { 
      opacity: 0, y: 20, duration: 0.5, stagger: 0.1, ease: 'power3.out', clearProps: 'all' 
    }, '<0.2')
})
</script>       
        
        
    