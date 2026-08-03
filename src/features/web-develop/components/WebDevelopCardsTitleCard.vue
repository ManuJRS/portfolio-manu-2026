<script setup lang="ts">
import type { CardsTitleTestimonial } from '../types/cards-title.model'

defineProps<{
  item: CardsTitleTestimonial
}>()
</script>

<template>
  <article>
    <blockquote
      class="flex min-h-[400px] flex-col justify-between border-l border-outline-variant/30 bg-surface p-12"
    >
      <div>
        <span
          class="material-symbols-outlined mb-8 block text-4xl text-primary"
          aria-hidden="true"
          >format_quote</span
        >
        <p
          class="font-headline text-xl font-light italic leading-relaxed text-white md:text-2xl"
        >
          {{ item.quote }}
        </p>
      </div>
      <footer class="mt-12">
        <cite class="font-headline text-sm font-bold uppercase tracking-widest text-white not-italic">
          {{ item.author }}
        </cite>
        <div class="font-label mt-1 text-xs uppercase tracking-widest text-outline">
          {{ item.role }}
        </div>
      </footer>
    </blockquote>
  </article>
</template>
