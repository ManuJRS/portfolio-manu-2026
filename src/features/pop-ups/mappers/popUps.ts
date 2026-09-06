import type {
  PopUpFrequency,
  StrapiPopUpsAttributes,
  StrapiPopUpsDto,
  StrapiPopUpsResponse,
  StrapiTargetPageDto,
} from '../types/strapi-pop-ups.dto'
import type { SideLayerContent } from '../types/side-layer.model'

const FREQUENCIES: readonly PopUpFrequency[] = [
  'once_per_session',
  'once_per_visitor',
  'always',
]

function unwrapAttributes(dto: StrapiPopUpsDto): StrapiPopUpsAttributes {
  if (dto.attributes && typeof dto.attributes === 'object') {
    return dto.attributes
  }
  return dto
}

function mapFrequency(value: string | null | undefined): PopUpFrequency {
  if (value && (FREQUENCIES as readonly string[]).includes(value)) {
    return value as PopUpFrequency
  }
  return 'always'
}

/** `null`/inválido → 0; acota a 0–10. */
function mapDelay(value: number | null | undefined): number {
  if (value == null || Number.isNaN(Number(value))) return 0
  return Math.min(10, Math.max(0, Number(value)))
}

function mapTargetSlug(page: StrapiTargetPageDto): string | null {
  const slug = page.attributes?.slug ?? page.slug
  const trimmed = slug?.trim()
  return trimmed || null
}

function extractTargetPages(
  targetPages: StrapiPopUpsAttributes['targetPages'],
): StrapiTargetPageDto[] {
  if (!targetPages) return []
  if (Array.isArray(targetPages)) return targetPages
  return targetPages.data ?? []
}

function pickDto(data: StrapiPopUpsResponse['data']): StrapiPopUpsDto | null {
  if (!data) return null
  if (Array.isArray(data)) return data[0] ?? null
  return data
}

export function mapPopUpsFromStrapi(response: StrapiPopUpsResponse): SideLayerContent | null {
  const dto = pickDto(response.data)
  if (!dto) return null

  const attrs = unwrapAttributes(dto)
  const slugs = extractTargetPages(attrs.targetPages)
    .map(mapTargetSlug)
    .filter((slug): slug is string => Boolean(slug))

  const text = attrs.message?.trim() || attrs.text?.trim() || null

  return {
    title: attrs.title?.trim() || null,
    text,
    buttonText: attrs.buttonText?.trim() || null,
    buttonLink: attrs.buttonLink?.trim() || null,
    frequency: mapFrequency(attrs.frequency ?? null),
    delay: mapDelay(attrs.delay),
    targetHomePage: Boolean(attrs.targetHomePage),
    targetInfoPage: Boolean(attrs.targetInfoPage),
    targetPageSlugs: slugs,
  }
}
