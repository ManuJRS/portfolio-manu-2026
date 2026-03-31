import type { StrapiMediaDto } from '@/features/projects/types/strapi-project-portfolio.dto'
import type { BlogPreviewPage, BlogPreviewPostCard } from '../types/blog-preview-page.model'
import type { StrapiBlogPreviewArticleDto, StrapiBlogPreviewResponse } from '../types/strapi-blog-preview.dto'

function resolveStrapiMediaUrl(url: string): string {
  const u = url.trim()
  if (!u || u.startsWith('http')) return u
  const base = (import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337').replace(/\/$/, '')
  return `${base}${u.startsWith('/') ? '' : '/'}${u}`
}

function imageSrcFromMedia(media: StrapiMediaDto | null | undefined): string {
  if (!media) return ''
  const raw =
    media.formats?.large?.url ??
    media.formats?.medium?.url ??
    media.formats?.small?.url ??
    media.url ??
    ''
  return resolveStrapiMediaUrl(raw)
}

function unwrapMedia(
  raw: StrapiMediaDto | { data: StrapiMediaDto | null } | null | undefined,
): StrapiMediaDto | null {
  if (raw == null) return null
  if (typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: StrapiMediaDto | null }).data ?? null
  }
  return raw as StrapiMediaDto
}

function previewImageFromArticle(row: StrapiBlogPreviewArticleDto): {
  src?: string
  alt?: string
} {
  const media = unwrapMedia(row.ImgPreview ?? null)
  if (!media) return {}
  const src = imageSrcFromMedia(media)
  if (!src) return {}
  const alt =
    media.alternativeText?.trim() || media.name?.trim() || row.Title?.trim() || ''
  return { src, alt }
}

function unwrapBlogArticles(
  raw:
    | StrapiBlogPreviewArticleDto[]
    | { data: StrapiBlogPreviewArticleDto[] | null }
    | null
    | undefined,
): StrapiBlogPreviewArticleDto[] {
  if (raw == null) return []
  if (Array.isArray(raw)) return raw
  if (typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: StrapiBlogPreviewArticleDto[] | null }).data ?? []
  }
  return []
}

function formatPreviewDate(isoOrDate: string | null | undefined): string {
  const raw = isoOrDate?.trim()
  if (!raw) return ''
  const d = new Date(raw)
  if (Number.isNaN(d.getTime())) return raw
  return new Intl.DateTimeFormat('es', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(d)
}

function mapArticle(row: StrapiBlogPreviewArticleDto): BlogPreviewPostCard | null {
  const slug = row.slug?.trim()
  if (!slug) return null
  const title = row.Title?.trim() || slug
  const summary = row.DescriptionProyect?.trim() || ''
  const { src, alt } = previewImageFromArticle(row)
  return {
    id: row.id,
    title,
    summary,
    publishedLabel: formatPreviewDate(row.publishedAt ?? row.updatedAt ?? row.createdAt),
    slug,
    ...(src && { previewImageSrc: src, previewImageAlt: alt }),
  }
}

export function mapBlogPreviewPageFromStrapi(response: StrapiBlogPreviewResponse): BlogPreviewPage | null {
  const doc = response.data
  if (!doc) return null

  const articles = unwrapBlogArticles(doc.blogs_articles)
  const posts = articles.map(mapArticle).filter((p): p is BlogPreviewPostCard => p !== null)

  const heading = doc.TitleIntro?.trim() || 'Blog'
  const description = doc.Description?.trim() || ''
  const seoTitle = doc.title?.trim() || heading

  return {
    seoTitle,
    heading,
    description,
    posts,
  }
}
