<script setup lang="ts">
import type { HomePortfolioSection } from '@/features/home/types/home-portfolio.model'
import { resolveHomeBlock } from '../registry'

defineProps<{
  sections: HomePortfolioSection[]
}>()

function resolve(component: string) {
  return resolveHomeBlock(component)
}
</script>

<template>
  <template v-for="section in sections" :key="section.id">
    <component
      v-if="resolve(section.component)"
      :is="resolve(section.component)"
      v-bind="section.props"
    />
  </template>
</template>
