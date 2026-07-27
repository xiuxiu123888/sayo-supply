<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';
import { Menu, X, Globe, Phone, Mail, ChevronDown } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import logo from '../../assets/logo.jpg';

const isScrolled = ref(false);
const isMobileMenuOpen = ref(false);
const isEnterOpen = ref(false);
const isBizOpen = ref(false);
const isMobileEnterOpen = ref(false);
const isMobileBizOpen = ref(false);
const { lang, setLang, t } = useLanguage();
const route = useRoute();

const onScroll = () => {
  isScrolled.value = window.scrollY > 50;
};

onMounted(() => window.addEventListener('scroll', onScroll));
onUnmounted(() => window.removeEventListener('scroll', onScroll));

const navLinks = computed(() => [
  { name: t('nav.network'), href: '/network' },
]);

const enterActive = computed(() => route.path === '/about');
const bizActive = computed(() => route.path === '/crexpres' || route.path === '/services');

const businessColumns = computed(() => [
  {
    title: t('nav.biz.rail'),
    items: [
      { id: 'rail-ce', label: t('nav.biz.rail.ce'), to: '/crexpres?tab=rail-ce' },
      { id: 'rail-cr', label: t('nav.biz.rail.cr'), to: '/crexpres?tab=rail-cr' },
      { id: 'rail-ca', label: t('nav.biz.rail.ca'), to: '/crexpres?tab=rail-ca' },
      { id: 'rail-caspian', label: t('nav.biz.rail.caspian'), to: '/crexpres?tab=rail-caspian' },
      { id: 'rail-lcl', label: t('nav.biz.rail.lcl'), to: '/crexpres?tab=rail-lcl' },
      { id: 'rail-overseas', label: t('nav.biz.rail.overseas'), to: '/crexpres?tab=rail-overseas' },
    ],
  },
  {
    title: t('nav.biz.truck'),
    items: [
      { id: 'truck-ftl', label: t('nav.biz.truck.ftl'), to: '' },
      { id: 'truck-ltl', label: t('nav.biz.truck.ltl'), to: '' },
    ],
  },
]);

const consultHref = computed(() => (route.path === '/' ? '#contact' : '/#contact'));

const toggleLang = () => setLang(lang.value === 'zh' ? 'en' : 'zh');

const closeMenus = () => {
  isMobileMenuOpen.value = false;
  isMobileEnterOpen.value = false;
  isMobileBizOpen.value = false;
  isEnterOpen.value = false;
  isBizOpen.value = false;
};
</script>

<template>
  <header class="fixed w-full z-50 transition-all duration-300">
    <div
      class="bg-slate-900 text-slate-300 text-xs transition-all duration-300 overflow-hidden"
      :class="isScrolled ? 'h-0 py-0 opacity-0' : 'h-8 py-2 opacity-100'"
    >
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-full">
        <div class="flex items-center gap-6">
          <a href="mailto:partner@sayo-supply.com" class="flex items-center hover:text-amber-400 transition-colors text-sm">
            <Mail class="w-4 h-4 mr-1.5 text-amber-500" />
            partner@sayo-supply.com
          </a>
          <a href="tel:4008888888" class="flex items-center hover:text-amber-400 transition-colors text-sm">
            <Phone class="w-4 h-4 mr-1.5 text-amber-500" />
            400-888-8888
          </a>
        </div>
        <div class="hidden sm:block text-slate-400 text-sm">
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

          <div class="hidden md:flex items-center space-x-8">
            <!-- 走进山岳 -->
            <div
              class="relative"
              @mouseenter="isEnterOpen = true"
              @mouseleave="isEnterOpen = false"
            >
              <button
                type="button"
                class="inline-flex items-center gap-1 transition-colors text-sm font-medium"
                :class="enterActive || isEnterOpen ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'"
              >
                {{ t('nav.enter') }}
                <ChevronDown
                  class="w-4 h-4 transition-transform"
                  :class="isEnterOpen ? 'rotate-180' : ''"
                />
              </button>

              <div
                class="absolute left-0 top-full pt-3"
                :class="isEnterOpen ? 'visible' : 'invisible'"
              >
                <div
                  class="bg-white border border-slate-100 shadow-lg px-8 py-6 transition-all duration-150 min-w-[360px]"
                  :class="isEnterOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'"
                >
                  <div class="grid grid-cols-2 gap-10">
                    <div>
                      <p class="text-sm font-bold text-slate-800 mb-3">{{ t('nav.about.group') }}</p>
                      <ul class="space-y-2.5">
                        <li>
                          <RouterLink
                            to="/about"
                            class="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                            @click="closeMenus"
                          >
                            {{ t('nav.about.overview') }}
                          </RouterLink>
                        </li>
                        <li>
                          <RouterLink
                            to="/about#philosophy"
                            class="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                            @click="closeMenus"
                          >
                            {{ t('nav.about.philosophy') }}
                          </RouterLink>
                        </li>
                      </ul>
                    </div>
                    <div>
                      <p class="text-sm font-bold text-slate-800 mb-3">{{ t('nav.join.group') }}</p>
                      <ul class="space-y-2.5">
                        <li>
                          <a
                            href="#"
                            class="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                            @click.prevent="closeMenus"
                          >
                            {{ t('nav.join.jobs') }}
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <!-- 主营业务 -->
            <div
              class="relative"
              @mouseenter="isBizOpen = true"
              @mouseleave="isBizOpen = false"
            >
              <button
                type="button"
                class="inline-flex items-center gap-1 transition-colors text-sm font-medium"
                :class="bizActive || isBizOpen ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'"
              >
                {{ t('nav.biz') }}
                <ChevronDown
                  class="w-4 h-4 transition-transform"
                  :class="isBizOpen ? 'rotate-180' : ''"
                />
              </button>

              <div
                class="absolute left-0 top-full pt-3"
                :class="isBizOpen ? 'visible' : 'invisible'"
              >
                <div
                  class="bg-white border border-slate-100 shadow-lg px-8 py-6 transition-all duration-150 min-w-[420px]"
                  :class="isBizOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'"
                >
                  <div class="grid grid-cols-2 gap-10">
                    <div v-for="col in businessColumns" :key="col.title">
                      <p class="text-sm font-bold text-slate-800 mb-3">{{ col.title }}</p>
                      <ul class="space-y-2.5">
                        <li v-for="item in col.items" :key="item.id">
                          <RouterLink
                            v-if="item.to"
                            :to="item.to"
                            class="text-sm text-slate-500 hover:text-blue-600 transition-colors"
                            @click="closeMenus"
                          >
                            {{ item.label }}
                          </RouterLink>
                          <span
                            v-else
                            class="text-sm text-slate-400 cursor-default"
                          >
                            {{ item.label }}
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

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
        class="md:hidden absolute top-full left-0 w-full bg-white shadow-xl max-h-[80vh] overflow-y-auto"
      >
        <div class="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          <button
            type="button"
            class="w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md"
            :class="enterActive ? 'text-blue-600 bg-blue-50' : 'text-slate-600'"
            @click="isMobileEnterOpen = !isMobileEnterOpen"
          >
            {{ t('nav.enter') }}
            <ChevronDown
              class="w-4 h-4 transition-transform"
              :class="isMobileEnterOpen ? 'rotate-180' : ''"
            />
          </button>
          <div v-if="isMobileEnterOpen" class="pl-3 space-y-3 pb-2">
            <div>
              <p class="px-3 py-1 text-sm font-bold text-slate-800">{{ t('nav.about.group') }}</p>
              <RouterLink
                to="/about"
                class="block px-3 py-2 text-sm text-slate-500 rounded-md hover:bg-slate-50 hover:text-blue-600"
                @click="closeMenus"
              >
                {{ t('nav.about.overview') }}
              </RouterLink>
              <RouterLink
                to="/about#philosophy"
                class="block px-3 py-2 text-sm text-slate-500 rounded-md hover:bg-slate-50 hover:text-blue-600"
                @click="closeMenus"
              >
                {{ t('nav.about.philosophy') }}
              </RouterLink>
            </div>
            <div>
              <p class="px-3 py-1 text-sm font-bold text-slate-800">{{ t('nav.join.group') }}</p>
              <a
                href="#"
                class="block px-3 py-2 text-sm text-slate-500 rounded-md hover:bg-slate-50 hover:text-blue-600"
                @click.prevent="closeMenus"
              >
                {{ t('nav.join.jobs') }}
              </a>
            </div>
          </div>

          <button
            type="button"
            class="w-full flex items-center justify-between px-3 py-2 text-base font-medium rounded-md"
            :class="bizActive || isMobileBizOpen ? 'text-blue-600 bg-blue-50' : 'text-slate-600'"
            @click="isMobileBizOpen = !isMobileBizOpen"
          >
            {{ t('nav.biz') }}
            <ChevronDown
              class="w-4 h-4 transition-transform"
              :class="isMobileBizOpen ? 'rotate-180' : ''"
            />
          </button>
          <div v-if="isMobileBizOpen" class="pl-3 space-y-3 pb-2">
            <div v-for="col in businessColumns" :key="col.title">
              <p class="px-3 py-1 text-sm font-bold text-slate-800">{{ col.title }}</p>
              <RouterLink
                v-for="item in col.items.filter((i) => i.to)"
                :key="item.id"
                :to="item.to"
                class="block px-3 py-2 text-sm text-slate-500 rounded-md hover:bg-slate-50 hover:text-blue-600"
                @click="closeMenus"
              >
                {{ item.label }}
              </RouterLink>
              <span
                v-for="item in col.items.filter((i) => !i.to)"
                :key="item.id"
                class="block px-3 py-2 text-sm text-slate-400"
              >
                {{ item.label }}
              </span>
            </div>
          </div>

          <RouterLink
            v-for="link in navLinks"
            :key="link.href"
            :to="link.href"
            class="block px-3 py-2 text-base font-medium rounded-md"
            :class="route.path === link.href ? 'text-blue-600 bg-blue-50' : 'text-slate-600 hover:text-blue-600 hover:bg-slate-50'"
            @click="closeMenus"
          >
            {{ link.name }}
          </RouterLink>
          <div class="my-2" />
          <button
            class="w-full text-left px-3 py-2 text-base font-medium text-slate-600 hover:text-blue-600 hover:bg-slate-50 rounded-md flex items-center"
            @click="toggleLang(); closeMenus()"
          >
            <Globe class="w-5 h-5 mr-2" />
            {{ lang === 'zh' ? 'English' : '中文' }}
          </button>
          <a
            :href="consultHref"
            class="block px-3 py-2 mt-4 text-base font-medium text-center text-white bg-blue-700 rounded-md hover:bg-blue-800"
            @click="closeMenus"
          >
            {{ t('nav.consult') }}
          </a>
        </div>
      </div>
    </Transition>
  </header>
</template>
