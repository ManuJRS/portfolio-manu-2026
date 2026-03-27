<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { AppLocale } from '@/features/home/types/locale'
import { cn } from '@/shared/utils/cn'

/** Misma ruta que el formulario estático; coherente con Vite `base`. */
const NETLIFY_FORM_POST_PATH = new URL(
  import.meta.env.BASE_URL || '/',
  'https://placeholder.example',
).pathname

const props = withDefaults(
  defineProps<{
    /** `embedded`: ancho completo para usar dentro de modales u otros contenedores */
    variant?: 'standalone' | 'embedded'
    locale?: AppLocale
  }>(),
  {
    variant: 'standalone',
    locale: 'es',
  },
)

const copy = computed(() => {
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

const emit = defineEmits<{
  success: []
  error: []
}>()

const formRef = ref<HTMLFormElement | null>(null)
const loading = ref(false)
const success = ref(false)
const error = ref(false)

const rawId = useId()
const fieldId = (suffix: string) => `${rawId.replace(/:/g, '')}-${suffix}`

/** Netlify Forms: cuerpo como URLSearchParams; fetch añade Content-Type + charset (no fijar header a mano). */
const buildNetlifyBody = (form: HTMLFormElement) => {
  const params = new URLSearchParams()
  for (const [key, value] of new FormData(form).entries()) {
    params.append(key, typeof value === 'string' ? value : String(value))
  }
  return params
}

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

const handleSubmit = async () => {
  if (!formRef.value) return

  loading.value = true
  success.value = false
  error.value = false

  try {
    const response = await fetch(NETLIFY_FORM_POST_PATH, {
      method: 'POST',
      body: buildNetlifyBody(formRef.value),
    })

    if (!response.ok) {
      error.value = true
      emit('error')
      return
    }

    success.value = true
    formRef.value.reset()
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
  <form
    ref="formRef"
    name="contact"
    :action="NETLIFY_FORM_POST_PATH"
    method="POST"
    netlify
    class="text-left"
    :class="rootClass"
    @submit.prevent="handleSubmit"
  >
    <input type="hidden" name="form-name" value="contact" />

    <div class="space-y-2">
      <label
        :for="fieldId('name')"
        class="text-sm font-medium leading-none text-on-surface"
      >
        {{ copy.labelName }}
      </label>
      <input
        :id="fieldId('name')"
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
