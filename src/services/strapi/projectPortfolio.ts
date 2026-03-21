import type { AppLocale } from '@/features/home/types/locale'
import type {
  StrapiProjectPortfolioCollectionResponse,
  StrapiProjectPortfolioSingleResponse,
} from '@/features/projects/types/strapi-project-portfolio.dto'
import { httpClient } from '@/services/http'

function populateParams(): URLSearchParams {
  const params = new URLSearchParams()
  params.set('populate[sections][populate]', '*')
  return params
}

export function fetchProjectPortfolioBySlug(
  locale: AppLocale,
  slug: string,
): Promise<StrapiProjectPortfolioCollectionResponse> {
  const params = populateParams()
  params.set('filters[slug][$eq]', slug)
  params.set('locale', locale)
  return httpClient.get<StrapiProjectPortfolioCollectionResponse>(
    `/api/project-portfolios?${params.toString()}`,
  )
}

export function fetchProjectPortfolioById(
  locale: AppLocale,
  id: number,
): Promise<StrapiProjectPortfolioSingleResponse> {
  const params = populateParams()
  params.set('locale', locale)
  return httpClient.get<StrapiProjectPortfolioSingleResponse>(
    `/api/project-portfolios/${id}?${params.toString()}`,
  )
}
