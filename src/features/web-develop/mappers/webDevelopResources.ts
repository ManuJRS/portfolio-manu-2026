import type { StrapiWebDevelopResourcesBlockDto } from '../types/strapi-web-develop.dto'
import type { WebDevelopResourcesProps } from '../types/web-develop-resources.model'

function projectHrefFromSlug(slug: string | null | undefined): string {
  const s = slug?.trim()
  if (!s) return '#'
  return `/es/projects/${encodeURIComponent(s)}`
}

export function mapWebDevelopResourcesFromStrapi(
  block: StrapiWebDevelopResourcesBlockDto,
): WebDevelopResourcesProps {
  const items =
    block.blogs?.map((blog) => ({
      id: String(blog.id),
      title: blog.title?.trim() || '',
      summary: blog.descriptionProyect?.trim() || '',
      href: projectHrefFromSlug(blog.slug),
    })) ?? []

  return {
    title: block.Title?.trim() || '',
    description: block.description?.trim() || '',
    buttonText: block.btnText?.trim() || '',
    buttonUrl: block.btnUrl?.trim() || '#',
    items,
  }
}
