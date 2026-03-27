import type { StrapiWebDevelopTimelineBlockDto } from '../types/strapi-web-develop.dto'
import type { WebDevelopTimelineProps } from '../types/web-develop-timeline.model'

export function mapWebDevelopTimelineFromStrapi(
  block: StrapiWebDevelopTimelineBlockDto,
): WebDevelopTimelineProps {
  const items =
    block.items?.map((item) => ({
      title: item.Title?.trim() || '',
      description: item.description?.trim() || '',
    })) ?? []

  return {
    title: block.Title?.trim() || '',
    description: block.description?.trim() || '',
    items,
  }
}
