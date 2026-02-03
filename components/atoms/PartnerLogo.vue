<template>
  <div 
    ref="logoRef"
    class="w-64 max-h-48 p-4 flex items-center justify-center opacity-0 shrink-0"
  >
    <img 
      :src="imageUrl" 
      :alt="name"
      class="transition-all duration-300 w-auto h-auto max-w-full max-h-full object-contain"
    >
  </div>
</template>

<script setup>
import { onMounted } from 'vue'
import gsap from 'gsap'

const props = defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  }
})

const logoRef = ref(null)

onMounted(() => {
  gsap.to(logoRef.value, {
    opacity: 1,
    y: 0,
    duration: 0.6,
    ease: 'power2.out'
  })
})
</script>