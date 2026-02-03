<template>
  <section id="news" class="py-20 bg-white">
    <UContainer>
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div class="max-w-2xl">
          <h2 class="text-3xl font-bold text-primary mb-4">Ultime Novità</h2>
          <p class="text-gray-600">
            Rimani aggiornato su tornei, eventi e risultati della Beach Volley Tirrenia Academy.
          </p>
        </div>
        <UButton 
          to="/news" 
          variant="ghost" 
          class="hidden md:flex items-center text-primary hover:text-primary-dark"
        >
          Vedi tutte le news <UIcon name="i-heroicons-arrow-right" class="ml-2"/>
        </UButton>
      </div>

      <div v-if="loading" class="text-center py-12">Caricamento news...</div>
      
      <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <NuxtLink 
          v-for="article in news" 
          :key="article.id"
          :to="`/news/${article.id}`"
          class="group flex flex-col bg-white rounded-xl border border-gray-200 shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
        >
          <div v-if="article.image" class="h-48 overflow-hidden bg-gray-100 relative shrink-0">
            <img 
              :src="article.image" 
              :alt="article.title" 
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div class="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1.5">
              <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-primary"/>
              <span class="text-xs font-bold text-primary">
                {{ formatDate(article.date) }}
              </span>
            </div>
          </div>

          <div class="p-6 flex flex-col flex-grow">
            <div v-if="!article.image" class="self-start mb-4">
              <div class="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-gray-200 shadow-sm">
                 <UIcon name="i-heroicons-calendar" class="w-4 h-4 text-primary"/>
                 <span class="text-xs font-bold text-primary">
                   {{ formatDate(article.date) }}
                 </span>
              </div>
            </div>

            <h3 class="text-xl font-bold text-gray-800 mb-3 group-hover:text-primary transition-colors line-clamp-2">
              {{ article.title }}
            </h3>

            <p class="text-gray-500 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
              {{ article.excerpt }}
            </p>
            
            <div class="mt-auto pt-4 border-t border-gray-100 flex justify-between items-center">
              <span class="text-xs font-semibold text-primary uppercase tracking-wide group-hover:underline flex items-center">
                Leggi articolo <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1 transform transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </NuxtLink>
      </div>

      <div class="mt-8 text-center md:hidden">
        <UButton to="/news" variant="outline" block>Vedi tutte le news</UButton>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '~/supabase.js';

const news = ref([]);
const loading = ref(true);

const getNews = async () => {
  try {
    let { data, error } = await supabase
      .from('news')
      .select('*')
      .order('date', { ascending: false }) // Dal più recente
      .limit(3); // Prendiamo solo le ultime 3 per la home

    if (error) throw error;
    
    // Mappa i campi se nel DB i nomi sono diversi (es. image_url vs image)
    // Qui assumo che nel DB la colonna si chiami 'image' come nel JSON
    news.value = data;
  } catch (e) {
    console.error('Errore news:', e);
  } finally {
    loading.value = false;
  }
};

const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('it-IT', options);
};

onMounted(() => {
  getNews();
});
</script>