import type { StrapiProjectHeroDarkBlockDto } from '../types/strapi-project-portfolio.dto'
import type { ProjectHeroDarkProps } from '../types/project-hero-dark.model'
import { isVideoAsset } from '../utils/resolveProjectMedia'

function splitTitle(title: string): { line1: string; line2: string } {
  const parts = title.trim().split(/\s+/)
  if (parts.length <= 1) {
    return { line1: title, line2: '' }
  }
  return { line1: parts[0]!, line2: parts.slice(1).join(' ') }
}

function resolveImageUrl(image: NonNullable<StrapiProjectHeroDarkBlockDto['featuredImage']>): string | undefined {
  return (
    image.formats?.large?.url ??
    image.formats?.medium?.url ??
    image.url
  )
}

function resolveHeroMedia(dto: StrapiProjectHeroDarkBlockDto): Pick<
  ProjectHeroDarkProps,
  'mediaUrl' | 'mediaKind' | 'mediaAlt'
> {
  if (dto.featuredVideo) {
    const v = dto.featuredVideo
    return {
      mediaUrl: v.url,
      mediaKind: 'video',
      mediaAlt: v.alternativeText ?? undefined,
    }
  }
  if (dto.featuredImage) {
    const img = dto.featuredImage
    if (isVideoAsset(img)) {
      return {
        mediaUrl: img.url,
        mediaKind: 'video',
        mediaAlt: img.alternativeText ?? undefined,
      }
    }
    return {
      mediaUrl: resolveImageUrl(img),
      mediaKind: 'image',
      mediaAlt: img.alternativeText ?? undefined,
    }
  }
  return {}
}

export function mapProjectHeroDarkFromStrapi(dto: StrapiProjectHeroDarkBlockDto): ProjectHeroDarkProps {
  const rawTitle = dto.title?.trim() ?? ''
  const { line1, line2 } = rawTitle ? splitTitle(rawTitle) : { line1: '', line2: '' }

  return {
    titleLine1: line1 || undefined,
    titleLine2: line2 || undefined,
    description: dto.description ?? undefined,
    ...resolveHeroMedia(dto),
    technologies: dto.technologies?.map((t) => t.label) ?? undefined,
    urlText: dto.urlText?.trim() || undefined,
    urlProject: dto.urlProject?.trim() || undefined,
  }
}
