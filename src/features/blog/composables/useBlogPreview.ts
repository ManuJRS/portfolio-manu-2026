import { onMounted, ref } from 'vue'
import { getBlogPreviewPage } from '../api/blogPreview'
import type { BlogPreviewPage } from '../types/blog-preview-page.model'

export function useBlogPreview() {
  const data = ref<BlogPreviewPage | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await getBlogPreviewPage()
      if (!data.value) {
        error.value = new Error('No se pudo cargar el blog')
      }
    } catch (e) {
      data.value = null
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  onMounted(() => void load())

  return {
    data,
    loading,
    error,
    refresh: load,
  }
}
