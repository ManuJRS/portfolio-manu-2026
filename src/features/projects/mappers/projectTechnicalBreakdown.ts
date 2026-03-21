import type {
  StrapiMediaDto,
  StrapiProjectTechnicalBreakdownBlockDto,
} from '../types/strapi-project-portfolio.dto'
import type { ProjectTechnicalBreakdownProps } from '../types/project-technical-breakdown.model'

function paragraphsOrSingle(text: string | null | undefined): string[] | undefined {
  if (!text?.trim()) return undefined
  const parts = text
    .split(/\n{2,}/)
    .map((p) => p.trim())
    .filter(Boolean)
  if (parts.length) return parts
  return [text.trim()]
}

function galleryImageUrl(img: StrapiMediaDto): string {
  return img.formats?.medium?.url ?? img.formats?.small?.url ?? img.url
}

export function mapProjectTechnicalBreakdownFromStrapi(
  dto: StrapiProjectTechnicalBreakdownBlockDto,
): ProjectTechnicalBreakdownProps {
  const featuredItems =
    dto.featuredItem?.map((item) => ({
      id: item.id,
      title: item.title,
      descriptionParagraphs: paragraphsOrSingle(item.description ?? undefined),
    })) ?? undefined

  const images =
    dto.images?.map((img) => ({
      url: galleryImageUrl(img),
      alt: img.alternativeText?.trim() || img.name || '',
    })) ?? undefined

  return {
    sectionLabel: dto.sectionLabel ?? undefined,
    sectionIndex: dto.sectionIndex ?? undefined,
    highlightTitle: dto.highlightTitle ?? undefined,
    highlightDescriptionParagraphs: paragraphsOrSingle(dto.highlightDescription ?? undefined),
    featuredItems: featuredItems?.length ? featuredItems : undefined,
    images: images?.length ? images : undefined,
  }
}
