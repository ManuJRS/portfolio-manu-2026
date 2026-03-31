<script setup lang="ts">
import { ArrowRight, ArrowUpRight } from 'lucide-vue-next'
import TitleEffect from '@/shared/ui/TitleEffect.vue'
import type { WebDevelopResourcesProps } from '../types/web-develop-resources.model'

defineProps<WebDevelopResourcesProps>()
</script>

<template>
  <section class="bg-surface-container-lowest py-16 md:py-32">
    <div class="container mx-auto px-4 md:px-6 lg:px-8">
      <div class="mb-10 max-w-7xl md:mb-14 lg:mb-16 flex flex-col items-start gap-2">
        <span class="text-[10px] font-mono text-white bg-white/10 px-3 py-1">
            Desarrollo Web
        </span>
        <TitleEffect v-if="title" block-color="#ffffff" class="text-3xl font-bold tracking-[0.1em] uppercase text-white">
          {{ title }}
        </TitleEffect>
        <p v-if="description" class="text-lg text-on-surface-variant">
          {{ description }}
        </p>
        <div class="w-full h-px bg-white/10" />

        <a
          v-if="buttonText && buttonUrl"
          :href="buttonUrl"
          class="group mt-4 flex items-center gap-1 text-sm font-medium text-primary md:mt-5 md:text-base lg:text-lg"
        >
          {{ buttonText }}
          <ArrowUpRight class="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>

      <ul
        class="grid list-none grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-3 lg:gap-8 xl:gap-10"
        role="list"
      >
        <li v-for="item in items" :key="item.id" class="min-w-0">
          <a
            :href="item.href"
            class="group flex h-full min-h-0 flex-col justify-between rounded-xl outline-none ring-offset-2 ring-offset-surface-container-lowest transition-shadow focus-visible:ring-2 focus-visible:ring-primary/50"
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
              class="mb-2 line-clamp-3 break-words pt-4 text-lg font-medium md:mb-3 md:text-xl lg:text-2xl"
            >
              {{ item.title }}
            </div>
            <div
              v-if="item.summary"
              class="mb-6 line-clamp-2 flex-1 text-on-surface-variant md:mb-8 md:text-base"
            >
              {{ item.summary }}
            </div>
            <div class="mt-auto flex items-center text-sm text-on-surface">
              Ver más
              <ArrowRight class="ml-2 size-5 transition-transform group-hover:translate-x-1" />
            </div>
          </a>
        </li>
      </ul>
    </div>
  </section>
</template>
