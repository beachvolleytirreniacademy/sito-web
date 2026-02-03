<template>
  <header 
    ref="header" 
    class="border-b border-primary fixed w-full z-50 bg-background-primary shadow-lg"
  >
    <UContainer>
      <div class="flex justify-between items-center h-16 px-4 text-white">
        <div class="flex items-center">
          <NuxtLink to="/#hero" class="text-xl font-bold">
            <img src="~/assets/images/logo/logo.png" alt="Logo" class="max-h-42">
          </NuxtLink>
        </div>

        <nav class="hidden md:flex space-x-4"> 
          <UButton
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.path"
            variant="ghost"
            color="gray"
            @click="(e) => handleNavClick(item.path, e)"
          >
            {{ item.label }}
          </UButton>
        </nav>

        <UButton
          class="md:hidden relative w-10 h-10"
          color="gray"
          variant="ghost"
          @click="isMenuOpen = !isMenuOpen"
        >
          <div class="absolute inset-0 flex items-center justify-center">
            <div class="w-6 h-5 relative">
              <span 
                class="absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out"
                :class="[isMenuOpen ? 'rotate-45 top-2' : 'rotate-0 top-0']"
              ></span>
              <span 
                class="absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out top-2"
                :class="{ 'opacity-0': isMenuOpen }"
              ></span>
              <span 
                class="absolute w-full h-0.5 bg-current transform transition-all duration-300 ease-in-out"
                :class="[isMenuOpen ? '-rotate-45 top-2' : 'rotate-0 top-4']"
              ></span>
            </div>
          </div>
        </UButton>
      </div>

      <Transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="transform -translate-y-2 opacity-0"
        enter-to-class="transform translate-y-0 opacity-100"
        leave-active-class="transition duration-200 ease-in"
        leave-from-class="transform translate-y-0 opacity-100"
        leave-to-class="transform -translate-y-2 opacity-0"
      >
        <div 
          v-if="isMenuOpen" 
          class="md:hidden py-6 px-4 space-y-4 border-t text-white"
        >
          <UButton
            v-for="(item, index) in menuItems"
            :key="index"
            :to="item.path"
            variant="ghost"
            color="gray"
            class="w-full justify-start text-lg py-3"
            @click="(e) => handleNavClick(item.path, e)"
          >
            {{ item.label }}
          </UButton>
        </div>
      </Transition>
    </UContainer>
  </header>
</template>

<script setup>
import { useWindowScroll } from '@vueuse/core'
import { useScrollTo } from '~/composables/useScrollTo'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const header = ref(null)
const isMenuOpen = ref(false)
const lastScrollPosition = ref(0)
const { y: scrollY } = useWindowScroll()
const { scrollToElement } = useScrollTo()

// NOTA: Qui ho messo gli slash "/" davanti ai link con cancelletto #
const menuItems = [
  { label: 'Home', path: '/#hero' },
  { label: 'Eventi', path: '/events' },
  { label: 'News', path: '/news' },
  { label: 'Stagione Invernale', path: '/stagioneinvernale' },
  { label: 'Strutture', path: '/strutture' },
  { label: 'Shop', path: '/shop' },
  { label: 'Contatti', path: '/#contact' }
]

const handleNavClick = async (path, event) => {
  isMenuOpen.value = false

  // Se è un'ancora (es. /#partners o #partners)
  if (path.includes('#')) {
    event.preventDefault()
    
    // Prendi solo la parte dopo il # (es. "partners")
    const sectionId = path.substring(path.indexOf('#') + 1)
    const targetHash = '#' + sectionId

    if (route.path === '/') {
      // Se siamo già in home, scorri subito
      scrollToElement(targetHash)
    } else {
      // Se siamo in un'altra pagina (es. Tornei), vai in Home e poi scorri
      await router.push('/')
      // Diamo un attimo di tempo alla home di caricarsi
      setTimeout(() => {
        scrollToElement(targetHash)
      }, 100)
    }
  }
  // Se è un link normale (es. /tornei), Nuxt farà il cambio pagina in automatico
}

watch(scrollY, (newY) => {
  if (isMenuOpen.value) return
  lastScrollPosition.value = newY
})
</script>
