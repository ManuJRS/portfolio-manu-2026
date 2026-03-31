import type { StrapiProfileHighlightBlockDto } from '../types/strapi-home-portfolio.dto'
import type { ProfileHighlightProps } from '../types/profile-highlight.model'

type MediaLike = {
  url?: string
  mime?: string | null
  formats?: { small?: { url?: string } }
}

const VIDEO_PATH_RE = /\.(mp4|webm|ogg|ogv|mov|m4v|avi)(\?|#|$)/i

function isProbablyVideoPath(path: string | undefined): boolean {
  if (!path) return false
  const base = path.split(/[?#]/)[0]?.toLowerCase() ?? ''
  return VIDEO_PATH_RE.test(base)
}

/** El campo media `image` en Strapi puede ser imagen o vídeo. */
function isVideoMedia(m: MediaLike | undefined): boolean {
  if (!m) return false
  const mime = m.mime?.toLowerCase()
  if (mime?.startsWith('video/')) return true
  return isProbablyVideoPath(m.url)
}

type MediaRaw = MediaLike | null | undefined | { attributes?: MediaLike }

function resolveStrapiMediaUrl(url: string | undefined): string | undefined {
  const u = url?.trim()
  if (!u) return undefined
  if (u.startsWith('http')) return u
  const base = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`
}

function getUrlFromMedia(m: MediaLike | null | undefined): string | undefined {
  if (!m) return undefined
  const raw = m.formats?.small?.url ?? m.url
  return resolveStrapiMediaUrl(raw)
}

/**
 * Vídeo: nunca usar `formats.small` (Strapi suele poner ahí un JPEG de poster).
 * El archivo reproducible está en `url`.
 */
function getVideoUrlFromMedia(m: MediaLike | null | undefined): string | undefined {
  if (!m) return undefined
  return resolveStrapiMediaUrl(m.url)
}

function normalizeMediaNode(raw: MediaRaw): MediaLike | undefined {
  if (raw == null) return undefined
  const withAttrs = raw as { attributes?: MediaLike }
  if (withAttrs.attributes && typeof withAttrs.attributes === 'object') {
    return withAttrs.attributes
  }
  return raw as MediaLike
}

function unwrapFirstMedia(
  media: StrapiProfileHighlightBlockDto['image'] | StrapiProfileHighlightBlockDto['video'],
): MediaLike | undefined {
  if (media == null) return undefined
  const wrapped = media as { data?: MediaRaw | MediaRaw[] | null }
  if (wrapped.data != null && wrapped.data !== undefined) {
    const d = wrapped.data
    const first = Array.isArray(d) ? d[0] : d
    return normalizeMediaNode(first)
  }
  if (Array.isArray(media)) {
    return normalizeMediaNode(media[0])
  }
  return normalizeMediaNode(media as MediaRaw)
}

export function mapProfileHighlightFromStrapi(
  dto: StrapiProfileHighlightBlockDto,
): ProfileHighlightProps {
  const imgNode = unwrapFirstMedia(dto.image)
  const videoNode = unwrapFirstMedia(dto.video)

  const videoFromDedicated = getVideoUrlFromMedia(videoNode)
  const videoFromImageField =
    imgNode && isVideoMedia(imgNode) ? getVideoUrlFromMedia(imgNode) : undefined
  const videoUrl = videoFromDedicated ?? videoFromImageField

  const imageUrl =
    imgNode && !isVideoMedia(imgNode) ? getUrlFromMedia(imgNode) : undefined

  return {
    name: dto.name ?? undefined,
    role: dto.role ?? undefined,
    description: dto.description ?? undefined,
    imageAlt: dto.imageAlt ?? undefined,
    imageUrl,
    videoUrl,
    socialLinks: dto.socialLinks?.length
      ? dto.socialLinks.map((l) => ({
          label: l.label,
          url: l.url,
          icon: l.icon,
        }))
      : undefined,
  }
}
