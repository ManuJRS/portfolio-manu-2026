<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/shared/utils/cn'
import type { AppLocale } from '@/features/home/types/locale'

const LOADING_TEXT: Record<AppLocale, string> = {
  en: 'Loading…',
  es: 'Cargando…',
}

const props = withDefaults(
  defineProps<{
    /** Texto personalizado; si no se pasa, se usa el de locale */
    text?: string
    /** Idioma para el texto por defecto (Loading… / Cargando…) */
    locale?: AppLocale
    /** Si true, ocupa min-h-screen centrado; si false, es inline */
    fullScreen?: boolean
    /** Clases adicionales para el contenedor */
    class?: string
    /** Duración de la animación shimmer en segundos */
    duration?: number
  }>(),
  {
    locale: 'es',
    fullScreen: false,
    duration: 2,
  }
)

const displayText = computed(() => props.text ?? LOADING_TEXT[props.locale])
</script>

<template>
  <div
    :class="
      cn(
        'flex items-center justify-center',
        fullScreen ? 'min-h-screen' : 'min-h-[8rem] py-12',
        props.class
      )
    "
    role="status"
    aria-live="polite"
    :aria-label="displayText"
  >
    <span
      class="loader-shimmer inline-block bg-clip-text text-transparent text-base uppercase tracking-widest"
      :style="{ '--shimmer-duration': `${duration}s` }"
    >
      {{ displayText }}
    </span>
  </div>
</template>

<style scoped>
.loader-shimmer {
  --base: #c6c6c6;
  --shimmer: #ffffff;
  color: transparent;
  background-image: linear-gradient(
      90deg,
      transparent calc(50% - 40px),
      var(--shimmer) calc(50% - 20px),
      var(--shimmer) calc(50% + 20px),
      transparent calc(50% + 40px)
    ),
    linear-gradient(var(--base), var(--base));
  background-size: 250% 100%, 100% 100%;
  background-repeat: no-repeat, repeat;
  background-clip: text;
  -webkit-background-clip: text;
  animation: loader-shimmer-anim var(--shimmer-duration, 2s) linear infinite;
}

@keyframes loader-shimmer-anim {
  from {
    background-position: 100% center, 0 0;
  }
  to {
    background-position: 0% center, 0 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .loader-shimmer {
    animation: none;
    color: #c6c6c6;
    background: none;
    -webkit-background-clip: unset;
    background-clip: unset;
  }
}
</style>
