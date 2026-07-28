<script setup lang="ts">
import yardBg from '../assets/images/f31e33dde77a92d0c0b88e937e1f229dab52a52c351e2-52DxCA_fw658webp.webp';

defineProps<{
  title: string;
}>();
</script>

<template>
  <section class="py-16 md:py-20 text-slate-900 relative overflow-hidden">
    <div class="absolute inset-0">
      <img
        :src="yardBg"
        alt=""
        class="w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-linear-to-r from-white via-white/88 to-white/55" />
    </div>
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="animate-fade-up">
        <h1 class="text-[38px] font-bold mb-6 text-slate-900">{{ title }}</h1>
        <div class="w-16 h-1.5 bg-blue-600 rounded-full" />
      </div>
    </div>
  </section>
</template>
