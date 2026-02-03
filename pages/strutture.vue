<template>
  <Main>
    <div class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h1 class="text-4xl font-bold text-primary mb-4">{{ pageTitle }}</h1>
          <p class="text-xl text-gray-500">{{ pageDescription }}</p>
        </div>

        <div v-if="loading" class="flex flex-col gap-16 sm:gap-24">
          <div v-for="n in 2" :key="n" class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center animate-pulse">
            <div class="w-full lg:w-1/2 h-64 sm:h-[400px] bg-gray-200 rounded-2xl"></div>
            <div class="w-full lg:w-1/2 space-y-6">
              <div class="h-8 bg-gray-200 rounded w-1/2"></div>
              <div class="h-4 bg-gray-200 rounded w-1/3"></div>
              <div class="space-y-3">
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-3/4"></div>
              </div>
              <div class="h-32 bg-gray-200 rounded-xl"></div>
            </div>
          </div>
        </div>

        <div v-else class="flex flex-col gap-16 sm:gap-24">
          <div 
            v-for="(location, index) in locations" 
            :key="location.id"
            class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center" 
            :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }"
          >
            <div class="w-full lg:w-1/2">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl group h-64 sm:h-[400px]">
                <img 
                  :src="location.image_url || 'https://placehold.co/800x600?text=Location+BVTA'" 
                  :alt="location.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div class="w-full lg:w-1/2 space-y-6">
              <h2 class="text-3xl font-bold text-background-primary">{{ location.name }}</h2>
              
              <a 
                v-if="location.map_link"
                :href="location.map_link" 
                target="_blank" 
                class="inline-flex items-center text-primary hover:underline font-medium"
              >
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
                {{ location.address }}
              </a>

              <p class="text-gray-600 text-lg leading-relaxed">
                {{ location.description }}
              </p>

              <div v-if="location.features && location.features.length > 0" class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                  <UIcon name="i-heroicons-check-badge" class="w-5 h-5 mr-2 text-primary" />
                  Servizi Disponibili
                </h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li 
                    v-for="feature in location.features" 
                    :key="feature"
                    class="flex items-center text-gray-600 text-sm"
                  >
                    <div class="w-2 h-2 rounded-full bg-primary mr-3 flex-shrink-0"></div>
                    {{ feature }}
                  </li>
                </ul>
              </div>

            </div>
          </div>
        </div>

        <div v-if="!loading && locations.length === 0" class="text-center py-20 text-gray-500">
          Nessuna location disponibile al momento.
        </div>

      </UContainer>
    </div>
  </Main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Main from "@/components/layout/Main.vue";
import { supabase } from '~/supabase.js';

// Testi statici della pagina (prima erano nel JSON wrapper)
const pageTitle = "Le Nostre Strutture";
const pageDescription = "Collaboriamo con i migliori stabilimenti balneari di Tirrenia per offrirvi campi sempre perfetti e servizi al top.";

const locations = ref([]);
const loading = ref(true);

const fetchLocations = async () => {
  try {
    loading.value = true;
    
    let { data, error } = await supabase
      .from('locations')
      .select('*')
      .order('id', { ascending: true }); // Ordina per ID (o 'name' se preferisci alfabetico)

    if (error) throw error;
    
    locations.value = data || [];
  } catch (error) {
    console.error('Errore caricamento locations:', error.message);
  } finally {
    loading.value = false;
  }
};

onMounted(() => {
  fetchLocations();
});
</script>