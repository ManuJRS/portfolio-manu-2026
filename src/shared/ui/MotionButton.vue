<script setup lang="ts">
import { computed } from 'vue'
import { ArrowRight } from 'lucide-vue-next'
import { cn } from '@/shared/utils/cn'

const props = withDefaults(
  defineProps<{
    label: string
    variant?: 'primary' | 'secondary'
    class?: string
    href?: string
    type?: 'button' | 'submit' | 'reset'
  }>(),
  {
    variant: 'primary',
    type: 'button',
  },
)

const emit = defineEmits<{
  click: [e: MouseEvent]
}>()

const tag = computed(() => (props.href ? 'a' : 'button'))

const rootClass = computed(() =>
  cn(
    'group relative inline-flex h-auto cursor-pointer min-w-[16.5rem] rounded-full border-none p-1 outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    props.variant === 'secondary' &&
      'border border-outline-variant bg-transparent focus-visible:ring-offset-surface-container-lowest',
    props.class,
  ),
)

const circleClass = computed(() =>
  cn(
    'circle m-0 block h-12 w-12 overflow-hidden rounded-full bg-primary duration-500 group-hover:w-full',
    props.variant === 'secondary' && 'bg-secondary group-hover:bg-primary',
  ),
)

function onClick(e: MouseEvent) {
  emit('click', e)
}
</script>

<template>
  <component
    :is="tag"
    :href="href || undefined"
    :type="tag === 'button' ? type : undefined"
    :class="rootClass"
    @click="onClick"
  >
    <span class="circle" :class="circleClass" aria-hidden="true" />
    <div
      class="icon absolute left-4 top-1/2 -translate-y-1/2 translate-x-0 duration-500 group-hover:translate-x-[0.4rem]"
    >
      <slot name="icon">
        <ArrowRight class="size-6 text-on-primary" />
      </slot>
    </div>
    <span
      class="button-text absolute left-1/2 top-1/2 ml-4 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-center text-lg font-medium tracking-tight text-on-surface duration-500 group-hover:text-on-primary"
    >
      {{ label }}
    </span>
  </component>
</template>
