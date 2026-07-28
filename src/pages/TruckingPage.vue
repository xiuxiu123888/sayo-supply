<script setup lang="ts">
import { computed, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLanguage } from '../i18n';
import PageHero from '../components/PageHero.vue';
import imgFtl from '../assets/images/ftl.png';
import imgLtl from '../assets/images/LTL.png';

const { t } = useLanguage();
const route = useRoute();
const router = useRouter();

const mapByKey: Record<string, string> = {
  ftl: imgFtl,
  ltl: imgLtl,
};

const tabs = computed(() => [
  { id: 'truck-ftl', key: 'ftl', label: t('nav.biz.truck.ftl') },
  { id: 'truck-ltl', key: 'ltl', label: t('nav.biz.truck.ltl') },
]);

const activeTabId = ref('truck-ftl');

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
  router.replace({ path: '/trucking', query: { tab: id } });
};

const content = computed(() => {
  const key = activeTab.value.key;
  return {
    brief: t(`trucking.${key}.brief`),
    map: mapByKey[key] ?? '',
    routeTitle: t(`trucking.${key}.route.title`),
    routeBody: t(`trucking.${key}.route.body`),
    featureTitle: t(`trucking.${key}.feature.title`),
    featureBody: t(`trucking.${key}.feature.body`),
  };
});
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <PageHero :title="t('nav.biz.truck')" />

    <section class="py-10 md:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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

        <div class="mb-10 md:mb-12">
          <h2 class="text-2xl md:text-[28px] font-bold text-slate-900 mb-4">
            {{ activeTab.label }}
          </h2>
          <p class="text-sm text-slate-600 leading-relaxed">
            {{ content.brief }}
          </p>
        </div>

        <div v-if="content.map" class="mb-10 md:mb-14">
          <img
            :src="content.map"
            :alt="activeTab.label"
            class="w-full h-auto"
          />
        </div>

        <div class="space-y-8 pb-8">
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-900 mb-3">
              {{ content.routeTitle }}
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ content.routeBody }}
            </p>
          </div>
          <div>
            <h2 class="text-lg md:text-xl font-bold text-slate-900 mb-3">
              {{ content.featureTitle }}
            </h2>
            <p class="text-sm text-slate-600 leading-relaxed">
              {{ content.featureBody }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
