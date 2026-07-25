<script setup lang="ts">
import { useLanguage } from '../i18n';

const { t } = useLanguage();
</script>

<template>
  <div class="bg-white px-4 sm:px-6 lg:px-8 py-8 z-20 relative shadow-sm border-y border-slate-100">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
      <div class="flex items-center gap-8 md:gap-16 w-full md:w-auto overflow-x-auto pb-4 md:pb-0 scrollbar-hide">
        <div class="flex flex-col min-w-max">
          <span class="text-3xl font-bold text-slate-800">40+</span>
          <span class="text-slate-500 text-sm mt-1">{{ t('stats.countries') }}</span>
        </div>
        <div class="w-px h-10 bg-slate-200 hidden md:block" />
        <div class="flex flex-col min-w-max">
          <span class="text-3xl font-bold text-slate-800">10,000+</span>
          <span class="text-slate-500 text-sm mt-1">{{ t('stats.clients') }}</span>
        </div>
        <div class="w-px h-10 bg-slate-200 hidden md:block" />
        <div class="flex flex-col min-w-max">
          <span class="text-3xl font-bold text-slate-800">99.8%</span>
          <span class="text-slate-500 text-sm mt-1">{{ t('stats.delivery') }}</span>
        </div>
      </div>
      <div class="flex gap-4 items-center shrink-0">
        <div class="flex -space-x-2">
          <img class="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&q=80" alt="Client 1" />
          <img class="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=100&q=80" alt="Client 2" />
          <img class="w-8 h-8 rounded-full border-2 border-white object-cover shadow-sm" src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=100&q=80" alt="Client 3" />
        </div>
        <p class="text-sm text-slate-600 flex flex-col">
          <span class="font-bold italic">{{ t('stats.quote') }}</span>
          <span class="opacity-60 text-sm mt-0.5">{{ t('stats.trusted') }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
