import type { StrapiLayoutResponse } from '@/features/home/types/strapi-layout.dto'
import type { AppLocale } from '@/features/home/types/locale'
import { httpClient } from '@/services/http'

export function fetchLayoutRaw(locale: AppLocale): Promise<StrapiLayoutResponse> {
  const params = new URLSearchParams({ locale })
  return httpClient.get<StrapiLayoutResponse>(`/api/layout?${params.toString()}`)
}
