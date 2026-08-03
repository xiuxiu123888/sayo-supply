<script setup lang="ts">
import { computed } from 'vue';
import { useLanguage } from '../i18n';
import case1 from '../assets/images/case-1.webp';
import case2 from '../assets/images/da332dab42765d4e19fbc02346467a182f4498361416b1-RUUM7I_fw658webp.webp';
import case3 from '../assets/images/19b73930259411eca5b4d6b93b7440242b9ebd69361be-lpGwuq_fw658webp.webp';

const { t } = useLanguage();

const cases = computed(() => [
  {
    title: t('cases.c1.title'),
    client: t('cases.c1.client'),
    route: t('cases.c1.route'),
    mode: t('cases.c1.mode'),
    desc: t('cases.c1.desc'),
    image: case1,
  },
  {
    title: t('cases.c2.title'),
    client: t('cases.c2.client'),
    route: t('cases.c2.route'),
    mode: t('cases.c2.mode'),
    desc: t('cases.c2.desc'),
    image: case2,
  },
  {
    title: t('cases.c3.title'),
    client: t('cases.c3.client'),
    route: t('cases.c3.route'),
    mode: t('cases.c3.mode'),
    desc: t('cases.c3.desc'),
    image: case3,
  },
]);
</script>

<template>
  <section id="cases" class="py-8 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">{{ t('cases.title') }}</h2>
          <div class="w-12 h-1 bg-blue-600 mt-4 rounded-full" />
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div
          v-for="item in cases"
          :key="item.title"
          class="group flex flex-col rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-all bg-white"
        >
          <div class="relative h-56 overflow-hidden">
            <img
              :src="item.image"
              :alt="item.title"
              loading="lazy"
              decoding="async"
              class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/30 to-transparent" />
            <div class="absolute bottom-5 left-5 right-5 flex justify-between items-end">
              <div>
                <span class="px-2.5 py-1 bg-blue-600 text-white text-sm uppercase rounded mb-2 inline-block font-bold tracking-wider">
                  {{ item.mode }}
                </span>
                <h3 class="text-white font-bold text-lg leading-tight">{{ item.title }}</h3>
              </div>
            </div>
          </div>
          <div class="p-6 flex flex-col flex-1">
            <div class="flex items-center gap-3 mb-4 flex-wrap">
              <span class="text-slate-600 text-sm font-semibold bg-slate-100 px-2.5 py-1 rounded">{{ item.client }}</span>
              <span class="text-blue-600 text-sm font-bold">{{ item.route }}</span>
            </div>
            <p class="text-slate-500 text-sm leading-relaxed flex-1">
              {{ item.desc }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
