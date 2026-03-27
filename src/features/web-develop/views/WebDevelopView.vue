<script setup lang="ts">
import { usePageSeo } from '@/features/home/composables/usePageSeo'
import WebDevelopBlockRenderer from '../components/WebDevelopBlockRenderer.vue'
import { useWebDevelop } from '../composables/useWebDevelop'

const { data, loading, error, refresh } = useWebDevelop()

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
        Cargando...
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

      <WebDevelopBlockRenderer v-else-if="data?.sections.length" :sections="data.sections" />

      <p
        v-else
        class="flex min-h-screen items-center justify-center text-sm text-on-surface-variant"
      >
        No hay secciones para mostrar.
      </p>
    </main>
  </div>
</template>
