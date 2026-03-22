<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import type { AppLocale } from '@/features/home/types/locale'
import { useInfoPortfolio } from '../composables/useInfoPortfolio'
import { usePageSeo } from '@/features/home/composables/usePageSeo'
import InfoDynamicBlockRenderer from '@/features/dynamic-blocks/InfoDynamicBlockRenderer.vue'

const route = useRoute()

const locale = computed(
  () => route.params.locale as AppLocale,
)

const { data, loading, error, refresh } = useInfoPortfolio(locale)

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

      <div
        v-else-if="data?.sections.length"
        class="max-w-7xl mx-auto w-full px-6 py-20 md:py-32 md:px-48"
      >
        <InfoDynamicBlockRenderer :sections="data.sections" />
      </div>

      <p
        v-else
        class="flex min-h-screen items-center justify-center text-sm text-on-surface-variant"
      >
        No hay secciones para este idioma.
      </p>
    </main>
  </div>
</template>
