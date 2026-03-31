<script setup lang="ts">
import { ArrowRight } from 'lucide-vue-next'
import { RouterLink } from 'vue-router'
import type { BlogPreviewPostCard } from '../types/blog-preview-page.model'

defineProps<{
  heading: string
  description: string
  posts: BlogPreviewPostCard[]
}>()
</script>

<template>
  <section class="py-20 md:py-32">
    <div class="container mx-auto flex max-w-7xl flex-col items-start gap-12 px-6 md:gap-16">
      <nav
        class="flex flex-wrap items-center gap-x-2 gap-y-1 font-label text-[11px] font-bold uppercase tracking-[0.12em] text-on-surface-variant"
        aria-label="Migas de pan"
      >
        <RouterLink :to="{ name: 'web-develop' }" class="text-primary transition-colors hover:underline">
          Desarrollo web
        </RouterLink>
        <span aria-hidden="true" class="select-none text-outline">/</span>
        <span class="text-on-surface" aria-current="page">{{ heading }}</span>
      </nav>

      <div class="text-left">
        <h2
          class="mb-8 text-5xl font-black uppercase leading-[0.9] tracking-[-0.04em] text-primary md:text-7xl"
        >
          {{ heading }}
        </h2>
        <p
          v-if="description"
          class="mx-auto max-w-2xl text-base text-on-surface-variant md:text-lg"
        >
          {{ description }}
        </p>
      </div>

      <p
        v-if="!posts.length"
        class="w-full max-w-xl text-center text-sm text-on-surface-variant"
      >
        No hay artículos publicados todavía.
      </p>

      <div
        v-else
        class="grid w-full gap-y-10 sm:grid-cols-12 sm:gap-y-12 md:gap-y-16 lg:gap-y-20"
      >
        <article
          v-for="post in posts"
          :key="post.id"
          class="order-last border-0 bg-transparent shadow-none sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2"
        >
          <div
            class="grid gap-y-6 sm:grid-cols-10 sm:gap-x-5 sm:gap-y-0 md:items-center md:gap-x-8 lg:gap-x-12"
          >
            <div class="sm:col-span-5">
              <h3 class="font-headline text-xl font-semibold text-on-surface md:text-2xl lg:text-3xl">
                <RouterLink
                  :to="{ name: 'blog-article', params: { slug: post.slug } }"
                  class="hover:underline"
                >
                  {{ post.title }}
                </RouterLink>
              </h3>
              <p v-if="post.summary" class="mt-4 text-on-surface-variant md:mt-5">
                {{ post.summary }}
              </p>
              <p
                v-if="post.publishedLabel"
                class="mt-6 text-sm text-on-surface-variant md:mt-8"
              >
                {{ post.publishedLabel }}
              </p>
              <div class="mt-6 flex items-center space-x-2 md:mt-8">
                <RouterLink
                  :to="{ name: 'blog-article', params: { slug: post.slug } }"
                  class="inline-flex items-center font-semibold text-primary hover:underline md:text-base"
                >
                  <span>Leer más</span>
                  <ArrowRight class="ml-2 size-4 transition-transform" aria-hidden="true" />
                </RouterLink>
              </div>
            </div>
            <div class="order-first sm:order-last sm:col-span-5">
              <RouterLink
                :to="{ name: 'blog-article', params: { slug: post.slug } }"
                class="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                <div
                  class="aspect-video overflow-hidden border border-outline bg-surface-container-high"
                >
                  <img
                    v-if="post.previewImageSrc"
                    :src="post.previewImageSrc"
                    :alt="post.previewImageAlt || post.title"
                    class="h-full w-full object-cover transition-opacity duration-200 hover:opacity-70"
                    loading="lazy"
                  />
                  <div
                    v-else
                    class="flex h-full min-h-[12rem] w-full items-center justify-center bg-gradient-to-br from-surface-container-high to-surface-container font-label text-xs uppercase tracking-widest text-on-surface-variant"
                    aria-hidden="true"
                  >
                    Blog
                  </div>
                </div>
              </RouterLink>
            </div>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
