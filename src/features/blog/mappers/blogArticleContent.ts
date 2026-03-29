import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import {
  isVideoAsset,
  resolveProjectMediaAsset,
} from '@/features/projects/utils/resolveProjectMedia'
import type { StrapiBlogContentBlockDto } from '../types/strapi-blog-article.dto'
import type {
  BlogArticleContentMediaItem,
  BlogArticleContentProps,
  BlogSemanticHeadingTag,
} from '../types/blog-article-content.model'

const HEADING_TAGS: readonly BlogSemanticHeadingTag[] = [
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
]

function mapHeadingTag(block: StrapiBlogContentBlockDto): BlogSemanticHeadingTag {
  const raw = block.SemanticHeading?.SemanticHeading?.trim().toLowerCase()
  if (raw && (HEADING_TAGS as readonly string[]).includes(raw)) {
    return raw as BlogSemanticHeadingTag
  }
  return 'h2'
}

function imageSrcFromMedia(media: StrapiMediaDto): string {
  return (
    media.formats?.large?.url ??
    media.formats?.medium?.url ??
    media.formats?.small?.url ??
    media.url ??
    ''
  )
}

function buildAlt(media: StrapiMediaDto, altMediaField: string | null | undefined): string {
  const fromMedia = media.alternativeText?.trim()
  if (fromMedia) return fromMedia
  const fromField = altMediaField?.trim()
  if (fromField && fromField.toLowerCase() !== 'img') return fromField
  return media.name?.trim() || ''
}

function mapMediaItem(
  media: StrapiMediaDto,
  altMediaField: string | null | undefined,
): BlogArticleContentMediaItem | null {
  const video = isVideoAsset(media)
  const resolved = resolveProjectMediaAsset(media)
  const src = video ? (resolved?.url ?? media.url ?? '') : imageSrcFromMedia(media)
  if (!src) return null

  const caption = media.caption?.trim() || undefined

  return {
    kind: video ? 'video' : 'image',
    src,
    alt: buildAlt(media, altMediaField),
    ...(caption && { caption }),
  }
}

function splitDescriptionParagraphs(text: string | null | undefined): string[] {
  if (!text?.trim()) return []
  return text
    .split(/\n\n+/)
    .map((p) => p.trim())
    .filter(Boolean)
}

export function mapBlogArticleContentFromStrapi(block: StrapiBlogContentBlockDto): BlogArticleContentProps {
  const titleRaw = block.Title?.trim()
  const title = titleRaw || undefined

  const descriptionParagraphs = splitDescriptionParagraphs(block.Description ?? undefined)

  const mediaItems: BlogArticleContentMediaItem[] = []
  if (block.Media?.length) {
    for (const m of block.Media) {
      const item = mapMediaItem(m, block.AltMedia)
      if (item) mediaItems.push(item)
    }
  }

  return {
    ...(title && { title }),
    headingTag: mapHeadingTag(block),
    descriptionParagraphs,
    mediaItems,
  }
}
