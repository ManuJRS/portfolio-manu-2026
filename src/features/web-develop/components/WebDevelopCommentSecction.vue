<script setup lang="ts">
import type { CommentSecctionProps } from '../types/comment-secction.model'

defineProps<CommentSecctionProps>()
</script>

<template>
  <section class="bg-surface px-6 py-32 md:px-12" aria-labelledby="comment-secction-heading">
    <div class="mx-auto max-w-5xl border-t border-outline-variant/20 pt-32 text-center">
      <h2
        id="comment-secction-heading"
        class="font-headline mb-8 text-3xl font-bold tracking-tight text-white"
      >
        {{ title }}
      </h2>
      <p
        class="font-body mx-auto mb-12 max-w-3xl text-xl leading-relaxed text-on-surface-variant"
      >
        <template v-for="(part, i) in paragraphParts" :key="i">
          <span v-if="part.bold" class="font-bold text-white">{{ part.text }}</span>
          <template v-else>{{ part.text }}</template>
        </template>
      </p>
      <div
        v-if="techLabels.length"
        class="flex flex-wrap justify-center gap-8 grayscale opacity-50 md:gap-12"
      >
        <div
          v-for="(label, i) in techLabels"
          :key="`${label}-${i}`"
          class="font-label text-sm uppercase tracking-tighter"
        >
          {{ label }}
        </div>
      </div>
    </div>
  </section>
</template>
