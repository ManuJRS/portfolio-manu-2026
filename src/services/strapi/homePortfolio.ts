import type { StrapiHomePortfolioResponse } from '@/features/home/types/strapi-home-portfolio.dto'
import type { AppLocale } from '@/features/home/types/locale'
import { buildHomeQuery } from '@/lib/strapi/homeQuery'
import { httpClient } from '@/services/http'

export function fetchHomePortfolioRaw(locale: AppLocale): Promise<StrapiHomePortfolioResponse> {
  const query = buildHomeQuery(locale)
  return httpClient.get<StrapiHomePortfolioResponse>(`/api/home-portfolio?${query}`)
}
