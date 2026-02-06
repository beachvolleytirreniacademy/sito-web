<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica News' : 'Nuova News' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        <div class="md:col-span-2">
          <label class="block text-sm font-bold text-gray-800 mb-1">Titolo Notizia <span class="text-red-500">*</span></label>
          <UInput v-model="form.title" placeholder="Es. Risultati Tappa 1" class="bg-white" />
        </div>

        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Data Pubblicazione</label>
          <UInput type="date" v-model="form.date" class="bg-white" />
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Contenuto Articolo <span class="text-red-500">*</span></label>
          <UTextarea v-model="form.body" :rows="8" placeholder="Scrivi qui il testo..." class="bg-white" />
        </div>
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Immagine News</label>
          
          <div class="flex items-center gap-4">
            <div v-if="form.image" class="relative group">
              <img :src="form.image" class="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm">
              <button 
                @click="form.image = ''" 
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

              <input type="text" v-model="form.image" class="hidden" />
              <p v-if="form.image" class="text-xs text-gray-400 mt-1 truncate max-w-md">{{ form.image }}</p>
            </div>
          </div>
        </div>

      </div>
      
      <div class="flex gap-3 pt-6 mt-4 border-t border-gray-300">
        <UButton @click="saveNews" color="primary" class="font-bold px-6 !bg-[#FD7F00] hover:!bg-[#e67300] !text-gray-800 ">{{ isEditing ? 'Aggiorna' : 'Pubblica' }}</UButton>
        <UButton v-if="isEditing" @click="resetForm" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold"  variant="solid">Annulla</UButton>
      </div>
    </div>

    <div>
      <h3 class="font-bold text-gray-900 text-lg mb-4">Articoli Pubblicati</h3>
      <div v-if="loading" class="text-gray-600 font-medium">Caricamento...</div>
      <ul v-else class="space-y-3">
      <li v-for="item in newsList" :key="item.id" 
          class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        
        <div class="mb-3 md:mb-0 w-full">
           <span class="font-bold text-gray-900 block text-lg">{{ item.title }}</span>
           <span class="text-sm text-gray-600 font-medium block mt-1">
             Pubblicato il: {{ item.date }}
           </span>
        </div>

        <div class="flex gap-2 w-full md:w-auto">
          <UButton size="sm" color="orange" variant="solid" 
                   class="text-black flex-1 md:flex-none justify-center" 
                   @click="editItem(item)">
            Modifica
          </UButton>
          <UButton size="sm" variant="ghost" 
                   class="bg-red-600 text-white hover:bg-red-700 transition-colors font-bold flex-1 md:flex-none justify-center" 
                   @click="deleteItem(item.id)">
            Elimina
          </UButton>
        </div>
      </li>
    </ul>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { NewsClient } from '~/api/news_client' 
import { supabase } from '~/api/supabase'

const newsList = ref([])
const loading = ref(true)
const isEditing = ref(false)

// Variabili Upload
const isUploading = ref(false)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const form = ref({ id: null, title: '', body: '', image: '', date: new Date().toISOString().split('T')[0] })

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

const loadNews = async () => {
  loading.value = true
  try {
    const res = await NewsClient.getPage(1, 50) 
    newsList.value = res.data || []
  } catch(e) { console.error(e) }
  loading.value = false
}

const handleImageUpload = async (event) => {
  const file = event.target.files[0]
  if (!file) return

  const { data: { session } } = await supabase.auth.getSession()
  if (!session) {
    alert("Sessione scaduta. Fai di nuovo login.")
    return
  }

  if (!form.value.title) {
    alert("Inserisci prima il 'Titolo Notizia' per poter caricare la foto.")
    event.target.value = ''
    return
  }

  isUploading.value = true
  uploadSuccess.value = false

  try {
    const fileExt = file.name.split('.').pop()
    const slugName = generateSlug(form.value.title)
    
    // Upload nel bucket 'images' cartella 'news'
    const filePath = `news/${slugName}.${fileExt}`

    const { error: uploadError } = await supabase
      .storage
      .from('images') 
      .upload(filePath, file, { upsert: true })

    if (uploadError) throw uploadError

    const { data: publicUrlData } = supabase
      .storage
      .from('images')
      .getPublicUrl(filePath)

    form.value.image = `${publicUrlData.publicUrl}?t=${Date.now()}`

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

const saveNews = async () => {
  if (!form.value.title ) return alert("Il titolo è obbligatorio")
  if (!form.value.body ) return alert("La descrizione è obbligatoria")
  try {
    const payload = { ...form.value }
    delete payload.id

    if (isEditing.value) {
      // In update l'ID serve per trovare il record, ma il payload deve contenere solo i campi da aggiornare
      await NewsClient.update(form.value.id, payload)
    } else {
      // In create l'ID non deve esistere (lo genera il DB)
      await NewsClient.create(payload)
    }
    resetForm()
    loadNews()
  } catch (e) { alert('Errore: ' + e.message) }
}

const deleteItem = async (id) => {
  if(!confirm("Cancellare questa news?")) return
  try {
    await NewsClient.delete(id)
    loadNews()
  } catch (e) { alert('Errore eliminazione') }
}

const editItem = (item) => {
  form.value = { ...item }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const resetForm = () => {
  form.value = { id: null, title: '', body: '', image: '', date: new Date().toISOString().split('T')[0] }
  isEditing.value = false
  uploadSuccess.value = false
}

onMounted(loadNews)
</script>