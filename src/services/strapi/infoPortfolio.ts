import type { StrapiInfoPortfolioResponse } from '@/features/info/types/strapi-info-portfolio.dto'
import type { AppLocale } from '@/features/home/types/locale'
import { buildInfoPortfolioQuery } from '@/lib/strapi/infoPortfolioQuery'
import { httpClient } from '@/services/http'

export function fetchInfoPortfolioRaw(locale: AppLocale): Promise<StrapiInfoPortfolioResponse> {
  const query = buildInfoPortfolioQuery(locale)
  return httpClient.get<StrapiInfoPortfolioResponse>(`/api/info-portfolio?${query}`)
}
