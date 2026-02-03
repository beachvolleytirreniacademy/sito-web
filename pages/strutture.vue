<template>
  <Main>
    <div class="pt-32 pb-16 min-h-screen bg-gray-50">
      <UContainer>
        
        <div class="text-center max-w-3xl mx-auto mb-16">
          <h1 class="text-4xl font-bold text-primary mb-4">{{ content.title }}</h1>
          <p class="text-xl text-gray-500">{{ content.description }}</p>
        </div>

        <div class="flex flex-col gap-16 sm:gap-24">
          <div 
            v-for="(location, index) in content.locations" 
            :key="location.id"
            class="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center" 
            :class="{ 'lg:flex-row-reverse': index % 2 !== 0 }"
          >
            <div class="w-full lg:w-1/2">
              <div class="relative rounded-2xl overflow-hidden shadow-2xl group h-64 sm:h-[400px]">
                <img 
                  :src="location.imageUrl" 
                  :alt="location.name"
                  class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                >
                <div class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </div>

            <div class="w-full lg:w-1/2 space-y-6">
              <h2 class="text-3xl font-bold text-background-primary">{{ location.name }}</h2>
              
              <a 
                :href="location.mapLink" 
                target="_blank" 
                class="inline-flex items-center text-primary hover:underline font-medium"
              >
                <UIcon name="i-heroicons-map-pin" class="w-5 h-5 mr-2" />
                {{ location.address }}
              </a>

              <p class="text-gray-600 text-lg leading-relaxed">
                {{ location.description }}
              </p>

              <div class="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 class="font-bold text-gray-900 mb-4 flex items-center">
                  <UIcon name="i-heroicons-check-badge" class="w-5 h-5 mr-2 text-primary" />
                  Servizi Disponibili
                </h3>
                <ul class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <li 
                    v-for="feature in location.features" 
                    :key="feature"
                    class="flex items-center text-gray-600 text-sm"
                  >
                    <div class="w-2 h-2 rounded-full bg-primary mr-3"></div>
                    {{ feature }}
                  </li>
                </ul>
              </div>

            
            </div>
          </div>
        </div>

      </UContainer>
    </div>
  </Main>
</template>

<script setup>
import Main from "@/components/layout/Main.vue";
import locationsContent from '~/content/locations.json'

const content = locationsContent
</script>