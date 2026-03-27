import type { StrapiSeoDto } from '@/features/home/types/strapi-home-portfolio.dto'
import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'

export type StrapiWebDevelopResponse = {
  data: StrapiWebDevelopDocument | null
}

export type StrapiWebDevelopDocument = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  title?: string
  slug?: string
  sections?: StrapiWebDevelopDynamicZoneBlock[]
  Seo?: StrapiSeoDto | null
  seo?: StrapiSeoDto | null
}

export type StrapiWebDevelopHeroBlockDto = {
  __component: 'components.web-develop-hero'
  id: number
  Title?: string | null
  Tag?: string | null
  TextBtn?: string | null
  UrlBtn?: string | null
}

export type StrapiWebDevelopVideoFeatureItemDto = {
  id: number
  Title?: string | null
  icons?: string | null
  description?: string | null
}

export type StrapiWebDevelopVideoBlockDto = {
  __component: 'components.web-develop-video'
  id: number
  Title?: string | null
  description?: string | null
  media?: StrapiMediaDto | null
  features?: StrapiWebDevelopVideoFeatureItemDto[] | null
}

export type StrapiWebDevelopTimelineItemDto = {
  id: number
  icons?: string | null
  Title?: string | null
  description?: string | null
}

export type StrapiWebDevelopTimelineBlockDto = {
  __component: 'components.web-develop-timeline'
  id: number
  Title?: string | null
  description?: string | null
  items?: StrapiWebDevelopTimelineItemDto[] | null
}

export type StrapiWebDevelopBlogEntryDto = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  title?: string | null
  slug?: string | null
  descriptionProyect?: string | null
}

export type StrapiWebDevelopResourcesBlockDto = {
  __component: 'components.web-develop-resources'
  id: number
  Title?: string | null
  description?: string | null
  /** URL del CTA principal (cabecera) */
  btnUrl?: string | null
  /** Texto del CTA principal */
  btnText?: string | null
  blogs?: StrapiWebDevelopBlogEntryDto[] | null
}

export type StrapiPortfolioPreviewBlockDto = {
  __component: 'components.portfolio-preview'
  id: number
  Title?: string | null
  Description?: string | null
  FirstTag?: string | null
  FirstTitle?: string | null
  FirstDescription?: string | null
  FirstTextUrl?: string | null
  FirstTextBtn?: string | null
  FirstImg?: StrapiMediaDto | null
  SecondTitle?: string | null
  SecondTag?: string | null
  SecondDescription?: string | null
  SecondTextUrl?: string | null
  SecondTextBtn?: string | null
  SecondImg?: StrapiMediaDto | null
}

export type StrapiWebDevelopUnknownBlockDto = {
  __component: string
  id: number
}

export type StrapiWebDevelopDynamicZoneBlock =
  | StrapiWebDevelopHeroBlockDto
  | StrapiWebDevelopVideoBlockDto
  | StrapiWebDevelopTimelineBlockDto
  | StrapiWebDevelopResourcesBlockDto
  | StrapiPortfolioPreviewBlockDto
  | StrapiWebDevelopUnknownBlockDto
