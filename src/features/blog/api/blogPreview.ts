import { mapBlogPreviewPageFromStrapi } from '../mappers/blogPreviewPage'
import type { BlogPreviewPage } from '../types/blog-preview-page.model'
import { fetchBlogPreviewPageRaw } from '@/services/strapi/blogPreview'

export async function getBlogPreviewPage(): Promise<BlogPreviewPage | null> {
  const raw = await fetchBlogPreviewPageRaw()
  return mapBlogPreviewPageFromStrapi(raw)
}
