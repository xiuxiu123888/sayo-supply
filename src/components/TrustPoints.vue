<script setup lang="ts">
import { computed } from 'vue';
import { TrainFront, Layers, ShieldCheck } from 'lucide-vue-next';
import { useLanguage } from '../i18n';

const { t } = useLanguage();

const points = computed(() => [
  { title: t('whyus.p1.title'), desc: t('whyus.p1.desc'), icon: TrainFront },
  { title: t('whyus.p2.title'), desc: t('whyus.p2.desc'), icon: Layers },
  { title: t('whyus.p3.title'), desc: t('whyus.p3.desc'), icon: ShieldCheck },
]);
</script>

<template>
  <section class="py-14 md:py-16 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div
          v-for="item in points"
          :key="item.title"
          class="flex gap-4"
        >
          <component :is="item.icon" class="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
          <div>
            <h3 class="text-sm font-bold text-slate-900 mb-2">{{ item.title }}</h3>
            <p class="text-sm text-slate-600 leading-relaxed">{{ item.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
