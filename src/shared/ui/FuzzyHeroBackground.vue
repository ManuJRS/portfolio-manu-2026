<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/shared/utils/cn'

/**
 * Fondo tipo “fuzzy overlay” (textura de ruido animada), adaptado del ejemplo React + framer-motion.
 *
 * Uso con envoltorio (recomendado): el contenedor aplica `overflow-hidden`; el slot queda por encima.
 * Uso solo capa: `overlay-only` dentro de un padre `relative overflow-hidden`.
 */
const props = withDefaults(
  defineProps<{
    /** Textura en mosaico; por defecto la del ejemplo original */
    noiseSrc?: string
    /** Opacidad de la capa de ruido (0–1) */
    opacity?: number
    /** Solo la capa absoluta; el padre debe ser `relative overflow-hidden` */
    overlayOnly?: boolean
    class?: string
    wrapperClass?: string
    contentClass?: string
    overlayClass?: string
  }>(),
  {
    noiseSrc: 'https://www.hover.dev/noise.png',
    opacity: 0.15,
    overlayOnly: false,
  },
)

const overlayStyle = computed(() => ({
  backgroundImage: `url(${JSON.stringify(props.noiseSrc)})`,
  opacity: props.opacity,
}))

const overlayElClass = computed(() =>
  cn(
    'pointer-events-none absolute -inset-[100%] fuzzy-hero-noise',
    props.overlayOnly ? props.class : props.overlayClass,
  ),
)

const wrapperElClass = computed(() => cn('relative w-full overflow-hidden', props.class, props.wrapperClass))
</script>

<template>
  <div
    v-if="overlayOnly"
    :class="overlayElClass"
    :style="overlayStyle"
    aria-hidden="true"
  />

  <div v-else :class="wrapperElClass">
    <div :class="overlayElClass" :style="overlayStyle" aria-hidden="true" />
    <div :class="cn('relative z-10', contentClass)">
      <slot />
    </div>
  </div>
</template>

<style scoped>
/* Equivale a framer-motion: translate ±10%, duration 0.2s por tramo, repeatType mirror */
.fuzzy-hero-noise {
  animation: fuzzy-hero-noise-mirror 0.2s linear infinite alternate;
  will-change: transform;
}

@keyframes fuzzy-hero-noise-mirror {
  from {
    transform: translate(-10%, -10%);
  }
  to {
    transform: translate(10%, 10%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .fuzzy-hero-noise {
    animation: none;
    transform: translate(0, 0);
  }
}
</style>
