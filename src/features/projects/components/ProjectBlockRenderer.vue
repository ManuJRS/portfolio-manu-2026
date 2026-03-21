<script setup lang="ts">
import type { ProjectPortfolioSection } from '../types/project-portfolio.model'
import { resolveProjectBlock } from '../registry'

defineProps<{
  sections: ProjectPortfolioSection[]
}>()

function resolve(component: string) {
  return resolveProjectBlock(component)
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
