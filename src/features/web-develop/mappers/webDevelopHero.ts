import type { StrapiWebDevelopHeroBlockDto } from '../types/strapi-web-develop.dto'
import type { WebDevelopHeroProps } from '../types/web-develop-hero.model'

export function mapWebDevelopHeroFromStrapi(block: StrapiWebDevelopHeroBlockDto): WebDevelopHeroProps {
  return {
    title: block.Title?.trim() || 'Desarrollo Web Profesional',
    tag: block.Tag?.trim() || '',
    buttonText: block.TextBtn?.trim() || 'Solicitar proyecto',
    buttonUrl: block.UrlBtn?.trim() || '#',
  }
}
