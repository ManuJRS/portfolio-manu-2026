import type { StrapiHomePortfolioResponse } from '@/features/home/types/strapi-home-portfolio.dto'
import type { AppLocale } from '@/features/home/types/locale'
import { httpClient } from '@/services/http'

function homePortfolioQuery(locale: AppLocale): string {
  const params = new URLSearchParams()
  params.set('locale', locale)
  params.set('populate[sections][populate]', '*')
  return `/api/home-portfolio?${params.toString()}`
}

export function fetchHomePortfolioRaw(locale: AppLocale): Promise<StrapiHomePortfolioResponse> {
  return httpClient.get<StrapiHomePortfolioResponse>(homePortfolioQuery(locale))
}
