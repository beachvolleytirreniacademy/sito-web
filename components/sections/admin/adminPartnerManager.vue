<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica Sponsor' : 'Nuovo Sponsor' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Nome Azienda / Sponsor <span class="text-red-500">*</span></label>
          <UInput v-model="form.name" placeholder="Es. Nike, RedBull..." class="bg-white" />
        </div>
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Descrizione <span class="text-red-500">*</span> </label>
          <UTextarea v-model="form.description" placeholder="Breve testo promozionale o descrizione dell'azienda..." class="bg-white" rows="3" />
        </div>
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Logo Sponsor</label>
          
          <div class="flex items-center gap-4">
            <div v-if="form.imageUrl" class="relative group bg-white border border-gray-200 p-2 rounded-md">
              <img :src="form.imageUrl" class="w-24 h-16 object-contain rounded-md shadow-sm">
              <button 
                @click="form.imageUrl = ''" 
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
                label="Carica Logo" 
                class="text-gray-700 border border-gray-300"
              />
              
              <div v-else-if="isUploading" class="text-sm text-blue-600 font-bold animate-pulse flex items-center gap-2 py-2">
                <UIcon name="i-heroicons-arrow-path" class="animate-spin w-5 h-5" />
                Caricamento...
              </div>

              <div v-else-if="uploadSuccess" class="text-sm text-green-600 font-bold flex items-center gap-2 py-2 transition-all duration-500 ease-in-out">
                <UIcon name="i-heroicons-check-circle" class="w-5 h-5" />
                Logo caricato!
              </div>

              <input type="text" v-model="form.imageUrl" class="hidden" />
              <p v-if="form.imageUrl" class="text-xs text-gray-400 mt-1 truncate max-w-md">{{ form.imageUrl }}</p>
            </div>
          </div>
        </div>

      </div>

      <div class="flex gap-3 pt-6 mt-4 border-t border-gray-300">
        <UButton @click="save" color="primary" class="font-bold px-6 !bg-[#FD7F00] hover:!bg-[#e67300] !text-gray-800 ">{{ isEditing ? 'Salva Modifiche' : 'Crea Sponsor' }}</UButton>
        <UButton v-if="isEditing" @click="reset" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold" variant="solid">Annulla</UButton>
      </div>
    </div>

    <ul class="space-y-3">
      <li v-for="sponsor in list" :key="sponsor.id" 
          class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors gap-4">
        
        <div class="flex items-center gap-4 w-full md:w-auto flex-1">
          <div class="w-16 h-16 bg-white border border-gray-200 rounded-lg flex items-center justify-center shrink-0 overflow-hidden shadow-sm">
            <img v-if="sponsor.imageUrl" :src="sponsor.imageUrl" class="w-full h-full object-contain p-1" :alt="sponsor.name">
            <UIcon v-else name="i-heroicons-photo" class="w-6 h-6 text-gray-300" />
          </div>
          
          <div class="overflow-hidden">
            <span class="font-bold text-gray-900 block text-lg">{{ sponsor.name }}</span>
            <span class="text-sm text-gray-600 font-medium block truncate max-w-sm">
              {{ sponsor.description }}
            </span>
          </div>
        </div>

        <div class="flex gap-2 w-full md:w-auto shrink-0 mt-2 md:mt-0">
          <UButton size="sm" class="text-black flex-1 md:flex-none justify-center" color="orange" variant="solid" @click="edit(sponsor)">
            Modifica
          </UButton>
          <UButton size="sm" variant="ghost" class="bg-red-600 text-white hover:bg-red-700 transition-colors font-bold flex-1 md:flex-none justify-center" @click="remove(sponsor.id)">
            Elimina
          </UButton>
        </div>
      </li>
    </ul>
    
    <div v-if="!loading && list.length === 0" class="text-center py-8 text-gray-500">
      Nessun sponsor presente nel database.
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
// ATTENZIONE: Assicurati che l'importazione coincida col nome reale del tuo client API
import { PartnersClient } from '~/api/partners_client' 
import { supabase } from '~/api/supabase'

const list = ref([])
const loading = ref(true)
const isEditing = ref(false)

// Variabili Upload
const isUploading = ref(false)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const form = ref({ id: null, name: '', description: '', imageUrl: '' })

// Helper Slug per rinominare i file immagine in modo pulito
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
    list.value = await PartnersClient.getAll()
  } catch (e) { 
    console.error(e) 
  } finally { 
    loading.value = false 
  }
}

// LOGICA UPLOAD (Cartella 'sponsors')
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
    alert("Inserisci prima il 'Nome Azienda' per poter caricare il logo.")
    event.target.value = ''
    return
  }

  isUploading.value = true
  uploadSuccess.value = false

  try {
    const fileExt = file.name.split('.').pop()
    const slugName = generateSlug(form.value.name)
    
    // PERCORSO: salviamo nella cartella sponsors (cambiala in partners se preferisci)
    const filePath = `partners/${slugName}-${Date.now()}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('images') 
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath)

    form.value.imageUrl = publicUrlData.publicUrl

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
  if (!form.value.name || !form.value.description) {
    return alert("Compila i campi obbligatori (Nome e Descrizione)")
  }

  try {
    const payload = { ...form.value }
    delete payload.id

    if (isEditing.value) {
      await PartnersClient.update(form.value.id, payload)
    } else {
      await PartnersClient.insert(payload)
    }
    reset()
    loadData()
  } catch (e) { 
    alert('Errore durante il salvataggio: ' + e.message) 
  }
}

const remove = async (id) => {
  if(confirm('Sei sicuro di voler eliminare questo sponsor?')) {
    try {
      await PartnersClient.delete(id)
      loadData()
    } catch (e) { 
      alert('Impossibile eliminare lo sponsor.') 
    }
  }
}

const edit = (item) => {
  form.value = { ...item }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reset = () => {
  form.value = { id: null, name: '', description: '', imageUrl: '' }
  isEditing.value = false
  uploadSuccess.value = false
}

onMounted(loadData)
</script>