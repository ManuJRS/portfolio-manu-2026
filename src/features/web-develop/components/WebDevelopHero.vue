<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import AuthDialogModal from '@/shared/ui/AuthDialogModal.vue'
import MotionButton from '@/shared/ui/MotionButton.vue'
import TextEffect from '@/shared/ui/TextEffect.vue'

defineProps<{
  title: string
  tag: string
  buttonText: string
  buttonUrl: string
}>()

const route = useRoute()
const locale = computed<AppLocale>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const authModalOpen = ref(false)

function openAuthModal(e: MouseEvent) {
  e.preventDefault()
  authModalOpen.value = true
}
</script>

<template>
  <section
    class="relative flex h-[60vh] items-center justify-center overflow-hidden pt-20 md:h-[70vh]"
  >
    <div class="absolute inset-0 grid-pattern" />
    <div
      class="absolute left-1/2 top-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]"
    />

    <div class="relative z-10 mx-auto w-full max-w-7xl px-8 text-center">
      <div v-if="tag" class="mb-8 inline-block border border-outline-variant/30 px-4 py-1">
        <TextEffect
          :text="tag"
          :speed="16"
          class="text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500"
        />
      </div>

      <h1
        class="mb-8 font-headline text-4xl font-bold uppercase leading-[0.9] tracking-[-0.04em] md:text-9xl"
      >
        {{ title }}
      </h1>

      <div class="flex flex-col items-center justify-center gap-4">
        <MotionButton
          :href="buttonUrl"
          :label="buttonText"
          @click="openAuthModal"
        />
      </div>
    </div>

    <AuthDialogModal v-model="authModalOpen" :locale="locale" />

    <div class="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce text-zinc-500">
      <span class="material-symbols-outlined">south</span>
    </div>
  </section>
</template>
