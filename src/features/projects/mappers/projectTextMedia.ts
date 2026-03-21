import type { StrapiProjectTextMediaBlockDto } from '../types/strapi-project-portfolio.dto'
import type { ProjectTextMediaProps } from '../types/project-text-media.model'
import { resolveProjectMediaAsset } from '../utils/resolveProjectMedia'

function splitDescriptionIntoParagraphs(description: string | null | undefined): string[] | undefined {
  if (!description?.trim()) return undefined
  const parts = description
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
  return parts.length ? parts : undefined
}

export function mapProjectTextMediaFromStrapi(dto: StrapiProjectTextMediaBlockDto): ProjectTextMediaProps {
  const pos = dto.mediaPosition
  const mediaPosition =
    pos === 'left' || pos === 'right' ? pos : 'left'

  const resolved = resolveProjectMediaAsset(dto.media ?? undefined)

  const mediaAlt =
    dto.altMedia?.trim() ||
    dto.media?.alternativeText?.trim() ||
    undefined

  const title = dto.title?.replace(/\n+$/g, '').trim() ?? undefined

  return {
    mediaPosition,
    eyebrow: dto.eyebrow ?? undefined,
    title,
    descriptionParagraphs: splitDescriptionIntoParagraphs(dto.description ?? undefined),
    mediaUrl: resolved?.url,
    mediaKind: resolved?.kind,
    mediaAlt,
  }
}
