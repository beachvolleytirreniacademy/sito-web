<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica Location' : 'Nuova Location' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Nome Struttura <span class="text-red-500">*</span></label>
          <UInput v-model="form.name" placeholder="Es. Bagno Tirrenia" class="bg-white" />
        </div>
        
        <div>
           <label class="block text-sm font-bold text-gray-800 mb-1">Indirizzo</label>
           <UInput v-model="form.address" placeholder="Via del mare 123, Pisa" class="bg-white" />
        </div>
        
        <div>
           <label class="block text-sm font-bold text-gray-800 mb-1">Link Google Maps</label>
           <UInput v-model="form.map_link" placeholder="https://maps..." icon="i-heroicons-map-pin" class="bg-white" />
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Descrizione</label>
          <UTextarea v-model="form.description" placeholder="Descrivi i servizi..." class="bg-white" />
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Caratteristiche (Separate da virgola)</label>
          <UTextarea v-model="featuresString" placeholder="Es: 3 Campi, Docce Calde, Bar" rows="2" class="bg-white" />
          <p class="text-xs text-gray-600 font-medium mt-1">Il sistema creerà automaticamente le etichette.</p>
        </div>
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Foto Struttura</label>
          
          <div class="flex items-center gap-4">
            <div v-if="form.image_url" class="relative group">
              <img :src="form.image_url" class="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm">
              <button 
                @click="form.image_url = ''" 
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

              <input type="text" v-model="form.image_url" class="hidden" />
              <p v-if="form.image_url" class="text-xs text-gray-400 mt-1 truncate max-w-md">{{ form.image_url }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="flex gap-3 pt-6 mt-4 border-t border-gray-300">
        <UButton @click="save" color="primary" class="font-bold px-6">{{ isEditing ? 'Salva Modifiche' : 'Crea Location' }}</UButton>
        <UButton v-if="isEditing" @click="reset" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold"  variant="solid">Annulla</UButton>
      </div>
    </div>

    <ul class="space-y-3">
      <li v-for="loc in list" :key="loc.id" 
          class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        
        <div class="mb-3 md:mb-0 w-full">
          <span class="font-bold text-gray-900 block text-lg">{{ loc.name }}</span>
          
          <span class="text-sm text-gray-700 font-medium block truncate w-full md:max-w-xs mb-1">
            {{ loc.address }}
          </span>
          
          <div class="flex gap-1 mt-1 flex-wrap">
            <span v-for="(f, i) in (loc.features || []).slice(0, 3)" :key="i" 
                  class="text-[11px] font-bold bg-blue-100 text-blue-800 px-2 py-0.5 rounded border border-blue-200">
              {{ f }}
            </span>
          </div>
        </div>

        <div class="flex gap-2 w-full md:w-auto">
          <UButton size="sm" class="text-black flex-1 md:flex-none justify-center" color="orange" variant="solid" @click="edit(loc)">
            Modifica
          </UButton>
          <UButton size="sm" variant="ghost" class="bg-red-600 text-white hover:bg-red-700 transition-colors font-bold flex-1 md:flex-none justify-center" @click="remove(loc.id)">
            Elimina
          </UButton>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { LocationsClient } from '~/api/locations_client'
// IMPORT UPLOAD
import { supabase } from '~/api/supabase'

const list = ref([])
const loading = ref(true)
const isEditing = ref(false)
const featuresString = ref('') 

// Variabili Upload
const isUploading = ref(false)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const form = ref({ id: null, name: '', address: '', map_link: '', description: '', image_url: '', features: [] })

// Helper Slug
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
  loading.value = true
  try {
    list.value = await LocationsClient.getAll()
  } catch (e) { console.error(e) } finally { loading.value = false }
}

// LOGICA UPLOAD (Cartella 'locations')
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 1. Sessione
  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    alert("Sessione scaduta. Fai di nuovo login.")
    return
  }

  // 2. Controllo Nome
  if (!form.value.name) {
    alert("Inserisci prima il 'Nome Struttura' per poter caricare la foto.")
    event.target.value = ''
    return
  }

  isUploading.value = true
  uploadSuccess.value = false

  try {
    const fileExt = file.name.split('.').pop()
    const slugName = generateSlug(form.value.name)
    
    // PERCORSO: locations/nome-location.ext
    const filePath = `locations/${slugName}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('images') 
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath)

    form.value.image_url = `${publicUrlData.publicUrl}?t=${Date.now()}`

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
  if (!form.value.name) return alert("Il nome della struttura è obbligatorio")

  try {
    const featuresArray = featuresString.value.split(',').map(s => s.trim()).filter(s => s !== '')
    
    // 🔥 FIX ID: Clona i dati e rimuovi l'ID prima di inviare
    const payload = { ...form.value, features: featuresArray }
    delete payload.id

    if (isEditing.value) {
      await LocationsClient.update(form.value.id, payload)
    } else {
      await LocationsClient.create(payload)
    }
    reset()
    loadData()
  } catch (e) { alert('Errore: ' + e.message) }
}

const remove = async (id) => {
  if(confirm('Eliminare location?')) {
    try {
      await LocationsClient.delete(id)
      loadData()
    } catch (e) { alert('Impossibile eliminare.') }
  }
}

const edit = (item) => {
  form.value = { ...item }
  featuresString.value = item.features ? item.features.join(', ') : ''
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reset = () => {
  form.value = { id: null, name: '', address: '', map_link: '', description: '', image_url: '', features: [] }
  featuresString.value = ''
  isEditing.value = false
  uploadSuccess.value = false
}

onMounted(loadData)
</script>