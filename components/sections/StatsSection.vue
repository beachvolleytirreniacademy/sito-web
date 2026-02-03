<template>
  <section class="py-24 bg-background-primary text-white">
    <UContainer>
      <div class="text-center mb-12">
        <h2 
          ref="titleRef"
          class="text-3xl md:text-4xl font-bold mb-4 text-primary"
        >
          {{ content.title }}
        </h2>
        <p 
          ref="subtitleRef"
          class="text-lg"
        >
          {{ content.subtitle }}
        </p>
      </div>

      <div 
        ref="statsRef"
        class="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12"
      >
        <div 
          v-for="stat in content.stats" 
          :key="stat.id"
          class="text-center space-y-2"
        >
          <div class="text-4xl md:text-5xl font-bold">
            {{ stat.value }}{{ stat.suffix }}
          </div>
          <div class="text-sm md:text-base">
            {{ stat.label }}
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { gsap } from 'gsap'
import statsContent from '~/content/stats.json'

const titleRef = ref(null)
const subtitleRef = ref(null)
const statsRef = ref(null)
const content = ref(statsContent)

onMounted(() => {
  if (process.client) {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.value,
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
      }
    })

    tl.from(titleRef.value, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: 'power3.out'
    })
    .from(subtitleRef.value, {
      opacity: 0,
      y: 20,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.6')
    .from(statsRef.value.children, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out'
    }, '-=0.6')
  }
})
</script> 