<script setup lang="ts">
import { ArrowRight, TrainFront, Truck } from 'lucide-vue-next';
import { useLanguage } from '../i18n';

const { t } = useLanguage();
</script>

<template>
  <section class="py-10 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">{{ t('services.title') }}</h2>
        <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
        <p class="text-slate-600 max-w-4xl mx-auto text-sm leading-relaxed text-balance">
          {{ t('services.desc') }}
        </p>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-16">
        <div class="group flex flex-col">
          <RouterLink
            to="/crexpres"
            class="relative h-64 sm:h-80 mb-8 rounded-2xl overflow-hidden bg-slate-100 block"
          >
            <img
              src="../assets/images/62a29bdff659322ce6bd5533c497cf848e8a1ea114c012-K9A45D_fw658webp.webp"
              alt="Railway Transport"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </RouterLink>
          <div class="flex items-center justify-between gap-4 mb-4">
            <div class="flex items-center min-w-0">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 mr-4 shrink-0">
                <TrainFront class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900">{{ t('services.tab.rail') }}</h3>
            </div>
            <RouterLink
              to="/crexpres"
              class="inline-flex items-center shrink-0 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              {{ t('services.detail') }}
              <ArrowRight class="ml-1.5 w-4 h-4" />
            </RouterLink>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed flex-1">
            {{ t('services.rail.intro') }}
          </p>
        </div>

        <div class="group flex flex-col">
          <RouterLink
            to="/trucking"
            class="relative h-64 sm:h-80 mb-8 rounded-2xl overflow-hidden bg-slate-100 block"
          >
            <img
              src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&q=80&w=800"
              alt="Road Transport"
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />
          </RouterLink>
          <div class="flex items-center justify-between gap-4 mb-4">
            <div class="flex items-center min-w-0">
              <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-500 mr-4 shrink-0">
                <Truck class="w-6 h-6" />
              </div>
              <h3 class="text-2xl font-bold text-slate-900">{{ t('services.tab.truck') }}</h3>
            </div>
            <RouterLink
              to="/trucking"
              class="inline-flex items-center shrink-0 text-sm font-semibold text-amber-600 hover:text-amber-700 transition-colors"
            >
              {{ t('services.detail') }}
              <ArrowRight class="ml-1.5 w-4 h-4" />
            </RouterLink>
          </div>
          <p class="text-slate-600 text-sm leading-relaxed flex-1">
            {{ t('services.truck.intro') }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
