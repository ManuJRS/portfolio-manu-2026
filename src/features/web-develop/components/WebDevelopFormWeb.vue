<script setup lang="ts">
import { ref, useId, watch } from 'vue'
import type { FormWebProps, FormWebSubmitPayload } from '../types/form-web.model'

const props = defineProps<FormWebProps>()

const emit = defineEmits<{
  submit: [payload: FormWebSubmitPayload]
}>()

const uid = useId()
const idName = `${uid}-name`
const idEmail = `${uid}-email`
const idStage = `${uid}-stage`
const idMessage = `${uid}-message`

const fullName = ref('')
const email = ref('')
const stage = ref(props.selectDefault)
const message = ref('')

watch(
  () => props.selectDefault,
  (v) => {
    if (props.selectOptions.includes(v)) stage.value = v
  },
)

watch(
  () => props.selectOptions,
  (opts) => {
    if (!opts.includes(stage.value)) {
      stage.value = opts.includes(props.selectDefault)
        ? props.selectDefault
        : (opts[0] ?? '')
    }
  },
  { deep: true },
)

function onSubmit() {
  emit('submit', {
    fullName: fullName.value.trim(),
    email: email.value.trim(),
    stage: stage.value,
    message: message.value.trim(),
  })
}

defineExpose({
  reset() {
    fullName.value = ''
    email.value = ''
    stage.value = props.selectDefault
    message.value = ''
  },
})
</script>

<template>
  <section class="bg-surface px-6 py-32 md:px-12" aria-labelledby="form-web-heading">
    <div
      class="relative mx-auto max-w-4xl overflow-hidden p-12 md:p-20"
    >
      <div class="relative z-10">
        <h2
          id="form-web-heading"
          class="font-headline mb-4 text-4xl font-bold text-white"
        >
          {{ title }}
        </h2>
        <p class="mb-12 max-w-xl text-on-surface-variant">
          {{ description }}
        </p>

        <form class="space-y-10" @submit.prevent="onSubmit">
          <div class="grid grid-cols-1 gap-10 md:grid-cols-2">
            <div class="relative">
              <input
                :id="idName"
                v-model="fullName"
                type="text"
                name="fullName"
                autocomplete="name"
                placeholder=" "
                class="peer w-full border-0 border-b-2 border-outline/50 bg-transparent py-2 pb-2 pt-6 text-base font-medium text-primary outline-none transition-colors placeholder:text-transparent focus:border-primary"
              />
              <label
                :for="idName"
                class="pointer-events-none absolute left-0 top-6 origin-left text-base text-on-surface-variant transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {{ inputName }}
              </label>
            </div>
            <div class="relative">
              <input
                :id="idEmail"
                v-model="email"
                type="email"
                name="email"
                autocomplete="email"
                placeholder=" "
                class="peer w-full border-0 border-b-2 border-outline/50 bg-transparent py-2 pb-2 pt-6 text-base font-medium text-primary outline-none transition-colors placeholder:text-transparent focus:border-primary"
              />
              <label
                :for="idEmail"
                class="pointer-events-none absolute left-0 top-6 origin-left text-base text-on-surface-variant transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
              >
                {{ inputEmail }}
              </label>
            </div>
          </div>

          <div>
            <label
              :for="idStage"
              class="font-label mb-2 block text-xs uppercase tracking-widest text-outline"
            >
              {{ inputStage }}
            </label>
            <div class="relative">
              <select
                :id="idStage"
                v-model="stage"
                name="stage"
                class="w-full cursor-pointer appearance-none border-0 border-b-2 border-outline/50 bg-transparent py-2 pr-10 text-base font-medium text-primary outline-none transition-colors focus:border-primary"
              >
                <option v-for="opt in selectOptions" :key="opt" :value="opt">
                  {{ opt }}
                </option>
              </select>
              <span
                class="material-symbols-outlined pointer-events-none absolute right-0 top-1/2 -translate-y-1/2 text-on-surface-variant"
                aria-hidden="true"
              >expand_more</span>
            </div>
          </div>

          <div class="relative">
            <textarea
              :id="idMessage"
              v-model="message"
              name="message"
              rows="4"
              placeholder=" "
              class="peer min-h-[120px] w-full resize-y border-0 border-b-2 border-outline/50 bg-transparent py-2 pb-2 pt-7 text-base font-medium text-primary outline-none transition-colors placeholder:text-transparent focus:border-primary"
            />
            <label
              :for="idMessage"
              class="pointer-events-none absolute left-0 top-6 origin-left text-base text-on-surface-variant transition-all duration-200 peer-focus:top-1 peer-focus:text-xs peer-focus:text-primary peer-[:not(:placeholder-shown)]:top-1 peer-[:not(:placeholder-shown)]:text-xs"
            >
              {{ inputMessage }}
            </label>
          </div>

          <button
            type="submit"
            class="rounded-DEFAULT w-full bg-primary py-6 text-sm font-bold uppercase tracking-widest text-on-primary transition-opacity hover:opacity-90 hover:cursor-pointer"
          >
            {{ btnText }}
          </button>
        </form>
      </div>
    </div>
  </section>
</template>
