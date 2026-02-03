<template>
  <Main>
    <div class="pt-32 pb-20 min-h-screen bg-gray-50">
      
      <UContainer v-if="loading">
        <div class="animate-pulse">
          <div class="h-8 w-32 bg-gray-200 rounded mb-8"></div>
          <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
            <div class="h-64 md:h-[500px] w-full bg-gray-300"></div>
            <div class="p-10 space-y-6">
              <div class="h-8 bg-gray-200 rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>
      </UContainer>

      <UContainer v-else-if="event">
        
        <NuxtLink 
          :to="'/'" 
          class="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium"
        >
          <UIcon name="i-heroicons-arrow-left" class="mr-2" />
          Torna alla Home
        </NuxtLink>

        <div class="bg-white rounded-2xl shadow-xl overflow-hidden max-w-5xl mx-auto">
          
          <div class="relative h-64 md:h-[500px] w-full group">
            <img 
              :src="event.image_url || 'https://placehold.co/1200x800?text=BVTA'" 
              :alt="event.title" 
              class="w-full h-full object-cover transition-transform duration-700"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            
            <div class="absolute bottom-0 left-0 p-6 md:p-10 text-white w-full">
              <div v-if="isPastEvent" class="inline-block px-3 py-1 bg-primary text-white text-xs font-bold rounded-full mb-3 uppercase tracking-wider">
                Evento Concluso
              </div>
              
              <h1 class="text-3xl md:text-5xl font-bold mb-2 leading-tight shadow-sm">
                {{ event.title }}
              </h1>
            </div>
          </div>

          <div class="p-6 md:p-10">
            <div class="grid md:grid-cols-3 gap-10">
              
              <div class="md:col-span-2 space-y-8">
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-4 border-b pb-2">Dettagli Evento</h3>
                  <div class="text-gray-600 leading-relaxed text-lg whitespace-pre-line">
                    {{ event.description }}
                  </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  
                  <div class="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div class="bg-white p-2 rounded-lg shadow-sm mr-4 text-primary">
                      <UIcon name="i-heroicons-calendar" class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 font-medium">Quando</span>
                      <span class="block text-gray-900 font-bold capitalize">
                        {{ formatEventDates(event.start_date, event.end_date) }}
                      </span>
                    </div>
                  </div>

                  <div class="flex items-start p-4 bg-gray-50 rounded-xl">
                    <div class="bg-white p-2 rounded-lg shadow-sm mr-4 text-primary">
                      <UIcon name="i-heroicons-map-pin" class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 font-medium">Dove</span>
                      <a 
                        v-if="event.locations && event.locations.map_link"
                        :href="event.locations.map_link"
                        target="_blank"
                        class="block text-gray-900 font-bold hover:text-primary hover:underline"
                      >
                        {{ event.locations.name }}
                      </a>
                      <span v-else class="block text-gray-900 font-bold">
                        {{ event.locations ? event.locations.name : 'Location da definire' }}
                      </span>
                    </div>
                  </div>

                  <div class="flex items-start p-4 bg-gray-50 rounded-xl sm:col-span-2 md:col-span-1 lg:col-span-2">
                    <div class="bg-white p-2 rounded-lg shadow-sm mr-4 text-primary">
                      <UIcon name="i-heroicons-tag" class="w-6 h-6" />
                    </div>
                    <div>
                      <span class="block text-sm text-gray-500 font-medium">Categoria</span>
                      <span class="block text-gray-900 font-bold ">{{ event.category || 'Open' }}</span>
                    </div>
                  </div>

                </div>

              </div>

              <div class="md:col-span-1">
                <div class="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm sticky top-24">
                  
                  <div v-if="isPastEvent">
                    <h3 class="text-lg font-bold text-gray-900 mb-2">Evento Concluso</h3>
                    <p class="text-sm text-gray-500 mb-6">
                      Questo evento è terminato. 
                      <span v-if="event.external_gallery_link">Guarda le foto ufficiali!</span>
                    </p>
                    
                    <UButton
                      v-if="event.external_gallery_link"
                      :to="event.external_gallery_link"
                      target="_blank"
                      size="xl"
                      block
                      color="gray"
                      variant="solid"
                      class="text-white bg-primary font-bold hover:bg-primary-dark transition-colors duration-300"
                      icon="i-heroicons-photo"
                    >
                      VAI ALLA GALLERY
                    </UButton>
                    <div v-else class="text-center p-4 bg-gray-50 rounded-lg text-gray-400 text-sm italic">
                      Gallery non disponibile
                    </div>
                  </div>

                  <div v-else>
                    <h3 class="text-lg font-bold text-gray-900 mb-2">
                      {{ event.type === 'camp' ? 'Partecipa al camp' : 'Partecipa al torneo' }}
                    </h3>
                    <p class="text-sm text-gray-500 mb-6">
                      {{ event.type === 'camp' 
                          ? 'Per iscriversi compilare il modulo o contattaci.' 
                          : "Iscriviti subito tramite l'App Dink o cliccando qui sotto." 
                      }}
                    </p>
                    
                    <UButton
                      v-if="event.signup_link"
                      :to="event.signup_link"
                      target="_blank"
                      size="xl"
                      block
                      :ui="{ rounded: 'rounded-xl' }"
                      class="w-full font-bold text-white bg-purple-600 hover:bg-purple-700 shadow-lg border-none ring-0"
                      icon="i-heroicons-pencil-square"
                    >
                      ISCRIVITI ORA
                    </UButton>

                    <div v-else class="text-center p-4 bg-gray-100 rounded-lg text-gray-500 font-medium">
                      Iscrizioni a breve
                    </div>

                    <div class="mt-4 text-center">
                      <p class="text-xs text-gray-400">Hai dubbi? <a href="/#contact" class="text-primary hover:underline">Contattaci</a></p>
                    </div>
                  </div>

                </div>
              </div>

            </div>
          </div>
        </div>
      </UContainer>

      <div v-else class="pt-32 text-center min-h-screen bg-gray-50 flex flex-col items-center justify-center">
        <h1 class="text-4xl font-bold text-gray-300 mb-4">404</h1>
        <h2 class="text-2xl font-bold text-gray-800 mb-2">Evento non trovato</h2>
        <p class="text-gray-500 mb-6">Controlla l'indirizzo o torna alla lista eventi.</p>
        <UButton to="/" color="primary" variant="solid">Torna alla Home</UButton>
      </div>

    </div>
  </Main>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRoute } from 'vue-router';
import Main from "@/components/layout/Main.vue";
import { supabase } from '~/supabase.js';

const route = useRoute();
const currentSlug = route.params.slug; 

const event = ref(null);
const loading = ref(true);

const isPastEvent = computed(() => {
  if (!event.value || !event.value.end_date) return false;
  const today = new Date().toISOString().split('T')[0];
  return event.value.end_date < today;
});

const getEvent = async () => {
  try {
    loading.value = true;

    // Assicurati che 'category' sia presente nella select
    let { data, error } = await supabase
      .from('events')
      .select(`
        *,
        locations (
          name,
          address,
          map_link
        )
      `)
      .eq('slug', currentSlug)
      .single();

    if (error) throw error;
    event.value = data;

  } catch (error) {
    console.error('Errore recupero evento:', error.message);
    event.value = null;
  } finally {
    loading.value = false;
  }
};

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

onMounted(() => {
  getEvent();
});
</script>