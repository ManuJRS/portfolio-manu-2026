<script setup lang="ts">
import type { ExpComponentProps } from '../types/exp-component.model'

const props = defineProps<ExpComponentProps>()
</script>

<template>
  <section v-if="props.items?.length" class="space-y-0">
    <div
      v-for="(item, index) in props.items"
      :key="item.id"
      :class="[
        'group grid grid-cols-1 md:grid-cols-[200px_1fr] py-12 border-t border-outline-variant/15 hover:bg-surface-container-low transition-all duration-500',
        index === props.items!.length - 1 ? 'border-b border-outline-variant/15' : '',
      ]"
    >
      <div class="mb-4 md:mb-0">
        <span
          v-if="item.duration"
          class="md:pl-4 text-xs tracking-[0.1em] font-medium text-outline group-hover:text-primary transition-colors"
        >
          {{ item.duration }}
        </span>
      </div>
      <div>
        <div
          v-if="item.position || item.company"
          class="flex flex-wrap items-center gap-2 mb-3"
        >
          <h3
            v-if="item.position"
            class="text-xl font-bold tracking-tight text-primary"
          >
            {{ item.position }}
          </h3>
          <template v-if="item.position && item.company">
            <span class="text-outline-variant">/</span>
            <a
              class="flex items-center gap-1 text-xl font-medium hover:text-primary transition-colors"
              href="#"
              @click.prevent
            >
              {{ item.company }}
            </a>
          </template>
          <a
            v-else-if="item.company"
            class="flex items-center gap-1 text-xl font-medium hover:text-primary transition-colors"
            href="#"
            @click.prevent
          >
            {{ item.company }}
          </a>
        </div>
        <p
          v-if="item.description"
          class="text-on-surface-variant max-w-2xl mb-6 leading-relaxed"
        >
          {{ item.description }}
        </p>
        <div v-if="item.tags?.length" class="flex flex-wrap gap-2">
          <span
            v-for="(tag, tagIndex) in item.tags"
            :key="tagIndex"
            class="px-3 py-1 bg-surface-container-high text-[10px] tracking-wider uppercase font-medium border border-outline-variant/20"
          >
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>
