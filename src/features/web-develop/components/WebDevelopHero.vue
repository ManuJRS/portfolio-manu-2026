<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import type { WebDevelopHeroProps } from '../types/web-develop-hero.model'
import AuthDialogModal from '@/shared/ui/AuthDialogModal.vue'

const props = defineProps<WebDevelopHeroProps>()

const emit = defineEmits<{
  ctaClick: []
}>()

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

const defaultDescription =
  'Soy experto en desarrollo web a medida, soluciones eCommerce y optimización de CMS. Elijo la tecnología que mejor se adapta a tus objetivos y presupuesto.'

const displayTitle = computed(() => props.title?.trim() || 'Desarrollo web a medida')

const bodyText = computed(() => props.description?.trim() || defaultDescription)

const ctaLabel = computed(() => props.buttonText?.trim() || 'Empezar mi proyecto')

/** Sin `videoAriaLabel`, el vídeo se trata como decorativo (accesible vía contenido del hero). */
const videoIsDecorative = computed(() => !props.videoAriaLabel?.trim())

function onCtaClick(e: MouseEvent) {
  e.preventDefault()
  emit('ctaClick')
  authModalOpen.value = true
}
</script>

<template>
  <section
    class="web-develop-hero relative flex min-h-screen items-center overflow-hidden pt-24"
  >
    <div class="absolute inset-0 z-0 overflow-hidden bg-surface-container-lowest">
      <div class="hero-alt-video-wrap">
        <div class="hero-alt-video-perspective">
          <div class="hero-alt-video-tilt">
            <video
              v-if="heroIsVideo"
              class="pointer-events-none"
              autoplay
              muted
              loop
              playsinline
              :aria-hidden="videoIsDecorative ? 'true' : undefined"
              :aria-label="videoIsDecorative ? undefined : videoAriaLabel"
            >
              <source :src="heroSrc" type="video/mp4" />
            </video>
            <img
              v-else
              :src="heroSrc"
              alt=""
              class="pointer-events-none"
              :aria-hidden="videoIsDecorative ? 'true' : undefined"
            />
          </div>
        </div>
      </div>
      <div
        class="absolute inset-0 bg-gradient-to-r from-surface-container-lowest via-surface-container-lowest/80 to-transparent"
        aria-hidden="true"
      />
    </div>

    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-12"
    >
      <div class="lg:col-span-8">
        <div
          v-if="tag"
          class="mb-6 inline-block border border-white/20 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-on-surface-variant"
        >
          {{ tag }}
        </div>

        <h1
          class="font-headline mb-8 text-5xl font-extrabold leading-[0.9] tracking-tighter text-white md:text-7xl"
        >
          {{ displayTitle }}
        </h1>

        <p
          class="font-body mb-12 max-w-2xl text-lg text-on-surface-variant md:text-xl"
        >
          {{ text }}
        </p>

        <div class="flex flex-col gap-6 sm:flex-row">
          <button
            type="button"
            class="rounded-DEFAULT group flex items-center gap-3 bg-white px-10 py-5 font-headline text-sm font-bold uppercase tracking-widest text-on-primary transition-all duration-300 hover:cursor-pointer"
            @click="onCtaClick"
          >
            {{ ctaLabel }}
            <span
              class="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >arrow_forward</span>
          </button>
        </div>
      </div>
    </div>

    <AuthDialogModal v-model="authModalOpen" :locale="locale" />
  </section>
</template>

<style scoped>
.hero-alt-video-wrap {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  pointer-events: none;
  padding: 5rem 1rem 2rem 0;
}

@media (min-width: 768px) {
  .hero-alt-video-wrap {
    padding: 6rem 2rem 3rem 0;
  }
}

.hero-alt-video-perspective {
  width: min(62vw, 300px);
  height: min(42vh, 360px);
  flex-shrink: 0;
  perspective: 1200px;
  perspective-origin: 72% 42%;
}

@media (min-width: 1024px) {
  .hero-alt-video-perspective {
    height: min(54vh, 440px);
  }
}

.hero-alt-video-tilt {
  width: 80%;
  transform-style: preserve-3d;
  transform: rotateX(15deg) rotateY(-13deg);
  transform-origin: 56% 52%;
  will-change: transform;
}

.hero-alt-video-tilt :is(video, img) {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.88;
}

@media (prefers-reduced-motion: reduce) {
  .hero-alt-video-tilt {
    transform: none;
    will-change: auto;
  }
}
</style>
