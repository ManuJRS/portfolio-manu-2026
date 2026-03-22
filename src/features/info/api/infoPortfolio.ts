import type { AppLocale } from '@/features/home/types/locale'
import type { InfoPortfolioPage } from '../types/info-portfolio.model'
import { mapInfoPortfolioFromStrapi } from '../mappers/infoPortfolio'
import { fetchInfoPortfolioRaw } from '@/services/strapi/infoPortfolio'

export async function getInfoPortfolio(locale: AppLocale): Promise<InfoPortfolioPage> {
  const raw = await fetchInfoPortfolioRaw(locale)
  return mapInfoPortfolioFromStrapi(raw)
}
