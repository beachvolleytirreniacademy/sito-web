<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica Squadra' : 'Nuova Squadra' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Nome Squadra <span class="text-red-500">*</span></label>
          <UInput v-model="form.name" placeholder="Es. I Pirati" class="bg-white" />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Categoria <span class="text-red-500">*</span></label>
          <UInput v-model="form.category" placeholder="Es. Gold Maschile" class="bg-white" />
        </div>
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Allenatore</label>
          <UInput v-model="form.coach" placeholder="Nome Cognome" icon="i-heroicons-user" class="bg-white" />
        </div>
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Foto Squadra</label>
          
          <div class="flex items-center gap-4">
            <div v-if="form.photo_url" class="relative group">
              <img :src="form.photo_url" class="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm">
              <button 
                @click="form.photo_url = ''" 
                class="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-md hover:bg-red-600"
                title="Rimuovi immagine"
              >
                <UIcon name="i-heroicons-x-mark" class="w-3 h-3" />
              </button>
            </div>

            <div class="flex-1">
              <input 
                type="file" 
                ref="fileInput" 
                accept="image/*" 
                class="hidden" 
                @change="handleImageUpload"
              />
              
              <UButton 
                v-if="!isUploading && !uploadSuccess" 
                @click="$refs.fileInput.click()" 
                icon="i-heroicons-cloud-arrow-up" 
                color="white" 
                variant="solid" 
                label="Carica Foto" 
                class="text-gray-700 border border-gray-300"
              />
              
              <div v-else-if="isUploading" class="text-sm text-blue-600 font-bold animate-pulse flex items-center gap-2 py-2">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin w-5 h-5" />
                Caricamento...
              </div>

              <div v-else-if="uploadSuccess" class="text-sm text-green-600 font-bold flex items-center gap-2 py-2 transition-all duration-500 ease-in-out">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
                Immagine caricata!
              </div>

              <input type="text" v-model="form.photo_url" class="hidden" />
              <p v-if="form.photo_url" class="text-xs text-gray-400 mt-1 truncate max-w-md">{{ form.photo_url }}</p>
            </div>
          </div>
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Rosa Giocatori (Separati da virgola) <span class="text-red-500">*</span></label>
          <UTextarea v-model="playersString" :rows="3" placeholder="Es: Mario Rossi, Luigi Bianchi, Francesca Verdi" class="bg-white" />
        </div>
      </div>
      
      <div class="flex gap-3 pt-6 mt-4 border-t border-gray-300">
        <UButton @click="save" color="primary" class="font-bold px-6 !bg-[#FD7F00] hover:!bg-[#e67300] !text-gray-800 ">Salva Squadra</UButton>
        <UButton v-if="isEditing" @click="reset" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold"  variant="solid">Annulla</UButton>
      </div>
    </div>

    <ul class="space-y-3">
      <li v-for="t in list" :key="t.id" 
          class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        
        <div class="flex items-start gap-4 w-full mb-4 md:mb-0">
          
          <img v-if="t.photo_url" :src="t.photo_url" 
               class="w-16 h-16 rounded-md object-cover border border-gray-200 shrink-0 bg-gray-100" 
               alt="Foto Squadra" />
          
          <div class="w-full">
            <div class="flex flex-wrap items-center gap-2 mb-1">
              <span class="font-bold text-gray-900 text-lg">{{ t.name }}</span>
              <span v-if="t.category" class="text-xs font-bold text-gray-800 bg-gray-200 border border-gray-300 px-2 py-0.5 rounded">
                {{ t.category }}
              </span>
            </div>

            <div v-if="t.coach" class="text-sm text-gray-600 font-medium flex items-center gap-1 mb-2">
              <UIcon name="i-heroicons-user" class="w-4 h-4" />
              Coach: <span class="text-gray-900">{{ t.coach }}</span>
            </div>

            <div v-if="t.players && t.players.length > 0" class="flex flex-wrap gap-1">
              <span v-for="(player, idx) in t.players" :key="idx" 
                    class="text-[11px] font-semibold bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-100">
                {{ player }}
              </span>
            </div>
          </div>
        </div>

        <div class="flex gap-2 w-full md:w-auto shrink-0">
          <UButton size="sm" color="orange" variant="solid" 
                   class="text-black flex-1 md:flex-none justify-center" 
                   @click="edit(t)">
            Modifica
          </UButton>
          <UButton size="sm" variant="ghost" 
                   class="bg-red-600 text-white hover:bg-red-700 transition-colors font-bold flex-1 md:flex-none justify-center" 
                   @click="remove(t.id)">
            Elimina
          </UButton>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { TeamsClient } from '~/api/teams_client'
// IMPORT FONDAMENTALE PER UPLOAD:
import { supabase } from '~/api/supabase'

const list = ref([])
const isEditing = ref(false)
const playersString = ref('')

// Variabili Upload
const isUploading = ref(false)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const form = ref({ id: null, name: '', category: '', coach: '', photo_url: '', players: [] })

// Helper per generare nome file pulito
const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')           
    .replace(/[^\w\-]+/g, '')       
    .replace(/\-\-+/g, '-')         
    .replace(/^-+/, '')             
    .replace(/-+$/, '');            
}

const loadData = async () => {
  list.value = await TeamsClient.getAll()
}

// LOGICA UPLOAD (Cartella 'teams')
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 1. Controllo Sessione
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    alert("Sessione scaduta. Fai di nuovo login.")
    return
  }

  // 2. Controllo Nome Squadra
  if (!form.value.name) {
    alert("Inserisci prima il 'Nome Squadra' per poter caricare la foto.")
    event.target.value = ''
    return
  }

  isUploading.value = true
  uploadSuccess.value = false

  try {
    const fileExt = file.name.split('.').pop()
    const slugName = generateSlug(form.value.name)
    
    // PERCORSO: teams/nome-squadra.ext
    const filePath = `teams/${slugName}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('images') // Bucket sempre 'images'
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath)

    // Aggiorna URL con timestamp per cache
    form.value.photo_url = `${publicUrlData.publicUrl}?t=${Date.now()}`

    uploadSuccess.value = true
    setTimeout(() => { uploadSuccess.value = false }, 3000)

  } catch (error) {
    alert('Errore caricamento immagine: ' + error.message)
    console.error(error)
  } finally {
    isUploading.value = false
    event.target.value = ''
  }
}

const save = async () => {
  if (!form.value.name) return alert("Il nome della squadra è obbligatorio")
  if (!form.value.players) return alert("Inserisci i giocatori del team")
  if (!form.value.category) return alert("Inserisci la categoria")

  try {
    const playersArray = playersString.value.split(',').map(s => s.trim()).filter(s => s !== '')
    
    // 🔥 FIX ID: Clona i dati e rimuovi l'ID prima di inviare
    const payload = { ...form.value, players: playersArray }
    delete payload.id

    if (isEditing.value) {
      // Per l'update passiamo l'ID a parte e il payload pulito
      await TeamsClient.update(form.value.id, payload)
    } else {
      await TeamsClient.create(payload)
    }
    
    reset()
    loadData()
  } catch (e) { alert(e.message) }
}

const remove = async (id) => {
  if(confirm('Eliminare squadra?')) {
    await TeamsClient.delete(id)
    loadData()
  }
}

const edit = (item) => {
  form.value = { ...item }
  playersString.value = item.players ? item.players.join(', ') : ''
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reset = () => {
  form.value = { id: null, name: '', category: '', coach: '', photo_url: '', players: [] }
  playersString.value = ''
  isEditing.value = false
  uploadSuccess.value = false
}

onMounted(loadData)
</script>