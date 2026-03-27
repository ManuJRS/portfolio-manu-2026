import type { WebDevelopPage } from '../types/web-develop-page.model'
import { mapWebDevelopPageFromStrapi } from '../mappers/webDevelopPage'
import { fetchWebDevelopRaw } from '@/services/strapi/webDevelop'

export async function getWebDevelopPage(): Promise<WebDevelopPage | null> {
  const raw = await fetchWebDevelopRaw()
  return mapWebDevelopPageFromStrapi(raw)
}
