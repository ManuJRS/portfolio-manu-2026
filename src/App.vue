<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/features/home/components/AppFooter.vue'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import BottomNav from '@/features/home/utils/BottomNav.vue'
import FloatingActionMenu from '@/shared/ui/FloatingActionMenu.vue'

const route = useRoute()

const locale = computed<AppLocale>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const CONTACT_EMAIL = 'manueljesusrejonsantana@gmail.com'

async function copyPageUrlToClipboard(): Promise<boolean> {
  const url = window.location.href
  try {
    await navigator.clipboard.writeText(url)
    return true
  } catch {
    try {
      const ta = document.createElement('textarea')
      ta.value = url
      ta.setAttribute('readonly', '')
      ta.style.position = 'fixed'
      ta.style.left = '-9999px'
      document.body.appendChild(ta)
      ta.select()
      const ok = document.execCommand('copy')
      document.body.removeChild(ta)
      return ok
    } catch {
      return false
    }
  }
}

const fabOptions = computed(() => {
  const es = locale.value === 'es'
  return [
    {
      label: es ? 'Contactar' : 'Contact',
      onClick: () => {
        window.location.href = `mailto:${CONTACT_EMAIL}`
      },
    },
    {
      label: es ? 'Compartir' : 'Share',
      onClick: () => copyPageUrlToClipboard(),
      successMessage: es ? 'Enlace copiado' : 'Link copied',
    },
  ]
})

const fabToggleAriaLabel = computed(() =>
  locale.value === 'es' ? 'Menú de acciones' : 'Actions menu',
)

</script>

<template>
  <div class="min-h-screen pb-24">
    <router-view />
    <AppFooter />

    <FloatingActionMenu
      :options="fabOptions"
      :toggle-aria-label="fabToggleAriaLabel"
      class-name="bottom-24 right-5 sm:right-8"
    />
  </div>
  <BottomNav />
</template>
