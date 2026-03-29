<script setup lang="ts">
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import { nextTick, onMounted, onUnmounted, ref, watch } from 'vue'
import type { WebDevelopResourcesProps } from '../types/web-develop-resources.model'

const props = defineProps<WebDevelopResourcesProps>()

const scrollRef = ref<HTMLElement | null>(null)
const canScrollPrev = ref(false)
const canScrollNext = ref(false)

function updateScrollState() {
  const el = scrollRef.value
  if (!el) {
    canScrollPrev.value = false
    canScrollNext.value = false
    return
  }
  const { scrollLeft, clientWidth, scrollWidth } = el
  canScrollPrev.value = scrollLeft > 4
  canScrollNext.value = scrollLeft + clientWidth < scrollWidth - 4
}

function scrollDelta(): number {
  const el = scrollRef.value
  if (!el) return 400
  const card = el.querySelector<HTMLElement>('[data-resource-card]')
  if (card?.offsetWidth) {
    return card.offsetWidth + 16
  }
  return Math.min(452, el.clientWidth * 0.85)
}

function scrollPrev() {
  scrollRef.value?.scrollBy({ left: -scrollDelta(), behavior: 'smooth' })
}

function scrollNext() {
  scrollRef.value?.scrollBy({ left: scrollDelta(), behavior: 'smooth' })
}

let removeScrollListeners: (() => void) | undefined

onMounted(() => {
  const el = scrollRef.value
  if (el) {
    el.addEventListener('scroll', updateScrollState, { passive: true })
    removeScrollListeners = () => el.removeEventListener('scroll', updateScrollState)
  }
  window.addEventListener('resize', updateScrollState)
  void nextTick(() => updateScrollState())
})

onUnmounted(() => {
  removeScrollListeners?.()
  window.removeEventListener('resize', updateScrollState)
})

watch(
  () => props.items.length,
  () => void nextTick(() => updateScrollState()),
)
</script>

<template>
  <section class="bg-surface-container-lowest md:py-32 py-16">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div
        class="mb-8 flex flex-col justify-between gap-8 md:mb-14 md:flex-row md:items-end lg:mb-16 md:px-22"
      >
        <div class="max-w-3xl">
          <h2 v-if="title" class="mb-3 font-headline text-3xl font-semibold md:mb-4 md:text-4xl lg:mb-6">
            {{ title }}
          </h2>
          <p v-if="description" class="text-lg text-on-surface-variant">
            {{ description }}
          </p>
          <a
            v-if="buttonText && buttonUrl"
            :href="buttonUrl"
            class="group mt-4 flex items-center gap-1 text-sm font-medium text-primary md:mt-5 md:text-base lg:text-lg"
          >
            {{ buttonText }}
            <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
        <div class="flex shrink-0 items-center justify-start gap-2 md:justify-end">
          <button
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-md border border-outline-variant bg-transparent text-on-surface transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="!canScrollPrev"
            aria-label="Anterior"
            @click="scrollPrev"
          >
            <ArrowLeft class="size-5" />
          </button>
          <button
            type="button"
            class="inline-flex size-11 items-center justify-center rounded-md border border-outline-variant bg-transparent text-on-surface transition hover:bg-white/5 disabled:cursor-not-allowed disabled:opacity-40"
            :disabled="!canScrollNext"
            aria-label="Siguiente"
            @click="scrollNext"
          >
            <ArrowRight class="size-5" />
          </button>
        </div>
      </div>
    </div>

    <div class="w-full overflow-hidden">
      <div
        ref="scrollRef"
        class="relative flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 pl-4 pr-4 [scrollbar-width:none] md:ml-8 md:pl-8 [&::-webkit-scrollbar]:hidden 2xl:ml-[max(8rem,calc(50vw-700px+1rem))] 2xl:pr-[max(0rem,calc(50vw-700px-1rem))]"
      >
        <a
          v-for="item in items"
          :key="item.id"
          data-resource-card
          :href="item.href"
          class="group flex w-[min(100%,452px)] shrink-0 snap-start flex-col justify-between md:max-w-[452px]"
        >
          <div>
            <div class="flex aspect-[3/2] overflow-hidden rounded-xl bg-surface-container-high">
              <img
                v-if="item.imageSrc"
                :src="item.imageSrc"
                :alt="item.title"
                class="h-full w-full object-cover grayscale opacity-50 transition-opacity duration-700 group-hover:opacity-80"
              />
              <div
                v-else
                class="flex flex-1 items-center justify-center bg-gradient-to-br from-white/5 to-white/0"
              >
                <span class="text-xs uppercase tracking-widest text-on-surface-variant/60">Blog</span>
              </div>
            </div>
          </div>
          <div
            v-if="item.title"
            class="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:pt-4 md:text-xl lg:pt-4 lg:text-2xl"
          >
            {{ item.title }}
          </div>
          <div
            v-if="item.summary"
            class="mb-8 line-clamp-2 text-on-surface-variant md:mb-12 md:text-base lg:mb-9"
          >
            {{ item.summary }}
          </div>
          <div class="flex items-center text-sm text-on-surface">
            Ver más
            <ArrowRight class="ml-2 size-5 transition-transform group-hover:translate-x-1" />
          </div>
        </a>
      </div>
    </div>
  </section>
</template>
