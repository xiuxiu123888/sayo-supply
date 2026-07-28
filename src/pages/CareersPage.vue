<script setup lang="ts">
import { onMounted } from 'vue';
import { useLanguage } from '../i18n';
import PageHero from '../components/PageHero.vue';
import { jobs } from '../data/jobs';

const { setLang } = useLanguage();

onMounted(() => {
  setLang('zh');
});
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <PageHero title="在线招聘" />

    <section class="py-10 md:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <p class="text-sm text-slate-500 mb-10">加入山岳，一起开拓欧亚供应链未来</p>

        <div class="border border-slate-200 divide-y divide-slate-100">
          <RouterLink
            v-for="job in jobs"
            :key="job.slug"
            :to="`/careers/${job.slug}`"
            class="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 py-5 hover:bg-slate-50 transition-colors"
          >
            <div>
              <h2 class="text-lg font-bold text-slate-900">{{ job.title }}</h2>
              <p class="text-sm text-slate-500 mt-1">
                {{ job.location }} · {{ job.experience }} · {{ job.education }} · {{ job.salary }}
              </p>
            </div>
            <span class="text-sm font-semibold text-blue-600 shrink-0">查看详情 →</span>
          </RouterLink>
        </div>
      </div>
    </section>
  </div>
</template>
