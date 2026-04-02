<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/shared/utils/cn'
import type { HowIDoProps } from '../types/how-i-do.model'

const props = defineProps<HowIDoProps>()

const hasImages = computed(() => props.images.length > 0)

const gridClass = computed(() =>
  cn(
    'mx-auto max-w-7xl grid items-center gap-24',
    hasImages.value ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1',
  ),
)
</script>

<template>
  <section
    class="overflow-hidden bg-surface-container-lowest px-6 py-32 md:px-12"
    aria-labelledby="how-i-do-heading"
  >
    <div :class="gridClass">
      <div>
        <span
          class="font-headline mb-6 block text-xs font-bold uppercase tracking-[0.3em] text-outline"
        >
          {{ tag }}
        </span>
        <h2
          id="how-i-do-heading"
          class="font-headline mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl"
        >
          {{ title }}
        </h2>
        <ol v-if="steps.length" class="m-0 list-none space-y-12 p-0">
          <li v-for="step in steps" :key="step.id" class="flex gap-8">
            <span
              class="font-headline w-10 shrink-0 text-4xl font-extralight text-outline/30"
              aria-hidden="true"
              >{{ step.number }}</span
            >
            <div>
              <h3 class="mb-2 text-xl font-bold text-white">
                {{ step.title }}
              </h3>
              <p class="text-on-surface-variant">
                {{ step.description }}
              </p>
            </div>
          </li>
        </ol>
      </div>

      <div v-if="hasImages" class="relative">
        <div class="grid grid-cols-1 items-start gap-4 sm:grid-cols-2 md:gap-5">
          <div
            v-for="(img, i) in images"
            :key="`${img.src}-${i}`"
            :class="[
              'aspect-[4/5] overflow-hidden rounded-lg bg-surface-container-high shadow-lg shadow-black/30',
              img.stagger && 'sm:mt-10 md:mt-14',
            ]"
          >
            <img
              :src="img.src"
              :alt="img.alt"
              class="h-full w-full object-cover grayscale transition-all duration-700 hover:grayscale-0"
              loading="lazy"
              decoding="async"
              width="800"
              height="1000"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
