import { ref, watch, type Ref } from 'vue'
import type { AppLocale } from '../types/locale'
import type { HomePortfolioPage } from '../types/home-portfolio.model'
import { getHomePortfolio } from '../api/homePortfolio'

export function useHomePortfolio(locale: Ref<AppLocale>) {
  const data = ref<HomePortfolioPage | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await getHomePortfolio(locale.value)
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
