<template>
  <section id="past-events" class="py-16 bg-gray-50">
    <UContainer>
      <h2 ref="titleRef" class="text-3xl font-bold text-center text-primary mb-12">
        {{ content.title }}
      </h2>
      
      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-lg border border-gray-100 h-[28rem] animate-pulse">
          <div class="w-full h-64 bg-gray-200"></div>
          <div class="p-6 space-y-4">
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-6 bg-gray-200 rounded w-3/4"></div>
            <div class="h-16 bg-gray-200 rounded w-full"></div>
          </div>
        </div>
      </div>

      <div v-else-if="content.events && content.events.length > 0" ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="event in content.events" :key="event.id" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-primary transition-colors duration-300 group">
          <img 
            :src="event.image_url || 'https://placehold.co/600x400?text=BVTA'" 
            :alt="event.title"
            class="w-full h-64 sm:h-72 object-cover object-top transition-transform duration-700 group-hover:scale-105"
          >
          <div class="p-6">
            <div class="flex items-center gap-2 text-primary mb-3">
              <UIcon name="i-heroicons-calendar" />
              <span class="text-sm font-semibold capitalize">
                {{ formatEventDates(event.start_date, event.end_date) }}
              </span>
            </div>

            <h3 class="text-xl font-semibold mb-2 text-background-primary">{{ event.title }}</h3>
            <p class="text-gray-600 mb-4 line-clamp-3 h-[4.5rem] overflow-hidden">{{ event.description }}</p>
            
            <UButton
              color="primary"
              variant="soft"
              class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300"
              :to="'/events/' + (event.slug || event.id)"
            >
              {{ content.button.text }}
            </UButton>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-12 text-gray-500">
        <p>Non ci sono ancora eventi nell'archivio.</p>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { onMounted, ref, nextTick } from 'vue'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import { supabase } from '~/supabase.js'

gsap.registerPlugin(ScrollTrigger)

const titleRef = ref(null)
const cardsRef = ref(null)
const loading = ref(true)

const content = ref({
  title: "Eventi Passati",
  button: { text: "Rivivi l'evento" },
  events: []
})

// STESSA FUNZIONE DI FORMATTAZIONE (Potresti spostarla in un file utils.js in futuro)
const formatEventDates = (startStr, endStr) => {
  if (!startStr) return '';
  const start = new Date(startStr);
  const end = endStr ? new Date(endStr) : new Date(startStr);
  const optionsMonth = { month: 'long' };
  const cap = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  const getMonth = (d) => cap(d.toLocaleDateString('it-IT', optionsMonth));
  const getDay = (d) => d.getDate();
  const getYear = (d) => d.getFullYear();

  if (start.getTime() === end.getTime()) {
    return `${getDay(start)} ${getMonth(start)} ${getYear(start)}`;
  }
  if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
    return `${getDay(start)}-${getDay(end)} ${getMonth(start)} ${getYear(start)}`;
  }
  return `${getDay(start)} ${getMonth(start)} - ${getDay(end)} ${getMonth(end)} ${getYear(end)}`;
};

const getPastEvents = async () => {
  try {
    loading.value = true
    const today = new Date().toISOString().split('T')[0]

    // Prendiamo eventi finiti PRIMA di oggi
    let { data, error } = await supabase
      .from('events')
      .select('*')
      .lt('end_date', today) 
      .order('start_date', { ascending: false }) // Dal più recente indietro
      .limit(6)

    if (error) throw error
    if (data) {
      content.value.events = data
      await nextTick()
      animateCards()
    }
  } catch (error) {
    console.error("Errore eventi passati:", error)
  } finally {
    loading.value = false
  }
}

const animateCards = () => {
  if (cardsRef.value && cardsRef.value.children.length > 0) {
    gsap.set(cardsRef.value.children, { clearProps: "all" })
    gsap.from(cardsRef.value.children, {
      opacity: 0, y: 50, duration: 0.8, stagger: 0.2, ease: 'power3.out',
      scrollTrigger: { trigger: cardsRef.value, start: 'top bottom-=50', toggleActions: 'play none none reverse' }
    })
  }
}

onMounted(() => {
  if (titleRef.value) {
    gsap.from(titleRef.value, {
      opacity: 0, y: 50, duration: 1, ease: 'power3.out',
      scrollTrigger: { trigger: titleRef.value, start: 'top bottom-=100', toggleActions: 'play none none reverse' }
    })
  }
  getPastEvents()
})
</script>