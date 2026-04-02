<script setup lang="ts">
import type { CardsSectionPillar } from '../types/cards-section.model'

defineProps<{
  pillar: CardsSectionPillar
}>()
</script>

<template>
  <article
    class="group bg-surface-container-lowest p-12 transition-colors duration-500 hover:bg-surface-container-low"
  >
    <div
      class="mb-12 opacity-50 transition-opacity group-hover:opacity-100"
      aria-hidden="true"
    >
      <span class="material-symbols-outlined text-4xl text-primary">{{ pillar.icon }}</span>
    </div>
    <h3 class="font-headline mb-4 text-2xl font-bold text-white">
      {{ pillar.title }}
    </h3>
    <p class="mb-8 leading-relaxed text-on-surface-variant">
      {{ pillar.description }}
    </p>
    <ul
      v-if="pillar.bullets.length"
      class="space-y-3 font-label text-xs uppercase tracking-widest text-primary"
    >
      <li v-for="(line, index) in pillar.bullets" :key="`${pillar.id}-b-${index}`" class="flex items-center gap-2">
        <span class="h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
        {{ line }}
      </li>
    </ul>
  </article>
</template>
