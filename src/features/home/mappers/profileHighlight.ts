import type { StrapiProfileHighlightBlockDto } from '../types/strapi-home-portfolio.dto'
import type { ProfileHighlightProps } from '../types/profile-highlight.model'

type MediaLike = { url?: string; formats?: { small?: { url?: string } } }

function getUrlFromMedia(m: MediaLike | null | undefined): string | undefined {
  if (!m) return undefined
  return m.formats?.small?.url ?? m.url
}

function resolveImageUrl(image: StrapiProfileHighlightBlockDto['image']): string | undefined {
  if (!image) return undefined
  // Strapi v5: { data: { url } } o { data: [{ url }] }
  const wrapped = image as { data?: MediaLike | MediaLike[] }
  if (wrapped.data) {
    const first = Array.isArray(wrapped.data) ? wrapped.data[0] : wrapped.data
    return getUrlFromMedia(first)
  }
  // Strapi v4: array directo [{ url, formats }]
  const arr = image as MediaLike[]
  return getUrlFromMedia(arr[0])
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
