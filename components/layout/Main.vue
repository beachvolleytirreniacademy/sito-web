<template>
    <div class="min-h-screen flex flex-col bg-white overflow-x-hidden">
      <Header />
      <div class="pt-16 flex-grow">
        <slot />
      </div>
      <Footer id="contact" />
    </div>
  </template>
  
  <script setup>
  import Header from "@/components/layout/Header.vue";
  import Footer from "@/components/layout/Footer.vue";
  </script>