import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import type { StrapiHowIDoBlockDto, StrapiHowIDoCardDto } from '../types/strapi-web-develop.dto'
import type { HowIDoImage, HowIDoProps, HowIDoStep } from '../types/how-i-do.model'

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

function pickImageUrl(media: StrapiMediaDto): string {
  const f = media.formats
  const raw =
    f?.large?.url ?? f?.medium?.url ?? f?.small?.url ?? f?.thumbnail?.url ?? media.url
  return resolveStrapiMediaUrl(raw)
}

function mapMediaToImage(
  media: StrapiMediaDto | null,
  fallbackAlt: string,
  stagger: boolean,
): HowIDoImage | null {
  if (!media) return null
  const alt =
    media.alternativeText?.trim() || media.name?.trim() || fallbackAlt
  return {
    src: pickImageUrl(media),
    alt,
    stagger,
  }
}

function mapStep(dto: StrapiHowIDoCardDto, index: number): HowIDoStep {
  const n =
    dto.number?.trim() ||
    String(index + 1).padStart(2, '0')
  const title = dto.title?.trim() || dto.Title?.trim() || 'Paso'
  return {
    id: `how-i-do-step-${dto.id}`,
    number: n,
    title,
    description: dto.description?.trim() || '',
  }
}

export function mapHowIDoFromStrapi(block: StrapiHowIDoBlockDto): HowIDoProps {
  const rawCards = block.Cards ?? block.cards ?? []
  const steps = rawCards.map((c, i) => mapStep(c, i))

  const sectionTitle =
    block.title?.trim() || block.Title?.trim() || 'Cómo lo hacemos'

  const imgOne = unwrapMedia(block.imageOne ?? block.ImageOne ?? undefined)
  const imgTwo = unwrapMedia(block.imageTwo ?? block.ImageTwo ?? undefined)

  const images: HowIDoImage[] = []
  const first = mapMediaToImage(
    imgOne,
    `Imagen complementaria — ${sectionTitle}`,
    false,
  )
  if (first) images.push(first)
  const second = mapMediaToImage(
    imgTwo,
    `Imagen complementaria — ${sectionTitle}`,
    true,
  )
  if (second) images.push(second)

  return {
    tag: block.tag?.trim() || block.Tag?.trim() || 'Filosofía de Trabajo',
    title: sectionTitle,
    steps,
    images,
  }
}
