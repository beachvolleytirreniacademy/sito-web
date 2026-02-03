<template>
  <Main>
    <div class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        
        <div class="text-center max-w-3xl mx-auto mb-12">
          <h1 class="text-4xl font-bold text-primary mb-4">{{ pageTitle }}</h1>
          <p class="text-xl text-gray-500">{{ pageSubtitle }}</p>
        </div>

        <div v-if="loading" class="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
          <div v-for="n in 3" :key="n" class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 h-48 animate-pulse flex">
            <div class="w-72 h-full bg-gray-200 flex-shrink-0"></div>
            <div class="flex-grow p-6 flex flex-col justify-center space-y-4">
              <div class="h-6 bg-gray-200 rounded w-1/3"></div>
              <div class="h-4 bg-gray-200 rounded w-1/5"></div>
              <div class="h-4 bg-gray-200 rounded w-full mt-auto"></div>
            </div>
          </div>
        </div>

        <div v-else class="max-w-5xl mx-auto flex flex-col gap-6 sm:gap-8">
          
          <div 
            v-for="team in teamsList" 
            :key="team.id"
            class="bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 transition-all duration-300 hover:shadow-lg"
            :class="{ 'ring-2 ring-primary': team.isOpen }"
          >
            <div 
              class="flex flex-col sm:flex-row cursor-pointer group"
              @click="toggleTeam(team.id)"
            >
              <div class="sm:w-72 h-64 sm:h-48 relative flex-shrink-0 overflow-hidden bg-gray-200">
                <img 
                  :src="team.photo_url || 'https://placehold.co/600x400?text=Team+BVTA'" 
                  :alt="team.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                >
                <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors"></div>
              </div>

              <div class="flex-grow p-6 flex flex-col justify-center relative">
                
                <div class="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                  <h3 class="text-xl font-semibold text-gray-800">{{ team.name }}</h3>
                  
                  <span class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide w-fit">
                    {{ team.category }}
                  </span>
                </div>

                <div class="flex justify-between items-center mt-auto pt-4 sm:pt-0">
                  <span class="text-sm text-gray-400 font-medium group-hover:text-primary transition-colors">
                    {{ team.isOpen ? 'Chiudi dettagli' : 'Vedi formazione e risultati' }}
                  </span>
                  
                  <UIcon 
                    name="i-heroicons-chevron-down" 
                    class="w-6 h-6 text-gray-300 group-hover:text-primary transition-all duration-300"
                    :class="{ 'rotate-180': team.isOpen }"
                  />
                </div>
              </div>
            </div>

            <div 
              v-show="team.isOpen"
              class="bg-gray-50 border-t border-gray-100 p-6 sm:px-8"
            >
              <div class="space-y-8">
                
                <div v-if="team.coach" class="mb-6">
                  <h4 class="text-xs uppercase tracking-wide text-gray-400 font-bold mb-4 flex items-center">
                    <UIcon name="i-heroicons-academic-cap" class="mr-2" />
                    Allenatore
                  </h4>
                  <div class="flex items-center text-gray-700 text-sm font-bold bg-primary/5 px-4 py-3 rounded-lg border border-primary/10 w-fit">
                    {{ team.coach }}
                  </div>
                </div>

                <div v-if="team.players && team.players.length > 0">
                  <h4 class="text-xs uppercase tracking-wide text-gray-400 font-bold mb-4 flex items-center">
                    <UIcon name="i-heroicons-users" class="mr-2" />
                    Rosa Squadra
                  </h4>
                  
                  <ul class="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    <li 
                      v-for="(player, index) in team.players" 
                      :key="index"
                      class="flex items-center text-gray-700 text-sm font-medium bg-white px-3 py-2.5 rounded-lg shadow-sm border border-gray-100"
                    >
                      <div class="w-1.5 h-1.5 rounded-full bg-primary mr-2 flex-shrink-0"></div>
                      <span class="truncate">{{ player }}</span>
                    </li>
                  </ul>
                </div>

                <div v-if="team.formattedResults && team.formattedResults.length > 0">
                  <h4 class="text-xs uppercase tracking-wide text-gray-400 font-bold mb-4 flex items-center border-t border-gray-200 pt-6 mt-6">
                    <UIcon name="i-heroicons-trophy" class="mr-2" />
                    Andamento Stagionale
                  </h4>
                  
                  <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <li 
                      v-for="(result, rIndex) in team.formattedResults" 
                      :key="rIndex"
                      class="flex justify-between items-center text-sm bg-white px-4 py-2 rounded-lg shadow-sm border border-gray-100"
                    >
                      <span class="text-gray-500">{{ result.dayLabel }}</span>
                      
                      <span 
                        class="font-bold px-2 py-0.5 rounded text-xs"
                        :class="result.rank === 1 ? 'bg-yellow-50 text-yellow-700 border border-yellow-100' : 'bg-gray-50 text-gray-600'"
                      >
                        {{ result.rankLabel }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div v-else>
                  <p class="text-xs text-gray-400 italic mt-6 border-t border-gray-200 pt-4">Nessun risultato registrato per questa stagione.</p>
                </div>

              </div>
            </div>

          </div>

          <div v-if="teamsList.length === 0" class="text-center py-12 text-gray-500">
             Non ci sono squadre registrate per questa stagione.
          </div>

        </div>

      </UContainer>
    </div>
  </Main>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Main from "@/components/layout/Main.vue";
import { supabase } from '~/supabase.js'

// Titoli statici della pagina
const pageTitle = "Stagione Invernale 2025-2026";
const pageSubtitle = "I nostri team che competono nelle competizioni AIBVC";

const teamsList = ref([]);
const loading = ref(true);

const fetchTeams = async () => {
  try {
    loading.value = true;

    // 1. Scarica Squadre + Piazzamenti (Join)
    // placements(*) significa "prendi tutti i campi della tabella collegata placements"
    let { data, error } = await supabase
      .from('teams')
      .select(`
        *,
        placements (
          day_number,
          rank
        )
      `)
      .order('id', { ascending: true }); // Ordina le squadre per id

    if (error) throw error;

    if (data) {
      // 2. Trasforma i dati per il Frontend
      teamsList.value = data.map(team => {
        
        // Ordina i risultati per giornata (1, 2, 3...)
        const sortedPlacements = team.placements 
          ? team.placements.sort((a, b) => a.day_number - b.day_number)
          : [];

        // Crea un array 'formattedResults' che contiene le stringhe pronte per la grafica
        const formattedResults = sortedPlacements.map(p => ({
          rank: p.rank, // Teniamo il numero puro per la logica dei colori (if rank === 1)
          dayLabel: `${p.day_number}ª Tappa`,
          rankLabel: `${p.rank}° Posto`
        }));

        return {
          ...team,
          isOpen: false, // Stato dell'accordion
          formattedResults // I risultati belli e pronti
        };
      });
    }

  } catch (error) {
    console.error("Errore recupero squadre:", error.message);
  } finally {
    loading.value = false;
  }
};

const toggleTeam = (id) => {
  teamsList.value.forEach(team => {
    if (team.id === id) {
      team.isOpen = !team.isOpen
    } else {
      team.isOpen = false // Chiude gli altri quando ne apri uno (opzionale)
    }
  })
};

onMounted(() => {
  fetchTeams();
});
</script>