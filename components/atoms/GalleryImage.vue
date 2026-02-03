<template>
    <div 
      class="group relative overflow-hidden cursor-pointer h-full"
      :class="[
        variant === 'double' ? 'aspect-[3/4]' : 
        variant === 'wide' ? 'aspect-[16/9]' : 
        'aspect-square'
      ]"
      @click="$emit('preview')"
    >
      <img 
        :src="src" 
        :alt="alt"
        class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
  </template>
  
  <script setup>
  defineProps({
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    variant: {
      type: String,
      default: 'medium', // 'double', 'medium', or 'wide'
      validator: (value) => ['double', 'medium', 'wide'].includes(value)
    }
  })
  
  defineEmits(['preview'])
  </script>