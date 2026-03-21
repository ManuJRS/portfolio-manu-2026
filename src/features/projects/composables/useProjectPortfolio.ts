import { ref, watch, type Ref } from 'vue'
import type { AppLocale } from '@/features/home/types/locale'
import type { ProjectPortfolioPage } from '../types/project-portfolio.model'
import { getProjectPortfolioBySlug } from '../api/projectPortfolio'

export function useProjectPortfolio(locale: Ref<AppLocale>, slug: Ref<string>) {
  const data = ref<ProjectPortfolioPage | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    const s = slug.value.trim()
    if (!s) {
      data.value = null
      error.value = new Error('Slug inválido')
      return
    }

    loading.value = true
    error.value = null
    try {
      data.value = await getProjectPortfolioBySlug(locale.value, s)
      if (!data.value) {
        error.value = new Error('Proyecto no encontrado')
      }
    } catch (e) {
      data.value = null
      error.value = e instanceof Error ? e : new Error(String(e))
    } finally {
      loading.value = false
    }
  }

  watch([locale, slug], load, { immediate: true })

  return {
    data,
    loading,
    error,
    refresh: load,
  }
}
