<script setup lang="ts">
import BottomNav from '@/features/home/utils/BottomNav.vue'
</script>

<template>
  <div class="min-h-screen pb-24">
    <router-view />
  </div>
  <BottomNav />
</template>
