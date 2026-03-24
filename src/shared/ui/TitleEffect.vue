<script setup lang="ts">
import { ref } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { cn } from '@/shared/utils/cn'

const props = withDefaults(
  defineProps<{
    /** Clases adicionales para el contenedor */
    class?: string
    /** Color del bloque de revelado (hex) */
    blockColor?: string
    /** Duración de cada fase en segundos */
    duration?: number
    /** Retardo antes de iniciar (segundos) */
    delay?: number
    /** Animar solo una vez al entrar en viewport */
    once?: boolean
    /** Margen del viewport para activar (ej: -100px = más cerca del centro) */
    rootMargin?: string
  }>(),
  {
    blockColor: '#ffffff',
    duration: 0.6,
    delay: 0,
    once: true,
    rootMargin: '0px 0px -15% 0px',
  }
)

const containerRef = ref<HTMLElement | null>(null)
const inView = ref(false)

const { stop: stopObserver } = useIntersectionObserver(
  containerRef,
  ([entry]) => {
    if (!entry?.isIntersecting) return
    inView.value = true
    if (props.once) stopObserver()
  },
  { rootMargin: props.rootMargin, threshold: 0 }
)
</script>

<template>
  <div
    ref="containerRef"
    :class="cn('relative inline-block', props.class)"
  >
    <div
      class="title-effect-text relative z-[1] block"
      :class="{ 'title-effect-visible': inView }"
      :style="
        inView
          ? {
              '--block-color': blockColor,
              '--duration': `${duration}s`,
              '--delay': `${delay}s`,
            }
          : undefined
      "
    >
      <slot />
    </div>
    <span
      v-if="inView"
      class="title-effect-block pointer-events-none"
      :style="{
        '--block-color': blockColor,
        '--duration': `${duration}s`,
        '--delay': `${delay}s`,
      }"
      aria-hidden="true"
    />
  </div>
</template>

<style scoped>
.title-effect-text {
  opacity: 0;
  min-height: 1em;
}

.title-effect-text.title-effect-visible {
  animation: title-effect-reveal var(--duration, 0.6s) ease-out
    calc(var(--delay, 0s) + var(--duration, 0.6s) * 0.5) forwards;
}

.title-effect-block {
  position: absolute;
  inset: 0;
  z-index: 2;
  background-color: var(--block-color);
  transform: scaleX(0);
  transform-origin: left center;
  animation: title-effect-block-in var(--duration, 0.6s) ease-out
      var(--delay, 0s) forwards,
    title-effect-block-out var(--duration, 0.6s) ease-out
      calc(var(--delay, 0s) + var(--duration, 0.6s) * 0.5) forwards;
}

@keyframes title-effect-block-in {
  to {
    transform: scaleX(1);
    transform-origin: left center;
  }
}

@keyframes title-effect-block-out {
  from {
    transform: scaleX(1);
    transform-origin: right center;
  }
  to {
    transform: scaleX(0);
    transform-origin: right center;
  }
}

@keyframes title-effect-reveal {
  to {
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .title-effect-text.title-effect-visible,
  .title-effect-block {
    animation: none;
  }
  .title-effect-text.title-effect-visible {
    opacity: 1;
  }
  .title-effect-block {
    display: none;
  }
}
</style>
