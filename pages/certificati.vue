<template>
  <Main>
    <div class="pt-32 pb-24 min-h-screen bg-gray-50">
      <UContainer>
        
        <div class="mb-16">
          <div class="text-center max-w-3xl mx-auto mb-12">
            <h1 class="text-4xl font-bold text-primary mb-4">Carica il tuo Certificato</h1>
            <p class="text-xl text-gray-500">Invia la tua documentazione medica in modo rapido e sicuro per partecipare alle attività della Beach Volley Tirrenia Academy.</p>
          </div>

          <div class="max-w-4xl mx-auto relative mb-16">
            <div class="absolute -inset-1 bg-gradient-to-r from-primary to-orange-400 rounded-3xl blur opacity-20"></div>
            
            <div class="relative bg-white rounded-3xl shadow-lg overflow-hidden border border-gray-100/50 p-8 md:p-10">
              <div class="flex flex-col md:flex-row items-center gap-8">
                <div class="bg-primary/10 p-5 rounded-full text-primary flex-shrink-0">
                  <UIcon name="i-heroicons-shield-check" class="w-12 h-12" />
                </div>
                
                <div class="text-center md:text-left">
                  <h3 class="text-2xl font-bold text-gray-800 mb-3">Prima di iniziare</h3>
                  <p class="text-gray-600 leading-relaxed mb-4">
                    Per garantire la massima sicurezza dei tuoi dati sanitari, il caricamento avviene tramite i server crittografati di Google. 
                    Ti verrà richiesto di accedere con un <strong>Account Google</strong>.
                  </p>
                  
                  <div class="flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
                    <UButton 
                      to="/policy" 
                      target="_blank"
                      color="gray" 
                      variant="ghost" 
                      class="text-primary hover:bg-primary/10 font-medium px-4 py-2"
                    >
                      <UIcon name="i-heroicons-document-text" class="w-5 h-5 mr-2" />
                      Leggi l'Informativa Privacy
                    </UButton>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div class="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100/50 relative">
            <div v-if="isLoading" class="absolute inset-0 flex flex-col items-center justify-center bg-gray-50 z-0">
              <UIcon name="i-heroicons-arrow-path" class="w-12 h-12 text-primary animate-spin mb-4" />
              <p class="text-gray-500 font-medium animate-pulse">Caricamento modulo in corso...</p>
            </div>

            <iframe 
              src="https://docs.google.com/forms/d/e/1FAIpQLSeKVVrVwKL2q4jxAr7024JX3U54hqCBtHEO0VAQFXU23--sbw/viewform?embedded=true" 
              width="100%" 
              height="800" 
              frameborder="0" 
              marginheight="0" 
              marginwidth="0"
              @load="isLoading = false"
              class="relative z-10 bg-white"
            ></iframe>
          </div>

          <div class="text-center mt-12">
             <UButton 
              @click="openModal"
              variant="link"
              class="text-gray-500 hover:text-primary transition-colors font-medium text-lg"
            >
              Problemi con il caricamento? Contattaci
            </UButton>
          </div>

        </div>
      </UContainer>
    </div>

    <Teleport to="body">
      <div v-if="isOpen" class="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
        
        <div 
          class="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
          @click="closeModal"
        ></div>

        <div class="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fade-in-up">
          
          <div class="bg-gray-50 p-6 border-b border-gray-100 flex justify-between items-center">
            <div>
              <h3 class="text-xl font-bold text-gray-900">Supporto Tecnico</h3>
              <p class="text-sm text-gray-500 mt-1">Non riesci a caricare il certificato?</p>
            </div>
            <button 
              @click="closeModal"
              class="text-gray-400 hover:text-red-500 p-2 rounded-full hover:bg-white transition-colors"
            >
              <UIcon name="i-heroicons-x-mark" class="w-6 h-6" />
            </button>
          </div>

          <div class="p-8 space-y-6">

            <a 
              :href="whatsappLink" 
              target="_blank"
              class="flex items-center p-4 rounded-xl border-2 border-transparent bg-green-50 hover:border-green-200 hover:bg-green-100 transition-all group"
            >
              <div class="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm text-green-600 mr-4 group-hover:scale-110 transition-transform">
                <UIcon name="i-heroicons-chat-bubble-oval-left-ellipsis" class="w-6 h-6" />
              </div>
              <div>
                <h4 class="font-bold text-gray-900">Scrivici su WhatsApp</h4>
                <p class="text-sm text-gray-600">Ti aiuteremo passo dopo passo.</p>
              </div>
              <UIcon name="i-heroicons-arrow-up-right" class="w-5 h-5 text-gray-400 ml-auto group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
            </a>
            
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
                  {{ emailCopied ? 'Indirizzo Copiato!' : 'Inviaci una Email' }}
                </h4>
                <p class="text-sm text-gray-600">
                  {{ emailCopied ? 'Incolla nella tua mail preferita.' : 'Invia il documento via email.' }}
                </p>
              </div>
              
              <UIcon 
                v-if="!emailCopied"
                name="i-heroicons-document-duplicate" 
                class="w-5 h-5 text-gray-400 ml-auto group-hover:text-primary group-hover:scale-110 transition-all" 
              />
            </div>

          </div>
        </div>
      </div>
    </Teleport>

  </Main>
</template>

<script setup>
import { ref } from 'vue';
import { useHead } from '#imports';
import Main from "@/components/layout/Main.vue";

const isLoading = ref(true);

const whatsappNumber = "393313494020";
const textMsg = "Ciao! Ho un problema con il caricamento del mio certificato medico sul sito.";
const whatsappLink = "https://wa.me/" + whatsappNumber + "?text=" + encodeURIComponent(textMsg);

useHead({
  title: 'Caricamento Certificato Medico | BVTA',
  meta: [
    { name: 'description', content: 'Invia il tuo certificato medico sportivo in modo rapido e sicuro per partecipare alle attività della Beach Volley Tirrenia Academy.' },
    { property: 'og:title', content: 'Caricamento Certificato Medico | BVTA' },
    { property: 'og:description', content: 'Procedura di upload sicuro dei documenti sanitari.' }
  ],
  link: [
    { rel: 'canonical', href: 'https://www.beachvolleytirreniacademy.it/certificati' },
    { rel: 'icon', type: 'image/png', href: '/favicon.png' } 
  ]
});

const isOpen = ref(false);
const emailCopied = ref(false);

const openModal = () => {
  isOpen.value = true;
  document.body.style.overflow = 'hidden';
  emailCopied.value = false;
};

const closeModal = () => {
  isOpen.value = false;
  document.body.style.overflow = '';
};

const copyEmail = async () => {
  try {
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com');
    emailCopied.value = true;
    setTimeout(() => {
      emailCopied.value = false;
    }, 3000);
  } catch (err) {
    console.error('Impossibile copiare il testo: ', err);
    alert('Email: beachvolleytirreniacademy@gmail.com');
  }
};
</script>

<style scoped>
.animate-fade-in-up {
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
</style>