import type { AppLocale } from '@/features/home/types/locale'
import type { ProjectPortfolioPage } from '../types/project-portfolio.model'
import { mapProjectDocumentToPage } from '../mappers/projectPortfolio'
import {
  fetchProjectPortfolioById,
  fetchProjectPortfolioBySlug,
} from '@/services/strapi/projectPortfolio'

export async function getProjectPortfolioBySlug(
  locale: AppLocale,
  slug: string,
): Promise<ProjectPortfolioPage | null> {
  const res = await fetchProjectPortfolioBySlug(locale, slug)
  const doc = res.data?.[0]
  if (!doc) return null
  return mapProjectDocumentToPage(doc)
}

export async function getProjectPortfolioById(
  locale: AppLocale,
  id: number,
): Promise<ProjectPortfolioPage | null> {
  const res = await fetchProjectPortfolioById(locale, id)
  const doc = res.data
  if (!doc) return null
  return mapProjectDocumentToPage(doc)
}
