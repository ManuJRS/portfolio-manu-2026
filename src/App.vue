<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import AppFooter from '@/features/home/components/AppFooter.vue'
import { useLayout } from '@/features/home/composables/useLayout'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import BottomNav from '@/features/home/utils/BottomNav.vue'
import AuthDialogModal from '@/shared/ui/AuthDialogModal.vue'
import FloatingActionMenuMotion from '@/shared/ui/FloatingActionMenuMotion.vue'

const route = useRoute()
const router = useRouter()

const locale = computed<AppLocale>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const { data: layout } = useLayout(locale)

const contactModalOpen = ref(false)

const floating = computed(() => layout.value?.floating)

const showFloatingBtn = computed(() => floating.value?.showFloatingBtn ?? true)

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

function openFloatingUrl(url: string) {
  const trimmed = url.trim()
  if (!trimmed || trimmed === '#') {
    void router.push({ name: 'home', params: { locale: locale.value } })
    return
  }
  if (/^https?:\/\//i.test(trimmed)) {
    window.open(trimmed, '_blank', 'noopener,noreferrer')
    return
  }
  void router.push(trimmed.startsWith('/') ? trimmed : `/${trimmed}`)
}

const fabOptions = computed(() => {
  const es = locale.value === 'es'
  const flags = floating.value
  const options: {
    label: string
    onClick: () => void | boolean | Promise<void | boolean>
    successMessage?: string
  }[] = []

  for (const item of flags?.items ?? []) {
    options.push({
      label: item.text,
      onClick: () => openFloatingUrl(item.url),
    })
  }

  if (flags?.showContactItem ?? true) {
    options.push({
      label: es ? 'Contactar' : 'Contact',
      onClick: () => {
        contactModalOpen.value = true
      },
    })
  }

  if (flags?.showShareItem ?? true) {
    options.push({
      label: es ? 'Compartir' : 'Share',
      onClick: () => copyPageUrlToClipboard(),
      successMessage: es ? 'Enlace copiado' : 'Link copied',
    })
  }

  return options
})

const fabToggleAriaLabel = computed(() =>
  locale.value === 'es' ? 'Menú de acciones' : 'Actions menu',
)

const isWebDevelopPage = computed(() => route.name === 'web-develop')
</script>

<template>
  <div class="min-h-screen" :class="isWebDevelopPage ? 'pb-0' : 'pb-24'">
    <router-view />
    <AppFooter v-if="!isWebDevelopPage" />

    <FloatingActionMenuMotion
      v-if="showFloatingBtn"
      :options="fabOptions"
      :toggle-aria-label="fabToggleAriaLabel"
      :locale="locale"
      :show-message="floating?.showMessage ?? false"
      :floating-btn-message="floating?.floatingBtnMessage ?? ''"
      class-name="bottom-24 right-5 sm:right-8"
      :open-eye-offset-x="-5.5"
      :open-eye-offset-y="-6.5"
    />
    <AuthDialogModal v-model="contactModalOpen" :locale="locale" />
  </div>
  <BottomNav />
</template>
