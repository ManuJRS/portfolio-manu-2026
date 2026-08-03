<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { isAppLocale, type AppLocale } from '../types/locale'
import { useLayout } from '../composables/useLayout'

const route = useRoute()

const locale = computed<AppLocale>(() => {
  const param = route.params.locale
  const value = Array.isArray(param) ? param[0] : param
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const { data: layout } = useLayout(locale)

const fallbackLabels = computed(() => {
  if (locale.value === 'en') {
    return {
      left: 'Projects',
      right: 'Web Develop',
      year: '2026',
      brand: 'Manudev',
    }
  }
  return {
    left: 'Proyectos',
    right: 'Desarrollo Web',
    year: '2026',
    brand: 'Manudev',
  }
})

const titleLeft = computed(
  () => layout.value?.titleLeft || fallbackLabels.value.left,
)

const messageRight = computed(
  () => layout.value?.messageRight || fallbackLabels.value.right,
)

const copyrightYear = computed(
  () => layout.value?.copyright.year || fallbackLabels.value.year,
)

const copyrightText = computed(
  () => layout.value?.copyright.text || fallbackLabels.value.brand,
)
</script>

<template>
  <footer class="max-w-7xl mx-auto w-full flex items-end justify-between md:gap-12 gap-6 px-4">
    <div class="flex flex-col flex-grow min-w-0">
      <div class="flex justify-between items-end">
        <h4 class="font-label text-xs tracking-[0.2em] text-outline uppercase">
          {{ titleLeft }}
        </h4>
        <div class="h-px bg-outline-variant/30 flex-1 mx-4 md:mx-8 mb-1 min-w-8" />
        <span class="font-label text-[10px] text-outline">{{ messageRight }}</span>
      </div>
    </div>
    <div class="flex flex-col items-end flex-shrink-0 border-l border-white/10 pl-6">
      <span class="text-[10px] text-white/30 uppercase tracking-[0.3em]">{{ copyrightYear }}</span>
      <span class="text-xs font-mono text-white uppercase tracking-wider">{{ copyrightText }}</span>
    </div>
  </footer>
</template>
