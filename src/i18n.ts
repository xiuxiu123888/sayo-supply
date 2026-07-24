import { computed, ref } from 'vue';
import { translations, type Language, type TranslationKey } from './translations';

const lang = ref<Language>('zh');

export function useLanguage() {
  const setLang = (next: Language) => {
    lang.value = next;
  };

  const t = (key: TranslationKey | string): any => {
    const dict = translations[lang.value] as Record<string, any>;
    return dict[key] ?? key;
  };

  return {
    lang: computed(() => lang.value),
    setLang,
    t,
  };
}
