<script setup lang="ts">
import { computed, onMounted, ref } from 'vue';
import { geoMercator, geoPath } from 'd3-geo';
import { feature } from 'topojson-client';
import type { Topology } from 'topojson-specification';
import type { Geometry } from 'geojson';
import { Clock } from 'lucide-vue-next';
import { useLanguage } from '../i18n';

defineProps<{
  hideHeader?: boolean;
}>();

/** All network nodes from doc coverage */
const allMarkers: Record<string, [number, number]> = {
  成都: [104.07, 30.57],
  重庆: [106.55, 29.56],
  西安: [108.94, 34.34],
  深圳: [114.06, 22.54],
  乌鲁木齐: [87.62, 43.83],
  华沙: [21.01, 52.23],
  汉堡: [9.99, 53.55],
  杜伊斯堡: [6.76, 51.43],
  布达佩斯: [19.04, 47.5],
  伦敦: [-0.13, 51.51],
  马拉舍维奇: [23.52, 52.16],
  莫斯科: [37.62, 55.76],
  明斯克: [27.56, 53.9],
  阿拉木图: [76.93, 43.22],
  塔什干: [69.24, 41.3],
  波季: [41.67, 42.15],
  第比利斯: [44.83, 41.72],
};

const hubs = new Set(['成都', '重庆', '西安', '深圳', '乌鲁木齐']);

const branchColors = ['#FFB901', '#4667ca', '#7b94dd', '#e6a700', '#254db5'];

const routeList = [
  {
    id: 'xa_hamburg',
    from: '西安',
    to: '汉堡',
    via: ['乌鲁木齐', '阿拉木图', '莫斯科', '明斯克', '马拉舍维奇'] as string[],
    descKey: 'network.route.xa_hamburg.desc',
    timeKey: 'network.route.xa_hamburg.time',
  },
  {
    id: 'cd_warsaw',
    from: '成都',
    to: '华沙',
    via: ['乌鲁木齐', '莫斯科', '明斯克'] as string[],
    descKey: 'network.route.cd_warsaw.desc',
    timeKey: 'network.route.cd_warsaw.time',
  },
  {
    id: 'cq_duisburg',
    from: '重庆',
    to: '杜伊斯堡',
    via: ['乌鲁木齐', '莫斯科', '华沙'] as string[],
    descKey: 'network.route.cq_duisburg.desc',
    timeKey: 'network.route.cq_duisburg.time',
  },
  {
    id: 'cd_moscow',
    from: '成都',
    to: '莫斯科',
    via: ['乌鲁木齐'] as string[],
    descKey: 'network.route.cd_moscow.desc',
    timeKey: 'network.route.cd_moscow.time',
  },
  {
    id: 'ur_almaty',
    from: '乌鲁木齐',
    to: '阿拉木图',
    via: [] as string[],
    descKey: 'network.route.ur_almaty.desc',
    timeKey: 'network.route.ur_almaty.time',
  },
  {
    id: 'xa_tashkent',
    from: '西安',
    to: '塔什干',
    via: ['乌鲁木齐'] as string[],
    descKey: 'network.route.xa_tashkent.desc',
    timeKey: 'network.route.xa_tashkent.time',
  },
] as const;

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/land-110m.json';

const { t } = useLanguage();
const activeRouteId = ref<(typeof routeList)[number]['id']>('xa_hamburg');
const landPath = ref('');

const width = 1000;
const height = 520;

const projection = geoMercator()
  .center([62, 44])
  .scale(300)
  .translate([width / 2, height / 2 + 10]);

const pathGen = geoPath(projection);

const activeRoute = computed(() => routeList.find((r) => r.id === activeRouteId.value) || routeList[0]);

const routeTitle = computed(
  () => `${t('network.route.prefix')}（${activeRoute.value.from} ~ ${activeRoute.value.to}）`,
);

function project(name: string) {
  const coords = allMarkers[name];
  if (!coords) return null;
  const p = projection(coords);
  if (!p) return null;
  return { x: p[0], y: p[1] };
}

function linePath(points: string[]) {
  const projected = points.map(project).filter(Boolean) as { x: number; y: number }[];
  if (projected.length < 2) return '';
  let d = `M ${projected[0].x} ${projected[0].y}`;
  for (let i = 1; i < projected.length; i++) {
    const a = projected[i - 1];
    const b = projected[i];
    const mx = (a.x + b.x) / 2;
    const my = (a.y + b.y) / 2 - Math.min(40, Math.abs(a.x - b.x) * 0.06);
    d += ` Q ${mx} ${my} ${b.x} ${b.y}`;
  }
  return d;
}

const activeLine = computed(() => {
  const r = activeRoute.value;
  return linePath([r.from, ...r.via, r.to]);
});

/** Other routes as thinner branch lines */
const branchLines = computed(() =>
  routeList
    .filter((r) => r.id !== activeRouteId.value)
    .map((r, i) => ({
      key: r.id,
      d: linePath([r.from, ...r.via, r.to]),
      color: branchColors[i % branchColors.length],
    }))
    .filter((l) => l.d),
);

const visibleMarkers = computed(() => {
  const r = activeRoute.value;
  const names = new Set([r.from, r.to, ...r.via, '深圳', '布达佩斯', '伦敦', '波季', '第比利斯']);
  // Always show domestic hubs lightly
  hubs.forEach((h) => names.add(h));
  return [...names]
    .map((name) => {
      const p = project(name);
      if (!p) return null;
      const isEndpoint = name === r.from || name === r.to;
      return {
        name,
        ...p,
        isHub: hubs.has(name),
        isEndpoint,
      };
    })
    .filter(Boolean) as {
    name: string;
    x: number;
    y: number;
    isHub: boolean;
    isEndpoint: boolean;
  }[];
});

const timeRows = computed(() => {
  const active = activeRoute.value;
  const extras = routeList.filter((r) => r.id !== active.id).slice(0, 2);
  return [active, ...extras].map((r) => ({
    id: r.id,
    label: `${r.from}-${r.to}`,
    time: t(r.timeKey),
    active: r.id === active.id,
  }));
});

onMounted(async () => {
  try {
    const res = await fetch(geoUrl);
    const topology = (await res.json()) as Topology;
    const land = feature(topology, (topology.objects as any).land) as unknown as Geometry;
    landPath.value = pathGen(land as any) || '';
  } catch (err) {
    console.error('Failed to load map land', err);
  }
});
</script>

<template>
  <section id="network" class="py-12 md:py-16 bg-white">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div v-if="!hideHeader" class="text-center mb-10">
        <h2 class="text-3xl font-bold text-slate-900 mb-4">{{ t('network.title') }}</h2>
        <div class="w-12 h-1 bg-blue-600 mx-auto rounded-full mb-6" />
        <p class="text-slate-600 max-w-4xl mx-auto text-sm leading-relaxed text-balance">
          {{ t('network.desc') }}
        </p>
      </div>

      <!-- Route tabs -->
      <div class="flex flex-wrap gap-2 mb-8">
        <button
          v-for="route in routeList"
          :key="route.id"
          class="px-4 py-2 rounded-full text-sm font-semibold transition-colors"
          :class="
            route.id === activeRouteId
              ? 'bg-blue-600 text-white'
              : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
          "
          @click="activeRouteId = route.id"
        >
          {{ route.from }} ~ {{ route.to }}
        </button>
      </div>

      <!-- Title + description (reference layout) -->
      <div class="mb-6 max-w-4xl">
        <h3 class="text-2xl md:text-[28px] font-bold text-blue-700 mb-3">
          {{ routeTitle }}
        </h3>
        <p class="text-sm text-slate-600 leading-relaxed">
          {{ t(activeRoute.descKey) }}
        </p>
      </div>

      <!-- Map -->
      <div class="relative bg-white rounded-xl overflow-hidden border border-slate-100">
        <svg
          :viewBox="`0 0 ${width} ${height}`"
          class="w-full h-[340px] md:h-[480px]"
          preserveAspectRatio="xMidYMid meet"
        >
          <rect width="100%" height="100%" fill="#ffffff" />

          <path
            v-if="landPath"
            :d="landPath"
            fill="#e8edf2"
            stroke="none"
          />

          <!-- Branch routes -->
          <path
            v-for="line in branchLines"
            :key="line.key"
            :d="line.d"
            fill="none"
            :stroke="line.color"
            stroke-width="1.6"
            stroke-linecap="round"
            opacity="0.55"
          />

          <!-- Active main route -->
          <path
            v-if="activeLine"
            :d="activeLine"
            fill="none"
            stroke="#0C3CA0"
            stroke-width="3.2"
            stroke-linecap="round"
            opacity="0.95"
          />

          <!-- Nodes -->
          <g v-for="m in visibleMarkers" :key="`${activeRouteId}-${m.name}`">
            <!-- Soft halo for visibility -->
            <circle
              :cx="m.x"
              :cy="m.y"
              :r="m.isEndpoint ? 16 : m.isHub ? 12 : 9"
              :fill="m.isEndpoint ? '#0C3CA0' : m.isHub ? '#FFB901' : '#0C3CA0'"
              opacity="0.18"
            />
            <circle
              :cx="m.x"
              :cy="m.y"
              :r="m.isEndpoint ? 8 : m.isHub ? 6.5 : 5"
              :fill="m.isEndpoint || m.isHub ? '#FFB901' : '#0C3CA0'"
              stroke="#ffffff"
              :stroke-width="m.isEndpoint ? 3 : 2.5"
            />

            <!-- Endpoint callout label -->
            <g v-if="m.isEndpoint">
              <rect
                :x="m.x - 42"
                :y="m.y - 44"
                width="84"
                height="26"
                rx="3"
                fill="#0C3CA0"
              />
              <polygon
                :points="`${m.x - 6},${m.y - 18} ${m.x + 6},${m.y - 18} ${m.x},${m.y - 10}`"
                fill="#0C3CA0"
              />
              <text
                :x="m.x"
                :y="m.y - 26"
                text-anchor="middle"
                font-size="13"
                font-weight="700"
                fill="#ffffff"
                font-family="system-ui, sans-serif"
              >
                {{ m.name }}
              </text>
            </g>

            <!-- Secondary labels -->
            <text
              v-else
              :x="m.x"
              :y="m.y - 12"
              text-anchor="middle"
              font-size="12"
              font-weight="700"
              fill="#0f172a"
              font-family="system-ui, sans-serif"
              style="paint-order: stroke; stroke: #ffffff; stroke-width: 4px"
            >
              {{ m.name }}
            </text>
          </g>
        </svg>

        <!-- Transit time card -->
        <div class="absolute bottom-4 right-4 w-[220px] md:w-[240px] shadow-md overflow-hidden rounded-sm border border-blue-700/30 bg-white z-10">
          <div class="bg-blue-700 text-white px-3 py-2 flex items-center gap-2 text-sm font-bold">
            <Clock class="w-4 h-4" />
            {{ t('network.time.title') }}
          </div>
          <ul class="px-3 py-2 space-y-1.5">
            <li
              v-for="row in timeRows"
              :key="row.id"
              class="text-sm leading-snug"
              :class="row.active ? 'text-blue-700 font-semibold' : 'text-slate-600'"
            >
              {{ row.label }} ({{ row.time }})
            </li>
          </ul>
        </div>
      </div>

      <div class="mt-12 bg-slate-50 rounded-2xl p-8 text-center">
        <h3 class="text-xl font-bold text-slate-900 mb-3">{{ t('network.ext.title') }}</h3>
        <p class="text-slate-600 text-sm max-w-3xl mx-auto leading-relaxed text-balance">
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
