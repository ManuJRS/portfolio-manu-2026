<script setup lang="ts">
import type { CardsSectionProps } from '../types/cards-section.model'
import WebDevelopCardsSectionCard from './WebDevelopCardsSectionCard.vue'

defineProps<CardsSectionProps>()
</script>

<template>
  <section class="bg-surface px-6 py-32 md:px-12" aria-labelledby="cards-section-heading">
    <div class="mx-auto max-w-7xl">
      <header class="mb-20">
        <span
          class="font-headline mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-outline"
        >
          {{ tag }}
        </span>
        <h2
          id="cards-section-heading"
          class="font-headline text-4xl font-bold tracking-tight text-white"
        >
          {{ title }}
        </h2>
      </header>
      <div class="grid grid-cols-1 gap-1 md:grid-cols-3">
        <WebDevelopCardsSectionCard
          v-for="pillar in pillars"
          :key="pillar.id"
          :pillar="pillar"
        />
      </div>
    </div>
  </section>
</template>
