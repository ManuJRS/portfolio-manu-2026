import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import type { StrapiPortfolioPreviewBlockDto } from '../types/strapi-web-develop.dto'
import type { PortfolioPreviewProps, PortfolioPreviewProject } from '../types/portfolio-preview.model'

function splitHeading(title: string): { line1: string; line2: string } {
  const t = title.trim()
  const i = t.indexOf(' ')
  if (i === -1) return { line1: t, line2: '' }
  return { line1: t.slice(0, i), line2: t.slice(i + 1).trim() }
}

function imageSrcFromMedia(media: StrapiMediaDto | null | undefined): string {
  if (!media) return ''
  return (
    media.formats?.large?.url ??
    media.formats?.medium?.url ??
    media.formats?.small?.url ??
    media.url ??
    ''
  )
}

function imageAltFromMedia(media: StrapiMediaDto | null | undefined): string {
  return media?.alternativeText?.trim() || media?.name?.trim() || ''
}

function mapProject(
  tag: string | null | undefined,
  title: string | null | undefined,
  description: string | null | undefined,
  buttonUrl: string | null | undefined,
  buttonText: string | null | undefined,
  media: StrapiMediaDto | null | undefined,
): PortfolioPreviewProject {
  return {
    tag: tag?.trim() || '',
    title: title?.trim() || '',
    description: description?.trim() || '',
    buttonText: buttonText?.trim() || 'Ver Detalles',
    buttonUrl: buttonUrl?.trim() || '#',
    imageSrc: imageSrcFromMedia(media),
    imageAlt: imageAltFromMedia(media),
  }
}

export function mapPortfolioPreviewFromStrapi(block: StrapiPortfolioPreviewBlockDto): PortfolioPreviewProps {
  const { line1, line2 } = splitHeading(block.Title?.trim() || '')

  return {
    headingLine1: line1,
    headingLine2: line2,
    description: block.Description?.trim() || '',
    first: mapProject(
      block.FirstTag,
      block.FirstTitle,
      block.FirstDescription,
      block.FirstTextUrl,
      block.FirstTextBtn,
      block.FirstImg,
    ),
    second: mapProject(
      block.SecondTag,
      block.SecondTitle,
      block.SecondDescription,
      block.SecondTextUrl,
      block.SecondTextBtn,
      block.SecondImg,
    ),
  }
}
