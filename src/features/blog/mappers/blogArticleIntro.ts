import type { StrapiBlogArticleDocument, StrapiBlogHeroBlockDto } from '../types/strapi-blog-article.dto'
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

function mapTagsFromStrapiTags(
  rows: { id: number; Tags?: string | null }[] | null | undefined,
): BlogArticleIntroProps['tags'] {
  if (!rows?.length) return []
  const out: BlogArticleIntroProps['tags'] = []
  for (const row of rows) {
    const label = row.Tags?.trim()
    if (label) out.push({ id: row.id, label })
  }
  return out
}

/**
 * Intro desde el documento (título, bajada, tags, fecha).
 * `hero` opcional: el autor sigue viniendo del bloque `components.blog-hero` en la zona dinámica.
 */
export function mapBlogArticleIntroFromDocument(
  doc: StrapiBlogArticleDocument,
  hero?: StrapiBlogHeroBlockDto | null,
): BlogArticleIntroProps {
  const desc = doc.DescriptionProyect?.trim()
  const authorFromHero = hero?.Author?.trim()
  return {
    title: doc.Title?.trim() || 'Artículo',
    ...(desc && { description: desc }),
    dateLabel: formatBlogDate(doc.publishedAt ?? doc.updatedAt ?? doc.createdAt),
    author: authorFromHero || doc.Author?.trim() || '',
    tags: mapTagsFromStrapiTags(doc.Tags),
  }
}
