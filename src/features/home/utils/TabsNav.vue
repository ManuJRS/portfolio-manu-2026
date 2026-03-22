<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, User } from 'lucide-vue-next'
import ExpandableTabs, { type TabItem } from '@/shared/ui/ExpandableTabs.vue'

const route = useRoute()
const router = useRouter()

const currentLocale = computed(() => {
  const locale = route.params.locale
  return typeof locale === 'string' && (locale === 'es' || locale === 'en')
    ? locale
    : 'es'
})

const isHome = computed(() => route.name === 'home')

const tabs = computed<TabItem[]>(() => [
  { title: currentLocale.value === 'es' ? 'Inicio' : 'Home', icon: Home },
  { title: 'Profile', icon: User },
])

function handleTabChange(index: number | null) {
  if (index === 0) router.push(`/${currentLocale.value}`)
  if (index === 1) router.push(`/${currentLocale.value}#profile`)
}
</script>

<template>
  <ExpandableTabs
    :tabs="tabs"
    :active-index="isHome ? 0 : null"
    active-color="text-primary"
    class="!border-0 !bg-transparent !p-0 !shadow-none"
    @change="handleTabChange"
  />
</template>