import type { StrapiBlogHeroBlockDto } from '../types/strapi-blog-article.dto'
import type { BlogArticleIntroProps } from '../types/blog-article-intro.model'

function formatBlogDate(isoOrDate: string | null | undefined): string {
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

export function mapBlogArticleIntroFromStrapi(block: StrapiBlogHeroBlockDto): BlogArticleIntroProps {
  const tags =
    block.Tags?.map((t) => t.Tags?.trim()).filter((t): t is string => Boolean(t && t.length)) ?? []

  const desc = block.Description?.trim()

  return {
    title: block.Title?.trim() || 'Artículo',
    ...(desc && { description: desc }),
    dateLabel: formatBlogDate(block.Date),
    author: block.Author?.trim() || '',
    tags,
  }
}
