import type { StrapiLayoutResponse } from '@/features/home/types/strapi-layout.dto'
import type { AppLocale } from '@/features/home/types/locale'
import { buildLayoutQuery } from '@/lib/strapi/layoutQuery'
import { httpClient } from '@/services/http'

export function fetchLayoutRaw(locale: AppLocale): Promise<StrapiLayoutResponse> {
  const query = buildLayoutQuery(locale)
  return httpClient.get<StrapiLayoutResponse>(`/api/layout?${query}`)
}
