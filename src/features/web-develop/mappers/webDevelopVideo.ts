import type { StrapiWebDevelopVideoBlockDto } from '../types/strapi-web-develop.dto'
import type { WebDevelopVideoProps } from '../types/web-develop-video.model'
import { resolveProjectMediaAsset } from '@/features/projects/utils/resolveProjectMedia'

export function mapWebDevelopVideoFromStrapi(block: StrapiWebDevelopVideoBlockDto): WebDevelopVideoProps {
  const resolved = resolveProjectMediaAsset(block.media)
  const mediaUrl = resolved?.url ?? ''
  const mediaKind = resolved?.kind ?? 'image'

  const features =
    block.features?.map((f) => ({
      title: f.Title?.trim() || '',
      description: f.description?.trim() || '',
    })) ?? []

  return {
    title: block.Title?.trim() || '',
    description: block.description?.trim() || '',
    mediaUrl,
    mediaAlt: block.media?.alternativeText?.trim() || block.media?.name?.trim() || '',
    mediaKind,
    features,
  }
}
