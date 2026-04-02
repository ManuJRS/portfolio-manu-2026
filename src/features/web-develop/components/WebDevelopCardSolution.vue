<script setup lang="ts">
import { computed } from 'vue'
import type { CardSolutionProps } from '../types/card-solution.model'
import WebDevelopCardSolutionCard from './WebDevelopCardSolutionCard.vue'
import { cn } from '@/shared/utils/cn'

const props = defineProps<CardSolutionProps>()

const emit = defineEmits<{
  ctaClick: []
}>()

/** Grid bento del HTML de referencia: 3 tarjetas + CTA. */
const useBentoLayout = computed(() => props.cards.length === 3)

const gridClass = computed(() =>
  useBentoLayout.value ? 'md:grid-cols-3' : 'md:grid-cols-2',
)

function cardCellClass(index: number) {
  if (useBentoLayout.value) {
    return index === 0 ? 'md:col-span-2' : 'md:col-span-1'
  }
  return index === 0 ? 'md:col-span-2' : 'md:col-span-1'
}

const ctaCellClass = computed(() => {
  if (props.cards.length === 0) return 'md:col-span-2'
  if (useBentoLayout.value && props.cards.length >= 2) {
    return 'md:col-span-2 md:col-start-2'
  }
  return 'md:col-span-2'
})

function onCtaClick() {
  emit('ctaClick')
}
</script>

<template>
  <section
    class="bg-surface-container-lowest px-8 py-32 md:px-24"
    aria-labelledby="card-solution-heading"
  >
    <div class="mx-auto max-w-8xl">
      <header class="mb-16 max-w-3xl">
        <p
          v-if="tag"
          class="font-label mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-surface-tint"
        >
          {{ tag }}
        </p>
        <h2
          id="card-solution-heading"
          class="font-headline text-4xl font-extrabold tracking-tighter text-primary md:text-6xl md:leading-[0.95]"
        >
          {{ title }}
        </h2>
      </header>

      <div :class="cn('grid grid-cols-1 gap-6', gridClass)">
        <WebDevelopCardSolutionCard
          v-for="(card, index) in cards"
          :key="card.id"
          :item="card"
          :class="cardCellClass(index)"
        />

        <div
          :class="
            cn(
              'relative flex min-h-[280px] flex-col justify-center overflow-hidden bg-primary px-8 py-10 md:min-h-[320px] md:px-12 md:py-12',
              ctaCellClass,
            )
          "
        >
          <!-- Decorativo (sustituto ligero del canvas WebGL de indexAlt); ver seccionsolucioness.mdc -->
          <div
            class="card-solution-cta-shimmer pointer-events-none absolute inset-0 opacity-45 mix-blend-multiply md:opacity-50"
            aria-hidden="true"
          />
          <div class="relative z-10 max-w-lg">
            <p
              class="font-headline mb-8 text-xl font-bold leading-snug text-on-primary md:text-2xl"
            >
              {{ ctaTitle }}
            </p>
            <a
              :href="ctaLink"
              class="font-label group inline-flex items-center gap-3 border-b-2 border-on-primary pb-1 text-sm font-bold uppercase tracking-widest text-on-primary transition-all hover:gap-4"
              @click="onCtaClick"
            >
              {{ ctaText }}
              <span
                class="material-symbols-outlined text-xl transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              >arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.card-solution-cta-shimmer {
  background:
    radial-gradient(ellipse 120% 80% at 80% 20%, rgba(26, 28, 28, 0.35) 0%, transparent 55%),
    radial-gradient(ellipse 100% 60% at 20% 90%, rgba(26, 28, 28, 0.4) 0%, transparent 50%),
    linear-gradient(115deg, transparent 0%, rgba(26, 28, 28, 0.15) 45%, transparent 90%);
}
</style>
