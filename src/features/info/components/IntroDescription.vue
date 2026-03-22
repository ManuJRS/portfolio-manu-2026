<script setup lang="ts">
import type { IntroDescriptionProps } from '../types/intro-description.model'

defineProps<IntroDescriptionProps>()
</script>

<template>
  <header class="mb-24">
    <div v-if="infoTag" class="flex items-baseline gap-4 mb-4">
      <span class="text-[10px] tracking-[0.2em] uppercase font-medium text-outline">
        {{ infoTag }}
      </span>
      <div class="h-[1px] w-12 bg-outline-variant/30" />
    </div>
    <h1
      v-if="title"
      class="text-6xl md:text-8xl font-bold tracking-tighter mb-8 text-primary"
    >
      {{ title }}
    </h1>
    <p
      v-if="description"
      class="max-w-xl text-lg text-on-surface-variant leading-relaxed"
    >
      {{ description }}
    </p>
  </header>
</template>
