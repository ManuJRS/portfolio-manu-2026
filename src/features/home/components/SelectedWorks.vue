<script setup lang="ts">
import { ref, computed, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useMediaQuery } from '@vueuse/core'
import type { SelectedWorksProps } from '../types/selected-works.model'
import TitleEffect from '@/shared/ui/TitleEffect.vue'

const props = withDefaults(
  defineProps<SelectedWorksProps>(),
  {
    showFilters: true,
    defaultFilter: 'all',
    works: () => [],
    filterTags: () => ['all'],
  },
)

const route = useRoute()
const activeFilter = ref(props.defaultFilter ?? 'all')

const locale = computed(
  () => (route.params.locale as string) || 'es',
)

const isDesktop = useMediaQuery('(min-width: 768px)')
const pageSize = computed(() => (isDesktop.value ? 6 : 3))

const visibleCount = ref(3)

watch(
  pageSize,
  (n) => {
    visibleCount.value = Math.max(visibleCount.value, n)
  },
  { immediate: true },
)

watch(activeFilter, () => {
  visibleCount.value = pageSize.value
})

const filteredWorks = computed(() => {
  if (activeFilter.value === 'all') return props.works
  return props.works.filter((w) => w.projectTag === activeFilter.value)
})

const displayedWorks = computed(() =>
  filteredWorks.value.slice(0, visibleCount.value),
)

const hasMore = computed(
  () => displayedWorks.value.length < filteredWorks.value.length,
)

const seeMoreLabel = computed(() =>
  locale.value === 'en' ? 'See More' : 'Ver Mas',
)

function setFilter(tag: string) {
  activeFilter.value = tag
}

function loadMore() {
  visibleCount.value += 3
}

function toProject(slug: string) {
  return { name: 'project-detail', params: { locale: locale.value, slug } }
}
</script>

<template>
  <section class="max-w-7xl mx-auto w-full flex flex-col items-center px-6 py-20">
    <div
      class="w-full mb-24 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/10 pb-12"
    >
      <div>
        <div class="flex items-baseline gap-3 flex-wrap mb-4">
          <TitleEffect block-color="#ffffff" class="text-4xl font-bold text-white">
            <h2
            class="text-3xl md:text-3xl font-bold tracking-tighter uppercase text-white"
          >
            <template v-if="title">{{ title }}</template>
            <template v-else>Selected<br />Works</template>
          </h2>
          </TitleEffect>
          <span class="text-[18px] font-mono text-white/30 uppercase tracking-widest shrink-0">
            /{{ filteredWorks.length }}
          </span>
        </div>
        <p
          v-if="description"
          class="text-on-surface-variant max-w-sm text-sm uppercase tracking-widest leading-loose"
        >
          {{ description }}
        </p>
        <p
          v-else
          class="text-on-surface-variant max-w-sm text-sm uppercase tracking-widest leading-loose"
        >
          A curated selection of technical implementations and digital explorations.
        </p>
      </div>
      <!-- Filter Bar -->
      <div
        v-if="showFilters && filterTags?.length"
        class="flex items-center gap-2 p-1 bg-white/5 backdrop-blur-md border border-white/10 rounded-full flex-wrap"
      >
        <button
          v-for="tag in filterTags"
          :key="tag"
          type="button"
          :class="[
            'filter-btn px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all rounded-full hover:cursor-pointer',
            activeFilter === tag
              ? 'active text-black bg-white'
              : 'text-white/50 hover:text-white',
          ]"
          @click="setFilter(tag)"
        >
          {{ tag === 'all' ? 'All' : tag }}
        </button>
      </div>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-12 w-full">
      <RouterLink
        v-for="(work, index) in displayedWorks"
        :key="work.id"
        :to="toProject(work.slug)"
        class="project-card group block"
        :data-category="work.projectTag"
      >
        <div
          class="aspect-[4/5] overflow-hidden bg-zinc-900 border border-white/5 rounded-3xl"
        >
          <img
            v-if="work.imageUrl"
            :alt="work.imageAlt ?? work.title"
            :src="work.imageUrl"
            class="w-full h-full object-cover brightness-50 group-hover:brightness-100 group-hover:scale-105 transition-all duration-700 rounded-3xl hover:cursor-pointer"
          />
          <div
            v-else
            class="w-full h-full bg-zinc-800 flex items-center justify-center rounded-3xl"
          >
            <span class="text-white/30 text-4xl font-bold">{{ index + 1 }}</span>
          </div>
        </div>
        <div class="pt-8">
          <div class="flex justify-between items-start mb-4">
            <h3 class="text-2xl font-bold text-white uppercase tracking-tighter">
              {{ work.title }}
            </h3>
            <span class="text-[10px] font-mono text-white/30 uppercase tracking-widest">
              /{{ String(index + 1).padStart(2, '0') }}
            </span>
          </div>
          <p
            v-if="work.descriptionProyect ?? work.shortDescription"
            class="text-on-surface-variant text-xs leading-relaxed mb-6 uppercase tracking-wider"
          >
            {{ work.descriptionProyect ?? work.shortDescription }}
          </p>
          <span
            class="inline-flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-white border-b border-white/20 pb-1 group-hover:border-white transition-all"
          >
            Explore <span class="material-symbols-outlined text-xs">arrow_outward</span>
          </span>
        </div>
      </RouterLink>
    </div>

    <button
      v-if="hasMore"
      type="button"
      class="mt-16 px-10 py-4 text-[10px] uppercase tracking-[0.25em] font-bold text-white border border-white/20 rounded-full hover:bg-white hover:text-black transition-colors hover:cursor-pointer"
      @click="loadMore"
    >
      {{ seeMoreLabel }}
    </button>
  </section>
</template>
