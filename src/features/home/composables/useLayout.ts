import { ref, watch, type Ref } from 'vue'
import type { AppLocale } from '../types/locale'
import type { LayoutContent } from '../types/layout.model'
import { getLayout } from '../api/layout'

export function useLayout(locale: Ref<AppLocale>) {
  const data = ref<LayoutContent | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await getLayout(locale.value)
    } catch (e) {
      data.value = null
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  watch(locale, load, { immediate: true })

  return {
    data,
    loading,
    error,
    refresh: load,
  }
}
