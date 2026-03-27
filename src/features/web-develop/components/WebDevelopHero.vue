<script setup lang="ts">
import MotionButton from '@/shared/ui/MotionButton.vue'
defineProps<{
  title: string
  tag: string
  buttonText: string
  buttonUrl: string
}>()
</script>

<template>
  <section
    class="relative flex h-[60vh] items-center justify-center overflow-hidden pt-20 md:h-[70vh]"
  >
    <div class="absolute inset-0 grid-pattern" />
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
    />

    <div class="relative z-10 mx-auto w-full max-w-7xl px-8 text-center">
      <div v-if="tag" class="mb-8 inline-block border border-outline-variant/30 px-4 py-1">
        <span class="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">{{ tag }}</span>
      </div>

      <h1
        class="mb-8 font-headline text-4xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-9xl"
      >
        {{ title }}
      </h1>

      <div class="flex flex-col items-center justify-center gap-4">
        <MotionButton :href="buttonUrl" :label="buttonText" />
      </div>
    </div>

    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
      <span class="material-symbols-outlined">south</span>
    </div>
  </section>
</template>
