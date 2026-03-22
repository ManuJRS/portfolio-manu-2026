<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppLocale } from '../types/locale'

const route = useRoute()

const locale = computed<AppLocale>(() => {
  const param = route.params.locale
  return typeof param === 'string' && (param === 'es' || param === 'en')
    ? param
    : 'es'
})

const labels = computed(() => {
  if (locale.value === 'en') {
    return { left: 'Projects', right: 'Web Develop' }
  }
  return { left: 'Proyectos', right: 'Desarrollo Web' }
})
</script>

<template>
  <footer class="max-w-7xl mx-auto w-full flex items-end justify-between md:gap-12 gap-6 px-4">
    <div class="flex flex-col flex-grow min-w-0">
      <div class="flex justify-between items-end">
        <h4 class="font-label text-xs tracking-[0.2em] text-outline uppercase">
          {{ labels.left }}
        </h4>
        <div class="h-px bg-outline-variant/30 flex-1 mx-4 md:mx-8 mb-1 min-w-8" />
        <span class="font-label text-[10px] text-outline">{{ labels.right }}</span>
      </div>
    </div>
    <div class="flex flex-col items-end flex-shrink-0 border-l border-white/10 pl-6">
      <span class="text-[10px] text-white/30 uppercase tracking-[0.3em]">2026</span>
      <span class="text-xs font-mono text-white uppercase tracking-wider">Manudev</span>
    </div>
  </footer>
</template>
