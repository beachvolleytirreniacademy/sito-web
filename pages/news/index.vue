<template>
  <Main>
    <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
      <UContainer class="max-w-4xl mx-auto">
        
        <div class="text-center mb-12">
          <h1 class="text-4xl font-bold text-primary mb-2">Tutte le News</h1>
          <p class="text-gray-600">Archivio completo degli aggiornamenti BVTA</p>
        </div>

        <div class="space-y-6">
          
          <div v-if="loading" class="space-y-6">
            <div 
              v-for="n in itemsPerPage" 
              :key="n" 
              class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col md:flex-row h-auto md:h-48 animate-pulse"
            >
              <div class="w-full md:w-64 h-48 md:h-auto bg-gray-200 flex-shrink-0"></div>
              <div class="p-6 flex flex-col justify-center flex-grow space-y-3">
                <div class="h-4 bg-gray-200 rounded w-1/4"></div>
                <div class="h-6 bg-gray-200 rounded w-3/4"></div>
                <div class="h-4 bg-gray-200 rounded w-full"></div>
                <div class="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>

          <NuxtLink 
            v-else
            v-for="article in news" 
            :key="article.id"
            :to="`/news/${article.id}`"
            class="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow duration-300 flex flex-col md:flex-row group block"
          >
            <div 
              v-if="article.image" 
              class="w-full md:w-64 h-48 md:h-auto flex-shrink-0 relative bg-gray-100 overflow-hidden"
            >
              <img 
                :src="article.image" 
                :alt="article.title" 
                class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                @error="$event.target.style.display='none'"
              />
            </div>

            <div class="p-6 flex flex-col justify-center flex-grow">
              <div class="flex items-center text-sm text-gray-500 mb-2">
                <UIcon name="i-heroicons-calendar" class="w-4 h-4 mr-1"/>
                {{ formatDate(article.date) }}
              </div>
              
              <h2 class="text-xl font-bold text-gray-800 mb-2 group-hover:text-primary transition-colors">
                {{ article.title }}
              </h2>
              
              <p class="text-gray-600 text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-4">
                {{ article.excerpt || stripHtml(article.body).substring(0, 150) + '...' }}
              </p>

              <div class="mt-auto">
                <span 
                  class="text-primary font-semibold text-sm hover:underline flex items-center group-hover:translate-x-1 transition-transform"
                >
                  Leggi tutto <UIcon name="i-heroicons-arrow-right" class="w-4 h-4 ml-1"/>
                </span>
              </div>
              
            </div>
          </NuxtLink>
        </div>

        <div v-if="!loading && news.length === 0" class="text-center py-20 text-gray-500">
          Nessuna notizia trovata.
        </div>

        <div v-if="totalPages > 1" class="mt-12 flex justify-center items-center gap-4">
          
          <UButton 
            :disabled="currentPage === 1 || loading" 
            @click="changePage(currentPage - 1)"
            variant="ghost"
            color="gray"
            icon="i-heroicons-chevron-left"
            class="text-lg font-bold text-primary hover:text-primary hover:bg-orange-50 transition-colors disabled:opacity-50"
          >
            Precedente
          </UButton>

          <span class="text-sm font-medium text-gray-700 bg-white px-4 py-2 rounded-lg border border-gray-200">
            Pagina {{ currentPage }} di {{ totalPages }}
          </span>

          <UButton 
            :disabled="currentPage === totalPages || loading" 
            @click="changePage(currentPage + 1)"
            variant="ghost"
            color="gray"
            trailing-icon="i-heroicons-chevron-right"
            class="text-lg font-bold text-primary hover:text-primary hover:bg-orange-50 transition-colors disabled:opacity-50"
          >
            Successiva
          </UButton>
          
        </div>

      </UContainer>
    </div>
  </Main>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue';
import Main from "@/components/layout/Main.vue";
import { supabase } from '~/supabase.js';

// Configurazione
const itemsPerPage = 5;
const currentPage = ref(1);
const news = ref([]);
const totalCount = ref(0);
const loading = ref(true);

// Calcolo totale pagine
const totalPages = computed(() => {
  return Math.ceil(totalCount.value / itemsPerPage);
});

// Funzione principale di caricamento
const fetchNews = async () => {
  try {
    loading.value = true;
    
    // Calcoliamo il range per Supabase (es. pagina 1: 0-4, pagina 2: 5-9)
    const from = (currentPage.value - 1) * itemsPerPage;
    const to = from + itemsPerPage - 1;

    // Query: Scarica news, conta il totale, ordina per data decrescente e prendi solo il range
    const { data, count, error } = await supabase
      .from('news')
      .select('*', { count: 'exact' }) // 'exact' ci restituisce il numero totale di news
      .order('date', { ascending: false })
      .range(from, to);

    if (error) throw error;

    news.value = data || [];
    totalCount.value = count || 0;

  } catch (error) {
    console.error('Errore caricamento news:', error.message);
  } finally {
    loading.value = false;
  }
};

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= totalPages.value) {
    currentPage.value = newPage;
    // Il watcher intercetterà il cambio e chiamerà fetchNews
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
};

// Osserva cambiamenti di pagina per ricaricare i dati
watch(currentPage, () => {
  fetchNews();
});

// Helper formattazione data
const formatDate = (dateString) => {
  if (!dateString) return '';
  const options = { day: 'numeric', month: 'long', year: 'numeric' };
  return new Date(dateString).toLocaleDateString('it-IT', options);
};

// Helper per pulire l'HTML dal body se non c'è excerpt (rimuove tag <p>, <b> etc)
const stripHtml = (html) => {
  if (!html) return '';
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

onMounted(() => {
  fetchNews();
});
</script>