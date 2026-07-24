<script setup lang="ts">
import { ArrowRight, Search } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import bgImage from '../assets/images/eurasian_railway_abstract_map_1784887379463.jpg';

const { t } = useLanguage();
</script>

<template>
  <section id="home" class="relative h-[90vh] min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-50 pt-32">
    <div class="absolute inset-0">
      <img
        :src="bgImage"
        alt="Eurasian Railway Abstract Map"
        class="w-full h-full object-cover opacity-15 mix-blend-multiply"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-slate-50 via-slate-50/60 to-slate-50/80" />
    </div>

    <div class="absolute inset-0 opacity-20 pointer-events-none">
      <div class="absolute top-10 left-10 w-96 h-96 rounded-full" />
      <div class="absolute -bottom-20 -right-20 w-[600px] h-[600px] rounded-full" />
      <div class="absolute top-1/2 left-1/4 w-full h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent -rotate-12" />
      <div class="absolute top-1/3 left-1/3 w-full h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent -rotate-6" />
    </div>

    <div class="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-16 flex flex-col items-center">
      <div class="inline-block px-6 py-2 bg-blue-100 text-blue-600 text-sm font-bold uppercase tracking-widest rounded-full mb-6 animate-fade-up">
        {{ t('hero.tagline') }}
      </div>

      <h1 class="text-4xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 leading-tight mb-6 animate-fade-up [animation-delay:100ms]">
        {{ t('hero.title1') }}
        <br />
        <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-blue-400">
          {{ t('hero.title2') }}
        </span>
      </h1>

      <p class="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed animate-fade-up [animation-delay:200ms]">
        {{ t('hero.desc1') }}
        <br />
        {{ t('hero.desc2') }}
      </p>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12 w-full animate-fade-up [animation-delay:300ms]">
        <div class="bg-white/60 backdrop-blur-md p-8 rounded-2xl text-left flex flex-col">
          <h3 class="font-bold text-slate-900 mb-2">{{ t('hero.adv1.title') }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ t('hero.adv1.desc') }}</p>
        </div>
        <div class="bg-white/60 backdrop-blur-md p-8 rounded-2xl text-left flex flex-col">
          <h3 class="font-bold text-slate-900 mb-2">{{ t('hero.adv2.title') }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ t('hero.adv2.desc') }}</p>
        </div>
        <div class="bg-white/60 backdrop-blur-md p-8 rounded-2xl text-left flex flex-col">
          <h3 class="font-bold text-slate-900 mb-2">{{ t('hero.adv3.title') }}</h3>
          <p class="text-sm text-slate-600 leading-relaxed">{{ t('hero.adv3.desc') }}</p>
        </div>
      </div>

      <div class="flex flex-col sm:flex-row justify-center gap-4 animate-fade-up [animation-delay:400ms]">
        <a
          href="#contact"
          class="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-white bg-orange-500 rounded-full hover:bg-orange-600 transition-all"
        >
          {{ t('hero.btn.consult') }}
          <ArrowRight class="ml-2 w-4 h-4" />
        </a>
        <a
          href="#network"
          class="inline-flex items-center justify-center px-8 py-3 text-sm font-semibold text-slate-600 bg-white rounded-full hover:bg-slate-50 transition-all"
        >
          {{ t('hero.btn.routes') }}
          <Search class="ml-2 w-4 h-4" />
        </a>
      </div>
    </div>
  </section>
</template>
