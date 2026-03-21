import type { StrapiHeroMinimalBlockDto } from '../types/strapi-home-portfolio.dto'
import type { HeroMinimalProps } from '../types/hero-minimal.model'

export function mapHeroMinimalFromStrapi(dto: StrapiHeroMinimalBlockDto): HeroMinimalProps {
  return {
    eyebrowLeft: dto.eyebrowLeft ?? undefined,
    eyebrowRight: dto.eyebrowRight ?? undefined,
    description: dto.description ?? undefined,
    scrollText: dto.scrollText ?? undefined,
    socialLinks: dto.socialLinks?.length
      ? dto.socialLinks.map((l) => ({
          label: l.label,
          url: l.url,
          icon: l.icon,
        }))
      : undefined,
  }
}
