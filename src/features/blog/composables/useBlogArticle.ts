import type { Ref } from 'vue'
import { ref, watch } from 'vue'
import type { BlogArticlePage } from '../types/blog-article-page.model'
import { getBlogArticleBySlug } from '../api/blogArticle'

export function useBlogArticle(articleSlug: Ref<string>) {
  const data = ref<BlogArticlePage | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    const slug = articleSlug.value.trim()
    if (!slug) {
      data.value = null
      error.value = new Error('Slug de artículo no válido')
      return
    }

    loading.value = true
    error.value = null
    try {
      data.value = await getBlogArticleBySlug(slug)
      if (!data.value) {
        error.value = new Error('Artículo no encontrado')
      }
    } catch (e) {
      data.value = null
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  watch(articleSlug, () => void load(), { immediate: true })

  return {
    data,
    loading,
    error,
    refresh: load,
  }
}
