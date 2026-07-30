<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { apiPost, setAdminToken } from '../../api';

const router = useRouter();
const username = ref('admin');
const password = ref('');
const loading = ref(false);
const error = ref('');

const onSubmit = async (e: Event) => {
  e.preventDefault();
  error.value = '';
  loading.value = true;
  try {
    const res = await apiPost<{ ok: boolean; token: string }>('/api/admin/login', {
      username: username.value.trim(),
      password: password.value,
    });
    setAdminToken(res.token);
    await router.replace('/admin/messages');
  } catch (err: any) {
    error.value = err?.message || '登录失败';
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <div class="min-h-screen bg-slate-100 flex items-center justify-center px-4">
    <div class="w-full max-w-md bg-white border border-slate-200 shadow-sm p-8">
      <h1 class="text-2xl font-bold text-slate-900 mb-2">后台登录</h1>
      <p class="text-sm text-slate-500 mb-8">山岳供应链 · 留言管理</p>

      <form class="space-y-4" @submit="onSubmit">
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">用户名</label>
          <input
            v-model="username"
            type="text"
            autocomplete="username"
            class="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            required
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-slate-700 mb-1.5">密码</label>
          <input
            v-model="password"
            type="password"
            autocomplete="current-password"
            class="w-full px-4 py-3 text-sm border border-slate-200 rounded-lg outline-none focus:border-blue-500"
            required
          />
        </div>
        <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
        <button
          type="submit"
          class="w-full bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 rounded-lg text-sm disabled:opacity-60"
          :disabled="loading"
        >
          {{ loading ? '登录中...' : '登录' }}
        </button>
      </form>
    </div>
  </div>
</template>
