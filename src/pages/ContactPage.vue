<script setup lang="ts">
import { useLanguage } from '../i18n';
import PageHero from '../components/PageHero.vue';
import Contact from '../components/Contact.vue';

const { t } = useLanguage();
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <PageHero :title="t('contact.title')" />
    <Contact />
  </div>
</template>
