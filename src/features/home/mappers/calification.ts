import type {
  StrapiCalificationBlockDto,
  StrapiCalificationCommentDto,
} from '../types/strapi-home-portfolio.dto'
import type { CalificationComment, CalificationProps } from '../types/calification.model'

function normalizeDescription(raw: string | null | undefined): string {
  if (raw == null) return ''
  let s = raw.trim()
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith('«') && s.endsWith('»'))) {
    s = s.slice(1, -1).trim()
  }
  return s
}

function mapComment(dto: StrapiCalificationCommentDto): CalificationComment {
  const tags =
    dto.Tag?.map((t) => ({
      id: t.id,
      label: t.TagText ?? '',
    })) ?? []

  return {
    id: dto.id,
    position: dto.Position ?? undefined,
    rating: typeof dto.Calification === 'number' ? dto.Calification : 0,
    name: dto.Title ?? '',
    description: normalizeDescription(dto.Description),
    timeLapse: dto.TimeLapse ?? undefined,
    tags,
  }
}

export function mapCalificationFromStrapi(dto: StrapiCalificationBlockDto): CalificationProps {
  const comments = dto.Coment?.map(mapComment) ?? []

  return {
    sectionTag: dto.Tag ?? undefined,
    title: dto.Title ?? undefined,
    comments,
  }
}
