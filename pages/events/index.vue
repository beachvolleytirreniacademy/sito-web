<template lang="">
    <Main>
        <UpcomingEventSection id="events" />
        <PastEventsSection id="pastEvents" />
        
    </Main>
</template>
<script setup>
import Main from "@/components/layout/Main.vue";
import UpcomingEventSection from "@/components/sections/UpcomingEventSection.vue";
import PastEventsSection from "@/components/sections/PastEventsSection.vue";
</script>