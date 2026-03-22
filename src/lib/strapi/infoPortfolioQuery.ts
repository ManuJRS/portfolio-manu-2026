import type { AppLocale } from '@/features/home/types/locale'

/**
 * Query para el single type `info-portfolio` en Strapi.
 * Equivale a: ?locale=xx&populate[sections][populate]=*
 */
export function buildInfoPortfolioQuery(locale: AppLocale = 'es'): string {
  const params = new URLSearchParams()
  params.set('locale', locale)
  params.set('populate[sections][populate]', '*')
  return params.toString()
}
