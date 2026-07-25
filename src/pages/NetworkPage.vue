<script setup lang="ts">
import Network from '../components/Network.vue';
import { useLanguage } from '../i18n';
import mapBg from '../assets/images/eurasian_railway_abstract_map_1784887379463.jpg';

const { t } = useLanguage();
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <section class="py-16 md:py-20 text-slate-900 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="mapBg"
          alt="欧亚大陆铁路网"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-white/45" />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="animate-fade-up">
          <h1 class="text-[38px] font-bold mb-6 text-slate-900">{{ t('network.page.title') }}</h1>
          <div class="w-16 h-1.5 bg-blue-600 rounded-full mb-8" />
          <p class="text-xl md:text-2xl text-slate-600 font-light leading-relaxed text-balance">
            {{ t('network.desc') }}
          </p>
        </div>
      </div>
    </section>

    <Network hide-header />
  </div>
</template>
