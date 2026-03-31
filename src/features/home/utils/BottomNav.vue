<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import MainNav from './MainNav.vue'
import { cn } from '@/shared/utils/cn'

const route = useRoute()

const showMainNav = computed(() => {
  const name = route.name
  if (name === 'web-develop' || name === 'blog-preview' || name === 'blog-article') {
    return false
  }
  return true
})
</script>

<template>
  <nav
    v-if="showMainNav"
    :class="cn(
      'fixed bottom-0 left-0 right-0 z-50',
      'flex justify-center px-4 pt-2',
      'pb-[max(1rem,env(safe-area-inset-bottom))]',
      'pointer-events-none'
    )"
    aria-label="Navegación principal"
  >
    <div class="pointer-events-auto">
      <MainNav />
    </div>
  </nav>
</template>
