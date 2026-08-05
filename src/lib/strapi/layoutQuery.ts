import qs from 'qs'
import type { AppLocale } from '@/features/home/types/locale'

/** Query para el single type `layout` (footer + nav con items). */
export function buildLayoutQuery(locale: AppLocale = 'es'): string {
  return qs.stringify(
    {
      locale,
      populate: {
        nav: {
          populate: ['items'],
        },
      },
    },
    { encodeValuesOnly: true },
  )
}
