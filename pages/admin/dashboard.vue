<script setup>
definePageMeta({
  middleware: 'auth'
})

import adminNewsManager from "@/components/sections/admin/adminNewsManager.vue";
import adminLocationManager from "@/components/sections/admin/adminLocationManager.vue";
import adminEventManager from "@/components/sections/admin/adminEventManager.vue";
import adminTeamManager from "@/components/sections/admin/adminTeamManager.vue";
import adminPlacementManager from "@/components/sections/admin/adminPlacementManager.vue";
import adminProductManager from "@/components/sections/admin/adminProductManager.vue";

const items = [
  { label: 'News', slot: 'news' },
  { label: 'Eventi', slot: 'events' },
  { label: 'Squadre', slot: 'teams' },
  { label: 'Piazzamenti', slot: 'placements' },
  { label: 'Prodotti', slot: 'products' },
  { label: 'Location', slot: 'locations' }
]
</script>

<template>
  <main class="min-h-screen bg-gray-50 p-8">
    <div class="max-w-7xl mx-auto">
      <div class="flex justify-between items-center mb-8">
        <h1 class="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <NuxtLink to="/" class="text-primary hover:underline">Vai al sito</NuxtLink>
      </div>

      <UTabs 
        :items="items" 
        class="w-full"
        :ui="{
          list: {
            // Sfondo della barra grigio chiaro (invece che trasparente o default)
            background: 'bg-gray-200 dark:bg-gray-800',
            marker: { 
              // FORZA L'ARANCIONE SUL MARKER CHE SI MUOVE
              background: '!bg-[#FD7F00]',
              shadow: 'shadow-sm'
            },
            tab: { 
              // Forza il testo bianco quando attivo, grigio scuro quando inattivo
              active: '!text-white !bg-[#FD7F00]',
              inactive: 'text-gray-600 hover:text-gray-900',
              height: 'h-10',
              font: 'font-bold'
            }
          }
        }"
      >
        
        <template #news>
          <adminNewsManager />
        </template>

        <template #events>
          <adminEventManager />
        </template>
        
        <template #teams>
           <adminTeamManager />
        </template>

        <template #placements>
           <adminPlacementManager />
        </template>

        <template #products>
           <adminProductManager />
        </template>

        <template #locations>
           <adminLocationManager />
        </template>

      </UTabs>
    </div>
</main>
</template>