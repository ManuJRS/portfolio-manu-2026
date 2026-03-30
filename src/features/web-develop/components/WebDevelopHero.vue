<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import type { WebDevelopHeroProps } from '../types/web-develop-hero.model'
import AuthDialogModal from '@/shared/ui/AuthDialogModal.vue'
import MotionButton from '@/shared/ui/MotionButton.vue'
import TextEffect from '@/shared/ui/TextEffect.vue'
import FuzzyHeroBackground from '@/shared/ui/FuzzyHeroBackground.vue'

const props = defineProps<WebDevelopHeroProps>()

const route = useRoute()
const locale = computed<AppLocale>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const authModalOpen = ref(false)

const fallbackVideoSrc = `/${encodeURIComponent('image-rendering pixelated; (1).mp4')}`

const heroSrc = computed(() => props.heroMedia?.src ?? fallbackVideoSrc)

const heroIsVideo = computed(() => {
  if (!props.heroMedia) return true
  return props.heroMedia.kind === 'video'
})

function openAuthModal(e: MouseEvent) {
  e.preventDefault()
  authModalOpen.value = true
}
</script>

<template>
  <section
    class="relative flex min-h-[60vh] items-center justify-center overflow-hidden bg-surface-container-low pt-20 pb-24 md:min-h-[40vh] md:pb-28"
  >
  <!-- <FuzzyHeroBackground overlay-only class="z-[1]" />
    <div class="absolute inset-0 grid-pattern" /> -->
    <div
      class="pointer-events-none absolute left-0 top-0 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
    />

    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-8 lg:grid-cols-2 lg:gap-16"
    >
      <div class="text-center lg:text-left">
        <div
          v-if="tag"
          class="mb-8 inline-block border border-outline-variant/30 px-4 py-1 lg:mx-0"
        >
          <TextEffect
            :text="tag"
            :speed="16"
            class="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500"
          />
        </div>

        <h1
          class="mb-8 font-headline md:text-7xl text-5xl font-bold uppercase leading-[0.9] tracking-[-0.04em]"
        >
          {{ title }}
        </h1>

        <div
          class="flex flex-col items-center justify-center gap-4 lg:items-start"
        >
          <MotionButton
            :href="buttonUrl"
            :label="buttonText"
            @click="openAuthModal"
          />
        </div>
      </div>

      <div
        class="mx-auto w-full max-w-2xl lg:mx-0 lg:max-w-none"
        aria-label="Vídeo"
      >
        <div
          class="aspect-video w-full overflow-hidden rounded-2xl border border-outline-variant/25 bg-surface-container-high/30 shadow-lg shadow-black/20"
        >
          <video
            v-if="heroIsVideo"
            class="h-full w-full object-cover [image-rendering:pixelated]"
            :src="heroSrc"
            autoplay
            loop
            muted
            playsinline
          />
          <img
            v-else
            :src="heroSrc"
            :alt="title"
            class="h-full w-full object-cover [image-rendering:pixelated]"
          />
        </div>
      </div>
    </div>

    <AuthDialogModal v-model="authModalOpen" :locale="locale" />

    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
      <span class="material-symbols-outlined">south</span>
    </div>
  </section>
</template>
