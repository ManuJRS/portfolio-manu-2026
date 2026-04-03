<script setup lang="ts">
import { computed } from 'vue'
import type { CardSolutionItem } from '../types/card-solution.model'
import { cn } from '@/shared/utils/cn'

const props = defineProps<{
  item: CardSolutionItem
}>()

const imgClass = computed(() =>
  props.item.layout === 'featured'
    ? 'h-auto max-h-[220px] w-[min(100%,440px)] translate-x-3 translate-y-4 object-cover md:max-h-[320px] md:translate-x-8 md:translate-y-8'
    : 'h-auto max-h-[200px] w-[min(100%,320px)] translate-x-2 translate-y-3 object-contain md:max-h-[260px] md:translate-x-6 md:translate-y-6',
)
</script>

<template>
  <article
    class="group relative flex min-h-[420px] flex-col justify-between overflow-hidden rounded-2xl border border-white/10 bg-surface-container p-10 transition-all duration-500 md:p-12"
  >
    <div
      class="pointer-events-none absolute bottom-0 right-0 z-[1] flex items-end justify-end overflow-visible"
      aria-hidden="true"
    >
      <div v-if="item.imageSrc" class="recomended-movies-stage">
        <div class="recomended-movies-tilt">
          <img
            :src="item.imageSrc"
            :alt="item.imageAlt || ''"
            loading="lazy"
            decoding="async"
            :class="cn('recomended-movies-radial-fade', imgClass)"
          />
        </div>
      </div>
    </div>

    <div
      class="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/5 blur-[50px] transition-opacity duration-500 group-hover:bg-primary/10"
      aria-hidden="true"
    />

    <div class="relative z-10 flex min-h-[320px] flex-col justify-between gap-10">
      <div>
        <span
          class="material-symbols-outlined mb-6 block text-3xl text-primary"
          aria-hidden="true"
          >{{ item.icon }}</span
        >
        <h3 class="font-headline mb-4 text-2xl font-bold tracking-tight text-on-surface md:text-3xl">
          {{ item.title }}
        </h3>
        <p class="font-body max-w-prose text-sm leading-relaxed text-on-surface-variant md:text-base">
          {{ item.description }}
        </p>
      </div>

      <div v-if="item.tags.length" class="flex flex-wrap gap-2">
        <span
          v-for="tag in item.tags"
          :key="tag"
          class="rounded-full bg-surface-container-highest px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-on-surface-variant"
        >
          {{ tag }}
        </span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.recomended-movies-stage {
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1200px;
  perspective-origin: 52% 42%;
}

.recomended-movies-tilt {
  position: relative;
  transform-style: preserve-3d;
  transform: rotateX(17deg) rotateY(-12deg) translateX(4.5rem);
  transform-origin: center 58%;
  will-change: transform;
}

@media (prefers-reduced-motion: reduce) {
  .recomended-movies-tilt {
    transform: translateX(1rem);
    will-change: auto;
  }
}

.recomended-movies-radial-fade {
  -webkit-mask-image: radial-gradient(
    ellipse 180% 120% at 108% 50%,
    #000 0%,
    #000 30%,
    rgba(0, 0, 0, 0.45) 60%,
    transparent 86%
  );
  mask-image: radial-gradient(
    ellipse 95% 95% at 108% 50%,
    #000 0%,
    #000 30%,
    rgba(0, 0, 0, 0.45) 60%,
    transparent 86%
  );
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
  mask-repeat: no-repeat;
}
</style>
