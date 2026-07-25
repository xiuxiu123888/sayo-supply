<script setup lang="ts">
import { ArrowRight, Search } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import bgImage from '../assets/images/f31e33dde77a92d0c0b88e937e1f229dab52a52c351e2-52DxCA_fw658webp.webp';

const { t } = useLanguage();
</script>

<template>
  <section id="home" class="relative overflow-hidden bg-white">
    <!-- First viewport: copy + full-bleed photo -->
    <div class="relative min-h-[78vh] flex items-center pt-28 pb-16 md:pt-32">
      <div class="absolute inset-0">
        <img
          :src="bgImage"
          alt="集装箱堆场"
          class="w-full h-full object-cover object-[68%_center]"
        />
        <!-- Keep photo vivid on the right; solid readable area on the left -->
        <div
          class="absolute inset-0 bg-gradient-to-r from-white from-0% via-white/95 via-35% to-white/40 to-75% md:to-65%"
        />
        <div class="absolute inset-0 bg-gradient-to-t from-white via-transparent to-white/40 md:to-transparent" />
      </div>

      <div class="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-xl text-left animate-fade-up">
          <p class="text-sm font-semibold text-blue-600 tracking-wide mb-2">
            {{ t('hero.tagline') }}
          </p>
          <p class="text-sm text-slate-500 mb-5">{{ t('hero.tagline.en') }}</p>

          <h1 class="text-[38px] font-extrabold text-slate-900 leading-tight mb-5 text-balance">
            {{ t('hero.title1') }}<span class="text-blue-600">{{ t('hero.title2') }}</span>
          </h1>

          <p class="text-lg text-slate-600 mb-8 leading-relaxed text-balance">
            {{ t('hero.desc1') }}
          </p>

          <div class="flex flex-col sm:flex-row gap-3">
            <a
              href="#contact"
              class="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all"
            >
              {{ t('hero.btn.consult') }}
              <ArrowRight class="ml-2 w-4 h-4" />
            </a>
            <RouterLink
              to="/services"
              class="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-slate-700 bg-white rounded-full hover:bg-slate-50 transition-all border border-slate-200"
            >
              {{ t('hero.btn.routes') }}
              <Search class="ml-2 w-4 h-4" />
            </RouterLink>
          </div>
        </div>
      </div>
    </div>

    <!-- Advantages sit below the photo plane, not on top of it -->
    <div class="relative z-10 bg-white border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12">
        <div>
          <h3 class="font-bold text-slate-900 mb-2">{{ t('hero.adv1.title') }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ t('hero.adv1.desc') }}</p>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 mb-2">{{ t('hero.adv2.title') }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ t('hero.adv2.desc') }}</p>
        </div>
        <div>
          <h3 class="font-bold text-slate-900 mb-2">{{ t('hero.adv3.title') }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ t('hero.adv3.desc') }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
