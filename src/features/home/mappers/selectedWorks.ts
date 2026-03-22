import type { StrapiSelectedWorksBlockDto, StrapiSelectedWorkDto } from '../types/strapi-home-portfolio.dto'
import type { SelectedWorksProps, SelectedWorkItem } from '../types/selected-works.model'

type MediaLike = {
  url?: string
  alternativeText?: string | null
  formats?: { small?: { url?: string }; medium?: { url?: string } }
}

function resolveImageUrl(imgPreview: StrapiSelectedWorkDto['imgPreview']): string | undefined {
  if (!imgPreview) return undefined
  const wrapped = imgPreview as { data?: MediaLike | MediaLike[] }
  if (wrapped.data) {
    const first = Array.isArray(wrapped.data) ? wrapped.data[0] : wrapped.data
    return first?.formats?.medium?.url ?? first?.formats?.small?.url ?? first?.url
  }
  const direct = imgPreview as MediaLike
  return direct?.formats?.medium?.url ?? direct?.formats?.small?.url ?? direct?.url
}

function mapWork(dto: StrapiSelectedWorkDto): SelectedWorkItem {
  return {
    id: dto.id,
    title: dto.title ?? '',
    slug: dto.slug ?? '',
    projectTag: dto.projectTag ?? undefined,
    imageUrl: resolveImageUrl(dto.imgPreview),
    imageAlt: (dto.imgPreview as MediaLike)?.alternativeText ?? undefined,
    shortDescription: dto.shortDescription ?? undefined,
    descriptionProyect: dto.descriptionProyect ?? undefined,
  }
}

export function mapSelectedWorksFromStrapi(
  dto: StrapiSelectedWorksBlockDto,
): SelectedWorksProps {
  const works = (dto.selectedWorks ?? []).map(mapWork)
  const tags = Array.from(
    new Set(
      works
        .flatMap((w) => (w.projectTag ? [w.projectTag] : []))
        .filter(Boolean)
        .sort(),
    ),
  )
  const filterTags = dto.showFilters !== false ? ['all', ...tags] : undefined

  return {
    title: dto.title ?? undefined,
    description: dto.description ?? undefined,
    showFilters: dto.showFilters ?? true,
    defaultFilter: dto.defaultFilter ?? 'all',
    works,
    filterTags,
  }
}
