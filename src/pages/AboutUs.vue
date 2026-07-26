<script setup lang="ts">
import { computed } from 'vue';
import {
  Boxes,
  Globe2,
  Anchor,
  Clock,
  ShieldCheck,
  TrendingUp,
  TrainFront,
  Layers,
} from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import aboutImage from '../assets/images/d281984a53eab7e08f31302e7e3c45341779d581cdb6f-2TNjih_fw658webp.webp';
import yardBg from '../assets/images/f31e33dde77a92d0c0b88e937e1f229dab52a52c351e2-52DxCA_fw658webp.webp';

const { t } = useLanguage();

const reasons = computed(() => [
  { title: t('about.r1.title'), desc: t('about.r1.desc'), icon: Boxes },
  { title: t('about.r2.title'), desc: t('about.r2.desc'), icon: Globe2 },
  { title: t('about.r3.title'), desc: t('about.r3.desc'), icon: Layers },
  { title: t('about.r4.title'), desc: t('about.r4.desc'), icon: Clock },
]);

const whyUs = computed(() => [
  { title: t('whyus.p1.title'), desc: t('whyus.p1.desc'), icon: TrainFront },
  { title: t('whyus.p2.title'), desc: t('whyus.p2.desc'), icon: Anchor },
  { title: t('whyus.p3.title'), desc: t('whyus.p3.desc'), icon: ShieldCheck },
  { title: t('whyus.p4.title'), desc: t('whyus.p4.desc'), icon: Clock },
  { title: t('whyus.p5.title'), desc: t('whyus.p5.desc'), icon: TrendingUp },
]);
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <section class="py-16 md:py-20 text-slate-900 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="yardBg"
          alt="集装箱堆场"
          class="w-full h-full object-cover object-center"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/55" />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="animate-fade-up">
          <h1 class="text-[38px] font-bold mb-6 text-slate-900">{{ t('about.title') }}</h1>
          <div class="w-16 h-1.5 bg-blue-600 rounded-full mb-8" />
          <p class="text-xl md:text-2xl text-slate-600 font-light leading-relaxed text-balance">
            {{ t('about.subtitle') }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-16 bg-white border-b border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="bg-slate-50 rounded-2xl px-6 py-8">
            <p class="text-sm font-bold text-blue-600 tracking-wider mb-3">{{ t('hero.mission.label') }}</p>
            <p class="text-slate-800 leading-relaxed">{{ t('hero.mission') }}</p>
          </div>
          <div class="bg-slate-50 rounded-2xl px-6 py-8">
            <p class="text-sm font-bold text-blue-600 tracking-wider mb-3">{{ t('hero.vision.label') }}</p>
            <p class="text-slate-800 leading-relaxed">{{ t('hero.vision') }}</p>
          </div>
          <div class="bg-slate-50 rounded-2xl px-6 py-8">
            <p class="text-sm font-bold text-amber-600 tracking-wider mb-3">{{ t('hero.values.label') }}</p>
            <p class="text-slate-800 leading-relaxed">{{ t('hero.values') }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="py-8">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-3xl font-bold text-slate-800 mb-8">{{ t('about.story.title') }}</h2>
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

    <!-- 选择理由 + 为什么选择：左右并列 -->
    <section class="py-16 md:py-20 bg-white border-t border-slate-100">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ t('about.reasons.title') }}</h2>
            <div class="w-10 h-1 bg-blue-600 rounded-full mb-8" />
            <ul class="space-y-6">
              <li v-for="item in reasons" :key="item.title" class="flex gap-3">
                <component :is="item.icon" class="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-sm font-bold text-slate-900 mb-1.5">{{ item.title }}</h3>
                  <p class="text-sm text-slate-600 leading-relaxed">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>

          <div class="lg:border-l lg:border-slate-100 lg:pl-16">
            <h2 class="text-2xl font-bold text-slate-900 mb-2">{{ t('whyus.title') }}</h2>
            <div class="w-10 h-1 bg-amber-500 rounded-full mb-8" />
            <ul class="space-y-6">
              <li v-for="item in whyUs" :key="item.title" class="flex gap-3">
                <component :is="item.icon" class="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <h3 class="text-sm font-bold text-slate-900 mb-1.5">{{ item.title }}</h3>
                  <p class="text-sm text-slate-600 leading-relaxed">{{ item.desc }}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
