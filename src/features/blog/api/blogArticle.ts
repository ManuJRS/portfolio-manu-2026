import type { BlogArticlePage } from '../types/blog-article-page.model'
import { mapBlogArticlePageFromStrapi } from '../mappers/blogArticlePage'
import { fetchBlogArticleBySlugRaw } from '@/services/strapi/blogArticle'

export async function getBlogArticleBySlug(slug: string): Promise<BlogArticlePage | null> {
  const raw = await fetchBlogArticleBySlugRaw(slug)
  return mapBlogArticlePageFromStrapi(raw)
}
