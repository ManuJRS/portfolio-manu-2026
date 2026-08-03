import type { AppLocale } from '../types/locale'
import type { LayoutContent } from '../types/layout.model'
import { mapLayoutFromStrapi } from '../mappers/layout'
import { fetchLayoutRaw } from '@/services/strapi/layout'

export async function getLayout(locale: AppLocale): Promise<LayoutContent | null> {
  const raw = await fetchLayoutRaw(locale)
  return mapLayoutFromStrapi(raw)
}
