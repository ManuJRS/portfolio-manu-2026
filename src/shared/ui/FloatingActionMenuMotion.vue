<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { onClickOutside } from '@vueuse/core'
import type { AppLocale } from '@/features/home/types/locale'
import { cn } from '@/shared/utils/cn'

type MenuOption = {
  label: string
  onClick: () => void | boolean | Promise<void | boolean>
  icon?: string
  successMessage?: string
}

interface Props {
  options: MenuOption[]
  className?: string
  toggleAriaLabel?: string
  feedbackDurationMs?: number
  /** Idioma del texto sobre el botón */
  locale?: AppLocale
  /** Retraso antes del primer mensaje (ms) */
  hintInitialDelayMs?: number
  /** Cuánto tiempo permanece visible el mensaje en cada aparición (ms) */
  hintVisibleDurationMs?: number
  /** Tiempo que el mensaje permanece oculto entre apariciones (ms) */
  hintPauseBetweenMs?: number
  /** Offset horizontal de pupila cuando el menú está abierto */
  openEyeOffsetX?: number
  /** Offset vertical de pupila cuando el menú está abierto */
  openEyeOffsetY?: number
}

const props = withDefaults(defineProps<Props>(), {
  toggleAriaLabel: 'Abrir menú de acciones',
  feedbackDurationMs: 2800,
  locale: 'es',
  hintInitialDelayMs: 5_000,
  hintVisibleDurationMs: 4_500,
  hintPauseBetweenMs: 42_000,
  openEyeOffsetX: 0,
  openEyeOffsetY: 0,
})

const hintText = computed(() =>
  props.locale === 'en' ? 'Need more info?' : '¿Necesitas más info?',
)

const rootRef = ref<HTMLElement | null>(null)
const eyeRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)
const hintVisible = ref(false)
const feedbackMessage = ref('')
const pupilX = ref(0)
const pupilY = ref(0)

let feedbackTimer: ReturnType<typeof setTimeout> | null = null
let hintHideTimer: ReturnType<typeof setTimeout> | null = null
let hintLoopTimer: ReturnType<typeof setTimeout> | null = null

function clearHintTimers() {
  if (hintHideTimer) {
    clearTimeout(hintHideTimer)
    hintHideTimer = null
  }
  if (hintLoopTimer) {
    clearTimeout(hintLoopTimer)
    hintLoopTimer = null
  }
}

function scheduleHintCycle(delayMs: number) {
  if (hintLoopTimer) {
    clearTimeout(hintLoopTimer)
    hintLoopTimer = null
  }
  hintLoopTimer = setTimeout(() => {
    hintLoopTimer = null
    runHintPulse()
  }, delayMs)
}

function runHintPulse() {
  if (isOpen.value) {
    scheduleHintCycle(props.hintPauseBetweenMs)
    return
  }
  hintVisible.value = true
  hintHideTimer = setTimeout(() => {
    hintVisible.value = false
    hintHideTimer = null
    scheduleHintCycle(props.hintPauseBetweenMs)
  }, props.hintVisibleDurationMs)
}

onClickOutside(rootRef, () => {
  isOpen.value = false
})

const pupilStyle = computed(() => ({
  transform: `translate(${pupilX.value + (isOpen.value ? props.openEyeOffsetX : 0)}px, ${pupilY.value + (isOpen.value ? props.openEyeOffsetY : 0)}px)`,
}))

function updatePupilFromClient(clientX: number, clientY: number) {
  const eye = eyeRef.value
  if (!eye) return

  const rect = eye.getBoundingClientRect()
  const centerX = rect.left + rect.width / 2
  const centerY = rect.top + rect.height / 2
  const dx = clientX - centerX
  const dy = clientY - centerY
  const distance = Math.hypot(dx, dy) || 1
  const maxDistance = 6.5
  const clamped = Math.min(maxDistance, distance)

  pupilX.value = (dx / distance) * clamped
  pupilY.value = (dy / distance) * clamped
}

function onWindowPointerMove(event: PointerEvent) {
  updatePupilFromClient(event.clientX, event.clientY)
}

function onWindowTouchMove(event: TouchEvent) {
  const t = event.touches[0]
  if (!t) return
  updatePupilFromClient(t.clientX, t.clientY)
}

function onWindowTouchStart(event: TouchEvent) {
  const t = event.touches[0]
  if (!t) return
  updatePupilFromClient(t.clientX, t.clientY)
}

function resetPupil() {
  pupilX.value = 0
  pupilY.value = 0
}

watch(isOpen, (open) => {
  if (open) {
    hintVisible.value = false
    if (hintHideTimer) {
      clearTimeout(hintHideTimer)
      hintHideTimer = null
      scheduleHintCycle(props.hintPauseBetweenMs)
    }
  }
})

onMounted(() => {
  window.addEventListener('pointermove', onWindowPointerMove, { passive: true })
  window.addEventListener('touchstart', onWindowTouchStart, { passive: true })
  window.addEventListener('touchmove', onWindowTouchMove, { passive: true })
  scheduleHintCycle(props.hintInitialDelayMs)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onWindowPointerMove)
  window.removeEventListener('touchstart', onWindowTouchStart)
  window.removeEventListener('touchmove', onWindowTouchMove)
  if (feedbackTimer) {
    clearTimeout(feedbackTimer)
    feedbackTimer = null
  }
  clearHintTimers()
})

const toggleMenu = () => {
  isOpen.value = !isOpen.value
}

function showFeedback(message: string) {
  feedbackMessage.value = message
  if (feedbackTimer) clearTimeout(feedbackTimer)
  feedbackTimer = setTimeout(() => {
    feedbackMessage.value = ''
    feedbackTimer = null
  }, props.feedbackDurationMs)
}

async function handleOptionClick(option: MenuOption) {
  let ok = true
  try {
    const result = await Promise.resolve(option.onClick())
    if (result === false) ok = false
  } catch {
    ok = false
  }
  isOpen.value = false
  if (option.successMessage && ok) {
    showFeedback(option.successMessage)
  }
}
</script>

<template>
  <div
    ref="rootRef"
    :class="cn('fixed bottom-8 right-8 z-[60] flex flex-col items-end gap-1.5', props.className)"
  >
    <Transition
      enter-active-class="transition duration-300 ease-out"
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
    >
      <p
        v-if="hintVisible"
        class="max-w-[11rem] text-right text-[11px] font-medium leading-tight text-white/85 drop-shadow-[0_1px_2px_rgba(0,0,0,0.6)] sm:max-w-none sm:text-xs"
        aria-live="polite"
      >
        {{ hintText }}
      </p>
    </Transition>
    <Teleport to="body">
      <transition
        enter-active-class="transition duration-200 ease-out"
        enter-from-class="opacity-0 translate-y-1"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition duration-150 ease-in"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 translate-y-1"
      >
        <div
          v-if="feedbackMessage"
          role="status"
          aria-live="polite"
          class="fixed right-2 bottom-36 z-[70] max-w-[min(90vw,20rem)] -translate-x-1/8 rounded-full border border-white/10 bg-[#111111f2] px-4 py-2.5 text-center text-sm text-white shadow-lg backdrop-blur-sm"
        >
          {{ feedbackMessage }}
        </div>
      </transition>
    </Teleport>

    <!-- Main Button -->
    <button
      type="button"
      @click="toggleMenu"
      class="eye-bounce flex h-10 w-10 items-center justify-center rounded-full bg-[#161616] shadow-[0_0_20px_rgba(0,0,0,0.2)] transition-all duration-300 hover:bg-[#111111d1] hover:cursor-pointer"
      :aria-expanded="isOpen"
      :aria-label="props.toggleAriaLabel"
      @mouseleave="resetPupil"
    >
      <div
        ref="eyeRef"
        class="relative h-7 w-7 rounded-full border border-black/80 bg-white transition-transform duration-300"
        :class="isOpen ? 'scale-95' : 'scale-100'"
      >
      <div
                  class="eye-blink-overlay pointer-events-none absolute inset-0 rounded-full bg-black"
                />
        <div
          class="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black transition-transform duration-75"
          :style="pupilStyle"
        />
      </div>

    </button>

    <!-- Menu -->
    <transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 translate-x-3 translate-y-3 blur-sm"
      enter-to-class="opacity-100 translate-x-0 translate-y-0 blur-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-x-0 translate-y-0 blur-0"
      leave-to-class="opacity-0 translate-x-3 translate-y-3 blur-sm"
    >
      <div
        v-if="isOpen"
        class="absolute bottom-12 right-0 mb-2"
      >
        <div class="flex flex-col items-end gap-2">
          <transition-group
            name="menu-item"
            tag="div"
            class="flex flex-col items-end gap-2"
          >
            <button
              v-for="(option, index) in props.options"
              :key="`${option.label}-${index}`"
              type="button"
              @click="handleOptionClick(option)"
              class="flex items-center gap-2 rounded-xl border-none bg-[#11111198] px-4 py-2 text-sm text-white shadow-[0_0_20px_rgba(0,0,0,0.2)] backdrop-blur-sm transition-all duration-300 hover:bg-[#111111d1] hover:cursor-pointer"
            >
              <span v-if="option.icon" class="text-base leading-none">{{ option.icon }}</span>
              <span>{{ option.label }}</span>
            </button>
          </transition-group>
        </div>
      </div>
    </transition>
  </div>
</template>

<style scoped>
.menu-item-enter-active,
.menu-item-leave-active {
  transition: all 0.25s ease;
}

.menu-item-enter-from,
.menu-item-leave-to {
  opacity: 0;
  transform: translateX(20px);
}

@keyframes eye-soft-bounce {
  0%,
  100% {
    transform: translateY(0);
  }
  70% {
    transform: translateY(-6px);
  }
}

.eye-bounce {
  animation: eye-soft-bounce 1.6s ease-in-out infinite;
}


@keyframes eyelid-blink {
  0%,
  44%,
  46%,
  74%,
  76%,
  100% {
    transform: scaleY(0);
  }
  45%,
  75% {
    transform: scaleY(1);
  }
}

.eye-blink-overlay {
  transform-origin: top;
  animation: eyelid-blink 4s ease-in-out infinite;
}

</style>

