import type { StrapiExpComponentBlockDto } from '../types/strapi-info-portfolio.dto'
import type { ExpComponentProps } from '../types/exp-component.model'

export function mapExpComponentFromStrapi(dto: StrapiExpComponentBlockDto): ExpComponentProps {
  const items =
    dto.Exp?.map((row) => ({
      id: row.id,
      duration: row.Duration ?? undefined,
      position: row.Position?.trim() ?? undefined,
      company: row.Company ?? undefined,
      description: row.Description ?? undefined,
    })) ?? []

  return {
    items: items.length ? items : undefined,
  }
}
