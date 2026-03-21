<script setup lang="ts">
import type { HeroMinimalProps } from '../types/hero-minimal.model'

defineProps<HeroMinimalProps>()

function getIconName(icon: string) {
  const map: Record<string, string> = {
    github: 'code',
    twitter: 'alternate_email',
    youtube: 'play_circle',
    linkedin: 'work',
  }

  return map[icon] ?? 'link'
}
</script>

<template>
  <section class="w-full flex flex-col px-6 py-20">
    <div class="flex justify-between items-start mb-24">
      <div class="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant">
        {{ eyebrowLeft }}
      </div>
      <div class="text-[10px] uppercase tracking-[0.3em] font-bold text-on-surface-variant text-right">
        {{ eyebrowRight }}
      </div>
    </div>

    <div class="max-w-7xl mx-auto w-full relative">
      <div class="flex max-w-7xl mx-auto w-full md:justify-end">
        <span class="relative inline-block px-1 mb-1">
          <span
            aria-hidden="true"
            class="absolute inset-0 z-0 bg-white hero-manu-bg-wipe pointer-events-none"
          />
          <span
            class="relative z-10 text-[#161616] uppercase ultra-tight font-bold outline-text md:text-7xl text-3xl"
          >
            Manu
          </span>
        </span>
      </div>

      <div class="flex flex-col mb-20">
        <h1
          class="md:text-7xl text-6xl md:text-[14rem] font-bold uppercase ultra-tight text-white mb-4 md:mb-10"
        >
          Front — End
        </h1>
        <h1
          class="text-6xl md:text-[14rem] font-bold uppercase ultra-tight text-white/10 outline-text"
        >
          <span class="bg-white text-[#161616]">Dev</span>eloper
        </h1>
      </div>

      <div class="flex flex-col md:flex-row justify-between items-end gap-12">
        <div class="max-w-md">
          <p
            class="text-sm md:text-base text-on-surface-variant leading-relaxed uppercase tracking-wider"
          >
            {{ description }}
          </p>
          <div v-if="socialLinks?.length" class="flex gap-4 mt-4">
            <a
              v-for="link in socialLinks"
              :key="link.url"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="link.label"
              class="w-10 h-10 rounded-full bg-white flex items-center justify-center text-[#161616] hover:scale-110 transition-transform"
            >
              <span class="material-symbols-outlined text-xl">
                {{ getIconName(link.icon) }}
              </span>
            </a>
          </div>
        </div>

        <div v-if="scrollText" class="flex flex-col items-end">
          <span class="material-symbols-outlined text-4xl mb-2 animate-bounce">arrow_downward</span>
          <span class="text-[10px] uppercase tracking-[0.3em] font-medium">{{ scrollText }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
