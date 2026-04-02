import type { StrapiCardsTitleBlockDto, StrapiCardsTitleItemDto } from '../types/strapi-web-develop.dto'
import type { CardsTitleProps, CardsTitleTestimonial } from '../types/cards-title.model'

function stripOuterQuotes(text: string): string {
  let t = text.trim()
  while (t.length >= 2 && t.startsWith('"') && t.endsWith('"')) {
    t = t.slice(1, -1).trim()
  }
  return t
}

function mapItem(dto: StrapiCardsTitleItemDto): CardsTitleTestimonial {
  const author = dto.title?.trim() || dto.Title?.trim() || 'Autor'
  const role = dto.subtitle?.trim() || dto.Subtitle?.trim() || ''
  const raw =
    dto.description?.trim() || dto.Description?.trim() || ''

  return {
    id: `cards-title-item-${dto.id}`,
    quote: stripOuterQuotes(raw),
    author,
    role,
  }
}

export function mapCardsTitleFromStrapi(block: StrapiCardsTitleBlockDto): CardsTitleProps {
  const rawList = block.cards ?? block.Cards ?? []
  const items = rawList.map(mapItem)

  return {
    tag: block.tag?.trim() || block.Tag?.trim() || 'Testimonios',
    title: block.title?.trim() || block.Title?.trim() || 'Impacto en el Negocio',
    items,
  }
}
