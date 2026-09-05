<script setup lang="ts">
import { computed, ref, type Component } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { cn } from '@/shared/utils/cn'

export interface Tab {
  title: string
  icon: Component
}

export interface Separator {
  type: 'separator'
}

export type TabItem = Tab | Separator

const props = withDefaults(
  defineProps<{
    tabs: TabItem[]
    activeIndex?: number | null
    class?: string
    activeColor?: string
  }>(),
  {
    activeIndex: null,
    activeColor: 'text-primary',
  }
)

const emit = defineEmits<{
  change: [index: number | null]
}>()

const selected = ref<number | null>(null)
const containerRef = ref<HTMLElement | null>(null)

onClickOutside(containerRef, () => {
  selected.value = null
  emit('change', null)
})

function handleSelect(index: number) {
  selected.value = index
  emit('change', index)
}

function isSeparator(tab: TabItem): tab is Separator {
  return 'type' in tab && tab.type === 'separator'
}

const effectiveSelected = computed(() =>
  props.activeIndex != null ? props.activeIndex : selected.value
)
</script>

<template>
  <div
    ref="containerRef"
    :class="cn(
      'flex flex-wrap items-center gap-2 rounded-2xl border border-outline-variant bg-white/5 p-1 shadow-sm w-fit',
      props.class
    )"
  >
    <template v-for="(tab, index) in props.tabs" :key="index">
      <div
        v-if="isSeparator(tab)"
        class="mx-1 h-6 w-px bg-outline-variant shrink-0"
        aria-hidden="true"
      />
      <button
        v-else
        type="button"
        :aria-label="tab.title"
        :class="cn(
          'group/tab hover:cursor-pointer relative flex items-center rounded-full text-sm font-medium transition-all duration-300',
          effectiveSelected === index
            ? cn('bg-surface-container px-4 py-2 gap-2 overflow-hidden', activeColor)
            : 'text-on-surface-variant hover:text-on-surface px-2 gap-0 min-w-0',
        )"
        @click="handleSelect(index)"
      >
        <component :is="tab.icon" :size="20" class="shrink-0" />
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="w-0 opacity-0 overflow-hidden"
          enter-to-class="w-auto opacity-100"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="w-auto opacity-100"
          leave-to-class="w-0 opacity-0 overflow-hidden"
        >
          <span v-if="effectiveSelected === index" class="whitespace-nowrap overflow-hidden">
            {{ tab.title }}
          </span>
        </Transition>
        <!-- Tooltip solo en tabs inactivos (el activo ya muestra el título). -->
        <span
          v-if="effectiveSelected !== index"
          role="tooltip"
          class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-neutral-900/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-150 group-hover/tab:opacity-100"
        >
          {{ tab.title }}
        </span>
      </button>
    </template>
  </div>
</template>
