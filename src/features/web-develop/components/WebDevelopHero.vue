<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { usePreferredReducedMotion } from '@vueuse/core'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import type { WebDevelopHeroProps } from '../types/web-develop-hero.model'
import AuthDialogModal from '@/shared/ui/AuthDialogModal.vue'
import HeroMorphingCursorText from './HeroMorphingCursorText.vue'

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
const prefersReducedMotion = usePreferredReducedMotion()

const fallbackVideoSrc = `/${encodeURIComponent('image-rendering pixelated; (1).mp4')}`

const heroSrc = computed(() => props.heroMedia?.src ?? fallbackVideoSrc)

const heroIsVideo = computed(() => {
  if (!props.heroMedia) return true
  return props.heroMedia.kind === 'video'
})

const defaultDescription =
  'Soy experto en desarrollo web a medida, soluciones eCommerce y optimización de CMS. Elijo la tecnología que mejor se adapta a tus objetivos y presupuesto.'

const displayTitle = computed(() => props.title?.trim() || 'Desarrollo web a medida')

const magneticHoverText = computed(() => {
  const phrase = props.rotatingPhrases
    ?.map((p) => p.trim())
    .find((p) => p.length > 0)
  if (phrase) return phrase
  return locale.value === 'en' ? 'Built to scale' : 'Hecho para crecer'
})

const bodyText = computed(() => props.description?.trim() || defaultDescription)

const ctaLabel = computed(() => props.buttonText?.trim() || 'Empezar mi proyecto')

const ctaMorphHoverText = computed(() =>
  locale.value === 'en' ? "Let's talk" : 'Hablemos',
)

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
    class="web-develop-hero relative flex min-h-[70vh] flex-col justify-start overflow-hidden bg-surface-container-lowest pt-24 lg:justify-center"
  >
    <div
      class="pointer-events-none absolute inset-0 z-[1] from-surface-container-lowest/75 via-surface-container-lowest/35 to-transparent"
      aria-hidden="true"
    />

    <div
      class="relative z-10 mx-auto grid w-full max-w-7xl grid-cols-1 gap-12 px-6 md:px-12 lg:grid-cols-12 lg:items-center"
    >
      <div class="lg:col-span-8">
        <div
          v-if="tag"
          class="mb-6 inline-block border border-white/20 px-4 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-on-surface-variant"
        >
          {{ tag }}
        </div>

        <h1
          v-if="prefersReducedMotion === 'reduce'"
          class="font-headline mb-8 text-5xl font-extrabold leading-[0.9] tracking-tighter text-white md:text-7xl"
        >
          {{ displayTitle }}
        </h1>
        <HeroMorphingCursorText
          v-else
          :text="displayTitle"
          :hover-text="magneticHoverText"
          text-class="mb-8 font-headline text-5xl font-extrabold leading-[0.9] tracking-tighter text-white md:text-7xl"
        />

        <p
          class="font-body mb-4 max-w-2xl text-lg text-on-surface-variant md:text-xl"
        >
          {{ text }}
        </p>
        <span class="font-body mb-12 max-w-2xl text-lg text-on-surface-variant md:text-xl">Acompañiamiento y atención personalizada</span>

        <div class="flex flex-col gap-6 sm:flex-row pt-12">
          <button
            type="button"
            class="rounded-DEFAULT group flex items-center gap-3 bg-white px-10 py-5 font-headline text-sm font-bold uppercase tracking-widest text-on-primary transition-all duration-300 hover:cursor-pointer"
            @click="onCtaClick"
          >
            <template v-if="prefersReducedMotion === 'reduce'">
              {{ ctaLabel }}
            </template>
            <HeroMorphingCursorText
              v-else
              as="span"
              variant="on-light"
              compact
              :text="ctaLabel"
              :hover-text="ctaMorphHoverText"
              :circle-size="128"
              text-class="font-headline text-sm font-bold uppercase tracking-widest text-on-primary"
              hover-text-class="font-headline text-sm font-bold uppercase tracking-widest text-white"
            />
            <span
              class="material-symbols-outlined text-xl text-on-primary transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            >arrow_forward</span>
          </button>
        </div>
      </div>
    </div>

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


    <AuthDialogModal v-model="authModalOpen" :locale="locale" />
  </section>
</template>

<style scoped>
/* Mobile / tablet: vídeo en flujo, ligeramente debajo del copy */
.hero-alt-video-wrap {
  position: relative;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  margin-top: 1.5rem;
  padding-left: max(1rem, calc((100vw - min(100vw, 80rem)) / 2 + 1.5rem));
  padding-right: max(1rem, calc((100vw - min(100vw, 80rem)) / 2 + 1.5rem));
  padding-bottom: 2rem;
}

@media (min-width: 768px) {
  .hero-alt-video-wrap {
    margin-top: 1.75rem;
    padding-left: max(2rem, calc((100vw - min(100vw, 80rem)) / 2 + 3rem));
    padding-right: max(2rem, calc((100vw - min(100vw, 80rem)) / 2 + 3rem));
    padding-bottom: 2.5rem;
  }

}

@media (min-width: 1024px) {
  .hero-alt-video-wrap {
    position: absolute;
    inset: 0;
    z-index: 2;
    margin-top: 0;
    justify-content: flex-end;
    align-items: center;
    padding: 6rem max(2rem, calc((100vw - min(100vw, 80rem)) / 2 + 3rem)) 3rem;
  }
}

.hero-alt-video-perspective {
  width: min(62vw, 300px);
  height: min(42vh, 360px);
  flex-shrink: 0;
  perspective: 1200px;
  perspective-origin: 72% 42%;
}

@media (max-width: 767px) {
  /* Horizontal del vídeo: izquierda flex-start · centro center · derecha flex-end */
  .hero-alt-video-wrap {
    justify-content: flex-end;
  }

  .hero-alt-video-perspective {
    width: min(60vw, 260px);
    height: min(46vh, 360px);
  }

  .hero-alt-video-tilt {
    transform: rotateX(4deg) rotateY(-14deg);
    width: 65% !important;
  }
}

@media (min-width: 1024px) {
  .hero-alt-video-perspective {
    height: min(54vh, 440px);
  }
}

.hero-alt-video-tilt {
  width: 80%;
  transform-style: preserve-3d;
  transform: rotateX(5deg) rotateY(-18deg);
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
