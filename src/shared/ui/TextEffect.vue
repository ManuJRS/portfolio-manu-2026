<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useIntersectionObserver } from '@vueuse/core'
import { cn } from '@/shared/utils/cn'

const RANDOM_CHARS = '_!X$0-+*#'

function getRandomChar(prevChar?: string): string {
  let char: string
  do {
    char = RANDOM_CHARS[Math.floor(Math.random() * RANDOM_CHARS.length)] ?? '_'
  } while (char === prevChar)
  return char
}

const props = withDefaults(
  defineProps<{
    /** Texto a revelar con el efecto */
    text: string
    /** Intervalo entre pasos en ms */
    speed?: number
    /** Retardo inicial en segundos antes de iniciar */
    delay?: number
    /** Clases adicionales */
    class?: string
    /** Animar solo cuando el elemento entra en viewport */
    inView?: boolean
    /** Si inView=true, animar una sola vez */
    once?: boolean
    /** Margen del viewport para activar (IntersectionObserver rootMargin). En móvil conviene más permisivo (ej: 0px) */
    rootMargin?: string
  }>(),
  {
    speed: 20,
    delay: 0,
    inView: false,
    once: true,
    rootMargin: '0px 0px -80px 0px',
  }
)

const containerRef = ref<HTMLElement | null>(null)
const displayText = ref('\u00A0'.repeat(props.text.length || 0))
const currentPhase = ref<'phase1' | 'phase2'>('phase1')
const animationStep = ref(0)
const hasStarted = ref(false)
let intervalId: ReturnType<typeof setInterval> | null = null
let startTimeoutId: ReturnType<typeof setTimeout> | null = null

const { stop: stopObserver } = useIntersectionObserver(
  containerRef,
  ([entry]) => {
    if (!props.inView || !entry?.isIntersecting || hasStarted.value) return
    if (props.once) stopObserver()
    if (props.delay <= 0) {
      startAnimation()
    } else {
      startTimeoutId = setTimeout(() => {
        startTimeoutId = null
        startAnimation()
      }, props.delay * 1000)
    }
  },
  { rootMargin: props.rootMargin, threshold: 0 }
)

function startAnimation() {
  hasStarted.value = true
  displayText.value = '\u00A0'.repeat(props.text.length)
  currentPhase.value = 'phase1'
  animationStep.value = 0
}

function runPhase1() {
  const maxSteps = props.text.length * 2
  const currentLength = Math.min(animationStep.value + 1, props.text.length)
  const chars: string[] = []

  for (let i = 0; i < currentLength; i++) {
    chars.push(getRandomChar(i > 0 ? chars[i - 1] : undefined))
  }
  for (let i = currentLength; i < props.text.length; i++) {
    chars.push('\u00A0')
  }

  displayText.value = chars.join('')

  if (animationStep.value < maxSteps - 1) {
    animationStep.value += 1
  } else {
    currentPhase.value = 'phase2'
    animationStep.value = 0
  }
}

function runPhase2() {
  const revealedCount = Math.floor(animationStep.value / 2)
  const chars: string[] = []

  for (let i = 0; i < revealedCount && i < props.text.length; i++) {
    chars.push(props.text[i] ?? '')
  }

  if (revealedCount < props.text.length) {
    chars.push(animationStep.value % 2 === 0 ? '_' : getRandomChar())
  }

  for (let i = chars.length; i < props.text.length; i++) {
    chars.push(getRandomChar())
  }

  displayText.value = chars.join('')

  if (animationStep.value < props.text.length * 2 - 1) {
    animationStep.value += 1
  } else {
    displayText.value = props.text
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }
}

watch(
  () => hasStarted.value,
  (started) => {
    if (!started || !props.text.length) return
    if (intervalId) clearInterval(intervalId)

    intervalId = setInterval(() => {
      if (currentPhase.value === 'phase1') runPhase1()
      else runPhase2()
    }, props.speed)
  },
  { immediate: true }
)

watch(
  () => props.text,
  (newText) => {
    if (!hasStarted.value) {
      displayText.value = '\u00A0'.repeat(newText.length)
    } else {
      displayText.value = '\u00A0'.repeat(newText.length)
      currentPhase.value = 'phase1'
      animationStep.value = 0
    }
  }
)

onMounted(() => {
  if (!props.inView && props.text.length) {
    if (props.delay <= 0) startAnimation()
    else {
      startTimeoutId = setTimeout(() => {
        startTimeoutId = null
        startAnimation()
      }, props.delay * 1000)
    }
  }
})

onBeforeUnmount(() => {
  if (startTimeoutId) clearTimeout(startTimeoutId)
  if (intervalId) clearInterval(intervalId)
  stopObserver()
})
</script>

<template>
  <span
    ref="containerRef"
    :class="cn('inline-flex font-mono font-medium leading-5', props.class)"
  >
    {{ displayText || '\u00A0'.repeat(text?.length ?? 0) }}
  </span>
</template>
