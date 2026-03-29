import type { StrapiSharedCodeBlockDto } from '../types/strapi-blog-article.dto'
import type { BlogArticleCodeBlockProps, BlogCodeLanguage } from '../types/blog-article-code-block.model'
import { BLOG_CODE_LANGUAGES } from '../types/blog-article-code-block.model'

function mapLanguage(raw: string | null | undefined): BlogCodeLanguage {
  const u = raw?.trim().toUpperCase()
  if (u && (BLOG_CODE_LANGUAGES as readonly string[]).includes(u)) {
    return u as BlogCodeLanguage
  }
  return 'TS'
}

export function mapBlogArticleCodeBlockFromStrapi(block: StrapiSharedCodeBlockDto): BlogArticleCodeBlockProps | null {
  const rawCode = block.Code ?? ''
  if (!rawCode.trim()) return null

  const title = block.Title?.trim() || undefined
  const filename = block.filename?.trim() || block.Filename?.trim() || undefined

  return {
    ...(title && { title }),
    language: mapLanguage(block.Language),
    code: rawCode,
    ...(filename && { filename }),
  }
}
