<script setup lang="ts">
import type { CardsTitleProps } from '../types/cards-title.model'
import WebDevelopCardsTitleCard from './WebDevelopCardsTitleCard.vue'

defineProps<CardsTitleProps>()
</script>

<template>
  <section
    class="bg-surface-container-lowest px-6 py-32 md:px-12"
    aria-labelledby="cards-title-heading"
  >
    <div class="mx-auto max-w-[1920px]">
      <div class="mx-auto max-w-7xl">
        <header class="mb-20">
          <span
            class="font-headline mb-4 block text-xs font-bold uppercase tracking-[0.3em] text-outline"
          >
            {{ tag }}
          </span>
          <h2
            id="cards-title-heading"
            class="font-headline text-4xl font-bold tracking-tight text-white"
          >
            {{ title }}
          </h2>
        </header>
        <div class="grid grid-cols-1 gap-1 md:grid-cols-2 lg:grid-cols-3">
          <WebDevelopCardsTitleCard
            v-for="item in items"
            :key="item.id"
            :item="item"
          />
        </div>
      </div>
    </div>
  </section>
</template>
