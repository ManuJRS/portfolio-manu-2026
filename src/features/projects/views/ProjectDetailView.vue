<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppLocale } from '@/features/home/types/locale'
import { usePageSeo } from '@/features/home/composables/usePageSeo'
import { useProjectPortfolio } from '../composables/useProjectPortfolio'
import ProjectBlockRenderer from '../components/ProjectBlockRenderer.vue'

const route = useRoute()

const locale = computed(() => route.params.locale as AppLocale)
const slug = computed(() => String(route.params.slug ?? ''))

const { data, loading, error, refresh } = useProjectPortfolio(locale, slug)

usePageSeo(() => data.value?.seo)
</script>

<template>
  <div class="min-h-screen">
    <div class="fixed inset-0 grid-bg pointer-events-none z-0" />

    <main class="relative z-10 min-h-screen">
      <div
        v-if="loading"
        class="flex min-h-screen items-center justify-center text-sm uppercase tracking-widest text-on-surface-variant"
      >
        Cargando…
      </div>

      <div
        v-else-if="error"
        class="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <p class="text-on-surface">{{ error.message }}</p>
        <button
          type="button"
          class="rounded border border-white/30 px-4 py-2 text-sm uppercase tracking-widest text-on-surface hover:bg-white/10"
          @click="refresh"
        >
          Reintentar
        </button>
      </div>

      <ProjectBlockRenderer v-else-if="data?.sections.length" :sections="data.sections" />

      <p
        v-else
        class="flex min-h-screen items-center justify-center text-sm text-on-surface-variant"
      >
        No hay contenido para este proyecto.
      </p>
    </main>
  </div>
</template>
