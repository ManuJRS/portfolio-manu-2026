<script setup lang="ts">
import { useId } from 'vue'
import type { LogosProps } from '../types/logos.model'

defineProps<LogosProps>()

const logosSectionTitleId = useId()
</script>

<template>
  <section
    class="border-y border-outline-variant/10 bg-surface px-6 py-20 md:px-12"
    :aria-labelledby="logosSectionTitleId"
  >
    <div class="mx-auto max-w-7xl">
      <div class="mb-12 text-center">
        <p
          :id="logosSectionTitleId"
          class="font-headline text-xs font-bold uppercase tracking-[0.3em] text-outline/60"
        >
          {{ title }}
        </p>
      </div>
      <ul
        v-if="logos.length"
        class="m-0 flex list-none flex-wrap items-center justify-center gap-12 p-0 md:gap-20"
      >
        <li
          v-for="entry in logos"
          :key="entry.id"
          class="cursor-default opacity-30 transition-opacity duration-500 hover:opacity-100"
        >
          <img
            :src="entry.src"
            :alt="entry.alt"
            class="h-8 w-auto max-w-[140px] object-contain select-none md:h-10 md:max-w-[180px]"
            loading="lazy"
            decoding="async"
          />
        </li>
      </ul>
    </div>
  </section>
</template>
