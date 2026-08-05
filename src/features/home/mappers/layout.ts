import type {
  StrapiLayoutDto,
  StrapiLayoutResponse,
  StrapiNavDto,
  StrapiNavItemDto,
  StrapiNavSvg,
} from '../types/strapi-layout.dto'
import type {
  LayoutContent,
  LayoutCopyright,
  LayoutNav,
  LayoutNavItem,
  NavIconKey,
} from '../types/layout.model'

/**
 * Separa el año (4 dígitos) del resto del texto en `fotterCopyrightTYear`.
 * Ej: "2026 Manudev" → { year: "2026", text: "Manudev" }
 */
export function parseCopyrightYear(value: string): LayoutCopyright {
  const trimmed = value.trim()
  if (!trimmed) return { year: '', text: '' }

  const yearMatch = trimmed.match(/\b((?:19|20)\d{2})\b/)
  const year = yearMatch?.[1] ?? ''
  const text = trimmed
    .replace(/\b(?:19|20)\d{2}\b/, '')
    .replace(/\s+/g, ' ')
    .trim()

  return { year, text }
}

function mapNavIcon(svg: string | null | undefined): NavIconKey | null {
  if (svg === 'house' || svg === 'person') return svg
  return null
}

function mapNavItem(dto: StrapiNavItemDto): LayoutNavItem | null {
  const name = dto.name?.trim()
  const icon = mapNavIcon(dto.svg as StrapiNavSvg | string | null | undefined)
  if (!name || !icon) return null
  return { name, icon }
}

export function mapLayoutNavFromStrapi(nav: StrapiNavDto | null | undefined): LayoutNav {
  if (!nav) {
    return { showLangs: true, items: [] }
  }

  const items = (nav.items ?? [])
    .map(mapNavItem)
    .filter((item): item is LayoutNavItem => item !== null)

  return {
    showLangs: Boolean(nav.showlangs),
    items,
  }
}

export function mapLayoutFromStrapi(response: StrapiLayoutResponse): LayoutContent | null {
  const dto = response.data
  if (!dto) return null
  return mapLayoutDto(dto)
}

function mapLayoutDto(dto: StrapiLayoutDto): LayoutContent {
  const copyrightRaw = dto.fotterCopyrightTYear?.trim() ?? ''
  return {
    titleLeft: dto.fotterTitleLeft?.trim() ?? '',
    messageRight: dto.fotterMessageRigth?.trim() ?? '',
    copyright: parseCopyrightYear(copyrightRaw),
    nav: mapLayoutNavFromStrapi(dto.nav),
  }
}
