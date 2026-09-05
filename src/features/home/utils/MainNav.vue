<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { onClickOutside } from '@vueuse/core'
import { Check, ChevronDown, Languages } from 'lucide-vue-next'
import TabsNav from './TabsNav.vue'
import { cn } from '@/shared/utils/cn'
import { isAppLocale, type AppLocale } from '../types/locale'
import { useLayout } from '../composables/useLayout'

const route = useRoute()
const router = useRouter()

const localeOpen = ref(false)
const localeRef = ref<HTMLElement | null>(null)

onClickOutside(localeRef, () => {
  localeOpen.value = false
})

const locales = [
  { code: 'es' as const, label: 'Esp' },
  { code: 'en' as const, label: 'Eng' },
]

const currentLocale = computed<AppLocale>(() => {
  const locale = route.params.locale
  const value = Array.isArray(locale) ? locale[0] : locale
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const { data: layout } = useLayout(currentLocale)

const navItems = computed(() => layout.value?.nav.items ?? [])

/** Por defecto visible si aún no hay layout (fallback UX). */
const showLangs = computed(() => layout.value?.nav.showLangs ?? true)

const localeTooltip = computed(() =>
  currentLocale.value === 'en' ? 'Language' : 'Idioma',
)

function handleLocaleChange(newLocale: 'es' | 'en') {
  localeOpen.value = false
  const path = route.path.replace(/^\/(es|en)/, `/${newLocale}`)
  void router.push(path)
}

// --- LÓGICA LIQUID GLASS ---
const navRef = ref<HTMLElement | null>(null)
const mouseX = ref(0)
const mouseY = ref(0)
const isHovered = ref(false)

const handleMouseMove = (e: MouseEvent) => {
  if (!navRef.value) return
  const rect = navRef.value.getBoundingClientRect()
  mouseX.value = e.clientX - rect.left
  mouseY.value = e.clientY - rect.top
}
</script>

<template>
  <div
    ref="navRef"
    @mousemove="handleMouseMove"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
    :class="cn(
      'relative w-fit rounded-2xl border border-outline-variant/20 bg-white/10 shadow-2xl transition-all duration-500 liquid-glass',
    )"
    :style="{
      '--x': `${mouseX}px`,
      '--y': `${mouseY}px`
    }"
  >
    <div class="pointer-events-none absolute inset-0 z-0 overflow-hidden rounded-2xl">
      <div 
        class="absolute inset-0 transition-opacity duration-300"
        :class="isHovered ? 'opacity-100' : 'opacity-0'"
        style="background: radial-gradient(circle 200px at var(--x) var(--y), rgba(255,255,255,0.15), transparent 80%)"
      ></div>
    </div>

    <div class="relative z-10 flex flex-wrap items-center gap-2 p-1">
      <TabsNav :items="navItems" />
      
      <template v-if="showLangs">
        <div class="mx-1 h-6 w-px shrink-0 bg-outline-variant/30" aria-hidden="true" />
        <div ref="localeRef" class="relative">
          <button
            type="button"
            :class="cn(
              'group/locale relative flex items-center gap-2 rounded-full px-3 py-2 text-sm transition-all',
              'hover:cursor-pointer hover:bg-white/10',
              'border border-transparent',
              'text-neutral-200',
            )"
            :aria-label="localeTooltip"
            aria-haspopup="listbox"
            :aria-expanded="localeOpen"
            @click="localeOpen = !localeOpen"
          >
            <Languages :size="20" class="shrink-0" />
            <span>{{ currentLocale === 'es' ? 'Esp' : 'Eng' }}</span>
            <ChevronDown :size="14" class="shrink-0 opacity-70" />
            <span
              role="tooltip"
              class="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md border border-white/10 bg-neutral-900/90 px-2 py-1 text-[10px] font-medium uppercase tracking-wider text-white opacity-0 shadow-lg backdrop-blur-md transition-opacity duration-150 group-hover/locale:opacity-100"
            >
              {{ localeTooltip }}
            </span>
          </button>
          
          <div
            v-show="localeOpen"
            :class="cn(
              'absolute bottom-full left-0 mb-3 min-w-[120px] overflow-hidden rounded-xl',
              'border border-white/10 bg-neutral-900/60 p-1 shadow-2xl backdrop-blur-2xl liquid-glass'
            )"
            role="listbox"
          >
            <button
              v-for="locale in locales"
              :key="locale.code"
              type="button"
              role="option"
              :aria-selected="currentLocale === locale.code"
              :class="cn(
                'flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm transition-colors hover:cursor-pointer',
                currentLocale === locale.code
                  ? 'bg-white/15 text-white font-medium'
                  : 'text-neutral-300 hover:bg-white/10'
              )"
              @click="handleLocaleChange(locale.code)"
            >
              <span class="flex-1">{{ locale.label }}</span>
              <Check v-if="currentLocale === locale.code" :size="16" class="shrink-0" />
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<style scoped>
/* Añadimos saturación para que los colores del fondo se realcen 
   al pasar por detrás del componente (muy al estilo Apple) */
.liquid-glass {
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%); /* Soporte Safari */
}
</style>