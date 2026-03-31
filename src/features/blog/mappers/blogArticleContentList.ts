import type { StrapiBlogContentListBlockDto } from '../types/strapi-blog-article.dto'
import type {
  BlogArticleContentListItem,
  BlogArticleContentListProps,
} from '../types/blog-article-content-list.model'

export function mapBlogArticleContentListFromStrapi(
  block: StrapiBlogContentListBlockDto,
): BlogArticleContentListProps {
  const sectionTitle = block.Title?.trim() || undefined

  const items: BlogArticleContentListItem[] = []
  if (block.List?.length) {
    for (const row of block.List) {
      const title = row.TitleList?.trim() || undefined
      const description = row.DescriptionList?.trim() || undefined
      if (!title && !description) continue
      items.push({
        ...(title && { title }),
        ...(description && { description }),
      })
    }
  }

  return { sectionTitle, items }
}
