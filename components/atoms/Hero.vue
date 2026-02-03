<template>
  <div class="relative min-h-[80vh] flex items-center">
    <div class="absolute inset-0 z-0">
      <img
        :src="imageUrl"
        :alt="imageAlt"
        class="w-full h-full object-cover"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/70 to-black/40"></div>
    </div>

    <UContainer class="relative z-10 py-20">
      <slot />
    </UContainer>

    <div class="absolute bottom-0 left-0 right-0 w-screen">
      <svg class="w-full h-16 text-gray-100" preserveAspectRatio="none" viewBox="0 0 1440 120" fill="currentColor">
        <path d="M0,96L48,85.3C96,75,192,53,288,53.3C384,53,480,75,576,85.3C672,96,768,96,864,85.3C960,75,1056,53,1152,42.7C1248,32,1344,32,1392,32L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
      </svg>
    </div>
  </div>
</template>

<script setup>
defineProps({
  imageUrl: {
    type: String,
    required: true
  },
  imageAlt: {
    type: String,
    default: ''
  }
})
</script> 