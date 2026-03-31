<script setup lang="ts">
import type { SeoMeta } from '@/features/home/types/home-portfolio.model'
import { usePageSeo } from '@/features/home/composables/usePageSeo'

/**
 * Aplica meta, canonical, JSON-LD y robots vía `usePageSeo` (misma fuente que Home / Info).
 * Sin salida visual; colócalo en la raíz de la vista.
 */
const props = defineProps<{
  seo?: SeoMeta
}>()

usePageSeo(() => props.seo)
</script>

<template>
  <span class="hidden" aria-hidden="true" />
</template>
