<script setup lang="ts">
import { computed } from 'vue'
import type { ProjectTextMediaProps } from '../types/project-text-media.model'
import TextEffect from '@/shared/ui/TextEffect.vue'

const props = withDefaults(defineProps<ProjectTextMediaProps>(), {
  mediaPosition: 'left',
})

const mediaColClass = computed(() =>
  props.mediaPosition === 'right'
    ? 'order-2 md:order-2'
    : 'order-2 md:order-1',
)

const textColClass = computed(() =>
  props.mediaPosition === 'right'
    ? 'order-1 md:order-1'
    : 'order-1 md:order-2',
)
</script>

<template>
  <section
    class="relative px-6 lg:px-0 py-24 max-w-7xl mx-auto "
  >
    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
      <div :class="[textColClass, 'space-y-8 max-w-2xl']">
        <h2
          v-if="eyebrow"
          class="font-label text-xs md:text-[10px] tracking-[0.3em] uppercase text-outline"
        >
          <TextEffect
            :text="eyebrow"
            in-view
            root-margin="0px"
            class="text-outline font-label text-[10px] tracking-[0.3em] uppercase"
          />
        </h2>
        <h3
          v-if="title"
          class="text-3xl font-bold tracking-tight text-on-surface uppercase mb-6"
        >
          {{ title }}
        </h3>
        <p
          v-for="(para, index) in descriptionParagraphs"
          :key="index"
          class="text-on-surface-variant leading-relaxed text-lg font-body"
        >
          {{ para }}
        </p>
      </div>

      <div
        :class="[
          mediaColClass,
          'aspect-video relative overflow-hidden group',
        ]"
      >
        <img
          v-if="mediaUrl && (mediaKind === 'image' || !mediaKind)"
          :alt="mediaAlt ?? ''"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          :src="mediaUrl"
        />
        <video
          v-else-if="mediaUrl && mediaKind === 'video'"
          class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
          :src="mediaUrl"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          :aria-label="mediaAlt || undefined"
        />
      </div>
    </div>
  </section>
</template>
