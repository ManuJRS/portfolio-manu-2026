<script setup lang="ts">
import type { PortfolioPreviewProps } from '../types/portfolio-preview.model'

defineProps<PortfolioPreviewProps>()
</script>

<template>
  <section id="portfolio" class=" md:px-8 px-4 md:py-32 py-16 mb-10">
    <div class="mx-auto max-w-7xl">
      <div class="mb-20 flex flex-col md:items-end justify-between gap-8 md:flex-row">
        <h2
          class="font-headline text-3xl font-bold uppercase leading-none sm:text-5xl md:text-6xl"
        >
          {{ headingLine1 }}
          <template v-if="headingLine2">
            <br />
            <span class="text-zinc-700">{{ headingLine2 }}</span>
          </template>
        </h2>
        <p
          v-if="description"
          class="max-w-xs text-lg text-on-surface-variant"
        >
          {{ description }}
        </p>
      </div>

      <div class="space-y-40">
        <!-- Primera fila: imagen izquierda, texto derecha -->
        <div class="group relative grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div
            v-if="first.imageSrc"
            class="overflow-hidden bg-surface-container md:col-span-8"
          >
            <img
              class="aspect-video w-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              :src="first.imageSrc"
              :alt="first.imageAlt"
              loading="lazy"
              decoding="async"
            />
          </div>
          <div class="md:col-span-4">
            <span
              v-if="first.tag"
              class="mb-4 block text-xs font-bold tracking-[0.3em] text-zinc-600"
              >{{ first.tag }}</span
            >
            <h3 class="mb-6 font-headline text-3xl font-bold uppercase sm:text-4xl">
              {{ first.title }}
            </h3>
            <p class="mb-8 text-on-surface-variant">{{ first.description }}</p>
            <a
              :href="first.buttonUrl"
              class="inline-block border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-on-surface"
              >{{ first.buttonText }}</a
            >
          </div>
        </div>

        <!-- Segunda fila: texto izquierda, imagen derecha (en móvil imagen arriba) -->
        <div class="group relative grid grid-cols-1 items-center gap-8 md:grid-cols-12">
          <div class="order-2 md:order-1 md:col-span-4">
            <span
              v-if="second.tag"
              class="mb-4 block text-xs font-bold tracking-[0.3em] text-zinc-600"
              >{{ second.tag }}</span
            >
            <h3 class="mb-6 font-headline text-3xl font-bold uppercase sm:text-4xl">
              {{ second.title }}
            </h3>
            <p class="mb-8 text-on-surface-variant">{{ second.description }}</p>
            <a
              :href="second.buttonUrl"
              class="inline-block border-b border-primary pb-1 text-xs font-bold uppercase tracking-widest text-on-surface"
              >{{ second.buttonText }}</a
            >
          </div>
          <div
            v-if="second.imageSrc"
            class="order-1 overflow-hidden bg-surface-container md:order-2 md:col-span-8"
          >
            <img
              class="aspect-video w-full object-cover opacity-50 grayscale transition-all duration-700 group-hover:opacity-100 group-hover:grayscale-0"
              :src="second.imageSrc"
              :alt="second.imageAlt"
              loading="lazy"
              decoding="async"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
