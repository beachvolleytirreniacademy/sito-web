<template>
  <Hero
    :imageUrl="content.backgroundImage"
    imageAlt="Beach Volley Action"
  >
    <div class="max-w-2xl text-white">
      <h1 
        ref="titleRef"
        class="text-5xl md:text-6xl font-bold mb-6 leading-tight"
      >
        {{ content.title }}
      </h1>
      <p 
        ref="subtitleRef"
        class="text-xl md:text-2xl mb-8 text-gray-200"
      >
        {{ content.subtitle }}
      </p>
      <div ref="buttonsRef" class="flex gap-4">
        <UButton
          v-for="button in content.buttons"
          :key="button.text"
          size="xl"
          :color="button.variant === 'primary' ? 'primary' : 'white'"
          :variant="button.variant === 'primary' ? 'solid' : 'ghost'"
          :class="button.variant === 'primary' ? 'text-white bg-primary hover:bg-primary-dark' : 'border border-white hover:bg-white hover:text-primary'"
          @click="scrollToElement(button.link)"
        >
          {{ button.text }}
        </UButton>
      </div>
    </div>
  </Hero>
</template>

<script setup>
import Hero from '../atoms/Hero.vue'
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { useScrollTo } from '~/composables/useScrollTo'
import heroImage from '~/assets/images/hero.jpg'
import heroContent from '~/content/hero.json'

gsap.registerPlugin(ScrollTrigger)

const { scrollToElement } = useScrollTo()

const titleRef = ref(null)
const subtitleRef = ref(null)
const buttonsRef = ref(null)
const content = ref({
  ...heroContent,
  backgroundImage: heroImage
})

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      ease: 'power3.out',
      duration: 1
    }
  })

  tl.from(titleRef.value, {
    opacity: 0,
    y: 50,
  })
  .from(subtitleRef.value, {
    opacity: 0,
    y: 30,
  }, '-=0.6')
  .from(buttonsRef.value, {
    opacity: 0,
    y: 20,
  }, '-=0.6')
})
</script>