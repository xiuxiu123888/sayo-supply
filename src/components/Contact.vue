<script setup lang="ts">
import { ref } from 'vue';
import { Building, Phone, Mail } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import { apiPost } from '../api';

const { t } = useLanguage();

const name = ref('');
const contact = ref('');
const company = ref('');
const message = ref('');
const loading = ref(false);
const error = ref('');
const success = ref('');
const copiedKey = ref('');
let copiedTimer: ReturnType<typeof setTimeout> | null = null;

const PHONE = '+86 18823730235';
const EMAIL = 'shadow@sayotrans.com';

const copyText = async (key: string, text: string) => {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.position = 'fixed';
    input.style.left = '-9999px';
    document.body.appendChild(input);
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);
  }
  copiedKey.value = key;
  if (copiedTimer) clearTimeout(copiedTimer);
  copiedTimer = setTimeout(() => {
    copiedKey.value = '';
  }, 1500);
};

const normalizePhone = (value: string) => value.replace(/[\s\-()]/g, '');

const isValidPhone = (value: string) => {
  const normalized = normalizePhone(value);
  if (/^(\+?86|0086)?1[3-9]\d{9}$/.test(normalized)) return true;
  if (/^0\d{2,3}\d{7,8}$/.test(normalized)) return true;
  return false;
};

const isValidEmail = (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);

const onSubmit = async (e: Event) => {
  e.preventDefault();
  error.value = '';
  success.value = '';

  const contactValue = contact.value.trim();
  if (!isValidPhone(contactValue) && !isValidEmail(contactValue)) {
    error.value = t('contact.form.contact.invalid');
    return;
  }

  loading.value = true;
  try {
    await apiPost('/api/contact', {
      name: name.value.trim(),
      contact: contactValue,
      company: company.value.trim(),
      message: message.value.trim(),
    });
    success.value = t('contact.form.success');
    name.value = '';
    contact.value = '';
    company.value = '';
    message.value = '';
  } catch (err: any) {
    error.value = err?.message || t('contact.form.error');
  } finally {
    loading.value = false;
  }
};
</script>

<template>
  <section class="py-10 bg-slate-50">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
        <div class="bg-white p-8 lg:p-10 rounded-2xl">
          <div class="mb-8 flex items-center gap-4">
            <div>
              <h3 class="text-xl font-bold text-slate-900">{{ t('contact.info.title') }}</h3>
            </div>
          </div>

          <div class="space-y-6">
            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Building class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.addr') }}</h4>
                <button
                  type="button"
                  class="block text-left text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  @click="copyText('addr', t('contact.info.addr1'))"
                >
                  {{ t('contact.info.addr1') }}
                </button>
                <p v-if="copiedKey === 'addr'" class="text-sm text-green-600 mt-1">{{ t('contact.copy.ok') }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center shrink-0">
                <Phone class="w-6 h-6 text-amber-500" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.biz') }}</h4>
                <button
                  type="button"
                  class="block text-left text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  @click="copyText('phone', PHONE)"
                >
                  {{ PHONE }}
                </button>
                <p v-if="copiedKey === 'phone'" class="text-sm text-green-600 mt-1">{{ t('contact.copy.ok') }}</p>
              </div>
            </div>

            <div class="flex items-start gap-4">
              <div class="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center shrink-0">
                <Mail class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h4 class="font-medium text-slate-500 text-sm mb-1">{{ t('contact.info.collab') }}</h4>
                <button
                  type="button"
                  class="block text-left text-xl font-semibold text-slate-900 hover:text-blue-600 transition-colors cursor-pointer"
                  @click="copyText('email', EMAIL)"
                >
                  {{ EMAIL }}
                </button>
                <p v-if="copiedKey === 'email'" class="text-sm text-green-600 mt-1">{{ t('contact.copy.ok') }}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="bg-white p-8 lg:p-10 rounded-2xl">
          <h3 class="text-xl font-bold text-slate-800 mb-6">{{ t('contact.form.title') }}</h3>
          <form class="space-y-4" @submit="onSubmit">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label for="name" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.name') }}</label>
                <input
                  id="name"
                  v-model="name"
                  type="text"
                  required
                  class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                  :placeholder="t('contact.form.name.ph')"
                />
              </div>
              <div>
                <label for="contact" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.contact') }}</label>
                <input
                  id="contact"
                  v-model="contact"
                  type="text"
                  required
                  class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors"
                  :placeholder="t('contact.form.contact.ph')"
                />
              </div>
            </div>

            <div>
              <label for="company" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.company') }}</label>
              <input
                id="company"
                v-model="company"
                type="text"
                class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-colors"
                :placeholder="t('contact.form.company.ph')"
              />
            </div>

            <div>
              <label for="message" class="block text-sm font-medium text-slate-700 mb-1.5">{{ t('contact.form.msg') }}</label>
              <textarea
                id="message"
                v-model="message"
                rows="4"
                required
                class="w-full px-4 py-3 text-sm rounded-lg bg-white text-slate-800 placeholder:text-slate-400 border border-slate-200 focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 outline-none transition-colors resize-none"
                :placeholder="t('contact.form.msg.ph')"
              />
            </div>

            <p v-if="error" class="text-sm text-red-600">{{ error }}</p>
            <p v-if="success" class="text-sm text-green-600">{{ success }}</p>

            <button
              type="submit"
              class="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3.5 rounded-lg text-sm transition-all shadow-lg shadow-amber-500/20 mt-2 disabled:opacity-60"
              :disabled="loading"
            >
              {{ loading ? t('contact.form.sending') : t('contact.form.btn') }}
            </button>
          </form>
        </div>
      </div>
    </div>
  </section>
</template>
