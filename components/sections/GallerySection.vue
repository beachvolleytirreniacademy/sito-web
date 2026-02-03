<template>
  <section class="py-4">
    <UContainer>  
      <div class="grid gap-1 overflow-hidden">
        <!-- Top row - Two small images on mobile/tablet -->
        <div class="grid grid-cols-2 gap-1 lg:hidden">
          <GalleryImage
            variant="medium"
            :src="image1"
            :alt="content.images[0].alt"
            @preview="togglePreview(0)"
          />
          <GalleryImage
            variant="medium"
            :src="image2"
            :alt="content.images[1].alt"
            @preview="togglePreview(1)"
          />
        </div>

        <!-- Desktop layout -->
        <div class="hidden lg:grid lg:grid-cols-4 gap-1">
          <!-- Left column -->
          <div class="grid gap-1 overflow-hidden">
            <GalleryImage
              variant="medium"
              :src="image1"
              :alt="content.images[0].alt"
              @preview="togglePreview(0)"
            />
            <GalleryImage
              variant="medium"
              :src="image2"
              :alt="content.images[1].alt"
              @preview="togglePreview(1)"
            />
          </div>

          <!-- Center image -->
          <div class="col-span-2">
            <GalleryImage
              variant="double"
              :src="image3"
              :alt="content.images[2].alt"
              @preview="togglePreview(2)"
            />
          </div>

          <!-- Right column -->
          <div class="grid gap-1">
            <GalleryImage
              variant="medium"
              :src="image4"
              :alt="content.images[3].alt"
              @preview="togglePreview(3)"
            />
            <GalleryImage
              variant="medium"
              :src="image5"
              :alt="content.images[4].alt"
              @preview="togglePreview(4)"
            />
          </div>
        </div>

        <!-- Center image - mobile/tablet -->
        <div class="lg:hidden">
          <GalleryImage
            variant="wide"
            :src="image3"
            :alt="content.images[2].alt"
            @preview="togglePreview(2)"
          />
        </div>

        <!-- Bottom row - Two small images on mobile/tablet -->
        <div class="grid grid-cols-2 lg:hidden gap-1">
          <GalleryImage
            variant="medium"
            :src="image4"
            :alt="content.images[3].alt"
            @preview="togglePreview(3)"
          />
          <GalleryImage
            variant="medium"
            :src="image5"
            :alt="content.images[4].alt"
            @preview="togglePreview(4)"
          />
        </div>
      </div>

      <!-- "Vedi altro" link -->
      <div class="mt-0">
        <NuxtLink 
          to="https://linktr.ee/bvta?utm_source=linktree_profile_share&ltsid=16a184cf-0778-4eb2-aacc-5cfbb93008dd" 
          class="block bg-gray-100 hover:bg-gray-200 transition-colors p-8 text-center"
          target="_blank"
        >
          <span class="block text-xl font-semibold text-gray-800 mb-2">
            Vedi altro
          </span>
          <span class="text-primary hover:underline">
            Visita la galleria completa →
          </span>
        </NuxtLink>
      </div>
    </UContainer>
  </section>

  <!-- Image Modal -->
  <Teleport to="body">
    <div v-show="showModal" class="fixed inset-0 z-50 flex items-center justify-center p-4">
      <!-- Backdrop -->
      <div ref="backdrop" class="absolute inset-0 bg-black/80 opacity-0" @click="closeModal"></div>
      <!-- Modal content -->
      <div ref="modalContent" class="relative z-10 max-w-4xl w-fit opacity-0 scale-95 mx-auto">
        <button 
          @click="closeModal" 
          class="absolute -top-4 -right-4 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg"
        >
          <span class="text-xl text-primary">&times;</span>
        </button>
        <img 
          :src="getActiveImage()"
          :alt="content.images[activeIndex]?.alt"
          class="w-auto h-auto rounded-lg max-h-[75vh] object-contain"
        />
      </div>
    </div>
  </Teleport>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import galleryContent from '~/content/gallery.json'
import image1 from '~/assets/images/gallery/gallery_1.jpg'
import image2 from '~/assets/images/gallery/gallery_2.jpg'
import image3 from '~/assets/images/gallery/gallery_3.jpg'
import image4 from '~/assets/images/gallery/gallery_4.jpg'
import image5 from '~/assets/images/gallery/gallery_5.jpg'
import GalleryImage from '~/components/atoms/GalleryImage.vue'

const content = ref(galleryContent)
const activeIndex = ref(null)
const showModal = ref(false)

const backdrop = ref(null)
const modalContent = ref(null)

const togglePreview = (index) => {
  activeIndex.value = index
  showModal.value = true
  
  // Animate modal opening
  gsap.to(backdrop.value, {
    opacity: 1,
    duration: 0.3,
    ease: 'power2.out'
  })
  
  gsap.to(modalContent.value, {
    opacity: 1,
    scale: 1,
    duration: 0.4,
    ease: 'back.out(1.7)',
    delay: 0.1
  })
}

const closeModal = () => {
  // Animate modal closing
  gsap.to(backdrop.value, {
    opacity: 0,
    duration: 0.3,
    ease: 'power2.in'
  })
  
  gsap.to(modalContent.value, {
    opacity: 0,
    scale: 0.95,
    duration: 0.3,
    ease: 'back.in(1.7)',
    onComplete: () => {
      showModal.value = false
      activeIndex.value = null
    }
  })
}

const getActiveImage = () => {
  switch (activeIndex.value) {
    case 0: return image1
    case 1: return image2
    case 2: return image3
    case 3: return image4
    case 4: return image5
    default: return image1
  }
}

// Replace the existing onMounted with this:
onMounted(() => {
  const handleEscape = (e) => {
    if (e.key === 'Escape' && showModal.value) {
      closeModal()
    }
  }
  
  document.addEventListener('keydown', handleEscape)
  
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape)
  })
})
</script>