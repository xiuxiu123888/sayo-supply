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
      <div class="mb-10">
        <h2 class="text-2xl font-bold text-slate-800">{{ t('contact.title') }}</h2>
        <div class="w-12 h-1 bg-amber-500 mt-4 rounded-full" />
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <!-- Contact info -->
        <div class="bg-white p-8 lg:p-10 rounded-2xl">
          <div class="mb-8 flex items-center gap-4">
            <!-- <img :src="logo" alt="SAYO 山岳供应链" class="h-12 w-auto object-contain shrink-0" /> -->
            <div>
              <h3 class="text-xl font-bold text-slate-900">{{ t('contact.info.title') }}</h3>
              <!-- <p class="text-slate-500 text-sm mt-1">{{ t('hero.tagline') }}</p> -->
            </div>
          </div>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Building class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.addr') }}</h4>
                <p class="text-xl font-semibold text-slate-900 leading-snug">{{ t('contact.info.addr1') }}</p>
                <p class="text-slate-500 text-sm mt-1">{{ t('contact.info.addr2') }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone class="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.biz') }}</h4>
                <a
                  href="tel:4008888888"
                  class="block text-2xl font-bold text-slate-900 tracking-wide hover:text-blue-600 transition-colors"
                >
                  400-888-8888
                </a>
                <a
                  href="mailto:sales@sayo-supply.com"
                  class="block text-lg font-medium text-slate-800 mt-1 hover:text-blue-600 transition-colors"
                >
                  sales@sayo-supply.com
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.collab') }}</h4>
                <a
                  href="mailto:partner@sayo-supply.com"
                  class="block text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors"
                >
                  partner@sayo-supply.com
                </a>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <Clock class="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.time') }}</h4>
                <p class="text-lg font-semibold text-slate-900">{{ t('contact.info.time1') }}</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Form -->
        <div class="bg-white p-8 lg:p-10 rounded-2xl">
          <h3 class="text-xl font-bold text-slate-800 mb-6">{{ t('contact.form.title') }}</h3>
          <form class="space-y-4" @submit="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.name') }}</label>
                <input
                  id="name"
                  type="text"
                  class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                  :placeholder="t('contact.form.name.ph')"
                />
              </div>
              <div>
                <label for="phone" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.phone') }}</label>
                <input
                  id="phone"
                  type="tel"
                  class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors"
                  :placeholder="t('contact.form.phone.ph')"
                />
              </div>
            </div>

            <div>
              <label for="company" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.company') }}</label>
              <input
                id="company"
                type="text"
                class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                :placeholder="t('contact.form.company.ph')"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.msg') }}</label>
              <textarea
                id="message"
                rows="4"
                class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors resize-none"
                :placeholder="t('contact.form.msg.ph')"
              />
            </div>

            <button
              type="submit"
              class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20 mt-2"
            >
              {{ t('contact.form.btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
