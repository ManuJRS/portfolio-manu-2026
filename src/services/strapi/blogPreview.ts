import type { StrapiBlogPreviewResponse } from '@/features/blog/types/strapi-blog-preview.dto'
import { httpClient } from '@/services/http'
import qs from 'qs'

function resolveBlogPreviewBaseUrl(): string {
  const fromEnv = import.meta.env.VITE_STRAPI_WEB_DEVELOP_ENDPOINT_BLOG_PREVIEW?.trim()
  if (fromEnv) {
    return fromEnv.replace(/\/$/, '')
  }
  return '/api/blog'
}

/**
 * Página de listado de artículos (single type o entrada única en Strapi).
 */
export async function fetchBlogPreviewPageRaw(): Promise<StrapiBlogPreviewResponse> {
  const base = resolveBlogPreviewBaseUrl()
  const query = qs.stringify(
    {
      populate: {
        blogs_articles: {
          populate: ['ImgPreview'],
        },
      },
    },
    { encodeValuesOnly: true },
  )
  const path = query ? `${base}?${query}` : base
  return httpClient.get<StrapiBlogPreviewResponse>(path)
}
