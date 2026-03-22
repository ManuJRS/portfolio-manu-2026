<script setup lang="ts">
import AppFooter from '@/features/home/components/AppFooter.vue'
import BottomNav from '@/features/home/utils/BottomNav.vue'
</script>

<template>
  <div class="min-h-screen pb-24">
    <router-view />
    <AppFooter />
  </div>
  <BottomNav />
</template>
