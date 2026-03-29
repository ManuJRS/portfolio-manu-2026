import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'

export type StrapiBlogTagDto = {
  id: number
  Tags?: string | null
}

export type StrapiBlogHeroBlockDto = {
  __component: 'components.blog-hero'
  id: number
  Title?: string | null
  Description?: string | null
  Date?: string | null
  Author?: string | null
  Tags?: StrapiBlogTagDto[] | null
}

export type StrapiBlogSemanticHeadingDto = {
  id?: number
  SemanticHeading?: string | null
}

export type StrapiBlogContentBlockDto = {
  __component: 'components.blog-content'
  id: number
  Title?: string | null
  Description?: string | null
  AltMedia?: string | null
  SemanticHeading?: StrapiBlogSemanticHeadingDto | null
  Media?: StrapiMediaDto[] | null
}

export type StrapiBlogContentListRowDto = {
  id: number
  TitleList?: string | null
  DescriptionList?: string | null
}

export type StrapiBlogContentListBlockDto = {
  __component: 'components.content-list'
  id: number
  Title?: string | null
  List?: StrapiBlogContentListRowDto[] | null
}

export type StrapiSharedCodeBlockDto = {
  __component: 'shared.code-block'
  id: number
  Title?: string | null
  Language?: string | null
  Code?: string | null
  filename?: string | null
  Filename?: string | null
}

export type StrapiBlogArticleUnknownBlockDto = {
  __component: string
  id: number
}

export type StrapiBlogArticleDynamicZoneBlock =
  | StrapiBlogHeroBlockDto
  | StrapiBlogContentBlockDto
  | StrapiBlogContentListBlockDto
  | StrapiSharedCodeBlockDto
  | StrapiBlogArticleUnknownBlockDto

export type StrapiBlogArticleDocument = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  Title?: string | null
  slug?: string | null
  BlogSections?: StrapiBlogArticleDynamicZoneBlock[] | null
}

export type StrapiBlogArticleResponse = {
  data: StrapiBlogArticleDocument | null
}

/** Respuesta lista (find con filtro por slug) */
export type StrapiBlogArticleListResponse = {
  data: StrapiBlogArticleDocument[]
}
