<script setup lang="ts">
import type { WebDevelopSection } from '../types/web-develop-page.model'
import { resolveWebDevelopBlock } from '../registry'

defineProps<{
  sections: WebDevelopSection[]
}>()

function resolve(component: string) {
  return resolveWebDevelopBlock(component)
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
