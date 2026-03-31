<script setup lang="ts">
import { computed } from 'vue'
import type { BlogArticleContentProps } from '../types/blog-article-content.model'

const props = defineProps<BlogArticleContentProps>()

const hasTextBlock = computed(
  () => Boolean(props.title) || props.descriptionParagraphs.length > 0,
)

const headingTag = computed(() => props.headingTag)
</script>

<template>
  <div class="space-y-6 pb-8 pt-8">
    <section v-if="hasTextBlock" class="space-y-6">
      <component
        :is="headingTag"
        v-if="props.title"
        class="border-b border-outline-variant/15 pb-2 text-2xl font-bold uppercase tracking-tight text-primary"
      >
        {{ props.title }}
      </component>

      <div
        v-if="props.descriptionParagraphs.length"
        class="space-y-4 text-lg leading-relaxed text-on-surface-variant"
      >
        <p v-for="(paragraph, index) in props.descriptionParagraphs" :key="index">
          {{ paragraph }}
        </p>
      </div>
    </section>

    <figure v-for="(item, index) in props.mediaItems" :key="`${item.src}-${index}`" class="group">
      <div
        class="relative aspect-video overflow-hidden border border-outline-variant/10 bg-surface-container-lowest"
      >
        <img
          v-if="item.kind === 'image'"
          :src="item.src"
          :alt="item.alt"
          class="h-full w-full object-cover grayscale opacity-50 transition-opacity duration-700 group-hover:opacity-80"
        />
        <video
          v-else
          :src="item.src"
          class="h-full w-full object-cover opacity-80 transition-opacity duration-700 group-hover:opacity-100"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
        />
        <div
          class="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest via-transparent to-transparent"
        />
      </div>
      <figcaption
        v-if="item.caption"
        class="mt-4 text-[10px] font-bold uppercase tracking-widest text-outline"
      >
        {{ item.caption }}
      </figcaption>
    </figure>
  </div>
</template>
