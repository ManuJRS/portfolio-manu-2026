import { ref } from 'vue'
import type { WebDevelopPage } from '../types/web-develop-page.model'
import { getWebDevelopPage } from '../api/webDevelop'

export function useWebDevelop() {
  const data = ref<WebDevelopPage | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await getWebDevelopPage()
      if (!data.value) {
        error.value = new Error('Contenido no encontrado')
      }
    } catch (e) {
      data.value = null
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  void load()

  return {
    data,
    loading,
    error,
    refresh: load,
  }
}
