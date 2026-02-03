<template>
  <div>
    <UApp>
      <NuxtPage />
    </UApp>
  </div>
</template>
<script setup>
import Header from "@/components/layout/Header.vue";
import Footer from "@/components/layout/Footer.vue";
import { onMounted } from 'vue'
import { useScrollTo } from '~/composables/useScrollTo'

onMounted(() => {
  const { scrollToElement } = useScrollTo()
  
  // Check if there's a hash in the URL on page load
  if (window.location.hash) {
    // Small timeout to ensure the page is fully rendered
    setTimeout(() => {
      scrollToElement(window.location.hash)
    }, 100)
  }
})
</script>
