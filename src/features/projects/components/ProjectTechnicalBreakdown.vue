<script setup lang="ts">
import type { ProjectTechnicalBreakdownProps } from '../types/project-technical-breakdown.model'

defineProps<ProjectTechnicalBreakdownProps>()
</script>

<template>
  <section class="relative lg:px-0 px-6 pb-24 max-w-7xl mx-auto">
    <div
      v-if="sectionLabel"
      class="mb-12 flex flex-row items-center gap-3 sm:gap-8"
    >
      <p class="shrink-0 font-label text-xs tracking-[0.3em] uppercase text-outline">
        {{ sectionLabel }}
      </p>
      <div
        class="h-px min-h-px flex-1 min-w-0 bg-outline-variant/30"
        aria-hidden="true"
      />
    </div>

    <div class="flex flex-col gap-10 md:flex-row md:items-start md:gap-10">
      <p
        v-if="sectionIndex"
        class="shrink-0 font-label text-xs tracking-[0.2em] uppercase text-[#919191] md:max-w-[13rem] md:pt-1"
      >
        {{ sectionIndex }}
      </p>

      <div class="min-w-0 flex-1 space-y-12 ">
        <div
          v-if="highlightTitle || highlightDescriptionParagraphs?.length"
          class="space-y-4 rounded-none p-6 md:p-8 lg:p-10
          p-8 bg-surface-container-low border-l-2"
        >
          <h2
            v-if="highlightTitle"
            class="text-2xl md:text-3xl lg:text-4xl font-medium font-headline text-on-surface tracking-tight uppercase"
          >
            {{ highlightTitle }}
          </h2>
          <p
            v-for="(para, i) in highlightDescriptionParagraphs"
            :key="i"
            class="text-on-surface-variant leading-relaxed text-base md:text-lg font-body max-w-none"
          >
            {{ para }}
          </p>
        </div>

        <div
          v-if="featuredItems?.length"
          class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-10 md:gap-y-8"
        >
          <article
            v-for="item in featuredItems"
            :key="item.id ?? item.title"
            class="space-y-3 p-6 md:p-8"
          >
            <h3 class="text-lg font-semibold font-headline text-on-surface uppercase tracking-tight">
              {{ item.title }}
            </h3>
            <p
              v-for="(para, j) in item.descriptionParagraphs"
              :key="j"
              class="text-on-surface-variant leading-relaxed font-body"
            >
              {{ para }}
            </p>
          </article>
        </div>
      </div>
    </div>

    <div
      v-if="images?.length"
      class="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
    >
      <div
        v-for="(img, k) in images"
        :key="`${img.url}-${k}`"
        class="aspect-video overflow-hidden bg-surface-container-high"
      >
        <img
          :src="img.url"
          :alt="img.alt"
          class="h-full w-full object-cover transition-all duration-500 hover:opacity-100 hover:grayscale-0"
        />
      </div>
    </div>
  </section>
</template>
