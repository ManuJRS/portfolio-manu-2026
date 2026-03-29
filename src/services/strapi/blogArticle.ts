import type {
  StrapiBlogArticleListResponse,
  StrapiBlogArticleResponse,
} from '@/features/blog/types/strapi-blog-article.dto'
import { httpClient } from '@/services/http'

function resolveBlogArticleBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_STRAPI_WEB_DEVELOP_ENDPOINT_BLOG?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }
  return '/api/blogs-articles'
}

/**
 * Obtiene un artículo por slug (colección Strapi: find + filters).
 */
export async function fetchBlogArticleBySlugRaw(slug: string): Promise<StrapiBlogArticleResponse> {
  const base = resolveBlogArticleBaseUrl()
  const params = new URLSearchParams()
  params.set('locale', '')
  params.set('filters[slug][$eq]', slug)
  params.set('pagination[pageSize]', '1')
  params.set('populate[BlogSections][populate]', '*')
  params.set('populate[Tags]', '*')

  const path = `${base}?${params.toString()}`
  const list = await httpClient.get<StrapiBlogArticleListResponse>(path)
  const first = list.data?.[0] ?? null
  return { data: first }
}
