<script setup lang="ts">
/**
 * Puerto del efecto morphing-cursor (cursor-effect.mdc): círculo que sigue al puntero
 * y revela un segundo texto sobre fondo invertido.
 */
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { cn } from '@/shared/utils/cn'

const props = withDefaults(
  defineProps<{
    text: string
    hoverText?: string
    /**
     * Etiqueta del contenedor (solo una `h1` por página; en otros bloques usa `h2`, `p`, `span`…).
     */
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'p' | 'span' | 'div'
    /** Diámetro del círculo al hacer hover (px). */
    circleSize?: number
    /** Clases Tailwind del texto visible (tamaño, peso, color, márgenes…). */
    textClass?: string
    /**
     * Clases del texto dentro del círculo; debe coincidir en tamaño/peso con `textClass`.
     * En `on-dark`: color `text-on-primary` (círculo blanco). En `on-light`: `text-white` (círculo oscuro).
     * Si se omite, se usan estilos por defecto según `variant`.
     */
    hoverTextClass?: string
    /**
     * `on-dark`: círculo blanco (título sobre fondo oscuro). `on-light`: círculo oscuro (texto sobre fondo claro, p. ej. botón).
     */
    variant?: 'on-dark' | 'on-light'
    /** Contenedor en línea, sin ancho máximo (CTA, chips). */
    compact?: boolean
  }>(),
  {
    hoverText: 'Hecho para crecer',
    as: 'h1',
    circleSize: 200,
    textClass: '',
    hoverTextClass: '',
    variant: 'on-dark',
    compact: false,
  },
)

const defaultHoverTypographyDark =
  'font-headline block text-5xl font-extrabold leading-[0.9] tracking-tighter text-on-primary whitespace-normal md:text-7xl md:whitespace-nowrap'

const defaultHoverTypographyLight =
  'font-headline text-sm font-bold uppercase tracking-widest text-white whitespace-nowrap'

const resolvedHoverTextClass = computed(() => {
  if (props.hoverTextClass?.trim()) return props.hoverTextClass
  return props.variant === 'on-light' ? defaultHoverTypographyLight : defaultHoverTypographyDark
})

const containerLayoutClass = computed(() =>
  props.compact
    ? 'relative inline-flex max-w-none cursor-none select-none items-center'
    : 'relative block w-full max-w-[min(100%,48rem)] cursor-none select-none',
)

const circleBgClass = computed(() =>
  props.variant === 'on-light' ? 'bg-on-primary' : 'bg-white',
)

const containerRef = ref<HTMLElement | null>(null)
const circleRef = ref<HTMLElement | null>(null)
const innerTextRef = ref<HTMLElement | null>(null)

const isHovered = ref(false)
const containerSize = ref({ width: 0, height: 0 })

const mousePos = { x: 0, y: 0 }
const currentPos = { x: 0, y: 0 }
let rafId = 0

function updateSize() {
  const el = containerRef.value
  if (!el) return
  containerSize.value = { width: el.offsetWidth, height: el.offsetHeight }
}

function tick() {
  const lerp = (a: number, b: number, t: number) => a + (b - a) * t
  currentPos.x = lerp(currentPos.x, mousePos.x, 0.15)
  currentPos.y = lerp(currentPos.y, mousePos.y, 0.15)

  const circle = circleRef.value
  const inner = innerTextRef.value
  if (circle) {
    circle.style.transform = `translate(${currentPos.x}px, ${currentPos.y}px) translate(-50%, -50%)`
  }
  if (inner) {
    inner.style.transform = `translate(${-currentPos.x}px, ${-currentPos.y}px)`
  }
  rafId = requestAnimationFrame(tick)
}

onMounted(() => {
  updateSize()
  window.addEventListener('resize', updateSize)
  rafId = requestAnimationFrame(tick)
})

onUnmounted(() => {
  window.removeEventListener('resize', updateSize)
  cancelAnimationFrame(rafId)
})

function onMouseMove(e: MouseEvent) {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mousePos.x = e.clientX - rect.left
  mousePos.y = e.clientY - rect.top
}

function onMouseEnter(e: MouseEvent) {
  const el = containerRef.value
  if (!el) return
  const rect = el.getBoundingClientRect()
  mousePos.x = e.clientX - rect.left
  mousePos.y = e.clientY - rect.top
  currentPos.x = mousePos.x
  currentPos.y = mousePos.y
  isHovered.value = true
}

function onMouseLeave() {
  isHovered.value = false
}

const circleStyle = computed(() => ({
  width: isHovered.value ? `${props.circleSize}px` : '0px',
  height: isHovered.value ? `${props.circleSize}px` : '0px',
  transition: 'width 0.5s cubic-bezier(0.33, 1, 0.68, 1), height 0.5s cubic-bezier(0.33, 1, 0.68, 1)',
  willChange: 'transform, width, height',
}))

const innerStyle = computed(() => ({
  width: `${containerSize.value.width}px`,
  height: `${containerSize.value.height}px`,
  top: '50%',
  left: '50%',
  willChange: 'transform',
}))
</script>

<template>
  <component
    :is="as"
    ref="containerRef"
    :class="cn(containerLayoutClass, textClass)"
    @mousemove="onMouseMove"
    @mouseenter="onMouseEnter"
    @mouseleave="onMouseLeave"
  >
    <span class="relative z-0" :class="compact ? 'inline-block' : 'block'">{{ text }}</span>

    <div
      ref="circleRef"
      class="pointer-events-none absolute left-0 top-0 z-10 overflow-hidden rounded-full"
      :class="circleBgClass"
      :style="circleStyle"
    >
      <div
        ref="innerTextRef"
        class="absolute flex items-center justify-center"
        :style="innerStyle"
      >
        <span
          class="whitespace-normal md:whitespace-nowrap"
          :class="cn(compact ? 'inline-block' : 'block', resolvedHoverTextClass)"
        >
          {{ hoverText }}
        </span>
      </div>
    </div>
  </component>
</template>
