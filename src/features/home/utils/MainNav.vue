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

function handleLocaleChange(newLocale: 'es' | 'en') {
  localeOpen.value = false
  const path = route.path.replace(/^\/(es|en)/, `/${newLocale}`)
  void router.push(path)
}
</script>

<template>
  <div
    :class="cn(
      'flex flex-wrap items-center gap-2 rounded-2xl border border-outline-variant/10 bg-white/5 p-1 shadow-sm w-fit backdrop-blur-md shadow-sm'
    )"
  >
    <TabsNav :items="navItems" />
    <template v-if="showLangs">
      <div class="mx-1 h-6 w-px bg-outline-variant shrink-0" aria-hidden="true" />
      <div ref="localeRef" class="relative">
        <button
          type="button"
          :class="cn(
            'flex items-center gap-2 rounded-full px-3 py-2 text-sm',
            'hover:cursor-pointer',
            'border-neutral-700',
            'text-neutral-200',
            'transition-all'
          )"
          aria-label="Idioma"
          aria-haspopup="listbox"
          :aria-expanded="localeOpen"
          @click="localeOpen = !localeOpen"
        >
          <Languages :size="20" class="shrink-0" />
          <span>{{ currentLocale === 'es' ? 'Esp' : 'Eng' }}</span>
          <ChevronDown :size="14" class="shrink-0 opacity-70" />
        </button>
        <div
          v-show="localeOpen"
          :class="cn(
            'absolute left-0 bottom-full mb-2 min-w-full rounded-xl overflow-hidden',
            'bg-neutral-900/95 backdrop-blur-xl',
            'shadow-lg'
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
              'flex items-center gap-2 w-full px-3 py-2 text-sm text-left transition-colors hover:cursor-pointer',
              currentLocale === locale.code
                ? 'font-semibold text-primary bg-neutral-800'
                : 'text-neutral-200'
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
</template>
