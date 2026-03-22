import { ref, watch, type Ref } from 'vue'
import type { AppLocale } from '@/features/home/types/locale'
import type { InfoPortfolioPage } from '../types/info-portfolio.model'
import { getInfoPortfolio } from '../api/infoPortfolio'

export function useInfoPortfolio(locale: Ref<AppLocale>) {
  const data = ref<InfoPortfolioPage | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)

  async function load() {
    loading.value = true
    error.value = null
    try {
      data.value = await getInfoPortfolio(locale.value)
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
