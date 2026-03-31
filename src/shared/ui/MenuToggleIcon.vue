<script setup lang="ts">
import { computed } from 'vue'
import { cn } from '@/shared/utils/cn'

const props = withDefaults(
  defineProps<{
    open: boolean
    duration?: number
    fill?: string
    stroke?: string
    strokeWidth?: number | string
    strokeLinecap?: 'butt' | 'round' | 'square'
    strokeLinejoin?: 'miter' | 'round' | 'bevel'
  }>(),
  {
    duration: 500,
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 2.5,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  },
)

const svgStyle = computed(() => ({
  transitionDuration: `${props.duration}ms`,
}))

const pathStyle = computed(() => ({
  transitionDuration: `${props.duration}ms`,
}))
</script>

<template>
  <svg
    viewBox="0 0 32 32"
    :fill="fill"
    :stroke="stroke"
    :stroke-width="strokeWidth"
    :stroke-linecap="strokeLinecap"
    :stroke-linejoin="strokeLinejoin"
    :class="cn('transition-transform ease-in-out', open && '-rotate-45')"
    :style="svgStyle"
    aria-hidden="true"
  >
    <path
      :class="cn(
        'transition-all ease-in-out',
        open
          ? '[stroke-dasharray:20_300] [stroke-dashoffset:-32.42px]'
          : '[stroke-dasharray:12_63]',
      )"
      :style="pathStyle"
      d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
    />
    <path d="M7 16 27 16" />
  </svg>
</template>
