<script setup lang="ts">
import type { ProfileHighlightProps } from '../types/profile-highlight.model'

defineProps<ProfileHighlightProps>()

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
  <section class="max-w-6xl mx-auto w-full px-6">
    <div class="relative w-full flex flex-col md:flex-row items-center justify-center py-20">
      <div
        class="relative z-0 md:-mr-24 mb-8 md:mb-0 w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden bg-[#c4a682]"
      >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="imageAlt ?? ''"
          class="w-full h-full object-cover grayscale brightness-90"
        />
      </div>

      <div
        class="relative z-10 bg-[#161616] p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-xl border border-white/5"
      >
        <h3 v-if="name" class="text-3xl font-bold text-white mb-1">{{ name }}</h3>
        <p
          v-if="role"
          class="text-sm text-on-surface-variant/60 uppercase tracking-widest mb-8"
        >
          {{ role }}
        </p>
        <p
          v-if="description"
          class="text-lg text-on-surface-variant leading-relaxed mb-10"
        >
          {{ description }}
        </p>
        <div v-if="socialLinks?.length" class="flex gap-4">
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
    </div>
  </section>
</template>
