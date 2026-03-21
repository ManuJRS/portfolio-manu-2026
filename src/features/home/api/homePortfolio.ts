import type { AppLocale } from '../types/locale'
import type { HomePortfolioPage } from '../types/home-portfolio.model'
import { mapHomePortfolioFromStrapi } from '../mappers/homePortfolio'
import { fetchHomePortfolioRaw } from '@/services/strapi/homePortfolio'

export async function getHomePortfolio(locale: AppLocale): Promise<HomePortfolioPage> {
  const raw = await fetchHomePortfolioRaw(locale)
  return mapHomePortfolioFromStrapi(raw)
}
