<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica Evento' : 'Nuovo Evento' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Titolo Evento <span class="text-red-500">*</span></label>
          <UInput v-model="form.title" placeholder="Es. Torneo di Ferragosto" class="bg-white" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Tipo</label>
          <select 
            v-model="form.type" 
            class="w-full h-[38px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all cursor-pointer block"
          >
            <option 
              v-for="opt in eventOptions" 
              :key="opt.value" 
              :value="opt.value"
              class="text-gray-900 bg-white"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Categoria <span class="text-red-500">*</span></label>
          <UInput v-model="form.category" placeholder="Es. 2x2 Misto" class="bg-white" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Data Inizio <span class="text-red-500">*</span></label>
          <UInput type="date" v-model="form.start_date" class="bg-white" />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Data Fine <span class="text-red-500">*</span></label>
          <UInput type="date" v-model="form.end_date" class="bg-white" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Dove si gioca?</label>
          <select 
            v-model="form.location_id" 
            class="w-full h-[38px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 shadow-sm outline-none transition-all cursor-pointer"
          >
            <option :value="null">-- Seleziona Location --</option>
            <option v-for="loc in locations" :key="loc.id" :value="loc.id">
              {{ loc.name }}
            </option>
          </select>
          <p v-if="locations.length === 0" class="text-xs text-red-500 mt-1">Nessuna location trovata.</p>
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Descrizione Completa <span class="text-red-500">*</span></label>
          <UTextarea v-model="form.description" :rows="5" placeholder="Inserisci programma, premi, regole..." class="bg-white" />
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Immagine Copertina</label>
          
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

        <div class="md:col-span-2">
          <label class="block text-sm font-bold text-gray-800 mb-1">Link Iscrizione (Dink/Form)</label>
          <UInput v-model="form.signup_link" placeholder="https://..." icon="i-heroicons-link" class="bg-white" />
        </div>

        <div>
           <label class="block text-sm font-bold text-gray-800 mb-1">Link Foto Album</label>
           <UInput v-model="form.external_gallery_link" placeholder="https://..." icon="i-heroicons-camera" class="bg-white" />
        </div>

      </div>

      <div class="flex gap-3 pt-6 mt-4 border-t border-gray-300">
        <UButton @click="save" color="primary" size="md" class="font-bold px-6">{{ isEditing ? 'Salva Modifiche' : 'Crea Evento' }}</UButton>
        <UButton v-if="isEditing" @click="reset" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold" variant="solid">Annulla</UButton>
      </div>
    </div>

    <ul class="space-y-3">
      <li v-for="e in list" :key="e.id" 
          class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        
        <div class="mb-3 md:mb-0 w-full">
          <span class="font-bold text-gray-900 block text-lg">{{ e.title }}</span>
          
          <span class="text-sm font-medium text-gray-600 flex flex-wrap items-center gap-1 mt-1">
              <span>📅 {{ e.start_date }}</span>
              <span class="mx-1 hidden md:inline">•</span>
              <span class="uppercase text-xs font-bold text-primary bg-primary-50 px-2 py-0.5 rounded border border-primary-100 ml-1 md:ml-0">
                {{ e.type }}
              </span>
          </span>
        </div>

        <div class="flex gap-2 w-full md:w-auto">
          <UButton size="sm" color="orange" variant="solid" 
                   class="text-black flex-1 md:flex-none justify-center" 
                   @click="edit(e)">
            Modifica
          </UButton>
          <UButton size="sm" variant="ghost" 
                   class="bg-red-600 text-white hover:bg-red-700 transition-colors font-bold flex-1 md:flex-none justify-center" 
                   @click="remove(e.id)">
            Elimina
          </UButton>
        </div>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { EventType } from '~/types/entities/event' 
import { EventsClient } from '~/api/event_client'     
import { LocationsClient } from '~/api/locations_client' 

// 🔥 MODIFICA FONDAMENTALE: Usiamo il tuo client manuale, non quello di Nuxt
import { supabase } from '~/api/supabase'

// 2. Opzioni per il menu a tendina
const eventOptions = Object.values(EventType).map(value => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value: value
}))

// 3. Helper per lo slug
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

// 4. Variabili di Stato
const list = ref([])
const locations = ref([])
const isEditing = ref(false)

// Variabili per l'Upload
const uploadSuccess = ref(false)
const isUploading = ref(false)
const fileInput = ref(null)

const form = ref({
  id: null,
  title: '', slug: '', 
  type: EventType.TORNEO, 
  category: '', 
  start_date: '', end_date: '', location_id: null,
  description: '', image_url: '', signup_link: '', external_gallery_link: ''
})

// 5. Funzione Upload
const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  // 1. CONTROLLO LOGIN:
  // Poiché usiamo il client 'supabase' importato manualmente, 
  // questo leggerà il LocalStorage (il vecchio metodo) e troverà la sessione corretta.
  const { data: { session } } = await supabase.auth.getSession()
  
  if (!session) {
    alert("Sessione scaduta o utente non loggato. Fai login di nuovo.")
    return
  }

  // 2. Controllo Titolo
  if (!form.value.title) {
    alert("Inserisci prima il 'Titolo Evento' per poter caricare la foto.")
    event.target.value = ''
    return
  }
  isUploading.value = true
  uploadSuccess.value = false

  try {
    const fileExt = file.name.split('.').pop()
    const slugName = generateSlug(form.value.title)
    const filePath = `events/${slugName}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('images')
      .upload(filePath, file, {
        upsert: true 
      })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath)

    form.value.image_url = `${publicUrlData.publicUrl}?t=${Date.now()}`

    uploadSuccess.value = true
    setTimeout(() => {
      uploadSuccess.value = false
    }, 3000) 

  } catch (error) {
    alert('Errore caricamento immagine: ' + error.message)
    console.error(error)
  } finally {
    isUploading.value = false
    event.target.value = ''
  }
}

// 6. Caricamento Dati
const loadData = async () => {
  try {
    list.value = await EventsClient.getAll() || []
    locations.value = await LocationsClient.getAll() || []
  } catch (e) {
    console.error("Errore caricamento dati:", e)
  }
}

// 7. Salvataggio con Validazione
const save = async () => {
  if (
    !form.value.title || 
    !form.value.category || 
    !form.value.start_date || 
    !form.value.end_date || 
    !form.value.description
  ) {
    alert("Compila tutti i campi obbligatori (*)")
    return 
  }

  try {
    const payload = { ...form.value }
    delete payload.id

    if (payload.title) {
      payload.slug = generateSlug(payload.title)
    }

    if (isEditing.value) {
      await EventsClient.update(form.value.id, payload)
    } else {
      await EventsClient.create(payload)
    }
    reset()
    loadData()
  } catch (e) { 
    if (e.message && e.message.includes('unique constraint')) {
      alert("Errore: Esiste già un evento con questo nome/slug.")
    } else {
      alert("Errore: " + (e.message || "Sconosciuto")) 
    }
  }
}

// 8. Cancellazione
const remove = async (id) => {
  if(confirm('Eliminare evento?')) {
    await EventsClient.delete(id)
    loadData()
  }
}

// 9. Modifica
const edit = (item) => {
  form.value = { ...item }
  isEditing.value = true
}

// 10. Reset Form
const reset = () => {
  form.value = { id: null, title: '', slug: '', type: EventType.TORNEO, category: '', start_date: '', end_date: '', location_id: null, description: '', image_url: '', signup_link: '', external_gallery_link: '' }
  isEditing.value = false
  uploadSuccess.value = false
}

onMounted(loadData)
</script>