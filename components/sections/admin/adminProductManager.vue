<template>
  <div class="bg-white p-6 rounded-xl shadow-md space-y-6 border border-gray-200">
    <div class="p-6 border border-gray-300 rounded-lg bg-gray-50">
      <h3 class="font-bold text-gray-900 text-xl mb-6 border-b border-gray-300 pb-2">
        {{ isEditing ? 'Modifica Prodotto' : 'Nuovo Prodotto' }}
      </h3>
      
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Nome Prodotto <span class="text-red-500">*</span></label>
          <UInput v-model="form.name" placeholder="Es. Felpa Ufficiale" class="bg-white" />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Prezzo (€)</label>
          <UInput type="number" v-model="form.price" placeholder="0.00" class="bg-white" />
        </div>
        
        <div>
          <label class="block text-sm font-bold text-gray-800 mb-1">Tipo Vendita</label>
          <select 
            v-model="form.type" 
            class="w-full h-[38px] px-3 py-2 bg-white border border-gray-300 rounded-md text-sm text-gray-900 focus:ring-2 focus:ring-primary-500 shadow-sm outline-none transition-all cursor-pointer block"
          >
            <option :value="null" disabled>-- Seleziona --</option>
            <option 
              v-for="opt in productOptions" 
              :key="opt.value" 
              :value="opt.value"
              class="text-gray-900 bg-white"
            >
              {{ opt.label }}
            </option>
          </select>
        </div>
        
        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Descrizione</label>
          <UTextarea v-model="form.description" placeholder="Taglie disponibili, materiali..." class="bg-white" />
        </div>

        <div class="md:col-span-full">
          <label class="block text-sm font-bold text-gray-800 mb-1">Immagine Prodotto</label>
          
          <div class="flex items-center gap-4">
            <div v-if="form.image" class="relative group">
              <img :src="form.image" class="w-20 h-20 object-cover rounded-md border border-gray-300 shadow-sm bg-white">
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
        <UButton @click="save" color="primary" class="font-bold px-6">{{ isEditing ? 'Salva Modifiche' : 'Crea Prodotto' }}</UButton>
        <UButton v-if="isEditing" @click="reset" color="gray" class="bg-gray-600 text-white hover:bg-gray-200 transition-colors font-bold"  variant="solid">Annulla</UButton>
      </div>
    </div>

    <ul class="space-y-3">
      <li v-for="p in list" :key="p.id" 
          class="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
        
        <div class="flex items-center gap-4 mb-3 md:mb-0 w-full">
          <img v-if="p.image" :src="p.image" class="w-12 h-12 rounded-md object-cover bg-gray-300 border border-gray-200 shrink-0" />
          <div v-else class="w-12 h-12 rounded-md bg-gray-200 flex items-center justify-center text-gray-400 shrink-0">
            <UIcon name="i-heroicons-photo" />
          </div>

          <div>
            <span class="font-bold text-gray-900 block text-lg leading-tight">{{ p.name }}</span>
            <div class="flex flex-wrap items-center gap-2 mt-1">
              <span class="text-xs font-bold uppercase tracking-wide bg-gray-200 text-gray-800 px-2 py-0.5 rounded">{{ p.type }}</span>
              <span class="text-sm font-bold text-black">{{ p.price }}€</span>
            </div>
          </div>
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
    

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { ProductsClient } from '~/api/products_client' 
import { ProductType } from '~/types/entities/products' 
// IMPORT UPLOAD
import { supabase } from '~/api/supabase'

const productOptions = Object.values(ProductType).map(value => ({
  label: value.charAt(0).toUpperCase() + value.slice(1),
  value: value
}))

const list = ref([])
const isEditing = ref(false)

// Variabili Upload
const isUploading = ref(false)
const uploadSuccess = ref(false)
const fileInput = ref(null)

const form = ref({ 
  id: null, 
  name: '', 
  description: '', 
  price: 0, 
  type: Object.values(ProductType)[0] || 'order', 
  image: '' 
})

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
  list.value = await ProductsClient.getAll()
}

// LOGICA UPLOAD (Cartella 'products')
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
    alert("Inserisci prima il 'Nome Prodotto' per poter caricare la foto.")
    event.target.value = ''
    return
  }

  isUploading.value = true
  uploadSuccess.value = false

  try {
    const fileExt = file.name.split('.').pop()
    const slugName = generateSlug(form.value.name)
    
    // PERCORSO: products/nome-prodotto.ext
    const filePath = `products/${slugName}.${fileExt}`

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

const save = async () => {
  if (!form.value.name) return alert("Il nome prodotto è obbligatorio")

  try {
    const payload = { ...form.value }
    delete payload.id 
    
    if (isEditing.value) {
      await ProductsClient.update(form.value.id, payload)
    } else {
      await ProductsClient.create(payload)
    }
    reset()
    loadData()
  } catch (e) { alert('Errore: ' + e.message) }
}

const remove = async (id) => {
  if(confirm('Eliminare prodotto?')) {
    await ProductsClient.delete(id)
    loadData()
  }
}

const edit = (item) => {
  form.value = { ...item }
  isEditing.value = true
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

const reset = () => {
  form.value = { 
    id: null, 
    name: '', 
    description: '', 
    price: 0, 
    type: Object.values(ProductType)[0] || 'order', 
    image: '' 
  }
  isEditing.value = false
  uploadSuccess.value = false
}

onMounted(loadData)
</script>