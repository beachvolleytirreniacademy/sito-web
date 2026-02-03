<template>
  <section id="shop" class="py-20 bg-gray-50">
    <UContainer>
      
      <div class="text-center mb-12">
        <h2 class="text-3xl font-bold mb-4 text-primary">BVTA Shop</h2>
        <p class="text-gray-600 max-w-2xl mx-auto">
          Il merchandising ufficiale Beach Volley Tirrenia Academy e le occasioni uniche dal nostro magazzino.
        </p>
      </div>

      <div v-if="fetchLoading" class="text-center py-12 text-gray-500">
        Caricamento prodotti...
      </div>

      <div v-else-if="products.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <div 
          v-for="product in products" 
          :key="product.id" 
          class="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-gray-100 hover:shadow-lg transition-shadow duration-300"
        >
          
          <div class="relative h-64 overflow-hidden bg-gray-100 group">
            <span 
              v-if="product.type === 'vinted'" 
              class="absolute top-2 right-2 z-10 bg-teal-600 text-white text-xs font-bold px-2 py-1 rounded shadow-sm"
            >
              Ultimi pezzi
            </span>
            <span 
              v-else 
              class="absolute top-2 right-2 z-10 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded shadow-sm"
            >
              Su Ordinazione
            </span>
            
            <img 
              :src="product.image || 'https://placehold.co/600x600?text=BVTA+Shop'" 
              :alt="product.name" 
              class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          <div class="p-5 flex-grow flex flex-col justify-between">
            <div>
              <h3 class="font-bold text-lg mb-1 text-gray-800">{{ product.name }}</h3>
              <p class="text-sm text-gray-500 mb-4 line-clamp-2">{{ product.description }}</p>
            </div>
            
            <div class="flex items-center justify-between mt-auto">
              <span class="font-bold text-xl text-primary">{{ product.price }} €</span>
              
              <UButton 
                v-if="product.type === 'order'" 
                @click="openOrderModal(product)"
                class="bg-primary text-white hover:bg-primary-dark hover:text-white transition-colors duration-300 px-6"
                variant="solid"
                size="sm"
              >
                Ordina
              </UButton>
              
              <a 
                v-else 
                :href="vintedProfileUrl" 
                target="_blank"
                class="text-teal-600 text-sm font-semibold hover:underline flex items-center gap-1"
              >
                Vai su Vinted <UIcon name="i-heroicons-arrow-top-right-on-square" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div v-else class="text-center py-16">
        <div class="bg-gray-100 p-6 rounded-full inline-block mb-4">
          <UIcon name="i-heroicons-shopping-bag" class="w-12 h-12 text-gray-400" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">Al momento nessun prodotto ordinabile</h3>
        <p class="text-gray-500">Tornate a trovarci presto per le nuove collezioni!</p>
      </div>

      <div class="mt-16 text-center border-t border-gray-200 pt-12">
        <h3 class="text-2xl font-bold mb-3 text-gray-800">Cerchi taglie uniche o occasioni?</h3>
        <p class="mb-8 text-gray-600">Gestiamo tutto il materiale "pronta consegna" e le rimanenze dei tornei direttamente sul nostro profilo Vinted.</p>
        <UButton 
          :to="vintedProfileUrl" 
          target="_blank"
          color="teal"
          size="xl"
          class="bg-teal-600 font-bold px-8 shadow-lg hover:-translate-y-1 transition-transform"
        >
          Visita il nostro Vinted
        </UButton>
      </div>

    </UContainer>

    <Teleport to="body">
      <div v-if="showModal" class="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        
        <div class="absolute inset-0" @click="closeModal"></div>

        <div class="bg-white rounded-xl shadow-2xl max-w-lg w-full p-0 relative animate-fade-in flex flex-col max-h-[90vh] overflow-hidden z-10">
          
          <div class="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Come ordinare</h3>
              <p class="text-sm text-gray-500 mt-1">
                Prodotto: <span class="font-semibold text-primary">{{ selectedProduct?.name }}</span>
              </p>
            </div>
            <button @click="closeModal" class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors">
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-8 space-y-6 overflow-y-auto">
            <p class="text-gray-600 text-sm mb-4">
              Per completare l'ordine, contattaci direttamente indicando la <strong>taglia</strong> e la <strong>quantità</strong> desiderata. Ti confermeremo la disponibilità immediatamente.
            </p>

            <div 
              @click="copyEmail"
              class="flex items-center p-4 rounded-xl border-2 border-transparent bg-primary/5 hover:border-primary/30 hover:bg-primary/10 transition-all group cursor-pointer"
            >
              <div 
                class="w-12 h-12 rounded-full flex items-center justify-center shadow-sm mr-4 transition-all duration-300"
                :class="emailCopied ? 'bg-green-500 text-white scale-110' : 'bg-white text-primary group-hover:scale-110'"
              >
                <UIcon :name="emailCopied ? 'i-heroicons-check' : 'i-heroicons-envelope'" class="w-6 h-6" />
              </div>
              
              <div>
                <h4 class="font-bold text-gray-900">
                  {{ emailCopied ? 'Indirizzo Copiato!' : 'Scrivici una mail' }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ emailCopied ? 'Incolla nella tua mail.' : 'beachvolleytirreniacademy@gmail.com' }}
                </p>
              </div>
              
              <UIcon 
                v-if="!emailCopied"
                name="i-heroicons-document-duplicate" 
                class="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary group-hover:scale-110 transition-all" 
              />
            </div>

            <a 
              :href="getWhatsappLink()" 
              target="_blank"
              class="flex items-center p-4 rounded-xl border-2 border-transparent bg-green-50 hover:border-green-200 hover:bg-green-100 transition-all group"
            >
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600 mr-4 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Ordina su WhatsApp</h4>
                <p class="text-sm text-gray-600">Messaggio precompilato con il prodotto.</p>
              </div>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </a>

          </div>

          <div class="bg-gray-50 p-4 text-center border-t border-gray-100">
            <p class="text-xs text-gray-400">
              Pagamenti accettati: Bonifico, Paypal o contanti alla consegna.
            </p>
          </div>

        </div>
      </div>
    </Teleport>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { supabase } from '~/supabase.js';

// CONFIGURAZIONE
const vintedProfileUrl = "https://www.vinted.it/member/3133809858"; 
const whatsappNumber = "393403336499"; // Sostituisci col numero corretto

// STATO DATI
const products = ref([]);
const fetchLoading = ref(true);

// STATO MODALE
const showModal = ref(false);
const selectedProduct = ref(null);
const emailCopied = ref(false);

// RECUPERO DATI DAL DB
const getProducts = async () => {
  try {
    fetchLoading.value = true;
    
    let { data, error } = await supabase
      .from('products')
      .select('*')
      .order('id'); 

    if (error) throw error;
    products.value = data || [];
  } catch (e) {
    console.error('Errore caricamento prodotti:', e);
  } finally {
    fetchLoading.value = false;
  }
};

// GESTIONE MODALE
const openOrderModal = (product) => {
  selectedProduct.value = product;
  emailCopied.value = false;
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
  selectedProduct.value = null;
};

// FUNZIONE COPIA EMAIL
const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com');
    emailCopied.value = true;
    setTimeout(() => {
      emailCopied.value = false;
    }, 3000);
  } catch (err) {
    alert('Email: beachvolleytirreniacademy@gmail.com');
  }
};

// FUNZIONE LINK WHATSAPP DINAMICO
const getWhatsappLink = () => {
  if (!selectedProduct.value) return "#";
  
  const text = `Ciao! Vorrei ordinare questo prodotto: ${selectedProduct.value.name} (${selectedProduct.value.price}).`;
  return `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
};

onMounted(() => {
  getProducts();
});
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-out;
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>