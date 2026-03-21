import type { StrapiMediaDto } from '../types/strapi-project-portfolio.dto'

export type ProjectMediaKind = 'image' | 'video'

export function isVideoAsset(asset: StrapiMediaDto): boolean {
  if (asset.mime?.startsWith('video/')) return true
  return /\.(mp4|webm|ogg)(\?|$)/i.test(asset.url)
}

export function resolveProjectMediaAsset(
  asset: StrapiMediaDto | null | undefined,
): { url: string; kind: ProjectMediaKind } | undefined {
  if (!asset) return undefined
  const kind = isVideoAsset(asset) ? 'video' : 'image'
  const url =
    kind === 'video'
      ? asset.url
      : asset.formats?.small?.url ?? asset.url
  return { url, kind }
}
