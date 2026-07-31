<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { useLanguage } from '../i18n';
import PageHero from '../components/PageHero.vue';
import { getJobBySlug } from '../data/jobs';

const { setLang } = useLanguage();
const route = useRoute();

onMounted(() => {
  setLang('zh');
});

const job = computed(() => {
  const slug = typeof route.params.slug === 'string' ? route.params.slug : '';
  return getJobBySlug(slug);
});

const metaRows = computed(() => {
  if (!job.value) return [];
  return [
    { label: '工作性质', value: job.value.nature },
    { label: '招聘人数', value: job.value.headcount },
    { label: '性别要求', value: job.value.gender },
    { label: '工资待遇', value: job.value.salary },
    { label: '有效期限', value: job.value.validUntil },
    { label: '工作经验', value: job.value.experience },
    { label: '学历要求', value: job.value.education },
    { label: '语言能力', value: job.value.language },
  ];
});
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <PageHero title="在线招聘" />

    <section class="py-10 md:py-14">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <template v-if="job">
          <h2 class="text-2xl md:text-[28px] font-bold text-slate-900 mb-2">{{ job.title }}</h2>
          <p class="text-sm text-slate-500 mb-10">工作地点：{{ job.location }}</p>

          <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 border border-slate-200 p-5 bg-slate-50">
            <div v-for="row in metaRows" :key="row.label">
              <p class="text-xs text-slate-400 mb-1">{{ row.label }}</p>
              <p class="text-sm font-semibold text-slate-800">{{ row.value }}</p>
            </div>
          </div>

          <div class="mb-10">
            <h3 class="text-lg font-bold text-slate-900 mb-4">职位描述</h3>
            <ol class="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
              <li v-for="(item, idx) in job.description" :key="idx">{{ item }}</li>
            </ol>
          </div>

          <div>
            <h3 class="text-lg font-bold text-slate-900 mb-4">职位要求</h3>
            <ol class="space-y-3 text-sm text-slate-600 leading-relaxed list-decimal pl-5">
              <li v-for="(item, idx) in job.requirements" :key="idx">{{ item }}</li>
            </ol>
          </div>
        </template>

        <template v-else>
          <h2 class="text-2xl font-bold text-slate-900 mb-4">岗位不存在</h2>
          <p class="text-sm text-slate-500">当前没有可展示的招聘岗位。</p>
        </template>
      </div>
    </section>
  </div>
</template>
