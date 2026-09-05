<script setup lang="ts">
import { computed, nextTick, onUnmounted, ref, useId, watch } from 'vue'
import { X } from 'lucide-vue-next'
import type { AppLocale } from '@/features/home/types/locale'
import ContactForm from '@/shared/ui/ContactForm.vue'
import {
  pauseSmoothScroll,
  resumeSmoothScroll,
} from '@/shared/utils/smoothScroll'

const props = withDefaults(
  defineProps<{
    modelValue: boolean
    locale?: AppLocale
  }>(),
  {
    locale: 'es',
  },
)

const strings = computed(() => {
  const en = props.locale === 'en'
  return {
    title: en ? 'Get in touch' : 'Solicitar información',
    description: en
      ? 'Leave your details and i will get back to you as soon as possible.'
      : 'Deja tus datos y yo te responderé lo antes posible.',
    close: en ? 'Close' : 'Cerrar',
  }
})

const emit = defineEmits<{
  'update:modelValue': [value: boolean]
}>()

const panelRef = ref<HTMLElement | null>(null)

const rawId = useId()
const formId = rawId.replace(/:/g, '')

function close() {
  emit('update:modelValue', false)
}

function closeAfterSuccess() {
  window.setTimeout(() => close(), 1400)
}

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape' && props.modelValue) {
    e.preventDefault()
    close()
  }
}

watch(
  () => props.modelValue,
  (open) => {
    if (open) {
      document.body.style.overflow = 'hidden'
      pauseSmoothScroll()
      window.addEventListener('keydown', onKeydown)
      void nextTick(() => {
        const first = panelRef.value?.querySelector<HTMLInputElement>(
          'input[name="name"]',
        )
        first?.focus()
      })
    } else {
      document.body.style.overflow = ''
      resumeSmoothScroll()
      window.removeEventListener('keydown', onKeydown)
    }
  },
)

onUnmounted(() => {
  document.body.style.overflow = ''
  resumeSmoothScroll()
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition-opacity duration-200"
      leave-active-class="transition-opacity duration-200"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="modelValue"
        class="fixed inset-0 z-[101] flex items-center justify-center p-4"
        role="presentation"
      >
        <div
          class="absolute inset-0 bg-black/80"
          aria-hidden="true"
          @click="close"
        />
        <div
          ref="panelRef"
          role="dialog"
          aria-modal="true"
          :aria-labelledby="`${formId}-title`"
          :aria-describedby="`${formId}-desc`"
          class="relative z-[102] grid max-h-[calc(100%-4rem)] w-full max-w-md gap-4 overflow-y-auto rounded-[1rem] border border-outline-variant/40 bg-background p-6 shadow-lg shadow-black/40"
          @click.stop
        >
          <button
            type="button"
            class="group absolute right-3 top-3 flex size-9 items-center justify-center rounded-lg outline-offset-2 transition-colors hover:bg-surface-container-high focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary/50 hover:cursor-pointer"
            :aria-label="strings.close"
            @click="close"
          >
            <X
              :size="16"
              :stroke-width="2"
              class="text-on-surface-variant opacity-70 transition-opacity group-hover:opacity-100"
            />
          </button>

          <div class="flex flex-col items-start gap-2">
            <h2
              :id="`${formId}-title`"
              class="text-center text-lg font-semibold tracking-tight text-on-surface"
            >
              {{ strings.title }}
            </h2>
            <p
              :id="`${formId}-desc`"
              class="text-start text-sm text-on-surface-variant"
            >
              {{ strings.description }}
            </p>
          </div>

          <ContactForm
            variant="embedded"
            :locale="locale"
            @success="closeAfterSuccess"
          />
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
