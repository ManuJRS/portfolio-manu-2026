import type { StrapiSeoDto } from '@/features/home/types/strapi-home-portfolio.dto'

/** Respuesta REST Strapi v5 (single type info-portfolio). */
export type StrapiInfoPortfolioResponse = {
  data: StrapiInfoPortfolioData | null
  meta?: Record<string, unknown>
}

export type StrapiInfoPortfolioData = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  locale?: string
  title?: string
  slug?: string
  sections?: StrapiInfoDynamicZoneBlock[]
  Seo?: StrapiSeoDto | null
}

export type StrapiIntroDescriptionBlockDto = {
  __component: 'components.intro-description'
  id: number
  InfoTag?: string | null
  Title?: string | null
  Description?: string | null
}

export type StrapiExpItemDto = {
  id: number
  Duration?: string | null
  Position?: string | null
  Company?: string | null
  Description?: string | null
}

export type StrapiExpComponentBlockDto = {
  __component: 'components.exp-component'
  id: number
  Exp?: StrapiExpItemDto[] | null
}

export type StrapiInfoUnknownBlockDto = {
  __component: string
  id: number
}

export type StrapiInfoDynamicZoneBlock =
  | StrapiIntroDescriptionBlockDto
  | StrapiExpComponentBlockDto
  | StrapiInfoUnknownBlockDto
