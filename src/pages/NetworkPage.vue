<script setup lang="ts">
import { computed } from 'vue';
import Network from '../components/Network.vue';
import { useLanguage } from '../i18n';
import { MapPin, Globe2, Building2, Ship } from 'lucide-vue-next';

const { t } = useLanguage();

const locationGroups = computed(() => [
  {
    title: t('network.r1.title'),
    locs: t('network.r1.locs') as string[],
    icon: 'hub',
  },
  {
    title: t('network.r2.title'),
    locs: t('network.r2.locs') as string[],
    icon: 'europe',
  },
  {
    title: t('network.r3.title'),
    locs: t('network.r3.locs') as string[],
    icon: 'cis',
  },
  {
    title: t('network.r4.title'),
    locs: t('network.r4.locs') as string[],
    icon: 'asia',
  },
]);
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <section class="py-8 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80"
          alt="Our Footprint Background"
          class="w-full h-full object-cover opacity-10 mix-blend-multiply"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent" />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="animate-fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 text-slate-900">{{ t('network.page.title') }}</h1>
          <div class="w-16 h-1.5 bg-blue-600 rounded-full mb-8" />
          <p class="text-xl md:text-2xl text-slate-600 font-light leading-relaxed text-balance">
            {{ t('network.desc') }}
          </p>
        </div>
      </div>
    </section>

    <Network hide-header />

    <section class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-800 mb-4">{{ t('network.regions.title') }}</h2>
          <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div
            v-for="group in locationGroups"
            :key="group.title"
            class="bg-white rounded-2xl p-8 shadow-sm border border-amber-100/40"
          >
            <div class="flex items-center gap-3 mb-4">
              <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center text-blue-600">
                <Building2 v-if="group.icon === 'hub'" class="w-6 h-6" />
                <Globe2 v-else-if="group.icon === 'europe'" class="w-6 h-6" />
                <MapPin v-else-if="group.icon === 'cis'" class="w-6 h-6" />
                <Ship v-else class="w-6 h-6" />
              </div>
              <h3 class="text-xl font-bold text-slate-800">{{ group.title }}</h3>
            </div>
            <ul class="space-y-2">
              <li
                v-for="loc in group.locs"
                :key="loc"
                class="text-slate-600 text-sm leading-relaxed flex items-start gap-2"
              >
                <span class="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />
                {{ loc }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
