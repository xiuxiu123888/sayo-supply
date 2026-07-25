<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { FeatureCollection, Geometry } from 'geojson';
import { Navigation, MapPin } from 'lucide-vue-next';
import { useLanguage } from '../i18n';

defineProps<{
  hideHeader?: boolean;
}>();

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const allMarkers: Record<string, [number, number]> = {
  成都: [104.0668, 30.5728],
  重庆: [106.5516, 29.563],
  西安: [108.9398, 34.3416],
  深圳: [114.0579, 22.5431],
  乌鲁木齐: [87.6168, 43.8256],
  华沙: [21.0122, 52.2297],
  汉堡: [9.9937, 53.5511],
  杜伊斯堡: [6.7623, 51.4344],
  布达佩斯: [19.0402, 47.4979],
  伦敦: [-0.1278, 51.5074],
  马拉舍维奇: [23.5333, 52.0833],
  莫斯科: [37.6173, 55.7558],
  明斯克: [27.5615, 53.9045],
  阿拉木图: [76.9286, 43.222],
  塔什干: [69.2401, 41.2995],
  波季: [41.6738, 42.1462],
  第比利斯: [44.8271, 41.7151],
};

const routes = [
  {
    id: 'overview',
    titleKey: 'network.map.title',
    lines: [
      { from: allMarkers['西安'], to: allMarkers['汉堡'] },
      { from: allMarkers['成都'], to: allMarkers['华沙'] },
      { from: allMarkers['重庆'], to: allMarkers['杜伊斯堡'] },
      { from: allMarkers['深圳'], to: allMarkers['伦敦'] },
      { from: allMarkers['成都'], to: allMarkers['莫斯科'] },
      { from: allMarkers['乌鲁木齐'], to: allMarkers['阿拉木图'] },
      { from: allMarkers['西安'], to: allMarkers['第比利斯'] },
    ],
    markers: Object.keys(allMarkers),
  },
  {
    id: 'europe',
    titleKey: 'network.r2.title',
    lines: [
      { from: allMarkers['西安'], to: allMarkers['汉堡'] },
      { from: allMarkers['成都'], to: allMarkers['华沙'] },
      { from: allMarkers['重庆'], to: allMarkers['杜伊斯堡'] },
      { from: allMarkers['西安'], to: allMarkers['布达佩斯'] },
      { from: allMarkers['深圳'], to: allMarkers['伦敦'] },
      { from: allMarkers['成都'], to: allMarkers['马拉舍维奇'] },
    ],
    markers: ['西安', '成都', '重庆', '深圳', '汉堡', '华沙', '杜伊斯堡', '布达佩斯', '伦敦', '马拉舍维奇'],
  },
  {
    id: 'cis',
    titleKey: 'network.r3.title',
    lines: [
      { from: allMarkers['成都'], to: allMarkers['莫斯科'] },
      { from: allMarkers['西安'], to: allMarkers['莫斯科'] },
      { from: allMarkers['西安'], to: allMarkers['明斯克'] },
    ],
    markers: ['成都', '西安', '莫斯科', '明斯克'],
  },
  {
    id: 'central_asia',
    titleKey: 'network.r4.title',
    lines: [
      { from: allMarkers['乌鲁木齐'], to: allMarkers['阿拉木图'] },
      { from: allMarkers['乌鲁木齐'], to: allMarkers['塔什干'] },
      { from: allMarkers['西安'], to: allMarkers['阿拉木图'] },
      { from: allMarkers['成都'], to: allMarkers['波季'] },
      { from: allMarkers['西安'], to: allMarkers['第比利斯'] },
    ],
    markers: ['乌鲁木齐', '西安', '成都', '阿拉木图', '塔什干', '波季', '第比利斯'],
  },
];

const hubs = new Set(['成都', '重庆', '西安', '深圳', '乌鲁木齐']);

const { t } = useLanguage();
const activeRouteId = ref('overview');
const countryPaths = ref<string[]>([]);

const width = 1000;
const height = 600;
const projection = geoMercator().scale(400).center([60, 45]).translate([width / 2, height / 2]);
const pathGen = geoPath(projection);

const activeRoute = computed(() => routes.find((r) => r.id === activeRouteId.value) || routes[0]);

const projectedLines = computed(() =>
  activeRoute.value.lines
    .map((line) => {
      const from = projection(line.from);
      const to = projection(line.to);
      if (!from || !to) return null;
      return { x1: from[0], y1: from[1], x2: to[0], y2: to[1] };
    })
    .filter(Boolean) as { x1: number; y1: number; x2: number; y2: number }[],
);

const projectedMarkers = computed(() =>
  activeRoute.value.markers
    .map((name) => {
      const coords = projection(allMarkers[name]);
      if (!coords) return null;
      return { name, x: coords[0], y: coords[1], isHub: hubs.has(name) };
    })
    .filter(Boolean) as { name: string; x: number; y: number; isHub: boolean }[],
);

onMounted(async () => {
  try {
    const res = await fetch(geoUrl);
    const topology = (await res.json()) as Topology;
    const countries = feature(
      topology,
      (topology.objects as any).countries,
    ) as unknown as FeatureCollection<Geometry>;
    countryPaths.value = countries.features
      .map((f) => pathGen(f) || '')
      .filter(Boolean);
  } catch (err) {
    console.error('Failed to load world map', err);
  }
});
</script>

<template>
  <section id="network" class="py-16 md:py-20 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!hideHeader" class="text-center mb-12">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">{{ t('network.title') }}</h2>
        <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
        <p class="text-slate-600 max-w-2xl mx-auto text-sm leading-relaxed">
          {{ t('network.desc') }}
        </p>
      </div>

      <div class="flex flex-col lg:flex-row gap-8 mb-16">
        <div class="w-full lg:w-1/4 flex flex-col gap-3">
          <button
            v-for="route in routes"
            :key="route.id"
            class="text-left px-5 py-4 rounded-xl transition-all duration-300 flex items-center justify-between"
            :class="
              route.id === activeRouteId
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/20 font-bold'
                : 'bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-blue-600 font-medium'
            "
            @click="activeRouteId = route.id"
          >
            <span>{{ t(route.titleKey) }}</span>
            <MapPin v-if="route.id === activeRouteId" class="w-4 h-4" />
          </button>
        </div>

        <div class="w-full lg:w-3/4">
          <div class="rounded-2xl overflow-hidden shadow-sm relative h-[450px] md:h-[550px] bg-slate-50 border border-slate-100">
            <div class="absolute inset-0 z-0">
              <svg
                :viewBox="`0 0 ${width} ${height}`"
                class="w-full h-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <path
                  v-for="(d, i) in countryPaths"
                  :key="i"
                  :d="d"
                  fill="#e2e8f0"
                  stroke="#ffffff"
                  stroke-width="0.5"
                  class="hover:fill-slate-300 transition-colors"
                />
                <line
                  v-for="(line, i) in projectedLines"
                  :key="`line-${activeRouteId}-${i}`"
                  :x1="line.x1"
                  :y1="line.y1"
                  :x2="line.x2"
                  :y2="line.y2"
                  stroke="#0C3CA0"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-dasharray="4 4"
                  class="map-dash"
                />
                <g v-for="m in projectedMarkers" :key="`${activeRouteId}-${m.name}`">
                  <circle
                    :cx="m.x"
                    :cy="m.y"
                    :r="m.isHub ? 6 : 4"
                    :fill="m.isHub ? '#f06d14' : '#0C3CA0'"
                    stroke="#ffffff"
                    stroke-width="2"
                  />
                  <text
                    :x="m.x"
                    :y="m.y - 10"
                    text-anchor="middle"
                    :font-weight="m.isHub ? 'bold' : 'normal'"
                    font-size="12"
                    fill="#0f172a"
                    font-family="system-ui"
                  >
                    {{ m.name }}
                  </text>
                </g>
              </svg>
            </div>

            <div class="absolute top-6 left-6 z-10 bg-white/90 backdrop-blur-md px-6 py-4 rounded-xl shadow-lg flex flex-col w-[200px] md:w-[250px] border border-slate-100">
              <div class="flex items-center mb-3">
                <Navigation class="w-5 h-5 text-blue-600 mr-2" />
                <span class="font-bold text-slate-900">{{ t(activeRoute.titleKey) }}</span>
              </div>
              <div class="space-y-2 text-xs text-slate-600">
                <div class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-orange-500 border-2 border-white mr-2" />
                  <span>主要枢纽 (Hubs)</span>
                </div>
                <div class="flex items-center">
                  <span class="w-3 h-3 rounded-full bg-blue-600 border-2 border-white mr-2" />
                  <span>核心节点 (Nodes)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-slate-50 rounded-2xl p-8 shadow-sm text-center border border-slate-100">
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ t('network.ext.title') }}</h3>
        <p class="text-slate-600 text-sm max-w-3xl mx-auto leading-relaxed">
          {{ t('network.ext.desc1') }}
          <span class="font-bold text-blue-600">{{ t('network.ext.hl1') }}</span>
          {{ t('network.ext.desc2') }}
          <span class="font-bold text-blue-600">{{ t('network.ext.hl2') }}</span>
          {{ t('network.ext.desc3') }}
          <span class="font-bold text-blue-600">{{ t('network.ext.hl3') }}</span>
          {{ t('network.ext.desc4') }}
        </p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.map-dash {
  animation: dash 20s linear infinite;
}
</style>
