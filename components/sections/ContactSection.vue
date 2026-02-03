<template>
  <section class="py-24 bg-background-primary">
    <UContainer>
      <div class="max-w-5xl mx-auto animate-fade-in">
        
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-primary mb-4">
            Contattaci
          </h2>
          <p class="text-xl text-gray-300">
            Siamo qui per aiutarti. Scegli il canale che preferisci.
          </p>
        </div>

        <div class="grid md:grid-cols-2 gap-6">
          
          <div 
            @click="copyEmail"
            class="group bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-primary/30 cursor-pointer"
          >
            <div 
              class="w-14 h-14 rounded-full flex items-center justify-center flex-shrink-0 mr-5 transition-colors duration-200"
              :class="emailCopied ? 'bg-green-100 text-green-600' : 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white'"
            >
              <UIcon
                :name="emailCopied ? 'i-heroicons-check' : 'i-heroicons-envelope'"
                class="w-7 h-7"
              />
            </div>
            
            <div class="flex-grow">
              <h3 
                class="text-lg font-bold text-gray-800 mb-1 transition-colors"
                :class="emailCopied ? 'text-green-600' : 'group-hover:text-blue-600'"
              >
                {{ emailCopied ? 'Indirizzo Copiato!' : 'Scrivici una mail!' }}
              </h3>
              <p class="text-sm text-gray-500 font-medium break-all sm:break-normal">
                {{ emailCopied ? 'Incolla dove preferisci' : 'beachvolleytirreniacademy@gmail.com' }}
              </p>
            </div>
            
            <UIcon 
              :name="emailCopied ? 'i-heroicons-clipboard-document-check' : 'i-heroicons-document-duplicate'" 
              class="w-5 h-5 text-gray-300 transition-all duration-200"
              :class="emailCopied ? 'opacity-100 text-green-500' : 'opacity-0 group-hover:opacity-100 group-hover:text-blue-600 transform translate-x-[-10px] group-hover:translate-x-0'"
            />
          </div>

          <a 
            href="https://www.instagram.com/_beachvolleytirreniacademy/" 
            target="_blank"
            class="group bg-white p-6 rounded-xl shadow-md border border-gray-100 flex items-center transition-all duration-200 hover:shadow-xl hover:-translate-y-1 hover:border-pink-500/30 cursor-pointer"
          >
            <div class="w-14 h-14 bg-pink-50 text-pink-600 rounded-full flex items-center justify-center flex-shrink-0 mr-5 group-hover:bg-gradient-to-tr group-hover:from-yellow-400 group-hover:via-red-500 group-hover:to-purple-500 group-hover:text-white transition-all duration-200">
              <UIcon
                name="i-heroicons-paper-airplane" 
                class="w-6 h-6 transform -rotate-45 translate-x-0.5"
              />
            </div>
            
            <div class="flex-grow">
              <h3 class="text-lg font-bold text-gray-800 mb-1 group-hover:text-pink-600 transition-colors">
                Contattaci in DM su Instagram!
              </h3>
              <p class="text-sm text-gray-500 font-medium">
                @_beachvolleytirreniacademy
              </p>
            </div>

            <UIcon name="i-heroicons-arrow-right" class="w-5 h-5 text-gray-300 group-hover:text-pink-600 transition-colors opacity-0 group-hover:opacity-100 transform translate-x-[-10px] group-hover:translate-x-0 duration-200" />
          </a>

        </div>
      </div>
    </UContainer>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const emailCopied = ref(false);

const copyEmail = async () => {
  try {
    // Copia negli appunti
    await navigator.clipboard.writeText('beachvolleytirreniacademy@gmail.com');
    
    // Attiva lo stato "Copiato"
    emailCopied.value = true;
    
    // Resetta dopo 3 secondi
    setTimeout(() => {
      emailCopied.value = false;
    }, 3000);
    
  } catch (err) {
    console.error('Errore copia:', err);
    // Fallback semplice
    alert('Email: beachvolleytirreniacademy@gmail.com');
  }
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.5s ease-out forwards;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>