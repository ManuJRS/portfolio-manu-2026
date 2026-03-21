/** Respuesta REST Strapi v5 (single type, estructura plana). */
export type StrapiHomePortfolioResponse = {
  data: StrapiHomePortfolioData | null
  meta?: Record<string, unknown>
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

export type StrapiDynamicZoneBlock =
  | StrapiHeroMinimalBlockDto
  | StrapiProfileHighlightBlockDto
  | StrapiStackGridBlockDto
  | StrapiUnknownBlockDto
