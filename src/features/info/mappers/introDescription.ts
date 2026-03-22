import type { StrapiIntroDescriptionBlockDto } from '../types/strapi-info-portfolio.dto'
import type { IntroDescriptionProps } from '../types/intro-description.model'

export function mapIntroDescriptionFromStrapi(
  dto: StrapiIntroDescriptionBlockDto,
): IntroDescriptionProps {
  return {
    infoTag: dto.InfoTag ?? undefined,
    title: dto.Title ?? undefined,
    description: dto.Description ?? undefined,
  }
}
