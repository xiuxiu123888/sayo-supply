<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLanguage } from '../i18n';

const { t } = useLanguage();
const route = useRoute();
const router = useRouter();

const tabs = computed(() => [
  { id: 'rail-ce', key: 'ce', label: t('nav.biz.rail.ce') },
  { id: 'rail-cr', key: 'cr', label: t('nav.biz.rail.cr') },
  { id: 'rail-ca', key: 'ca', label: t('nav.biz.rail.ca') },
  { id: 'rail-caspian', key: 'caspian', label: t('nav.biz.rail.caspian') },
  { id: 'rail-lcl', key: 'lcl', label: t('nav.biz.rail.lcl') },
  { id: 'rail-overseas', key: 'overseas', label: t('nav.biz.rail.overseas') },
]);

const activeTabId = ref('rail-ce');

const syncTabFromRoute = () => {
  const tab = typeof route.query.tab === 'string' ? route.query.tab : '';
  if (tabs.value.some((item) => item.id === tab)) {
    activeTabId.value = tab;
  }
};

syncTabFromRoute();
watch(() => route.query.tab, syncTabFromRoute);

const activeTab = computed(
  () => tabs.value.find((item) => item.id === activeTabId.value) || tabs.value[0],
);

const selectTab = (id: string) => {
  activeTabId.value = id;
  router.replace({ path: '/crexpres', query: { tab: id } });
};

const content = computed(() => {
  const key = activeTab.value.key;
  return {
    brief: t(`crexpres.${key}.brief`),
    routes: [
      {
        title: t(`crexpres.${key}.r1.title`),
        body: t(`crexpres.${key}.r1.body`),
      },
      {
        title: t(`crexpres.${key}.r2.title`),
        body: t(`crexpres.${key}.r2.body`),
      },
    ],
    service: t(`crexpres.${key}.service`),
    advantage: t(`crexpres.${key}.advantage`),
  };
});
</script>

<template>
  <div class="pt-28 md:pt-32 bg-white min-h-screen">
    <section class="py-10 md:py-14">
      <div class="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Tab -->
        <div class="flex flex-wrap gap-2 border-b border-slate-200 pb-1 mb-10">
          <button
            v-for="tab in tabs"
            :key="tab.id"
            type="button"
            class="px-4 py-2.5 text-sm font-semibold transition-colors border-b-2 -mb-px"
            :class="
              activeTabId === tab.id
                ? 'border-blue-600 text-blue-700'
                : 'border-transparent text-slate-500 hover:text-blue-600'
            "
            @click="selectTab(tab.id)"
          >
            {{ tab.label }}
          </button>
        </div>

        <!-- 1. 班列简述 -->
        <div class="mb-10 md:mb-12">
          <h1 class="text-2xl md:text-[28px] font-bold text-slate-900 mb-4">
            {{ activeTab.label }}
          </h1>
          <p class="text-sm text-slate-600 leading-relaxed">
            {{ content.brief }}
          </p>
        </div>

        <!-- 2. 路线图 -->
        <div
          class="mb-10 md:mb-14 bg-slate-50 border border-dashed border-slate-200 min-h-70 md:min-h-90 flex items-center justify-center px-6"
        >
          <p class="text-sm text-slate-400 text-center">
            {{ activeTab.label }} · {{ t('crexpres.map.placeholder') }}
          </p>
        </div>

        <!-- 3. 航线描述 -->
        <div class="space-y-8 mb-10 md:mb-12">
          <div v-for="(routeItem, idx) in content.routes" :key="idx">
            <h2 class="text-lg md:text-xl font-bold text-slate-900 mb-3">
              {{ routeItem.title }}
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ routeItem.body }}
            </p>
          </div>
        </div>

        <!-- 4. 服务内容 -->
        <div class="mb-10 md:mb-12">
          <h2 class="text-lg md:text-xl font-bold text-slate-900 mb-3">
            {{ t('crexpres.service.label') }}
          </h2>
          <p class="text-sm text-slate-600 leading-relaxed">
            {{ content.service }}
          </p>
        </div>

        <!-- 5. 选择优势 -->
        <div class="pb-8">
          <h2 class="text-lg md:text-xl font-bold text-slate-900 mb-3">
            {{ t('crexpres.advantage.label') }}
          </h2>
          <p class="text-sm text-slate-600 leading-relaxed">
            {{ content.advantage }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>
