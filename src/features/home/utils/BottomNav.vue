<script setup lang="ts">
import MainNav from './MainNav.vue'
import { cn } from '@/shared/utils/cn'
</script>

<template>
  <nav
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
