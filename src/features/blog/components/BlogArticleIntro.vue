<script setup lang="ts">
import type { BlogArticleIntroProps } from '../types/blog-article-intro.model'

const props = defineProps<BlogArticleIntroProps>()
</script>

<template>
  <header class="pb-8">
    <div v-if="props.tags.length" class="mb-6 flex flex-wrap gap-2">
      <span
        v-for="(tag, index) in props.tags"
        :key="`${tag}-${index}`"
        class="border-l-2 border-primary bg-surface-container-high px-3 py-1 text-[10px] font-bold uppercase tracking-[0.05em] text-primary"
      >
        #{{ tag }}
      </span>
    </div>

    <h1
      class="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-primary md:text-7xl"
    >
      {{ props.title }}
    </h1>

    <p
      v-if="props.description"
      class="mb-8 max-w-3xl text-lg leading-relaxed text-on-surface-variant"
    >
      {{ props.description }}
    </p>

    <div
      class="flex flex-col gap-4 text-[12px] font-bold uppercase tracking-widest text-outline opacity-80 md:flex-row md:items-center"
    >
      <span v-if="props.dateLabel">Fecha: {{ props.dateLabel }}</span>
      <span v-if="props.dateLabel && (props.readingMinutes != null || props.author)" class="hidden md:block"
        >|</span
      >
      <span
        v-if="props.readingMinutes != null && props.author"
        class="hidden md:block"
        >|</span
      >
      <span v-if="props.author" class="text-primary">{{ props.author }}</span>
    </div>
  </header>
</template>
