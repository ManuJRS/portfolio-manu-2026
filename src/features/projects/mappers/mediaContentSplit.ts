import type { StrapiMediaContentSplitBlockDto } from '../types/strapi-project-portfolio.dto'
import type {
  MediaContentSplitContentWidth,
  MediaContentSplitProps,
} from '../types/media-content-split.model'
import { resolveProjectMediaAsset } from '../utils/resolveProjectMedia'

const CONTENT_WIDTHS: readonly MediaContentSplitContentWidth[] = [
  '4xl',
  '5xl',
  '6xl',
  '7xl',
  'full',
]

function parseContentMaxWidth(raw: string | null | undefined): MediaContentSplitContentWidth | undefined {
  if (raw == null || raw === '') return undefined
  const v = String(raw).trim().toLowerCase() as MediaContentSplitContentWidth
  return CONTENT_WIDTHS.includes(v) ? v : undefined
}

export function mapMediaContentSplitFromStrapi(
  dto: StrapiMediaContentSplitBlockDto,
): MediaContentSplitProps {
  const items =
    dto.itemsList?.map((i) => i.itemsString).filter((t) => t.trim().length > 0) ?? undefined

  const pos = dto.mediaPosition
  const mediaPosition =
    pos === 'left' || pos === 'right' ? pos : 'left'

  const asset = dto.media ?? dto.image
  const resolved = resolveProjectMediaAsset(asset ?? undefined)

  const mediaAlt =
    dto.mediaAlt?.trim() ||
    asset?.alternativeText?.trim() ||
    undefined

  return {
    mediaPosition,
    contentMaxWidth: parseContentMaxWidth(dto.contentMaxWidth),
    eyebrow: dto.eyebrow ?? undefined,
    title: dto.title ?? undefined,
    description: dto.description ?? undefined,
    items: items?.length ? items : undefined,
    mediaUrl: resolved?.url,
    mediaKind: resolved?.kind,
    mediaAlt,
    mediaBadge: dto.mediaBadge ?? undefined,
    showPlayButton: dto.showPlayButton !== false,
  }
}
