/** Respuesta REST Strapi v5 (single type, estructura plana). */
export type StrapiHomePortfolioResponse = {
  data: StrapiHomePortfolioData | null
  meta?: Record<string, unknown>
}

export type StrapiSeoDto = {
  id?: number
  metaTitle?: string | null
  metaDescription?: string | null
  metaRobots?: string | null
  canonicalURL?: string | null
  ogTitle?: string | null
  ogDescription?: string | null
  ogType?: string | null
  twitterCard?: string | null
  twitterTitle?: string | null
  twitterDescription?: string | null
  structuredData?: Record<string, unknown> | null
  hideFromSearchEngines?: boolean
}

export type StrapiHomePortfolioData = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  locale?: string
  title?: string
  sections?: StrapiDynamicZoneBlock[]
  /** Strapi puede devolver 'seo' o 'Seo' según la configuración */
  seo?: StrapiSeoDto | null
  Seo?: StrapiSeoDto | null
}

export type StrapiUnknownBlockDto = {
  __component: string
  id: number
}

export type StrapiHeroMinimalBlockDto = {
  __component: 'components.hero-minimalf'
  id: number
  eyebrowLeft?: string | null
  eyebrowRight?: string | null
  description?: string | null
  scrollText?: string | null
  showScrollIndicator?: boolean
  anchorId?: string | null
  socialLinks?: StrapiSocialLinkDto[] | null
}

export type StrapiSocialLinkDto = {
  id?: number
  label: string
  url: string
  icon: string
  newTab?: boolean
}

export type StrapiImageDto = {
  id: number
  documentId?: string
  name?: string
  alternativeText?: string | null
  url: string
  /** Presente en uploads de Strapi; sirve para distinguir vídeo vs imagen en el mismo campo media. */
  mime?: string | null
  formats?: {
    thumbnail?: { url: string }
    small?: { url: string }
  }
}

export type StrapiProfileHighlightBlockDto = {
  __component: 'components.profile-highlight'
  id: number
  showSection?: boolean
  name?: string | null
  role?: string | null
  description?: string | null
  imageAlt?: string | null
  image?: StrapiImageDto[] | null
  /** Vídeo opcional (misma forma de media que `image` en Strapi). */
  video?: StrapiImageDto[] | null
  socialLinks?: StrapiSocialLinkDto[] | null
}

export type StrapiStackGridItemDto = {
  id: number
  label: string
  showItem?: boolean
}

export type StrapiStackGridBlockDto = {
  __component: 'components.stack-grid'
  id: number
  sectionLabel?: string | null
  title?: string | null
  item?: StrapiStackGridItemDto[] | null
}

export type StrapiSelectedWorkDto = {
  id: number
  documentId?: string
  title?: string
  slug?: string
  projectTag?: string | null
  shortDescription?: string | null
  descriptionProyect?: string | null
  imgPreview?: StrapiImageDto | { data?: StrapiImageDto | StrapiImageDto[] } | null
}

export type StrapiSelectedWorksBlockDto = {
  __component: 'components.selected-works'
  id: number
  isVisible?: boolean
  title?: string | null
  description?: string | null
  showFilters?: boolean
  defaultFilter?: string | null
  selectedWorks?: StrapiSelectedWorkDto[] | null
}

/** Tag interno de un comentario (componente repetible en Strapi). */
export type StrapiCalificationTagItemDto = {
  id: number
  TagText?: string | null
}

/** Ítem del repetible Coment dentro de components.calification. */
export type StrapiCalificationCommentDto = {
  id: number
  Position?: string | null
  Calification?: number | null
  /** Nombre de la persona que recomienda */
  Title?: string | null
  Description?: string | null
  TimeLapse?: string | null
  Tag?: StrapiCalificationTagItemDto[] | null
}

export type StrapiCalificationBlockDto = {
  __component: 'components.calification'
  id: number
  Tag?: string | null
  Title?: string | null
  Coment?: StrapiCalificationCommentDto[] | null
}

export type StrapiDynamicZoneBlock =
  | StrapiHeroMinimalBlockDto
  | StrapiProfileHighlightBlockDto
  | StrapiStackGridBlockDto
  | StrapiSelectedWorksBlockDto
  | StrapiCalificationBlockDto
  | StrapiUnknownBlockDto
