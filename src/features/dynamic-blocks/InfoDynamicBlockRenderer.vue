<script setup lang="ts">
import type { InfoPortfolioSection } from '@/features/info/types/info-portfolio.model'
import { resolveInfoBlock } from './infoRegistry'

defineProps<{
  sections: InfoPortfolioSection[]
}>()

function resolve(component: string) {
  return resolveInfoBlock(component)
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
