<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, X, Globe, Phone, Mail } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import logo from '../../assets/logo.jpg';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const { lang, setLang, t } = useLanguage();
const route = useRoute();

const onScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const navLinks = computed(() => [
  { name: t('nav.home'), href: '/' },
  { name: t('nav.about'), href: '/about' },
  { name: t('nav.services'), href: '/services' },
  { name: t('nav.network'), href: '/network' },
]);

const consultHref = computed(() => (route.path === '/' ? '#contact' : '/#contact'));

const toggleLang = () => setLang(lang.value === 'zh' ? 'en' : 'zh');
</script>

<template>
  <header class="fixed w-full z-50 transition-all duration-300">
    <div
      class="bg-slate-900 text-slate-300 text-xs transition-all duration-300 overflow-hidden"
      :class="isScrolled ? 'h-0 py-0 opacity-0' : 'h-8 py-2 opacity-100'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <div class="flex items-center gap-6">
          <a href="mailto:partner@sayo-supply.com" class="flex items-center hover:text-amber-400 transition-colors">
            <Mail class="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            partner@sayo-supply.com
          </a>
          <a href="tel:4008888888" class="flex items-center hover:text-amber-400 transition-colors">
            <Phone class="w-3.5 h-3.5 mr-1.5 text-amber-500" />
            400-888-8888
          </a>
        </div>
        <div class="hidden sm:block text-slate-400">
          {{ t('hero.tagline') }}
        </div>
      </div>
    </div>

    <nav
      class="w-full transition-all duration-300"
      :class="isScrolled ? 'bg-white shadow-sm py-3' : 'bg-white/90 backdrop-blur-md py-4'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between items-center">
          <RouterLink to="/" class="flex items-center">
            <img :src="logo" alt="SAYO 山岳供应链" class="h-10 w-auto object-contain" />
          </RouterLink>

          <div class="hidden md:flex space-x-8">
            <RouterLink
              v-for="link in navLinks"
              :key="link.href"
              :to="link.href"
              class="transition-colors text-sm font-medium"
              :class="route.path === link.href ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'"
            >
              {{ link.name }}
            </RouterLink>
          </div>

          <div class="hidden md:flex items-center gap-4">
            <button
              class="text-slate-600 hover:text-blue-600 font-medium text-sm flex items-center"
              @click="toggleLang"
            >
              <Globe class="w-4 h-4 mr-1" />
              {{ lang === 'zh' ? 'EN' : '中文' }}
            </button>
            <a
              :href="consultHref"
              class="bg-blue-700 hover:bg-blue-800 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors shadow-sm shadow-blue-700/20"
            >
              {{ t('nav.consult') }}
            </a>
          </div>

          <div class="md:hidden flex items-center">
            <button
              class="text-slate-600 hover:text-blue-600 focus:outline-none"
              @click="isMobileMenuOpen = !isMobileMenuOpen"
            >
              <X v-if="isMobileMenuOpen" class="h-6 w-6" />
              <Menu v-else class="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>

    <Transition
      enter-active-class="transition duration-200"
      enter-from-class="opacity-0 -translate-y-4"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-150"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-4"
    >
      <div
        v-if="isMobileMenuOpen"
        class="md:hidden absolute top-full left-0 w-full bg-white shadow-xl"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <RouterLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="block px-3 py-2 text-base font-medium rounded-md"
            :class="route.path === link.href ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'"
            @click="isMobileMenuOpen = false"
          >
            {{ link.name }}
          </RouterLink>
          <div class="my-2" />
          <button
            class="w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md flex items-center"
            @click="toggleLang(); isMobileMenuOpen = false"
          >
            <Globe class="w-5 h-5 mr-2" />
            {{ lang === 'zh' ? 'English' : '中文' }}
          </button>
          <a
            :href="consultHref"
            class="block px-3 py-2 mt-4 text-base font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800"
            @click="isMobileMenuOpen = false"
          >
            {{ t('nav.consult') }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
