<script setup lang="ts">
import { Cpu, Lock, Sparkles, Zap, type LucideIcon } from 'lucide-vue-next'
import type { WebDevelopVideoProps } from '../types/web-develop-video.model'

defineProps<WebDevelopVideoProps>()

const featureIcons: LucideIcon[] = [Zap, Cpu, Lock, Sparkles]

function iconAt(index: number) {
  return featureIcons[index % featureIcons.length]
}
</script>

<template>
  <section class="overflow-hidden bg-surface-container-lowest py-16 md:py-32">
    <div class="mx-auto max-w-7xl space-y-8 px-6 md:space-y-12">
      <div class="relative z-10 max-w-2xl">
        <h2 class="font-headline text-3xl font-semibold lg:text-5xl">{{ title }}</h2>
        <p class="mt-6 text-lg text-on-surface-variant">{{ description }}</p>
      </div>

      <div v-if="mediaUrl" class="relative -mx-4 rounded-3xl p-3 md:-mx-12 lg:col-span-3">
        <div class="[perspective:800px]">
          <div class="[transform:skewY(-2deg)skewX(-2deg)rotateX(6deg)]">
            <div class="relative aspect-[88/36]">
              <div
                class="pointer-events-none absolute -inset-[4.25rem] z-[1] opacity-90"
              />
              <video
                v-if="mediaKind === 'video'"
                class="absolute inset-0 z-10 h-full w-full object-cover"
                :src="mediaUrl"
                controls
                playsinline
                :aria-label="mediaAlt || undefined"
              />
              <img
                v-else
                class="absolute inset-0 z-10 h-full w-full object-cover"
                :src="mediaUrl"
                :alt="mediaAlt"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>
        </div>
      </div>

      <div
        class="relative mx-auto grid grid-cols-2 gap-x-3 gap-y-6 sm:gap-8 lg:grid-cols-4"
      >
        <div
          v-for="(item, index) in features"
          :key="`${item.title}-${index}`"
          class="space-y-2"
        >
          <div class="flex items-center gap-2">
            <component :is="iconAt(index)" class="size-4 shrink-0 text-primary" />
            <h3 class="font-medium text-on-surface">{{ item.title }}</h3>
          </div>
          <p class="text-on-surface-variant">{{ item.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
