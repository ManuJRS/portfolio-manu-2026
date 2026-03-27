<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import AppFooter from '@/features/home/components/AppFooter.vue'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import BottomNav from '@/features/home/utils/BottomNav.vue'
import AuthDialogModal from '@/shared/ui/AuthDialogModal.vue'
import FloatingActionMenuMotion from '@/shared/ui/FloatingActionMenuMotion.vue'

const route = useRoute()

const locale = computed<AppLocale>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const contactModalOpen = ref(false)

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
        contactModalOpen.value = true
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

    <FloatingActionMenuMotion
      :options="fabOptions"
      :toggle-aria-label="fabToggleAriaLabel"
      :locale="locale"
      class-name="bottom-24 right-5 sm:right-8"
      :open-eye-offset-x="-5.5"
      :open-eye-offset-y="-6.5"
    />
    <AuthDialogModal v-model="contactModalOpen" :locale="locale" />
  </div>
  <BottomNav />
</template>
