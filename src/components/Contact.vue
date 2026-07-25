<script setup lang="ts">
import { Building, Phone, Mail, Clock } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import logo from '../assets/images/SAYO.png';

const { t } = useLanguage();

const onSubmit = (e: Event) => {
  e.preventDefault();
};
</script>

<template>
  <section id="contact" class="py-10 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex justify-between items-end mb-12">
        <div>
          <h2 class="text-2xl font-bold text-slate-800">{{ t('contact.title') }}</h2>
          <div class="w-12 h-1 bg-amber-500 mt-4 rounded-full" />
        </div>
        <p class="text-slate-500 max-w-xl text-sm hidden md:block text-right">
          {{ t('contact.desc') }}
        </p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white rounded-2xl shadow-sm overflow-hidden">
        <div class="bg-slate-50 p-8 lg:p-12 text-slate-900">
          <h3 class="text-xl font-bold mb-8 text-slate-900">{{ t('contact.info.title') }}</h3>

          <div class="space-y-6">
            <div class="flex items-start">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <Building class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 class="font-semibold text-sm mb-1 text-slate-800">{{ t('contact.info.addr') }}</h4>
                <p class="text-slate-600 text-xs">{{ t('contact.info.addr1') }}</p>
                <p class="text-slate-500 text-[10px] mt-0.5">{{ t('contact.info.addr2') }}</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <Phone class="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 class="font-semibold text-sm mb-1 text-slate-800">{{ t('contact.info.biz') }}</h4>
                <p class="text-slate-600 text-xs">400-888-8888</p>
                <p class="text-slate-600 text-xs">sales@sayo-supply.com</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <Mail class="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <h4 class="font-semibold text-sm mb-1 text-slate-800">{{ t('contact.info.collab') }}</h4>
                <p class="text-slate-600 text-xs">partner@sayo-supply.com</p>
              </div>
            </div>

            <div class="flex items-start">
              <div class="w-10 h-10 bg-amber-50 rounded-lg flex items-center justify-center mr-4 shrink-0">
                <Clock class="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <h4 class="font-semibold text-sm mb-1 text-slate-800">{{ t('contact.info.time') }}</h4>
                <p class="text-slate-600 text-xs">{{ t('contact.info.time1') }}</p>
              </div>
            </div>
          </div>

          <div class="mt-12 pt-8 flex items-center gap-3">
            <img :src="logo" alt="SAYO 山岳供应链" class="h-8 w-auto object-contain" />
            <p class="text-slate-500 text-xs italic">
              {{ t('hero.tagline') }}
            </p>
          </div>
        </div>

        <div class="p-8 lg:p-12">
          <h3 class="text-xl font-bold text-slate-800 mb-6">{{ t('contact.form.title') }}</h3>
          <form class="space-y-4" @submit="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-xs font-medium text-slate-600 mb-1">{{ t('contact.form.name') }}</label>
                <input
                  id="name"
                  type="text"
                  class="w-full px-4 py-2.5 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                  :placeholder="t('contact.form.name.ph')"
                />
              </div>
              <div>
                <label for="phone" class="block text-xs font-medium text-slate-600 mb-1">{{ t('contact.form.phone') }}</label>
                <input
                  id="phone"
                  type="tel"
                  class="w-full px-4 py-2.5 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors"
                  :placeholder="t('contact.form.phone.ph')"
                />
              </div>
            </div>

            <div>
              <label for="company" class="block text-xs font-medium text-slate-600 mb-1">{{ t('contact.form.company') }}</label>
              <input
                id="company"
                type="text"
                class="w-full px-4 py-2.5 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                :placeholder="t('contact.form.company.ph')"
              />
            </div>

            <div>
              <label for="message" class="block text-xs font-medium text-slate-600 mb-1">{{ t('contact.form.msg') }}</label>
              <textarea
                id="message"
                rows="4"
                class="w-full px-4 py-2.5 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors resize-none"
                :placeholder="t('contact.form.msg.ph')"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20 mt-4"
            >
              {{ t('contact.form.btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
