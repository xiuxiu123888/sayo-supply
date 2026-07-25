<script setup lang="ts">
import { useLanguage } from '../i18n';
import logo from '../../assets/logo.jpg';

const { t } = useLanguage();
const year = new Date().getFullYear();
</script>

<template>
  <footer class="bg-white/90 text-slate-500 py-12 border-t border-amber-100/60">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        <div>
          <RouterLink to="/" class="mb-4 flex items-center">
            <img :src="logo" alt="SAYO 山岳供应链" class="h-10 w-auto object-contain" />
          </RouterLink>
          <p class="text-sm text-slate-500 max-w-xs mt-4">
            {{ t('hero.tagline') }}
          </p>
        </div>

        <div class="flex flex-col space-y-4 text-sm font-medium">
          <h4 class="text-slate-900 font-bold mb-2">{{ t('footer.links') }}</h4>
          <div class="grid grid-cols-2 gap-4">
            <div class="flex flex-col space-y-3">
              <RouterLink to="/" class="hover:text-blue-600 transition-colors">{{ t('nav.home') }}</RouterLink>
              <RouterLink to="/about" class="hover:text-blue-600 transition-colors">{{ t('nav.about') }}</RouterLink>
              <RouterLink to="/services" class="hover:text-blue-600 transition-colors">{{ t('nav.services') }}</RouterLink>
              <RouterLink to="/network" class="hover:text-blue-600 transition-colors">{{ t('nav.network') }}</RouterLink>
            </div>
          </div>
        </div>

        <div class="flex flex-col space-y-3 text-sm">
          <h4 class="text-slate-900 font-bold mb-2">{{ t('contact.info.title') }}</h4>
          <div class="flex flex-col space-y-3 text-slate-500">
            <p><strong>{{ t('contact.info.biz') }}:</strong> 400-888-8888</p>
            <p><strong>{{ t('contact.info.collab') }}:</strong> partner@sayo-supply.com</p>
            <p><strong>{{ t('contact.info.addr') }}:</strong> {{ t('contact.info.addr1') }} {{ t('contact.info.addr2') }}</p>
            <p><strong>{{ t('contact.info.time') }}:</strong> {{ t('contact.info.time1') }}</p>
          </div>
        </div>
      </div>

      <div class="pt-8 flex flex-col md:flex-row justify-between items-center text-xs">
        <p>&copy; {{ year }} {{ t('footer.rights') }}</p>
        <div class="mt-4 md:mt-0 flex space-x-4">
          <a href="#" class="hover:text-blue-600 transition-colors">{{ t('footer.privacy') }}</a>
          <a href="#" class="hover:text-blue-600 transition-colors">{{ t('footer.terms') }}</a>
        </div>
      </div>
    </div>
  </footer>
</template>
