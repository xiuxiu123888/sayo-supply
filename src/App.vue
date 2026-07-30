<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Navbar from './components/Navbar.vue';
import Footer from './components/Footer.vue';

const route = useRoute();
const isAdmin = computed(() => Boolean(route.meta.admin));
</script>

<template>
  <div class="font-sans text-slate-900 bg-white flex flex-col min-h-screen">
    <template v-if="isAdmin">
      <RouterView />
    </template>
    <template v-else>
      <Navbar />
      <main class="flex-grow">
        <RouterView />
      </main>
      <Footer />
    </template>
  </div>
</template>
