<script setup lang="ts">
import type { ProjectHeroDarkProps } from '../types/project-hero-dark.model'

defineProps<ProjectHeroDarkProps>()
</script>

<template>
  <section class="relative px-6 md:px-12 pt-12 pb-12 md:w-[76vw] mx-auto">
    <div class="flex flex-col gap-2 mb-4">
      <span
        v-if="projectCode"
        class="font-label text-[10px] tracking-[0.2em] text-outline uppercase"
      >
        {{ projectCode }}
      </span>
      <h1
        v-if="titleLine1 || titleLine2"
        class="text-7xl md:text-9xl font-bold tracking-[-0.04em] leading-none uppercase text-white break-words"
      >
        <template v-if="titleLine1">{{ titleLine1 }}</template>
        <br v-if="titleLine1 && titleLine2" />
        <template v-if="titleLine2">{{ titleLine2 }}</template>
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-start">
      <div class="md:col-span-4 flex flex-col gap-6">
        <p
          v-if="description"
          class="text-lg text-[#c6c6c6] font-light leading-relaxed"
        >
          {{ description }}
        </p>
        <div v-if="technologies?.length" class="flex flex-wrap gap-2">
          <span
            v-for="(tech, index) in technologies"
            :key="`${tech}-${index}`"
            class="bg-[#2a2a2a] px-3 pb-1 pt-2 text-[10px] font-label tracking-widest uppercase"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div v-if="imageUrl" class="md:col-span-8">
        <div class="w-full aspect-[16/7] bg-surface-container-lowest overflow-hidden">
          <img
            class="w-full h-full object-cover opacity-80 mix-blend-luminosity"
            :src="imageUrl"
            :alt="imageAlt ?? ''"
          />
        </div>
      </div>
    </div>
  </section>
</template>
