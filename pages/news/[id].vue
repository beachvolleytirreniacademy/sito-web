<template>
  <Main>
    <div class="pt-32 pb-20 bg-gray-50 min-h-screen">
      
      <UContainer class="max-w-3xl mx-auto">
        
        <div class="mb-8">
          <UButton 
            to="/news" 
            variant="ghost" 
            icon="i-heroicons-arrow-left"
            class="-ml-3 text-orange-500 hover:text-orange-600 hover:bg-orange-50"
          >
            Torna alle News
          </UButton>
        </div>

        <div v-if="loading" class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden animate-pulse">
          <div class="h-64 md:h-96 w-full bg-gray-200"></div>
          <div class="p-8 md:p-12 space-y-6">
            <div class="h-4 bg-gray-200 rounded w-1/4"></div>
            <div class="h-8 bg-gray-200 rounded w-3/4"></div>
            <div class="h-8 bg-gray-200 rounded w-1/2"></div>
            <div class="space-y-3 pt-4">
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
              <div class="h-4 bg-gray-200 rounded w-5/6"></div>
              <div class="h-4 bg-gray-200 rounded w-full"></div>
            </div>
          </div>
        </div>

        <article 
          v-else-if="article" 
          class="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          
          <div v-if="article.image" class="h-64 md:h-96 w-full relative bg-gray-100">
            <img 
              :src="article.image" 
              :alt="article.title" 
              class="w-full h-full object-cover"
              @error="$event.target.style.display='none'"
            />
          </div>

          <div class="p-8 md:p-12">
            <div class="flex items-center text-sm text-gray-500 mb-4 font-medium">
              <UIcon name="i-heroicons-calendar" class="w-5 h-5 mr-2 text-primary"/>
              {{ formatDate(article.date) }}
            </div>

            <h1 class="text-3xl md:text-4xl font-bold text-gray-900 mb-8 leading-tight">
              {{ article.title }}
            </h1>

            <div 
              class="prose prose-lg max-w-none text-gray-600 leading-relaxed"
              v-html="article.body || article.excerpt"
            >
            </div>
            
            <div class="mt-12 pt-8 border-t border-gray-100 flex justify-between items-center">
               <span class="text-sm text-gray-400">BVTA News</span>
               <div class="flex gap-2">
                 <UButton icon="i-heroicons-share" variant="ghost" color="gray" size="sm" />
               </div>
            </div>
          </div>

        </article>

        <div v-else class="text-center py-20">
          <div class="bg-gray-100 p-6 rounded-full inline-block mb-6">
            <UIcon name="i-heroicons-document-magnifying-glass" class="w-12 h-12 text-gray-400" />
          </div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Articolo non trovato</h2>
          <p class="text-gray-600 mb-8">Sembra che la notizia che cerchi non esista o sia stata rimossa.</p>
          <UButton to="/news" color="primary" size="lg">Torna all'elenco</UButton>
        </div>

      </UContainer>

    </div>
  </Main>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import Main from "@/components/layout/Main.vue";
import { supabase } from '~/supabase.js';

const route = useRoute();
const articleId = route.params.id; 

const article = ref(null);
const loading = ref(true);

const getArticle = async () => {
  try {
    loading.value = true;
    
    // Scarica la singola riga dalla tabella 'news' dove id corrisponde
    let { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('id', articleId)
      .single(); // .single() è importante: ci restituisce un oggetto {}, non un array []

    if (error) throw error;
    
    article.value = data;

  } catch (error) {
    console.error('Errore recupero articolo:', error.message);
    article.value = null; // Assicura che mostri lo stato "Non trovato"
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
  getArticle();
});
</script>

<style scoped>
/* Stili per il contenuto HTML iniettato tramite v-html (rich text) */
:deep(.prose p) {
  margin-bottom: 1.5rem;
}
:deep(.prose strong) {
  color: #111827;
  font-weight: 700;
}
:deep(.prose h2), :deep(.prose h3) {
  font-size: 1.5rem;
  font-weight: 700;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #111827;
}
:deep(.prose ul) {
  list-style-type: disc;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}
:deep(.prose ol) {
  list-style-type: decimal;
  padding-left: 1.5rem;
  margin-bottom: 1.5rem;
}
</style>