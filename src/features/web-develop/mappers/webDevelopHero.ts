import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import { resolveProjectMediaAsset } from '@/features/projects/utils/resolveProjectMedia'
import type { StrapiWebDevelopHeroBlockDto } from '../types/strapi-web-develop.dto'
import type { WebDevelopHeroProps } from '../types/web-develop-hero.model'

function unwrapMedia(
  raw: StrapiMediaDto | { data: StrapiMediaDto | null } | null | undefined,
): StrapiMediaDto | null {
  if (raw == null) return null
  if (typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: StrapiMediaDto | null }).data ?? null
  }
  return raw as StrapiMediaDto
}

function resolveStrapiMediaUrl(url: string): string {
  const u = url.trim()
  if (!u || u.startsWith('http')) return u
  const base = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`
}

export function mapWebDevelopHeroFromStrapi(block: StrapiWebDevelopHeroBlockDto): WebDevelopHeroProps {
  const raw = block.MediaHero ?? block.mediaHero
  const media = unwrapMedia(raw ?? undefined)
  const resolved = resolveProjectMediaAsset(media ?? undefined)
  const heroMedia = resolved
    ? {
        src: resolveStrapiMediaUrl(resolved.url),
        kind: resolved.kind,
      }
    : undefined

  return {
    title: block.Title?.trim() || 'Desarrollo Web Profesional',
    tag: block.Tag?.trim() || '',
    buttonText: block.TextBtn?.trim() || 'Solicitar proyecto',
    buttonUrl: block.UrlBtn?.trim() || '#',
    ...(heroMedia && { heroMedia }),
  }
}
