<script setup lang="ts">
import type { BlogArticleContentListProps } from '../types/blog-article-content-list.model'

const props = defineProps<BlogArticleContentListProps>()
</script>

<template>
  <section
    v-if="props.sectionTitle || props.items.length"
    class="border-l-4 border-primary bg-surface-container-low p-8 mt-8 mb-8"
  >
    <h3
      v-if="props.sectionTitle"
      class="mb-6 text-sm font-black uppercase tracking-[0.2em] text-primary"
    >
      {{ props.sectionTitle }}
    </h3>
    <ul v-if="props.items.length" class="space-y-6">
      <li
        v-for="(item, index) in props.items"
        :key="`${item.title ?? ''}-${item.description ?? ''}-${index}`"
        class="flex items-start gap-4"
      >
        <span class="material-symbols-outlined text-lg text-primary">check_circle</span>
        <div>
          <strong
            v-if="item.title"
            class="mb-1 block text-xs uppercase tracking-wider text-primary"
          >
            {{ item.title }}
          </strong>
          <p v-if="item.description" class="text-sm text-on-surface-variant">
            {{ item.description }}
          </p>
        </div>
      </li>
    </ul>
  </section>
</template>
