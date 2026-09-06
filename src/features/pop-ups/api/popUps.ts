import type { AppLocale } from '@/features/home/types/locale'
import { mapPopUpsFromStrapi } from '../mappers/popUps'
import type { SideLayerContent } from '../types/side-layer.model'
import { fetchPopUpsRaw } from '@/services/strapi/popUps'

export async function getPopUps(locale: AppLocale): Promise<SideLayerContent | null> {
  const raw = await fetchPopUpsRaw(locale)
  return mapPopUpsFromStrapi(raw)
}
