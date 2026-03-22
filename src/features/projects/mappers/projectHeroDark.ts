import type { StrapiProjectHeroDarkBlockDto } from '../types/strapi-project-portfolio.dto'
import type { ProjectHeroDarkProps } from '../types/project-hero-dark.model'

function splitTitle(title: string): { line1: string; line2: string } {
  const parts = title.trim().split(/\s+/)
  if (parts.length <= 1) {
    return { line1: title, line2: '' }
  }
  return { line1: parts[0]!, line2: parts.slice(1).join(' ') }
}

function resolveImageUrl(image: StrapiProjectHeroDarkBlockDto['featuredImage']): string | undefined {
  if (!image) return undefined
  return image.formats?.small?.url ?? image.url
}

export function mapProjectHeroDarkFromStrapi(dto: StrapiProjectHeroDarkBlockDto): ProjectHeroDarkProps {
  const rawTitle = dto.title?.trim() ?? ''
  const { line1, line2 } = rawTitle ? splitTitle(rawTitle) : { line1: '', line2: '' }

  return {
    titleLine1: line1 || undefined,
    titleLine2: line2 || undefined,
    description: dto.description ?? undefined,
    imageUrl: resolveImageUrl(dto.featuredImage),
    imageAlt: dto.featuredImage?.alternativeText ?? undefined,
    technologies: dto.technologies?.map((t) => t.label) ?? undefined,
  }
}
