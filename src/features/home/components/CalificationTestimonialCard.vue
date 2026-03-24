<script setup lang="ts">
import { computed } from 'vue'
import type { CalificationComment } from '../types/calification.model'

const props = defineProps<{
  comment: CalificationComment
}>()

const STAR_COUNT = 5

const starIndices = computed(() => Array.from({ length: STAR_COUNT }, (_, i) => i))

function isStarFilled(commentRating: number, index: number): boolean {
  const r = Math.min(Math.max(Number(commentRating) || 0, 0), STAR_COUNT)
  return index < r
}

function formatRating(rating: number): string {
  return Number(rating).toFixed(1)
}
</script>

<template>
  <div
    class="testimonial-card h-full w-full flex-1 min-w-0 border border-white/5 backdrop-blur-md rounded-[2.5rem] shadow-2xl p-8 flex flex-col"
  >
    <div class="flex justify-between items-start mb-6">
      <div class="flex flex-col">
        <span
          v-if="comment.position"
          class="text-[9px] font-mono text-white/30 uppercase tracking-widest mb-1"
        >
          {{ comment.position }}
        </span>
        <h4 class="text-xl font-bold text-white uppercase tracking-tighter">
          {{ comment.name }}
        </h4>
      </div>
      <div class="flex items-center gap-1 bg-white/5 px-2 py-1 shrink-0">
        <div class="flex -gap-0.5">
          <span
            v-for="i in starIndices"
            :key="i"
            class="material-symbols-outlined !text-[12px] text-white"
            :class="{ filled: isStarFilled(comment.rating, i) }"
            aria-hidden="true"
          >
            star
          </span>
        </div>
        <span class="text-xs font-bold text-white ml-1">
          {{ formatRating(comment.rating) }}
        </span>
      </div>
    </div>

    <p
      class="text-on-surface-variant text-sm leading-relaxed mb-8 font-light italic uppercase tracking-wider"
    >
      {{ comment.description }}
    </p>

    <div class="mt-auto">
      <div v-if="comment.tags?.length" class="flex flex-wrap gap-2 mb-6">
        <span
          v-for="tag in comment.tags"
          :key="tag.id"
          class="text-[9px] uppercase tracking-widest text-white/40 border border-white/10 px-2 py-1"
        >
          {{ tag.label }}
        </span>
      </div>
      <div
        v-if="comment.timeLapse"
        class="flex justify-between items-center border-t border-white/10 pt-4"
      >
        <span class="text-[10px] font-mono text-white/30 uppercase tracking-widest">
          {{ comment.timeLapse }}
        </span>
      </div>
    </div>
  </div>
</template>
