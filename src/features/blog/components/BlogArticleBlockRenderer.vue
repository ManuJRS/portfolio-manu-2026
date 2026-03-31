<script setup lang="ts">
import type { BlogArticleSection } from '../types/blog-article-page.model'
import { resolveBlogArticleBlock } from '../registry'

defineProps<{
  sections: BlogArticleSection[]
}>()

function resolve(component: string) {
  return resolveBlogArticleBlock(component)
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
