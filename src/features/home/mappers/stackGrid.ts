import type { StrapiStackGridBlockDto } from '../types/strapi-home-portfolio.dto'
import type { StackGridProps } from '../types/stack-grid.model'

export function mapStackGridFromStrapi(dto: StrapiStackGridBlockDto): StackGridProps {
  const items =
    dto.item?.filter((i) => i.showItem !== false).map((i) => ({ id: i.id, label: i.label })) ?? []

  return {
    sectionLabel: dto.sectionLabel ?? undefined,
    title: dto.title ?? undefined,
    items,
  }
}
