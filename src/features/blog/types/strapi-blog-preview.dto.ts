import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'

/** Artículo embebido en la single type / colección `blog` (campo `blogs_articles`) */
export type StrapiBlogPreviewArticleDto = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  Title?: string | null
  slug?: string | null
  DescriptionProyect?: string | null
  ImgPreview?: StrapiMediaDto | { data: StrapiMediaDto | null } | null
}

/** Documento de la página de listado (respuesta típica GET /api/blog) */
export type StrapiBlogPreviewPageDto = {
  id: number
  documentId?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
  title?: string | null
  slug?: string | null
  TitleIntro?: string | null
  Description?: string | null
  blogs_articles?: StrapiBlogPreviewArticleDto[] | { data: StrapiBlogPreviewArticleDto[] | null } | null
}

export type StrapiBlogPreviewResponse = {
  data: StrapiBlogPreviewPageDto | null
}
