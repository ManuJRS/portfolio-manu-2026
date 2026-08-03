import type { StrapiCardsSectionBlockDto, StrapiCardsSectionItemDto } from '../types/strapi-web-develop.dto'
import type { CardsSectionPillar, CardsSectionProps } from '../types/cards-section.model'

function mapBullets(dto: StrapiCardsSectionItemDto): string[] {
  return [
    dto.iconOne ?? dto.IconOne,
    dto.iconTwo ?? dto.IconTwo,
    dto.iconThree ?? dto.IconThree,
  ]
    .map((s) => (typeof s === 'string' ? s.trim() : ''))
    .filter(Boolean)
}

function mapPillar(dto: StrapiCardsSectionItemDto): CardsSectionPillar {
  const title = dto.title?.trim() || dto.Title?.trim() || 'Pilar'
  return {
    id: `cards-section-item-${dto.id}`,
    icon: dto.icon?.trim() || 'code',
    title,
    description: dto.description?.trim() || '',
    bullets: mapBullets(dto),
  }
}

export function mapCardsSectionFromStrapi(block: StrapiCardsSectionBlockDto): CardsSectionProps {
  const rawList = block.Cards ?? block.cards ?? []
  const pillars = rawList.map(mapPillar)

  return {
    tag: block.tag?.trim() || block.Tag?.trim() || 'Especialización',
    title: block.title?.trim() || block.Title?.trim() || 'Nuestros Pilares Técnicos',
    pillars,
  }
}
