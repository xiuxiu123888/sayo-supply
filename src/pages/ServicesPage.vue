<script setup lang="ts">
import { computed, ref } from 'vue';
import { TrainFront, Truck, Package, LayoutGrid, Check, Search, MapPin, Info, ArrowRight } from 'lucide-vue-next';
import { useLanguage } from '../i18n';
import railFclImage from '../assets/images/f31e33dde77a92d0c0b88e937e1f229dab52a52c351e2-52DxCA_fw658webp.webp';
import truckFtlImage from '../assets/images/19b73930259411eca5b4d6b93b7440242b9ebd69361be-lpGwuq_fw658webp.webp';
import yardBg from '../assets/images/d281984a53eab7e08f31302e7e3c45341779d581cdb6f-2TNjih_fw658webp.webp';

const { t, lang } = useLanguage();
const queryFrom = ref('西安');
const queryTo = ref('汉堡');
const queryResult = ref<{ rail: string; truck: string; desc: string } | null>(null);

const handleQuery = () => {
  const db: Record<string, { rail: string; truck: string; desc: string }> = {
    '西安-汉堡': {
      rail: '12-14 天 (Days)',
      truck: '10-12 天 (Days)',
      desc: lang.value === 'zh'
        ? '西安始发欧洲腹地主力线路，适合电商及普货拼箱/整柜。'
        : "Mainline from Xi'an to European hinterland, ideal for e-commerce and general cargo.",
    },
    '成都-莫斯科': {
      rail: '10-12 天 (Days)',
      truck: '8-10 天 (Days)',
      desc: lang.value === 'zh'
        ? '中俄贸易主通道，重工机械及汽车配件首选。'
        : 'Main channel for Sino-Russian trade, preferred for heavy machinery and auto parts.',
    },
    '乌鲁木齐-阿拉木图': {
      rail: '3-5 天 (Days)',
      truck: '2-3 天 (Days)',
      desc: lang.value === 'zh'
        ? '中亚快速通道，适合零担汽运及高价值加急货物。'
        : 'Central Asia fast channel, suitable for LTL and high-value urgent goods.',
    },
    '深圳-华沙': {
      rail: '14-16 天 (Days)',
      truck: '12-14 天 (Days)',
      desc: lang.value === 'zh'
        ? '华南发往波兰枢纽，覆盖欧洲全境分拨。'
        : 'From South China to Poland hub, covering distribution across Europe.',
    },
  };

  const key = `${queryFrom.value}-${queryTo.value}`;
  queryResult.value = db[key] ?? {
    rail: 'TBD',
    truck: 'TBD',
    desc: lang.value === 'zh'
      ? '该线路支持定制方案，请联系客服获取详细信息。'
      : 'Customized plan available for this route, please contact us for details.',
  };
};

const railLclRoutes = computed(() => [
  { name: t('services.rail1.r1.name'), desc: t('services.rail1.r1.desc') },
  { name: t('services.rail1.r2.name'), desc: t('services.rail1.r2.desc') },
]);

const railFclRoutes = computed(() => [
  { name: t('services.rail2.r1.name'), desc: t('services.rail2.r1.desc') },
  { name: t('services.rail2.r2.name'), desc: t('services.rail2.r2.desc') },
  { name: t('services.rail2.r3.name'), desc: t('services.rail2.r3.desc') },
  { name: t('services.rail2.r4.name'), desc: t('services.rail2.r4.desc') },
]);
</script>

<template>
  <div class="pt-32 bg-white min-h-screen">
    <section class="py-16 md:py-20 text-slate-900 relative overflow-hidden">
      <div class="absolute inset-0">
        <img
          :src="yardBg"
          alt="集装箱堆场"
          class="w-full h-full object-cover object-[center_30%]"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-white via-white/88 to-white/50" />
      </div>
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="animate-fade-up">
          <h1 class="text-[38px] font-bold mb-6 text-slate-900">{{ t('services.title') }}</h1>
          <div class="w-16 h-1.5 bg-blue-600 rounded-full mb-8" />
          <p class="text-xl md:text-2xl text-slate-600 font-light leading-relaxed text-balance">
            {{ t('services.desc') }}
          </p>
        </div>
      </div>
    </section>

    <section class="py-4 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-white rounded-2xl p-6 md:p-8 shadow-sm">
          <div class="flex items-center mb-6">
            <div class="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center mr-4">
              <Search class="w-5 h-5 text-blue-600" />
            </div>
            <h3 class="text-xl font-bold text-slate-800">{{ t('query.title') }}</h3>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-12 gap-6 items-end">
            <div class="md:col-span-4">
              <label class="block text-sm font-medium text-slate-600 mb-2 flex items-center">
                <MapPin class="w-4 h-4 mr-1 text-slate-400" /> {{ t('query.from') }}
              </label>
              <select
                v-model="queryFrom"
                class="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="西安">西安 (Xi'an)</option>
                <option value="成都">成都 (Chengdu)</option>
                <option value="深圳">深圳 (Shenzhen)</option>
                <option value="乌鲁木齐">乌鲁木齐 (Urumqi)</option>
              </select>
            </div>

            <div class="md:col-span-4">
              <label class="block text-sm font-medium text-slate-600 mb-2 flex items-center">
                <MapPin class="w-4 h-4 mr-1 text-slate-400" /> {{ t('query.to') }}
              </label>
              <select
                v-model="queryTo"
                class="w-full bg-slate-50 rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              >
                <option value="汉堡">汉堡 (Hamburg)</option>
                <option value="华沙">华沙 (Warsaw)</option>
                <option value="莫斯科">莫斯科 (Moscow)</option>
                <option value="阿拉木图">阿拉木图 (Almaty)</option>
              </select>
            </div>

            <div class="md:col-span-4">
              <button
                class="w-full bg-orange-500 hover:bg-orange-600 text-slate-900 font-bold rounded-xl px-4 py-3 transition-colors shadow-sm flex justify-center items-center"
                @click="handleQuery"
              >
                {{ t('query.btn') }}
                <ArrowRight class="w-4 h-4 ml-2" />
              </button>
            </div>
          </div>

          <div v-if="queryResult" class="mt-8 pt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center mr-4 shrink-0">
                <TrainFront class="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <div class="text-sm text-slate-500 font-medium mb-1">{{ t('query.result.rail') }}</div>
                <div class="text-xl font-bold text-slate-800">{{ queryResult.rail }}</div>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-full bg-orange-50 flex items-center justify-center mr-4 shrink-0">
                <Truck class="w-6 h-6 text-orange-500" />
              </div>
              <div>
                <div class="text-sm text-slate-500 font-medium mb-1">{{ t('query.result.truck') }}</div>
                <div class="text-xl font-bold text-slate-800">{{ queryResult.truck }}</div>
              </div>
            </div>
            <div class="flex items-start">
              <div class="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center mr-4 shrink-0">
                <Info class="w-6 h-6 text-indigo-500" />
              </div>
              <div>
                <div class="text-sm text-slate-500 font-medium mb-1">{{ t('query.result.desc') }}</div>
                <div class="text-sm text-slate-700 leading-relaxed">{{ queryResult.desc }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 板块一：中欧班列铁路运输 -->
    <section class="py-16 bg-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <TrainFront class="w-7 h-7 text-blue-600" />
            <h2 class="text-3xl font-bold text-slate-900">{{ t('services.tab.rail') }}</h2>
          </div>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">
            {{ t('services.rail.intro') }}
          </p>
        </div>

        <div class="space-y-16">
          <!-- LCL -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div class="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1474487548417-781cb71495f3?auto=format&fit=crop&w=1200&q=80"
                :alt="t('services.rail1.type')"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <div class="flex items-center gap-3 mb-4">
                <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <Package class="w-6 h-6 text-blue-600" />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">{{ t('services.rail1.type') }}</h3>
              </div>
              <p class="text-sm text-slate-600 leading-relaxed mb-8">
                <span class="font-semibold text-slate-800">{{ t('services.rail1.adv.label') }}：</span>
                {{ t('services.rail1.adv') }}
              </p>
              <p class="text-sm font-bold text-blue-600 mb-4">{{ t('services.rail1.routes.label') }}</p>
              <div class="space-y-5">
                <div v-for="item in railLclRoutes" :key="item.name" class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-lg font-bold text-blue-700 mb-1">{{ item.name }}</p>
                    <p class="text-sm text-slate-600 leading-relaxed">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- FCL -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div class="relative rounded-3xl overflow-hidden aspect-[4/3] lg:order-2">
              <img
                :src="railFclImage"
                :alt="t('services.rail2.type')"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="lg:order-1">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                  <LayoutGrid class="w-6 h-6 text-blue-600" />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">{{ t('services.rail2.type') }}</h3>
              </div>
              <div class="space-y-5">
                <div v-for="item in railFclRoutes" :key="item.name" class="flex items-start gap-3">
                  <div class="w-8 h-8 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
                    <Check class="w-4 h-4" />
                  </div>
                  <div>
                    <p class="text-lg font-bold text-blue-700 mb-1">{{ item.name }}</p>
                    <p class="text-sm text-slate-600 leading-relaxed">{{ item.desc }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 板块二：国际汽运 -->
    <section class="py-16 bg-slate-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="mb-12">
          <div class="flex items-center gap-3 mb-4">
            <Truck class="w-7 h-7 text-orange-500" />
            <h2 class="text-3xl font-bold text-slate-900">{{ t('services.tab.truck') }}</h2>
          </div>
          <p class="text-lg text-slate-600 leading-relaxed max-w-4xl">
            {{ t('services.truck.intro') }}
          </p>
        </div>

        <div class="space-y-16">
          <!-- LTL -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div class="relative rounded-3xl overflow-hidden aspect-[4/3]">
              <img
                src="https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?auto=format&fit=crop&w=1200&q=80"
                :alt="t('services.truck1.type')"
                class="w-full h-full object-cover"
              />
            </div>
            <div>
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Package class="w-6 h-6 text-orange-500" />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">{{ t('services.truck1.type') }}</h3>
              </div>
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-bold text-orange-600 mb-2">{{ t('services.truck1.scene.label') }}</p>
                  <p class="text-sm text-slate-600 leading-relaxed">{{ t('services.truck1.adv') }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- FTL -->
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
            <div class="relative rounded-3xl overflow-hidden aspect-[4/3] lg:order-2">
              <img
                :src="truckFtlImage"
                :alt="t('services.truck2.type')"
                class="w-full h-full object-cover"
              />
            </div>
            <div class="lg:order-1">
              <div class="flex items-center gap-3 mb-6">
                <div class="w-12 h-12 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Truck class="w-6 h-6 text-orange-500" />
                </div>
                <h3 class="text-2xl font-bold text-slate-900">{{ t('services.truck2.type') }}</h3>
              </div>
              <div class="space-y-6">
                <div>
                  <p class="text-sm font-bold text-orange-600 mb-2">{{ t('services.truck2.route.label') }}</p>
                  <p class="text-lg font-bold text-slate-900">{{ t('services.truck2.route') }}</p>
                </div>
                <div>
                  <p class="text-sm font-bold text-orange-600 mb-2">{{ t('services.truck2.feature.label') }}</p>
                  <p class="text-sm text-slate-600 leading-relaxed">{{ t('services.truck2.adv') }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>
