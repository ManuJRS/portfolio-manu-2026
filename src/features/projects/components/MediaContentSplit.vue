<script setup lang="ts">
import { computed } from 'vue'
import type { MediaContentSplitProps } from '../types/media-content-split.model'

const props = withDefaults(defineProps<MediaContentSplitProps>(), {
  mediaPosition: 'left',
  showPlayButton: true,
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

const textAlignClass = computed(() =>
  props.mediaPosition === 'right'
    ? 'md:text-left md:justify-self-start'
    : 'md:text-right',
)

const listItemClass = computed(() =>
  props.mediaPosition === 'right' ? 'md:justify-start' : 'md:justify-end',
)
</script>

<template>
  <section class="px-6 md:px-12 py-24 bg-surface-container-lowest relative">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
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
            class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            :src="mediaUrl"
            autoplay
            muted
            loop
            playsinline
            webkit-playsinline
            preload="auto"
            :aria-label="mediaAlt || undefined"
          />
          <div v-if="mediaBadge" class="absolute bottom-4 left-4 flex gap-2">
            <div
              class="px-2 py-1 bg-surface-container-low/80 backdrop-blur text-[9px] tracking-widest font-bold font-label text-on-surface"
            >
              {{ mediaBadge }}
            </div>
          </div>
        </div>

        <div :class="textColClass">
          <p
            v-if="eyebrow"
            :class="[
              'text-[10px] tracking-[0.2em] font-label text-outline uppercase mb-4 block md:justify-self-end',
              textAlignClass,
            ]"
          >
            {{ eyebrow }}
          </p>
          <h2
            v-if="title"
            :class="[
              'text-3xl font-bold font-headline tracking-tight text-on-surface uppercase mb-6 md:justify-self-end',
              textAlignClass,
            ]"
          >
            {{ title }}
          </h2>
          <p
            v-if="description"
            :class="['text-on-surface-variant leading-relaxed', textAlignClass]"
          >
            {{ description }}
          </p>
          <ul
            v-if="items?.length"
            :class="['mt-6 space-y-1 text-on-surface-variant', textAlignClass]"
          >
            <li
              v-for="(item, index) in items"
              :key="index"
              :class="['flex gap-3', listItemClass]"
            >
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
