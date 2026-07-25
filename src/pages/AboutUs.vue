<script setup lang="ts">
import { Anchor, Globe2, ShieldCheck, TrendingUp } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import aboutImage from '../assets/images/d281984a53eab7e08f31302e7e3c45341779d581cdb6f-2TNjih_fw658webp.webp';

const { t } = useLanguage();
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <section class="py-8 bg-slate-50 text-slate-900 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=2000&q=80"
          alt="About Us Background"
          class="w-full h-full object-cover opacity-10 mix-blend-multiply"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-slate-50 via-slate-50/90 to-transparent" />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="max-w-2xl animate-fade-up">
          <h1 class="text-4xl md:text-5xl font-bold mb-6 text-slate-900">{{ t('about.title') }}</h1>
          <div class="w-16 h-1.5 bg-blue-600 rounded-full mb-8" />
          <p class="text-xl md:text-2xl text-slate-600 font-light leading-relaxed">
            {{ t('about.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-20 md:py-32">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl font-bold text-slate-800 mb-8">{{ t('hero.tagline') }}</h2>
            <div class="space-y-6 text-slate-600 text-base md:text-lg leading-relaxed font-light">
              <p>{{ t('about.p1') }}</p>
              <p>{{ t('about.p2') }}</p>
              <p>{{ t('about.p3') }}</p>
            </div>

            <div class="mt-12 flex flex-col sm:flex-row gap-6">
              <div class="border-l-4 border-blue-600 pl-4">
                <p class="text-xl font-bold text-slate-800">{{ t('about.val1') }}</p>
              </div>
              <div class="border-l-4 border-orange-500 pl-4">
                <p class="text-xl font-bold text-slate-800">{{ t('about.val2') }}</p>
              </div>
            </div>
          </div>

          <div class="relative">
            <div class="rounded-2xl overflow-hidden shadow-2xl relative z-10 aspect-[4/5]">
              <img :src="aboutImage" alt="Warehouse and Logistics" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-blue-900/10 mix-blend-multiply" />
            </div>
            <div class="absolute -bottom-8 -left-8 w-2/3 h-2/3 bg-slate-100 rounded-2xl z-0 hidden md:block" />
            <div class="absolute -top-8 -right-8 w-1/2 h-1/2 bg-blue-50 rounded-2xl z-0 hidden md:block" />
          </div>
        </div>
      </div>
    </section>

    <section class="py-20 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-bold text-slate-800 mb-4">{{ t('whyus.title') }}</h2>
          <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full" />
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
          <div class="flex gap-6">
            <div class="shrink-0">
              <div class="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                <Anchor class="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">{{ t('whyus.p1.title') }}</h3>
              <p class="text-slate-600 leading-relaxed">{{ t('whyus.p1.desc') }}</p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="shrink-0">
              <div class="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-600">
                <Globe2 class="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">{{ t('whyus.p2.title') }}</h3>
              <p class="text-slate-600 leading-relaxed">{{ t('whyus.p2.desc') }}</p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="shrink-0">
              <div class="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600">
                <ShieldCheck class="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">{{ t('whyus.p3.title') }}</h3>
              <p class="text-slate-600 leading-relaxed">{{ t('whyus.p3.desc') }}</p>
            </div>
          </div>

          <div class="flex gap-6">
            <div class="shrink-0">
              <div class="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-600">
                <TrendingUp class="w-8 h-8" />
              </div>
            </div>
            <div>
              <h3 class="text-xl font-bold text-slate-800 mb-3">{{ t('whyus.p5.title') }}</h3>
              <p class="text-slate-600 leading-relaxed">{{ t('whyus.p5.desc') }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
