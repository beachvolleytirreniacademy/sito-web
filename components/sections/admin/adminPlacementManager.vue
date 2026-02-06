<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica Risultato' : 'Aggiungi Risultato' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Seleziona Squadra <span class="text-red-500">*</span></label>
          <select 
            v-model="form.team_id" 
            class="w-full h-[38px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm outline-none transition-all cursor-pointer block"
          >
            <option :value="null">-- Squadra --</option>
            <option v-for="t in allTeams" :key="t.id" :value="t.id">{{ t.name }}</option>
          </select>
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Giornata (N°) <span class="text-red-500">*</span></label>
          <UInput type="number" v-model="form.day_number" class="bg-white" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Posizione (Rank) <span class="text-red-500">*</span></label>
          <UInput type="number" v-model="form.rank" class="bg-white" />
        </div>

      </div>

      <div class="flex gap-3 pt-6 mt-4 border-t border-gray-300">
         <UButton @click="save" color="primary" class="font-bold px-6 !bg-[#FD7F00] hover:!bg-[#e67300] !text-gray-800 ">{{ isEditing ? 'Salva Modifiche' : 'Salva Risultato' }}</UButton>
         <UButton v-if="isEditing" @click="reset" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold"  variant="solid">Annulla</UButton>
      </div>
    </div>

    <div>
      <h3 class="font-bold text-gray-900 text-lg mb-4">Storico Risultati</h3>
      
      <div v-if="loading" class="text-gray-600 font-medium">Caricamento...</div>
      
      
      <ul v-else class="space-y-3">
        <li v-for="p in list" :key="p.id" 
            class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          
          <div class="mb-3 md:mb-0 w-full">
            <span class="font-bold text-gray-900 block text-lg">
              {{ p.teams?.name || 'Squadra non trovata' }}
            </span>
            
            <span class="text-sm font-medium text-gray-600 flex flex-wrap items-center gap-2 mt-1">
              <span class="bg-blue-100 text-blue-800 px-2 py-0.5 rounded text-xs border border-blue-200 font-bold">Giornata {{ p.day_number }}</span>
              <span>Posizione: <strong class="text-gray-900">{{ p.rank }}°</strong></span>
              <span v-if="p.teams?.category" class="text-gray-400 text-xs border-l pl-2 ml-1">{{ p.teams.category }}</span>
            </span>
          </div>

          <div class="flex gap-2 w-full md:w-auto">
            <UButton size="sm" color="orange" class="text-black flex-1 md:flex-none justify-center" variant="solid" @click="edit(p)">
              Modifica
            </UButton>
            <UButton size="sm" variant="ghost" class="bg-red-600 text-white hover:bg-red-700 transition-colors font-bold flex-1 md:flex-none justify-center" @click="remove(p.id)">
              Elimina
            </UButton>
          </div>
        </li>
      </ul>

      <p v-if="list.length === 0 && !loading" class="text-gray-500 italic mt-4">Nessun risultato inserito.</p>
    </div>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlacementsClient } from '~/api/placements_client'
import { TeamsClient } from '~/api/teams_client'

const allTeams = ref([]) 
const list = ref([])    
const loading = ref(true)
const isEditing = ref(false)

const form = ref({ 
  id: null, 
  team_id: null, 
  day_number: 1, 
  rank: 1 
})

const loadData = async () => {
  loading.value = true
  try {
    // 1. Carica le squadre
    allTeams.value = await TeamsClient.getAll() || []

    // 2. Carica i piazzamenti
    const placementsData = await PlacementsClient.getAll() || []
    
    // 3. ORDINAMENTO ESPLICITO:
    // Prima ordina per Giornata Decrescente (b - a -> dal più alto al più basso)
    // A parità di giornata, ordina per Rank Crescente (a - b -> 1°, 2°, 3°...)
    placementsData.sort((a, b) => {
      const dayDiff = b.day_number - a.day_number
      if (dayDiff !== 0) return dayDiff
      
      return a.rank - b.rank
    })
    
    list.value = placementsData
    
  } catch (e) {
    console.error(e)
  } finally {
    loading.value = false
  }
}

const save = async () => {
  try {
    if (!form.value.team_id) return alert('Seleziona una squadra')
    
    // Assicuriamoci di salvare numeri interi
    const payload = {
      team_id: form.value.team_id,
      day_number: parseInt(form.value.day_number),
      rank: parseInt(form.value.rank)
    }

    if (isEditing.value) {
      await PlacementsClient.update(form.value.id, payload)
    } else {
      await PlacementsClient.create(payload)
    }
    
    reset()
    loadData() 
  } catch (e) { alert('Errore: ' + e.message) }
}

const remove = async (id) => {
  if(confirm('Sei sicuro di voler eliminare questo risultato?')) {
    try {
      await PlacementsClient.delete(id)
      loadData()
    } catch (e) { alert('Errore eliminazione') }
  }
}

const edit = (item) => {
  form.value = { 
    id: item.id,
    team_id: item.team_id,
    day_number: item.day_number,
    rank: item.rank
  }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reset = () => {
  form.value = { id: null, team_id: null, day_number: 1, rank: 1 }
  isEditing.value = false
}

onMounted(loadData)
</script>