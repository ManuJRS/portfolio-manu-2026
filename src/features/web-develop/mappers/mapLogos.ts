import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import type { StrapiLogosBlockDto, StrapiLogosMediaField } from '../types/strapi-web-develop.dto'
import type { LogosEntry, LogosProps } from '../types/logos.model'

function resolveStrapiMediaUrl(url: string): string {
  const u = url.trim()
  if (!u || u.startsWith('http')) return u
  const base = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`
}

/** URLs más ligeras para tiras de logos. */
function pickLogoUrl(media: StrapiMediaDto): string {
  const f = media.formats
  const raw =
    f?.small?.url ?? f?.medium?.url ?? f?.thumbnail?.url ?? f?.large?.url ?? media.url
  return resolveStrapiMediaUrl(raw)
}

function unwrapMediaList(raw: StrapiLogosMediaField): StrapiMediaDto[] {
  if (raw == null) return []
  if (Array.isArray(raw)) return raw.filter(Boolean)
  if (typeof raw === 'object' && 'data' in raw) {
    const d = (raw as { data: StrapiMediaDto[] | StrapiMediaDto | null }).data
    if (d == null) return []
    return Array.isArray(d) ? d.filter(Boolean) : [d]
  }
  return []
}

function pickLogoField(block: StrapiLogosBlockDto): StrapiLogosMediaField {
  return (
    block.logo ??
    block.Logo ??
    block.logos ??
    block.Logos ??
    undefined
  )
}

function mapMediaToEntry(media: StrapiMediaDto): LogosEntry {
  const alt =
    media.alternativeText?.trim() ||
    media.name?.trim() ||
    'Logo de cliente'
  return {
    id: `logos-media-${media.id}`,
    src: pickLogoUrl(media),
    alt,
  }
}

const DEFAULT_TITLE = 'Empresas que confían en nosotros'

export function mapLogosFromStrapi(block: StrapiLogosBlockDto): LogosProps {
  const list = unwrapMediaList(pickLogoField(block))
  const logos = list.map(mapMediaToEntry)

  return {
    title: block.title?.trim() || block.Title?.trim() || DEFAULT_TITLE,
    logos,
  }
}
