/** Respuesta colección Strapi v5. */
export type StrapiProjectPortfolioCollectionResponse = {
  data: StrapiProjectPortfolioDocument[]
  meta?: {
    pagination?: {
      page: number
      pageSize: number
      pageCount: number
      total: number
    }
  }
}

/** Respuesta findOne Strapi v5. */
export type StrapiProjectPortfolioSingleResponse = {
  data: StrapiProjectPortfolioDocument | null
}

export type StrapiProjectPortfolioDocument = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  locale?: string
  title?: string
  slug?: string
  sections?: StrapiProjectDynamicZoneBlock[]
}

export type StrapiProjectUnknownBlockDto = {
  __component: string
  id: number
}

export type StrapiMediaDto = {
  id: number
  documentId?: string
  name?: string
  alternativeText?: string | null
  mime?: string
  url: string
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
    medium?: { url: string }
    large?: { url: string }
  }
}

export type StrapiProjectTechnologyDto = {
  id: number
  label: string
}

export type StrapiProjectHeroDarkBlockDto = {
  __component: 'components.project-hero-dark'
  id: number
  isVisible?: boolean
  projectCode?: string | null
  title?: string | null
  description?: string | null
  featuredImage?: StrapiMediaDto | null
  technologies?: StrapiProjectTechnologyDto[] | null
}

export type StrapiMediaContentSplitItemDto = {
  id?: number
  itemsString: string
}

export type StrapiMediaContentSplitBlockDto = {
  __component: 'components.media-content-split'
  id: number
  isVisible?: boolean
  /** Opcional: `4xl` | `5xl` | `6xl` | `7xl` | `full` — ancho máximo del contenido. */
  contentMaxWidth?: string | null
  mediaPosition?: 'left' | 'right' | null
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  itemsList?: StrapiMediaContentSplitItemDto[] | null
  /** Imagen o vídeo (Strapi Media Library). */
  media?: StrapiMediaDto | null
  /** @deprecated usar `media`; se mantiene por compatibilidad */
  image?: StrapiMediaDto | null
  mediaAlt?: string | null
  mediaBadge?: string | null
  showPlayButton?: boolean
}

export type StrapiProjectTextMediaBlockDto = {
  __component: 'components.project-text-media'
  id: number
  isVisible?: boolean
  mediaPosition?: 'left' | 'right' | null
  eyebrow?: string | null
  title?: string | null
  description?: string | null
  altMedia?: string | null
  media?: StrapiMediaDto | null
}

export type StrapiProjectTechnicalBreakdownFeaturedItemDto = {
  id?: number
  title: string
  description?: string | null
}

export type StrapiProjectTechnicalBreakdownBlockDto = {
  __component: 'components.project-technical-breakdown'
  id: number
  isVisible?: boolean
  sectionLabel?: string | null
  sectionIndex?: string | null
  highlightTitle?: string | null
  highlightDescription?: string | null
  featuredItem?: StrapiProjectTechnicalBreakdownFeaturedItemDto[] | null
  images?: StrapiMediaDto[] | null
}

export type StrapiProjectDynamicZoneBlock =
  | StrapiProjectHeroDarkBlockDto
  | StrapiMediaContentSplitBlockDto
  | StrapiProjectTextMediaBlockDto
  | StrapiProjectTechnicalBreakdownBlockDto
  | StrapiProjectUnknownBlockDto
