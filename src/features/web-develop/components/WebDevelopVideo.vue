<script setup lang="ts">
import { Cpu, Lock, Sparkles, Zap, type LucideIcon } from 'lucide-vue-next'
import TitleEffect from '@/shared/ui/TitleEffect.vue'
import type { WebDevelopVideoProps } from '../types/web-develop-video.model'

defineProps<WebDevelopVideoProps>()

const featureIcons: LucideIcon[] = [Zap, Cpu, Lock, Sparkles]

function iconAt(index: number) {
  return featureIcons[index % featureIcons.length]
}
</script>

<template>
  <section class="overflow-hidden bg-surface-container-lowest py-16 md:py-32">
    <div class="container mx-auto space-y-8 px-4 md:space-y-12 md:px-6 lg:px-8">
      <div class="w-full mb-4 flex flex-col items-start">
        <div class="flex items-center gap-4 mb-6 flex-wrap">
          <span class="text-[10px] font-mono text-white bg-white/10 px-3 py-1">
            Desarrollo Web
          </span>
          <div class="flex items-baseline gap-3 flex-wrap min-w-0">
            <TitleEffect
              v-if="title"
              block-color="#ffffff"
              class="text-3xl font-bold tracking-[0.1em] uppercase text-white"
            >
              <h2 class="inline">{{ title }}</h2>
            </TitleEffect>
            <p class="text-lg text-on-surface-variant">{{ description }}</p>
          </div>
        </div>
      <div class="w-full h-px bg-white/10" />
    </div>

      <div
        v-if="mediaUrl"
        class="mx-auto w-full max-w-2xl rounded-2xl sm:max-w-3xl sm:p-3 md:max-w-6xl"
      >
        <div class="relative aspect-video overflow-hidden rounded-lg sm:aspect-[88/40]">
          <video
            v-if="mediaKind === 'video'"
            class="absolute inset-0 z-10 h-full w-full rounded-md border border-white/10 object-cover"
            :src="mediaUrl"
            autoplay
            muted
            loop
            playsinline
            webkit-playsinline
            preload="auto"
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
