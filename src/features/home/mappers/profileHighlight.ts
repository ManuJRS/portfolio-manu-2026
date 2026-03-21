import type { StrapiProfileHighlightBlockDto } from '../types/strapi-home-portfolio.dto'
import type { ProfileHighlightProps } from '../types/profile-highlight.model'

function resolveImageUrl(image: StrapiProfileHighlightBlockDto['image']): string | undefined {
  const first = image?.[0]
  if (!first) return undefined
  return first.formats?.small?.url ?? first.url
}

export function mapProfileHighlightFromStrapi(
  dto: StrapiProfileHighlightBlockDto,
): ProfileHighlightProps {
  return {
    name: dto.name ?? undefined,
    role: dto.role ?? undefined,
    description: dto.description ?? undefined,
    imageAlt: dto.imageAlt ?? undefined,
    imageUrl: resolveImageUrl(dto.image),
    socialLinks: dto.socialLinks?.length
      ? dto.socialLinks.map((l) => ({
          label: l.label,
          url: l.url,
          icon: l.icon,
        }))
      : undefined,
  }
}
