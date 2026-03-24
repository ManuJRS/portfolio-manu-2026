<script setup lang="ts">
import { computed, nextTick, onMounted, ref, watch } from 'vue'
import type { CalificationProps } from '../types/calification.model'
import CalificationTestimonialCard from './CalificationTestimonialCard.vue'
import TitleEffect from '@/shared/ui/TitleEffect.vue'

const props = defineProps<CalificationProps>()

const DESKTOP_VISIBLE_CARDS = 3

const commentsList = computed(() => props.comments ?? [])

const desktopStepCount = computed(() => {
  const n = commentsList.value.length
  if (n <= DESKTOP_VISIBLE_CARDS) return 1
  return n - DESKTOP_VISIBLE_CARDS + 1
})

const currentDesktopStep = ref(0)

watch(
  () => commentsList.value.length,
  () => {
    const max = Math.max(0, desktopStepCount.value - 1)
    if (currentDesktopStep.value > max) currentDesktopStep.value = max
  },
)

const canPrevDesktop = computed(() => currentDesktopStep.value > 0)
const canNextDesktop = computed(
  () => currentDesktopStep.value < desktopStepCount.value - 1,
)

function goPrevDesktop() {
  if (canPrevDesktop.value) currentDesktopStep.value -= 1
}

function goNextDesktop() {
  if (canNextDesktop.value) currentDesktopStep.value += 1
}

function goToDesktopStep(index: number) {
  const max = Math.max(0, desktopStepCount.value - 1)
  currentDesktopStep.value = Math.min(Math.max(0, index), max)
}

const desktopTrackTransform = computed(
  () => `translateX(-${(currentDesktopStep.value * 100) / DESKTOP_VISIBLE_CARDS}%)`,
)

/** Carrusel horizontal móvil: contenedor con scroll */
const mobileScrollerRef = ref<HTMLElement | null>(null)
/** Índice de la tarjeta más centrada en el viewport del scroll */
const mobileActiveIndex = ref(0)

function getMobileSlideElements(): HTMLElement[] {
  const root = mobileScrollerRef.value
  if (!root) return []
  return Array.from(root.querySelectorAll<HTMLElement>('[data-calification-slide]'))
}

function updateMobileActiveFromScroll() {
  const root = mobileScrollerRef.value
  if (!root || commentsList.value.length === 0) return
  const slides = getMobileSlideElements()
  if (slides.length === 0) return

  const containerRect = root.getBoundingClientRect()
  const centerX = containerRect.left + containerRect.width / 2

  let bestIndex = 0
  let bestDist = Infinity
  slides.forEach((el, i) => {
    const r = el.getBoundingClientRect()
    const cardCenter = r.left + r.width / 2
    const dist = Math.abs(cardCenter - centerX)
    if (dist < bestDist) {
      bestDist = dist
      bestIndex = i
    }
  })
  mobileActiveIndex.value = bestIndex
}

function scrollToMobileSlide(index: number) {
  const slides = getMobileSlideElements()
  const slide = slides[index]
  if (!slide) return
  slide.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}

function onMobileScroll() {
  updateMobileActiveFromScroll()
}

watch(
  () => commentsList.value.length,
  () => {
    nextTick(() => updateMobileActiveFromScroll())
  },
)

onMounted(() => {
  nextTick(() => updateMobileActiveFromScroll())
})
</script>

<template>
  <section class="max-w-7xl mx-auto w-full flex flex-col items-center my-12 px-6">
    <div class="w-full mb-16 flex flex-col items-start">
      <div class="flex items-center gap-4 mb-6 flex-wrap">
        <span
          v-if="sectionTag"
          class="text-[10px] font-mono text-white bg-white/10 px-3 py-1"
        >
          {{ sectionTag }}
        </span>
        <div class="flex items-baseline gap-3 flex-wrap min-w-0">
          <TitleEffect
            v-if="title"
            block-color="#ffffff"
            class="text-3xl font-bold tracking-[0.1em] uppercase text-white"
          >
            <h2 class="inline">{{ title }}</h2>
          </TitleEffect>
          <span class="text-[18px] font-mono text-white/30 uppercase tracking-widest shrink-0">
            /{{ commentsList.length }}
          </span>
        </div>
      </div>
      <div class="w-full h-px bg-white/10" />
    </div>

    <!-- Móvil: scroll horizontal (todas las tarjetas) -->
    <div
      v-if="commentsList.length"
      ref="mobileScrollerRef"
      class="md:hidden w-full overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-8"
      @scroll.passive="onMobileScroll"
    >
      <div class="flex w-max min-w-full items-stretch gap-6">
        <div
          v-for="comment in commentsList"
          :key="comment.id"
          data-calification-slide
          class="flex w-[min(85vw,22rem)] shrink-0 snap-center"
        >
          <CalificationTestimonialCard :comment="comment" />
        </div>
      </div>
    </div>

    <!-- Desktop: carrusel — solo 3 tarjetas por vista -->
    <div
      v-if="commentsList.length"
      class="hidden md:flex w-full flex-col items-stretch gap-8"
    >
      <div class="relative flex items-center gap-4 lg:gap-6">
        <button
          type="button"
          class="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] p-0 text-white transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30 hover:scale-110 hover:shadow-2xl hover:cursor-pointer"
          :disabled="!canPrevDesktop"
          aria-label="Anterior"
          @click="goPrevDesktop"
        >
          <span class="material-symbols-outlined text-2xl" aria-hidden="true">chevron_left</span>
        </button>

        <div class="min-w-0 flex-1 overflow-hidden">
          <div
            class="flex items-stretch gap-6 transition-transform duration-500 ease-in-out will-change-transform"
            :style="{ transform: desktopTrackTransform }"
          >
            <div
              v-for="comment in commentsList"
              :key="comment.id"
              class="flex min-w-0 shrink-0 basis-[calc((100%-3rem)/3)]"
            >
              <CalificationTestimonialCard :comment="comment" />
            </div>
          </div>
        </div>

        <button
          type="button"
          class="flex size-11 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/[0.03] p-0 text-white transition hover:bg-white/10 disabled:pointer-events-none disabled:opacity-30 hover:cursor-pointer hover:scale-110 hover:shadow-2xl"
          :disabled="!canNextDesktop"
          aria-label="Siguiente"
          @click="goNextDesktop"
        >
          <span class="material-symbols-outlined text-2xl" aria-hidden="true">chevron_right</span>
        </button>
      </div>

      <!-- Puntos de navegación (solo si hay más de una posición) -->
      <div
        v-if="desktopStepCount > 1"
        class="flex justify-center gap-2"
        role="tablist"
        aria-label="Posición del carrusel"
      >
        <button
          v-for="step in desktopStepCount"
          :key="step"
          type="button"
          class="h-2 rounded-full transition-all"
          :class="
            step - 1 === currentDesktopStep
              ? 'w-8 bg-white'
              : 'w-2 bg-white/25 hover:bg-white/40'
          "
          :aria-label="`Ir a posición ${step}`"
          :aria-current="step - 1 === currentDesktopStep ? 'true' : undefined"
          @click="goToDesktopStep(step - 1)"
        />
      </div>
    </div>

    <!-- Indicador móvil (sincronizado con el scroll; clic para ir a la tarjeta) -->
    <div
      v-if="commentsList.length > 1"
      class="flex md:hidden justify-center gap-2 mt-2"
      role="tablist"
      aria-label="Testimonios"
    >
      <button
        v-for="(comment, idx) in commentsList"
        :key="comment.id"
        type="button"
        class="h-2 rounded-full transition-all"
        :class="
          idx === mobileActiveIndex
            ? 'w-8 bg-white'
            : 'w-2 bg-white/25 hover:bg-white/40'
        "
        :aria-label="`Ver testimonio ${idx + 1} de ${commentsList.length}`"
        :aria-current="idx === mobileActiveIndex ? 'true' : undefined"
        @click="scrollToMobileSlide(idx)"
      />
    </div>
  </section>
</template>
