/** Respuesta típica GET /api/layout (single type Strapi) */

export type StrapiNavSvg = 'house' | 'person'

export type StrapiNavItemDto = {
  id: number
  name?: string | null
  svg?: StrapiNavSvg | string | null
}

export type StrapiNavDto = {
  id: number
  showlangs?: boolean | null
  items?: StrapiNavItemDto[] | null
}

export type StrapiFloatingItemDto = {
  id: number
  text?: string | null
  url?: string | null
}

export type StrapiLayoutDto = {
  id: number
  documentId: string
  fotterTitleLeft?: string | null
  fotterMessageRigth?: string | null
  fotterCopyrightTYear?: string | null
  showFloatingBtn?: boolean | null
  showContactItem?: boolean | null
  showShareItem?: boolean | null
  floatingItems?: StrapiFloatingItemDto[] | null
  nav?: StrapiNavDto | null
  locale?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
}

export type StrapiLayoutResponse = {
  data: StrapiLayoutDto | null
  meta?: Record<string, unknown>
}
