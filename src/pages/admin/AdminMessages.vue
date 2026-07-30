<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiGet, apiPatch, clearAdminToken, getAdminToken } from '../../api';

type MessageRow = {
  id: number;
  name: string;
  phone: string;
  email: string;
  contact: string;
  company: string;
  message: string;
  contacted: number;
  note: string;
  created_at: string;
};

const router = useRouter();
const loading = ref(true);
const saving = ref(false);
const error = ref('');
const rows = ref<MessageRow[]>([]);
const selected = ref<MessageRow | null>(null);
const noteDraft = ref('');

const dateFrom = ref('');
const dateTo = ref('');
const contactedFilter = ref('');

const buildQuery = () => {
  const params = new URLSearchParams();
  if (dateFrom.value) params.set('from', dateFrom.value);
  if (dateTo.value) params.set('to', dateTo.value);
  if (contactedFilter.value === '0' || contactedFilter.value === '1') {
    params.set('contacted', contactedFilter.value);
  }
  const qs = params.toString();
  return qs ? `/api/admin/messages?${qs}` : '/api/admin/messages';
};

const load = async () => {
  if (!getAdminToken()) {
    await router.replace('/admin/login');
    return;
  }
  loading.value = true;
  error.value = '';
  try {
    const res = await apiGet<{ ok: boolean; data: MessageRow[] }>(buildQuery(), true);
    rows.value = res.data || [];
    if (selected.value) {
      const latest = rows.value.find((r) => r.id === selected.value!.id) || null;
      selected.value = latest;
      noteDraft.value = latest?.note || '';
    }
  } catch (err: any) {
    error.value = err?.message || '加载失败';
    if (String(error.value).includes('未登录') || String(error.value).includes('过期')) {
      clearAdminToken();
      await router.replace('/admin/login');
    }
  } finally {
    loading.value = false;
  }
};

const resetFilters = async () => {
  dateFrom.value = '';
  dateTo.value = '';
  contactedFilter.value = '';
  await load();
};

const openDetail = (row: MessageRow) => {
  selected.value = row;
  noteDraft.value = row.note || '';
};

const applyLocalUpdate = (updated: MessageRow) => {
  const idx = rows.value.findIndex((r) => r.id === updated.id);
  if (idx >= 0) rows.value[idx] = updated;
  if (selected.value?.id === updated.id) {
    selected.value = updated;
    noteDraft.value = updated.note || '';
  }
};

const toggleContacted = async (row: MessageRow) => {
  saving.value = true;
  error.value = '';
  try {
    const res = await apiPatch<{ ok: boolean; data: MessageRow }>(
      `/api/admin/messages/${row.id}`,
      { contacted: row.contacted ? 0 : 1 },
      true,
    );
    applyLocalUpdate(res.data);
  } catch (err: any) {
    error.value = err?.message || '更新联系状态失败';
  } finally {
    saving.value = false;
  }
};

const saveNote = async () => {
  if (!selected.value) return;
  saving.value = true;
  error.value = '';
  try {
    const res = await apiPatch<{ ok: boolean; data: MessageRow }>(
      `/api/admin/messages/${selected.value.id}`,
      { note: noteDraft.value },
      true,
    );
    applyLocalUpdate(res.data);
  } catch (err: any) {
    error.value = err?.message || '保存备注失败';
  } finally {
    saving.value = false;
  }
};

const logout = async () => {
  clearAdminToken();
  await router.replace('/admin/login');
};

onMounted(load);
</script>

<template>
  <div class="min-h-screen bg-slate-100">
    <header class="bg-white border-b border-slate-200">
      <div class="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <h1 class="text-xl font-bold text-slate-900">留言管理</h1>
          <p class="text-sm text-slate-500 mt-0.5">网站「联系我们」表单提交</p>
        </div>
        <div class="flex items-center gap-3">
          <button
            type="button"
            class="text-sm text-blue-700 hover:text-blue-800 font-medium"
            @click="load"
          >
            刷新
          </button>
          <button
            type="button"
            class="text-sm text-slate-600 hover:text-slate-900 font-medium"
            @click="logout"
          >
            退出登录
          </button>
        </div>
      </div>
    </header>

    <main class="max-w-6xl mx-auto px-4 py-8">
      <div class="bg-white border border-slate-200 p-4 mb-6 flex flex-wrap items-end gap-4">
        <div>
          <label class="block text-xs text-slate-500 mb-1">开始日期</label>
          <input
            v-model="dateFrom"
            type="date"
            class="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1">结束日期</label>
          <input
            v-model="dateTo"
            type="date"
            class="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500"
          />
        </div>
        <div>
          <label class="block text-xs text-slate-500 mb-1">联系状态</label>
          <select
            v-model="contactedFilter"
            class="px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 min-w-32"
          >
            <option value="">全部</option>
            <option value="0">未联系</option>
            <option value="1">已联系</option>
          </select>
        </div>
        <button
          type="button"
          class="px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
          @click="load"
        >
          筛选
        </button>
        <button
          type="button"
          class="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900"
          @click="resetFilters"
        >
          重置
        </button>
      </div>

      <p v-if="loading" class="text-sm text-slate-500">加载中...</p>
      <p v-else-if="error" class="text-sm text-red-600 mb-4">{{ error }}</p>
      <p v-else-if="!rows.length" class="text-sm text-slate-500">暂无留言</p>

      <div v-if="!loading && rows.length" class="bg-white border border-slate-200 overflow-hidden">
        <div class="overflow-x-auto">
          <table class="min-w-full text-sm">
            <thead class="bg-slate-50 text-slate-600">
              <tr>
                <th class="text-left font-semibold px-4 py-3">ID</th>
                <th class="text-left font-semibold px-4 py-3">提交时间</th>
                <th class="text-left font-semibold px-4 py-3">姓名</th>
                <th class="text-left font-semibold px-4 py-3">联系方式</th>
                <th class="text-left font-semibold px-4 py-3">公司</th>
                <th class="text-left font-semibold px-4 py-3">需求摘要</th>
                <th class="text-left font-semibold px-4 py-3">是否联系</th>
                <th class="text-left font-semibold px-4 py-3">备注</th>
                <th class="text-left font-semibold px-4 py-3">操作</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in rows"
                :key="row.id"
                class="border-t border-slate-100 hover:bg-slate-50"
              >
                <td class="px-4 py-3 text-slate-500">{{ row.id }}</td>
                <td class="px-4 py-3 whitespace-nowrap">{{ row.created_at }}</td>
                <td class="px-4 py-3 font-medium text-slate-900">{{ row.name }}</td>
                <td class="px-4 py-3">{{ row.contact || row.phone || row.email || '-' }}</td>
                <td class="px-4 py-3">{{ row.company || '-' }}</td>
                <td class="px-4 py-3 max-w-xs truncate text-slate-600">{{ row.message }}</td>
                <td class="px-4 py-3">
                  <button
                    type="button"
                    class="px-2.5 py-1 rounded-full text-xs font-semibold"
                    :class="
                      row.contacted
                        ? 'bg-green-50 text-green-700 hover:bg-green-100'
                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                    "
                    :disabled="saving"
                    @click="toggleContacted(row)"
                  >
                    {{ row.contacted ? '已联系' : '未联系' }}
                  </button>
                </td>
                <td class="px-4 py-3 max-w-[10rem] truncate text-slate-500">
                  {{ row.note || '-' }}
                </td>
                <td class="px-4 py-3">
                  <button
                    type="button"
                    class="text-blue-700 hover:text-blue-800 font-medium"
                    @click="openDetail(row)"
                  >
                    查看 / 备注
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>

    <div
      v-if="selected"
      class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4"
      @click.self="selected = null"
    >
      <div class="w-full max-w-lg bg-white p-6 shadow-lg max-h-[90vh] overflow-y-auto">
        <div class="flex items-start justify-between mb-4">
          <h2 class="text-lg font-bold text-slate-900">留言详情 #{{ selected.id }}</h2>
          <button type="button" class="text-slate-400 hover:text-slate-700" @click="selected = null">
            关闭
          </button>
        </div>
        <dl class="space-y-3 text-sm mb-6">
          <div>
            <dt class="text-slate-500 mb-1">提交时间</dt>
            <dd class="text-slate-900">{{ selected.created_at }}</dd>
          </div>
          <div>
            <dt class="text-slate-500 mb-1">姓名</dt>
            <dd class="text-slate-900">{{ selected.name }}</dd>
          </div>
          <div>
            <dt class="text-slate-500 mb-1">联系方式</dt>
            <dd class="text-slate-900">{{ selected.contact || selected.phone || selected.email || '-' }}</dd>
          </div>
          <div>
            <dt class="text-slate-500 mb-1">公司</dt>
            <dd class="text-slate-900">{{ selected.company || '-' }}</dd>
          </div>
          <div>
            <dt class="text-slate-500 mb-1">需求描述</dt>
            <dd class="text-slate-900 whitespace-pre-wrap leading-relaxed">{{ selected.message }}</dd>
          </div>
          <div>
            <dt class="text-slate-500 mb-1">是否联系</dt>
            <dd>
              <button
                type="button"
                class="px-3 py-1.5 rounded-full text-xs font-semibold"
                :class="
                  selected.contacted
                    ? 'bg-green-50 text-green-700 hover:bg-green-100'
                    : 'bg-amber-50 text-amber-700 hover:bg-amber-100'
                "
                :disabled="saving"
                @click="toggleContacted(selected)"
              >
                {{ selected.contacted ? '已联系（点击改为未联系）' : '未联系（点击改为已联系）' }}
              </button>
            </dd>
          </div>
        </dl>

        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">备注</label>
          <textarea
            v-model="noteDraft"
            rows="4"
            class="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500 resize-none"
            placeholder="填写跟进备注..."
          />
          <button
            type="button"
            class="mt-3 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg disabled:opacity-60"
            :disabled="saving"
            @click="saveNote"
          >
            {{ saving ? '保存中...' : '保存备注' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
