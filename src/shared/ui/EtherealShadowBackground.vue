<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref, useId, watch } from 'vue'
import { cn } from '@/shared/utils/cn'

export type EtherealSizing = 'fill' | 'stretch'

export interface EtherealAnimationConfig {
  preview?: boolean
  scale: number
  speed: number
}

export interface EtherealNoiseConfig {
  opacity: number
  scale: number
}

const props = withDefaults(
  defineProps<{
    sizing?: EtherealSizing
    color?: string
    animation?: EtherealAnimationConfig
    noise?: EtherealNoiseConfig
    class?: string
    /** Desactiva la animación SVG (p. ej. si el usuario prefiere menos movimiento) */
    motionDisabled?: boolean
  }>(),
  {
    sizing: 'fill',
    color: 'rgba(128, 128, 128, 1)',
    motionDisabled: false,
  },
)

function mapRange(
  value: number,
  fromLow: number,
  fromHigh: number,
  toLow: number,
  toHigh: number,
): number {
  if (fromLow === fromHigh) {
    return toLow
  }
  const percentage = (value - fromLow) / (fromHigh - fromLow)
  return toLow + percentage * (toHigh - toLow)
}

const rawId = useId()
const filterId = `ethereal-shadow-${rawId.replace(/:/g, '')}`

const feColorMatrixRef = ref<SVGFEColorMatrixElement | null>(null)

const prefersReducedMotion = ref(false)

const animationEnabled = computed(
  () =>
    !props.motionDisabled &&
    !!props.animation &&
    props.animation.scale > 0 &&
    !prefersReducedMotion.value,
)

const displacementScale = computed(() =>
  props.animation ? mapRange(props.animation.scale, 1, 100, 20, 100) : 0,
)

const animationDuration = computed(() =>
  props.animation ? mapRange(props.animation.speed, 1, 100, 1000, 50) : 1,
)

const baseFrequencyX = computed(() =>
  props.animation
    ? mapRange(props.animation.scale, 0, 100, 0.001, 0.0005)
    : 0.001,
)

const baseFrequencyY = computed(() =>
  props.animation ? mapRange(props.animation.scale, 0, 100, 0.004, 0.002) : 0.004,
)

let rafId: number | null = null
let startTime = 0

function tick(now: number) {
  const el = feColorMatrixRef.value
  if (!el || !animationEnabled.value) {
    return
  }
  const cycleSec = animationDuration.value / 25
  const elapsed = (now - startTime) / 1000
  const hue = ((elapsed % cycleSec) / cycleSec) * 360
  el.setAttribute('values', String(hue))
  rafId = requestAnimationFrame(tick)
}

async function startHueLoop() {
  stopHueLoop()
  await nextTick()
  if (!animationEnabled.value || !feColorMatrixRef.value) {
    return
  }
  startTime = performance.now()
  rafId = requestAnimationFrame(tick)
}

function stopHueLoop() {
  if (rafId != null) {
    cancelAnimationFrame(rafId)
    rafId = null
  }
}

function readReducedMotion() {
  if (typeof window === 'undefined' || !window.matchMedia) {
    return false
  }
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

onMounted(() => {
  prefersReducedMotion.value = readReducedMotion()
  startHueLoop()
})

onUnmounted(() => {
  stopHueLoop()
})

watch(
  () => [animationEnabled.value, animationDuration.value] as const,
  () => {
    startHueLoop()
  },
)

const MASK_URL =
  'https://framerusercontent.com/images/ceBGguIpUU8luwByxuQz79t7To.png'
const NOISE_URL =
  'https://framerusercontent.com/images/g0QcWrxr87K0ufOxIUFBakwYA8.png'

const rootClass = computed(() =>
  cn(
    'pointer-events-none overflow-hidden',
    props.class,
  ),
)
</script>

<template>
  <div
    :class="rootClass"
    style="position: relative; width: 100%; height: 100%"
    aria-hidden="true"
  >
    <div
      :style="{
        position: 'absolute',
        inset: `${-displacementScale}px`,
        filter: animationEnabled ? `url(#${filterId}) blur(4px)` : 'none',
      }"
    >
      <svg v-if="animationEnabled" style="position: absolute">
        <defs>
          <filter :id="filterId">
            <feTurbulence
              result="undulation"
              num-octaves="2"
              :base-frequency="`${baseFrequencyX},${baseFrequencyY}`"
              seed="0"
              type="turbulence"
            />
            <feColorMatrix
              ref="feColorMatrixRef"
              in="undulation"
              type="hueRotate"
              values="180"
            />
            <feColorMatrix
              in="dist"
              result="circulation"
              type="matrix"
              values="4 0 0 0 1  4 0 0 0 1  4 0 0 0 1  1 0 0 0 0"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="circulation"
              :scale="displacementScale"
              result="dist"
            />
            <feDisplacementMap
              in="dist"
              in2="undulation"
              :scale="displacementScale"
              result="output"
            />
          </filter>
        </defs>
      </svg>
      <div
        :style="{
          backgroundColor: color,
          maskImage: `url('${MASK_URL}')`,
          maskSize: sizing === 'stretch' ? '100% 100%' : 'cover',
          maskRepeat: 'no-repeat',
          maskPosition: 'center',
          width: '100%',
          height: '100%',
        }"
      />
    </div>

    <div
      v-if="noise && noise.opacity > 0"
      :style="{
        position: 'absolute',
        inset: 0,
        backgroundImage: `url('${NOISE_URL}')`,
        backgroundSize: (noise?.scale ?? 1) * 200,
        backgroundRepeat: 'repeat',
        opacity: (noise?.opacity ?? 0) / 2,
      }"
    />
  </div>
</template>
