<template lang="">
    <Main>
        <HeroSection id="hero" />
        <UpcomingEventSection 
            v-if="hasUpcomingEvents" 
            id="events" 
        />
        <PartnersSection id="partners" />
        <AboutSection id="about" />
        <StatsSection id="stats" />
        <NewsSection id="news" />
        <GallerySection id="gallery" />
        <ContactSection id="contact" />
    </Main>
</template>
<script setup>
import Main from "@/components/layout/Main.vue";
import HeroSection from "@/components/sections/HeroSection.vue";
import AboutSection from "@/components/sections/AboutSection.vue";
import StatsSection from "@/components/sections/StatsSection.vue";
import NewsSection from "@/components/sections/NewsSection.vue";
import PartnersSection from "@/components/sections/PartnersSection.vue";
import ContactSection from "@/components/sections/ContactSection.vue";
import UpcomingEventSection from "@/components/sections/UpcomingEventSection.vue";
import GallerySection from "@/components/sections/GallerySection.vue";
import PastEventsSection from "@/components/sections/PastEventsSection.vue";
</script>