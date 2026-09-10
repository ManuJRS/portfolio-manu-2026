import qs from 'qs'
import type { AppLocale } from '@/features/home/types/locale'

/** Query para el single type `layout` (footer + nav + floating + form). */
export function buildLayoutQuery(locale: AppLocale = 'es'): string {
  return qs.stringify(
    {
      locale,
      populate: {
        nav: {
          populate: ['items'],
        },
        floatingItems: true,
        form: true,
      },
    },
    { encodeValuesOnly: true },
  )
}
