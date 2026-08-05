<script setup lang="ts">
import { computed, type Component } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Home, User } from 'lucide-vue-next'
import ExpandableTabs, { type TabItem } from '@/shared/ui/ExpandableTabs.vue'
import type { LayoutNavItem, NavIconKey } from '../types/layout.model'

const props = withDefaults(
  defineProps<{
    items?: LayoutNavItem[]
  }>(),
  {
    items: () => [],
  },
)

const route = useRoute()
const router = useRouter()

const currentLocale = computed(() => {
  const locale = route.params.locale
  return typeof locale === 'string' && (locale === 'es' || locale === 'en')
    ? locale
    : 'es'
})

const iconMap: Record<NavIconKey, Component> = {
  house: Home,
  person: User,
}

const fallbackItems = computed<LayoutNavItem[]>(() => [
  {
    name: currentLocale.value === 'es' ? 'Inicio' : 'Home',
    icon: 'house',
  },
  {
    name: 'Info',
    icon: 'person',
  },
])

const navItems = computed(() =>
  props.items.length > 0 ? props.items : fallbackItems.value,
)

const tabs = computed<TabItem[]>(() =>
  navItems.value.map((item) => ({
    title: item.name,
    icon: iconMap[item.icon],
  })),
)

const activeTabIndex = computed<number | null>(() => {
  const index = navItems.value.findIndex((item) => {
    if (item.icon === 'house') return route.name === 'home'
    if (item.icon === 'person') return route.name === 'info'
    return false
  })
  return index >= 0 ? index : null
})

function pathForItem(item: LayoutNavItem): string {
  if (item.icon === 'person') return `/${currentLocale.value}/info`
  return `/${currentLocale.value}`
}

function handleTabChange(index: number | null) {
  if (index === null) return
  const item = navItems.value[index]
  if (!item) return
  void router.push(pathForItem(item))
}
</script>

<template>
  <ExpandableTabs
    :tabs="tabs"
    :active-index="activeTabIndex"
    active-color="text-primary"
    class="!border-0 !bg-transparent !p-0 !shadow-none"
    @change="handleTabChange"
  />
</template>
