<script setup lang="ts">
import { computed } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import type { AppLocale } from '@/features/home/types/locale'
import type { ProjectHeroDarkProps } from '../types/project-hero-dark.model'

const props = defineProps<ProjectHeroDarkProps>()

const route = useRoute()

const locale = computed(
  () => (route.params.locale as AppLocale) || 'es',
)

const homeLabel = computed(() => (locale.value === 'en' ? 'Home' : 'Inicio'))

const breadcrumbTitle = computed(() => {
  const parts = [props.titleLine1, props.titleLine2].filter(Boolean)
  return parts.join(' ')
})

const homeTo = computed(() => ({
  name: 'home' as const,
  params: { locale: locale.value },
}))
</script>

<template>
  <section class="relative px-6 md:px-12 pt-12 pb-12 md:w-[76vw] mx-auto">
    <div class="flex flex-col gap-2 mb-4">
      <nav
        aria-label="Breadcrumb"
        class="font-label text-[10px] tracking-[0.2em] uppercase"
      >
        <ol class="flex flex-wrap items-center gap-x-2 gap-y-1 text-outline">
          <li>
            <RouterLink
              :to="homeTo"
              class="transition-colors hover:text-white focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-white/40"
            >
              {{ homeLabel }}
            </RouterLink>
          </li>
          <li v-if="breadcrumbTitle" aria-hidden="true" class="text-white/25">
            /
          </li>
          <li
            v-if="breadcrumbTitle"
            class="max-w-[min(100%,42rem)] truncate text-white/70"
            aria-current="page"
          >
            {{ breadcrumbTitle }}
          </li>
        </ol>
      </nav>
      <h1
        v-if="titleLine1 || titleLine2"
        class="text-7xl md:text-9xl font-bold tracking-[-0.04em] leading-none uppercase text-white break-words"
      >
        <template v-if="titleLine1">{{ titleLine1 }}</template>
        <br v-if="titleLine1 && titleLine2" />
        <template v-if="titleLine2">{{ titleLine2 }}</template>
      </h1>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-12 gap-8 mt-12 items-start">
      <div class="md:col-span-4 flex flex-col gap-6">
        <p
          v-if="description"
          class="text-lg text-[#c6c6c6] font-light leading-relaxed"
        >
          {{ description }}
        </p>
        <div v-if="technologies?.length" class="flex flex-wrap gap-2">
          <span
            v-for="(tech, index) in technologies"
            :key="`${tech}-${index}`"
            class="bg-[#2a2a2a] px-3 pb-1 pt-2 text-[10px] font-label tracking-widest uppercase"
          >
            {{ tech }}
          </span>
        </div>
      </div>

      <div v-if="imageUrl" class="md:col-span-8">
        <div class="w-full aspect-[16/7] bg-surface-container-lowest overflow-hidden">
          <img
            class="w-full h-full object-cover opacity-80 mix-blend-luminosity"
            :src="imageUrl"
            :alt="imageAlt ?? ''"
          />
        </div>
      </div>
    </div>
  </section>
</template>
