import type { AppLocale } from '@/features/home/types/locale'
import type { StrapiPopUpsResponse } from '@/features/pop-ups/types/strapi-pop-ups.dto'
import { httpClient } from '@/services/http'

/** GET single type pop-ups con populate de targetPages y locale. */
export function fetchPopUpsRaw(locale: AppLocale): Promise<StrapiPopUpsResponse> {
  const params = new URLSearchParams()
  params.set('populate', 'targetPages')
  params.set('locale', locale)
  return httpClient.get<StrapiPopUpsResponse>(`/api/pop-ups?${params.toString()}`)
}
