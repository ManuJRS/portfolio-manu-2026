<script setup lang="ts">
import type { ProfileHighlightProps } from '../types/profile-highlight.model'

import { onMounted, onUnmounted, ref, watch } from 'vue'

const props = defineProps<ProfileHighlightProps>()

const isVisible = ref(false)
const sectionRef = ref<HTMLElement | null>(null)
const profileVideoRef = ref<HTMLVideoElement | null>(null)

let io: IntersectionObserver | null = null

onMounted(() => {
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry?.isIntersecting) {
        isVisible.value = true
      }
    },
    { threshold: 0.15, rootMargin: '0px 0px 8% 0px' },
  )

  if (sectionRef.value) {
    io.observe(sectionRef.value)
  }
})

onUnmounted(() => {
  io?.disconnect()
})

watch(
  [() => props.videoUrl, isVisible],
  ([url, visible]) => {
    if (!url || !visible) return
    const el = profileVideoRef.value
    if (el) {
      void el.play().catch(() => {})
    }
  },
  { flush: 'post' },
)

watch(
  () => props.videoUrl,
  (url) => {
    if (!url) return
    void profileVideoRef.value?.load()
  },
)

function getIconName(icon: string) {
  const map: Record<string, string> = {
    twitter: 'alternate_email',
    youtube: 'play_circle',
  }

  return map[icon] ?? 'link'
}
</script>

<template>
  <section ref="sectionRef" class="max-w-6xl mx-auto w-full px-6">
    <div
      class="relative w-full flex flex-col md:flex-row items-center justify-center gap-12 md:gap-x-3 py-20"
    >
    <div
      :class="[
        'relative z-0 min-h-0 md:-mr-16 w-full max-w-[480px] aspect-square rounded-3xl overflow-hidden bg-[#c4a682]',
        'transition-all duration-700 ease-out',
        isVisible ? 'translate-x-0 opacity-100' : '-translate-x-20 opacity-0',
      ]"
    >
        <img
          v-if="imageUrl"
          :src="imageUrl"
          :alt="imageAlt ?? ''"
          class="absolute inset-0 h-full w-full object-cover grayscale brightness-90"
        />
        <video
          v-else-if="videoUrl"
          ref="profileVideoRef"
          :src="videoUrl"
          class="absolute inset-0 h-full w-full object-cover grayscale brightness-90"
          autoplay
          muted
          loop
          playsinline
          webkit-playsinline
          preload="auto"
          :aria-hidden="!imageAlt"
          :aria-label="imageAlt || undefined"
        />
      </div>

      <div
        :class="[
          'transition-all duration-700 ease-out delay-150',
          isVisible ? 'translate-x-0 opacity-100' : 'translate-x-20 opacity-0'
        ]"
        class="relative z-10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl max-w-xl border border-white/5 backdrop-blur-md"
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
            <svg
              v-if="link.icon === 'upwork'"
              class="size-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="12" fill="#fff" />
              <path
                fill="#161616"
                d="M18.561 13.158c-1.102 0-2.135-.467-3.074-1.227l.228-1.076.008-.042c.207-1.143.849-3.06 2.839-3.06 1.492 0 2.703 1.212 2.703 2.703-.001 1.489-1.212 2.702-2.704 2.702zm0-8.14c-2.539 0-4.51 1.649-5.31 4.366-1.22-1.834-2.148-4.036-2.687-5.892H7.828v7.112c-.002 1.406-1.141 2.546-2.547 2.548-1.405-.002-2.543-1.143-2.545-2.548V3.492H0v7.112c0 2.914 2.37 5.303 5.281 5.303 2.913 0 5.283-2.389 5.283-5.303v-1.19c.529 1.107 1.182 2.229 1.974 3.221l-1.673 7.873h2.797l1.213-5.71c1.063.679 2.285 1.109 3.686 1.109 3 0 5.439-2.452 5.439-5.45 0-3-2.439-5.439-5.439-5.439z"
              />
            </svg>

            <svg
              v-else-if="link.icon === 'github'"
              class="size-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 640 640"
              aria-hidden="true"
            >
              <path
                d="M319.988 7.973C143.293 7.973 0 151.242 0 327.96c0 141.392 91.678 261.298 218.826 303.63 16.004 2.964 21.886-6.957 21.886-15.414 0-7.63-.319-32.835-.449-59.552-89.032 19.359-107.8-37.772-107.8-37.772-14.552-36.993-35.529-46.831-35.529-46.831-29.032-19.879 2.209-19.442 2.209-19.442 32.126 2.245 49.04 32.954 49.04 32.954 28.56 48.922 74.883 34.76 93.131 26.598 2.882-20.681 11.15-34.807 20.315-42.803-71.08-8.067-145.797-35.516-145.797-158.14 0-34.926 12.52-63.485 32.965-85.88-3.33-8.078-14.291-40.606 3.083-84.674 0 0 26.87-8.61 88.029 32.8 25.512-7.075 52.878-10.642 80.056-10.76 27.2.118 54.614 3.673 80.162 10.76 61.076-41.386 87.922-32.8 87.922-32.8 17.398 44.08 6.485 76.631 3.154 84.675 20.516 22.394 32.93 50.953 32.93 85.879 0 122.907-74.883 149.93-146.117 157.856 11.481 9.921 21.733 29.398 21.733 59.233 0 42.792-.366 77.28-.366 87.804 0 8.516 5.764 18.473 21.992 15.354 127.076-42.354 218.637-162.274 218.637-303.582 0-176.695-143.269-319.988-320-319.988l-.023.107z"
                class="fill-current"
              />
            </svg>
            <!-- LinkedIn (svg.mdc 4–5) -->
            <svg
              v-else-if="link.icon === 'linkedin'"
              class="size-5 shrink-0"
              xmlns="http://www.w3.org/2000/svg"
              shape-rendering="geometricPrecision"
              text-rendering="geometricPrecision"
              image-rendering="optimizeQuality"
              fill-rule="evenodd"
              clip-rule="evenodd"
              viewBox="0 0 512 509.64"
              aria-hidden="true"
            >
              <rect width="512" height="509.64" rx="115.61" ry="115.61" class="fill-current" />
              <path
                fill="#fff"
                d="M204.97 197.54h64.69v33.16h.94c9.01-16.16 31.04-33.16 63.89-33.16 68.31 0 80.94 42.51 80.94 97.81v116.92h-67.46l-.01-104.13c0-23.81-.49-54.45-35.08-54.45-35.12 0-40.51 25.91-40.51 52.72v105.86h-67.4V197.54zm-38.23-65.09c0 19.36-15.72 35.08-35.08 35.08-19.37 0-35.09-15.72-35.09-35.08 0-19.37 15.72-35.08 35.09-35.08 19.36 0 35.08 15.71 35.08 35.08zm-70.17 65.09h70.17v214.73H96.57V197.54z"
              />
            </svg>
            <span v-else class="material-symbols-outlined text-xl">
              {{ getIconName(link.icon) }}
            </span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>
