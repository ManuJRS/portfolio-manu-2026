import qs from 'qs'
import type { AppLocale } from '@/features/home/types/locale'

/**
 * Query para el single type `info-portfolio` en Strapi.
 */
export function buildInfoPortfolioQuery(locale: AppLocale = 'es'): string {
  return qs.stringify(
    {
      locale,
      populate: {
        Seo: true,
        sections: {
          populate: '*',
        },
      },
    },
    { encodeValuesOnly: true },
  )
}
