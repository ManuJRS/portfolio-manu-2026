<script setup lang="ts">
import type { StackGridProps } from '../types/stack-grid.model'
import TitleEffect from '@/shared/ui/TitleEffect.vue'

defineProps<StackGridProps>()
</script>

<template>
  <section class="max-w-7xl mx-auto w-full py-20 md:px-0 px-6">
    <div class="w-full mb-16 flex flex-col items-start">
      <div class="flex items-center gap-4 mb-6">
        <span
          v-if="sectionLabel"
          class="text-[10px] font-mono text-white bg-white/10 px-3 py-1"
        >
          {{ sectionLabel }}
        </span>
        <TitleEffect block-color="#ffffff" class="text-4xl font-bold text-white">
          <h2
          v-if="title"
          class="text-3xl font-bold tracking-[0.1em] uppercase text-white"
        >
          {{ title }}
        </h2>
        </TitleEffect>
      </div>
      <div class="w-full h-px bg-white/10" />
    </div>

    <div
      v-if="items?.length"
      class="grid grid-cols-2 md:grid-cols-8 gap-4 auto-rows-fr"
    >
      <div
        v-for="item in items"
        :key="item.id"
        class="border border-white/10 backdrop-blur-md p-4"
      >
        <div class="flex flex-col gap-4 items-center justify-center">
          <span class="text-xs font-mono text-white flex items-center gap-3">
            <span class="w-1.5 h-1.5 bg-white" />
            {{ item.label }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
