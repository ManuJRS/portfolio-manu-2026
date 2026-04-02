import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import type { StrapiCardSolutionBlockDto, StrapiCardSolutionItemDto } from '../types/strapi-web-develop.dto'
import type { CardSolutionItem, CardSolutionProps } from '../types/card-solution.model'

function unwrapMedia(
  raw: StrapiMediaDto | { data: StrapiMediaDto | null } | null | undefined,
): StrapiMediaDto | null {
  if (raw == null) return null
  if (typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: StrapiMediaDto | null }).data ?? null
  }
  return raw as StrapiMediaDto
}

function resolveStrapiMediaUrl(url: string): string {
  const u = url.trim()
  if (!u || u.startsWith('http')) return u
  const base = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`
}

function pickImageUrl(media: StrapiMediaDto): string {
  const f = media.formats
  const raw =
    f?.large?.url ?? f?.medium?.url ?? f?.small?.url ?? f?.thumbnail?.url ?? media.url
  return resolveStrapiMediaUrl(raw)
}

function mapTags(dto: StrapiCardSolutionItemDto): string[] {
  return [dto.itemOne, dto.itemTwo, dto.itemThree]
    .map((s) => (typeof s === 'string' ? s.trim() : ''))
    .filter(Boolean)
}

function mapCard(dto: StrapiCardSolutionItemDto, index: number): CardSolutionItem {
  const media = unwrapMedia(dto.image ?? undefined)
  const imageSrc = media ? pickImageUrl(media) : ''
  const itemTitle = dto.title?.trim() || dto.Title?.trim() || 'Servicio'
  const imageAlt = media?.alternativeText?.trim() || itemTitle

  return {
    id: `card-solution-item-${dto.id}`,
    icon: dto.icon?.trim() || 'code',
    title: itemTitle,
    description: dto.description?.trim() || '',
    tags: mapTags(dto),
    imageSrc,
    imageAlt,
    layout: index === 0 ? 'featured' : 'compact',
  }
}

export function mapCardSolutionFromStrapi(block: StrapiCardSolutionBlockDto): CardSolutionProps {
  const rawList = block.Cards ?? block.cards ?? []
  const cards = rawList.map((item, i) => mapCard(item, i))

  return {
    tag: block.tag?.trim() || block.Tag?.trim() || '',
    title: block.title?.trim() || block.Title?.trim() || 'SOLUCIONES',
    ctaText: block.ctaText?.trim() || block.CtaText?.trim() || 'Consultar',
    ctaTitle: block.ctaTitle?.trim() || block.CtaTitle?.trim() || '¿Necesitas una solución a medida?',
    ctaLink: block.ctaLink?.trim() || block.CtaLink?.trim() || '#',
    cards,
  }
}
