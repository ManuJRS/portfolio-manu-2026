<script setup lang="ts">
import type { WebDevelopTimelineProps } from '../types/web-develop-timeline.model'

defineProps<WebDevelopTimelineProps>()
</script>

<template>
  <section class="px-6 py-16 md:py-32">
    <div class="mx-auto max-w-7xl">
      <div
        v-if="title || description"
        class="mb-16 max-w-2xl text-center md:mb-20 text-left"
      >
        <h2 v-if="title" class="font-headline text-3xl font-semibold md:text-4xl">{{ title }}</h2>
        <p v-if="description" class="mt-4 text-lg text-on-surface-variant">{{ description }}</p>
      </div>

      <div class="relative grid grid-cols-1 gap-8 md:grid-cols-4">
        <div
          class="pointer-events-none absolute left-0 top-10 hidden h-px w-full bg-outline-variant/20 md:block"
        />

        <div
          v-for="(item, index) in items"
          :key="`${item.title}-${index}`"
          class="relative flex flex-row items-start gap-4 md:flex-col md:gap-0"
        >
          <div
            class="relative z-10 mb-0 flex h-20 w-20 shrink-0 items-center justify-center border border-outline-variant bg-surface-container-lowest md:mb-8"
          >
            <span class="text-lg font-bold">{{ String(index + 1).padStart(2, '0') }}</span>
          </div>
          <div class="min-w-0 flex-1 pt-1 md:pt-0">
            <h5 class="mb-2 text-sm font-bold uppercase tracking-widest">{{ item.title }}</h5>
            <p class="text-xs uppercase tracking-tighter text-on-surface-variant ">{{ item.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
