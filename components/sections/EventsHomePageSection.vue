<template>
  <section id="upcoming-events" class="py-8 bg-gray-50">
    <UContainer>
      <h2 ref="titleRef" class="text-2xl sm:text-3xl font-bold text-center text-primary mb-6">
        {{ content.title }}
      </h2>

      <div v-if="loading" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="n in 3" :key="n" class="bg-white rounded-lg shadow-lg border border-gray-100 animate-pulse flex flex-col">
          <div class="w-full h-40 sm:h-44 bg-gray-200"></div>
          <div class="p-4 flex flex-col flex-grow space-y-3">
            <div class="h-4 bg-gray-200 rounded w-1/3"></div>
            <div class="h-5 bg-gray-200 rounded w-3/4"></div>
            <div class="h-10 bg-gray-200 rounded w-full mt-auto"></div>
          </div>
        </div>
      </div>

      <div v-else-if="content.events && content.events.length > 0" ref="cardsRef" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div v-for="event in content.events" :key="event.id" class="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100 hover:border-primary transition-colors duration-300 group flex flex-col">
          <img 
            :src="event.image_url || 'https://placehold.co/600x400?text=BVTA'" 
            :alt="event.title"
            class="w-full h-40 sm:h-44 object-cover object-top transition-transform duration-700 group-hover:scale-105"
          />
          <div class="p-4 flex flex-col flex-grow">
            <div class="flex items-center gap-1.5 text-primary mb-1.5">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4" />
              <span class="text-xs font-semibold capitalize">
                {{ formatEventDates(event.start_date, event.end_date) }}
              </span>
            </div>
            
            <h3 class="text-lg font-semibold mb-1 text-background-primary line-clamp-1">
              {{ event.title }}
            </h3>
            
            <p class="text-gray-600 text-sm mb-3 line-clamp-2 h-[2.5rem] overflow-hidden">
              {{ event.description }}
            </p>
            
            <div class="mt-auto">
              <UButton
                color="primary"
                variant="soft"
                size="sm"
                class="w-full bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300 flex justify-center"
                :to="'/events/' + (event.slug)"
              >
                {{ content.button.text }}
              </UButton>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="flex flex-col items-center justify-center py-8 text-center animate-fade-in">
        <div class="bg-gray-100 p-5 rounded-full mb-4">
          <UIcon name="i-heroicons-calendar-days" class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-1">Nessun evento in programma</h3>
        <p class="text-gray-500 text-sm max-w-md mx-auto">
          Al momento non ci sono eventi futuri pianificati.
        </p>
      </div>
    </UContainer>
  </section>
</template>
<script setup>
import { onMounted, ref, nextTick } from "vue";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { EventsClient } from '~/api/event_client';


gsap.registerPlugin(ScrollTrigger);

const titleRef = ref(null);
const cardsRef = ref(null);
const loading = ref(true);

const content = ref({
  title: "Prossimi Eventi",
  button: { text: "Dettagli" },
  events: []
});

// LOGICA FORMATTAZIONE DATE
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

const getEvents = async () => {
  try {
    loading.value = true;
    const today = new Date().toISOString().split('T')[0];

    const data = await EventsClient.getFutureEvents();

    if (data) {
      content.value.events = data;
      await nextTick();
      animateCards();
    }
  } catch (error) {
    console.error("Errore eventi:", error.message);
  } finally {
    loading.value = false;
  }
};

const animateCards = () => {
  if (cardsRef.value && cardsRef.value.children.length > 0) {
    gsap.set(cardsRef.value.children, { clearProps: "all" });
    gsap.from(cardsRef.value.children, {
      opacity: 0, 
      y: 30, // Ridotto da 50 a 30 per essere più scattante
      duration: 0.5, // Ridotto da 0.8 a 0.5 (più veloce)
      stagger: 0.1, // Ridotto lo stacco tra una card e l'altra
      ease: "power2.out", // Ease leggermente più secco
      scrollTrigger: { 
        trigger: cardsRef.value, 
        start: "top 90%", // Parte quasi subito appena entra nello schermo
        toggleActions: "play none none reverse" 
      }
    });
  }
};

onMounted(() => {
  if (titleRef.value) {
    gsap.from(titleRef.value, {
      opacity: 0, 
      y: 30, // Ridotto da 50 a 30
      duration: 0.6, // Ridotto da 1 a 0.6 (Molto più veloce)
      ease: "power2.out",
      scrollTrigger: { 
        trigger: titleRef.value, 
        // "top 90%" significa: inizia quando la cima del titolo 
        // arriva al 90% dell'altezza dello schermo (quindi molto presto, in basso)
        start: "top 90%", 
        toggleActions: "play none none reverse" 
      }
    });
  }
  getEvents();
});
</script>