<script setup lang="ts">
import { computed } from 'vue'
import type { CardSolutionProps } from '../types/card-solution.model'
import WebDevelopCardSolutionCard from './WebDevelopCardSolutionCard.vue'
import CardSolutionGlslHillsBg from './CardSolutionGlslHillsBg.vue'

const props = defineProps<CardSolutionProps>()

const emit = defineEmits<{
  ctaClick: []
}>()

/** Solo las 3 primeras entradas en una fila; el CTA va debajo a ancho completo. */
const firstThreeCards = computed(() => props.cards.slice(0, 3))

function onCtaClick() {
  emit('ctaClick')
}
</script>

<template>
  <section
    class="bg-[#F5F2EE] pt-32 text-[#0e0e0e]"
    aria-labelledby="card-solution-heading"
  >
    <div class="mx-auto">
      <header class="mb-16 max-w-3xl px-8">
        <p
          v-if="tag"
          class="font-label mb-4 text-[10px] font-medium uppercase tracking-[0.4em] text-inverse-primary"
        >
          {{ tag }}
        </p>
        <h2
          id="card-solution-heading"
          class="font-headline text-4xl font-extrabold tracking-tighter text-[#0e0e0e] md:text-6xl md:leading-[0.95]"
        >
          {{ title }}
        </h2>
      </header>

      <div class="flex flex-col gap-6">
        <div
          v-if="firstThreeCards.length"
          class="grid grid-cols-1 gap-6 md:grid-cols-3 px-8"
        >
          <WebDevelopCardSolutionCard
            v-for="card in firstThreeCards"
            :key="card.id"
            :item="card"
          />
        </div>

        <div
          class="relative flex min-h-[280px] w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 px-8 py-10 text-center md:min-h-[320px] md:px-12 md:py-12"
        >
          <CardSolutionGlslHillsBg />


          <div
            class="card-solution-cta-shimmer pointer-events-none absolute inset-0 z-[2] opacity-30 mix-blend-overlay md:opacity-35"
            aria-hidden="true"
          />
          <div class="relative z-10 max-w-lg">
            <p
              class="font-headline mb-8 text-xl font-bold leading-snug text-[#0e0e0e] md:text-2xl"
            >
              {{ ctaTitle }}
            </p>
            <a
              :href="ctaLink"
              class="font-label group inline-flex items-center gap-3 border-b-2 border-[#0e0e0e]/35 pb-1 text-sm font-bold uppercase tracking-widest text-[#0e0e0e] transition-all hover:gap-4 hover:border-[#0e0e0e] hover:text-inverse-primary"
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
    radial-gradient(ellipse 120% 80% at 80% 20%, rgba(53, 53, 52, 0.22) 0%, transparent 55%),
    radial-gradient(ellipse 100% 60% at 20% 90%, rgba(32, 31, 31, 0.35) 0%, transparent 50%),
    linear-gradient(115deg, transparent 0%, rgba(255, 255, 255, 0.04) 45%, transparent 90%);
}
</style>
