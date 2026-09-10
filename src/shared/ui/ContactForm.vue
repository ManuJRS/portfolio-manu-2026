<script setup lang="ts">
import { computed, reactive, ref, useId } from 'vue'
import type { LayoutContactForm } from '@/features/home/types/layout.model'
import type { AppLocale } from '@/features/home/types/locale'
import { cn } from '@/shared/utils/cn'

const props = withDefaults(
  defineProps<{
    /** `embedded`: ancho completo para usar dentro de modales u otros contenedores */
    variant?: 'standalone' | 'embedded'
    locale?: AppLocale
    /** Textos desde `/api/layout` → `form` (opcional; hay fallbacks por locale). */
    labels?: LayoutContactForm | null
  }>(),
  {
    variant: 'standalone',
    locale: 'es',
    labels: null,
  },
)

const fallbackCopy = computed(() => {
  const en = props.locale === 'en'
  return {
    labelName: en ? 'Name' : 'Nombre',
    labelEmail: 'Email',
    labelMessage: en ? 'Message' : 'Mensaje',
    placeholderName: en ? 'Your name' : 'Tu nombre',
    placeholderEmail: en ? 'hello@example.com' : 'hola@ejemplo.com',
    placeholderMessage: en
      ? 'Tell us about your project…'
      : 'Cuéntanos sobre tu proyecto…',
    submit: en ? 'Send message' : 'Enviar mensaje',
    submitting: en ? 'Sending…' : 'Enviando…',
    success: en ? 'Message sent successfully' : 'Mensaje enviado correctamente',
    error: en ? 'Could not send the message' : 'Error al enviar el mensaje',
  }
})

const copy = computed(() => {
  const fromLayout = props.labels
  const fallback = fallbackCopy.value
  return {
    labelName: fromLayout?.nameLabel || fallback.labelName,
    labelEmail: fromLayout?.emailLabel || fallback.labelEmail,
    labelMessage: fromLayout?.messageLabel || fallback.labelMessage,
    placeholderName: fromLayout?.namePlaceholder || fallback.placeholderName,
    placeholderEmail: fromLayout?.emailPlaceholder || fallback.placeholderEmail,
    placeholderMessage: fromLayout?.messagePlaceholder || fallback.placeholderMessage,
    submit: fromLayout?.buttonText || fallback.submit,
    submitting: fallback.submitting,
    success: fromLayout?.messageSuccess || fallback.success,
    error: fallback.error,
  }
})

const emit = defineEmits<{
  success: []
  error: []
}>()

const form = reactive({
  name: '',
  email: '',
  message: '',
  /** Honeypot (debe coincidir con netlify-honeypot="bot-field" del form fantasma). */
  botField: '',
})

const loading = ref(false)
const success = ref(false)
const error = ref(false)

const rawId = useId()
const fieldId = (suffix: string) => `${rawId.replace(/:/g, '')}-${suffix}`

const rootClass = computed(() =>
  cn(
    'flex flex-col gap-4',
    props.variant === 'standalone' && 'mx-auto max-w-xl',
    props.variant === 'embedded' && 'w-full',
  ),
)

const inputRadius = 'rounded-[12px]'

const fieldClass = cn(
  'flex min-h-9 w-full border border-outline/20 bg-background px-3 py-2 text-sm text-on-surface shadow-sm transition-shadow',
  inputRadius,
  'placeholder:text-on-surface-variant/70',
  'focus-visible:border-outline focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/20',
)

const textareaClass = cn(fieldClass, 'min-h-[120px] resize-y')

const submitClass = cn(
  'inline-flex h-10 w-full items-center justify-center bg-primary text-sm font-medium text-on-primary shadow-sm transition-colors hover:cursor-pointer',
  inputRadius,
  'hover:bg-primary/90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary',
  'disabled:pointer-events-none disabled:opacity-50',
)

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
  form.botField = ''
}

async function enviarFormulario() {
  if (loading.value) return

  loading.value = true
  success.value = false
  error.value = false

  try {
    // Bot detectado: cancelar sin petición HTTP.
    if (form.botField.trim().length > 0) return

    const name = form.name.trim()
    const email = form.email.trim()
    const message = form.message.trim()

    if (!name || !email || !message) {
      error.value = true
      emit('error')
      return
    }

    const datos = new FormData()
    datos.append('form-name', 'contacto')
    datos.append('bot-field', '')
    datos.append('name', name)
    datos.append('email', email)
    datos.append('message', message)

    // FormData → URL-encoded (requerido por Netlify Forms vía AJAX).
    const body = new URLSearchParams(
      Array.from(datos.entries()) as [string, string][],
    ).toString()

    const response = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body,
    })

    if (!response.ok) {
      console.error(
        `[ContactForm] Falló el envío (${response.status}). ` +
          (import.meta.env.DEV
            ? 'Reinicia `npm run dev` para el mock local, o prueba en Netlify.'
            : 'Revisa en Netlify → Forms que exista el formulario "contacto".'),
      )
      error.value = true
      emit('error')
      return
    }

    resetForm()
    success.value = true
    emit('success')
  } catch {
    error.value = true
    emit('error')
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form class="text-left" :class="rootClass" @submit.prevent="enviarFormulario">
    <!-- Honeypot: oculto; Netlify lo ignora si viene vacío (netlify-honeypot="bot-field"). -->
    <p class="hidden" aria-hidden="true">
      <label>
        Don’t fill this out:
        <input v-model="form.botField" type="text" name="bot-field" tabindex="-1" autocomplete="off" />
      </label>
    </p>

    <div class="space-y-2">
      <label
        :for="fieldId('name')"
        class="text-sm font-medium leading-none text-on-surface"
      >
        {{ copy.labelName }}
      </label>
      <input
        :id="fieldId('name')"
        v-model="form.name"
        type="text"
        name="name"
        :placeholder="copy.placeholderName"
        required
        maxlength="80"
        autocomplete="name"
        :class="fieldClass"
      />
    </div>

    <div class="space-y-2">
      <label
        :for="fieldId('email')"
        class="text-sm font-medium leading-none text-on-surface"
      >
        {{ copy.labelEmail }}
      </label>
      <input
        :id="fieldId('email')"
        v-model="form.email"
        type="email"
        name="email"
        :placeholder="copy.placeholderEmail"
        required
        maxlength="120"
        autocomplete="email"
        :class="fieldClass"
      />
    </div>

    <div class="space-y-2">
      <label
        :for="fieldId('message')"
        class="text-sm font-medium leading-none text-on-surface"
      >
        {{ copy.labelMessage }}
      </label>
      <textarea
        :id="fieldId('message')"
        v-model="form.message"
        name="message"
        :placeholder="copy.placeholderMessage"
        required
        maxlength="1500"
        rows="5"
        :class="textareaClass"
      />
    </div>

    <button type="submit" :disabled="loading" :class="submitClass">
      {{ loading ? copy.submitting : copy.submit }}
    </button>

    <p v-if="success" class="text-sm text-green-500">
      {{ copy.success }}
    </p>

    <p v-if="error" class="text-sm text-error">
      {{ copy.error }}
    </p>
  </form>
</template>
