import type { StrapiWebDevelopResponse } from '@/features/web-develop/types/strapi-web-develop.dto'
import { buildWebDevelopQuery } from '@/lib/strapi/webDevelopQuery'
import { httpClient } from '@/services/http'

function resolveWebDevelopEndpointCandidates(): string[] {
  const fromEnv = import.meta.env.VITE_STRAPI_WEB_DEVELOP_ENDPOINT?.trim()
  if (fromEnv) {
    return [fromEnv]
  }
  return ['/api/web-develop', '/api/web-develops']
}

export async function fetchWebDevelopRaw(): Promise<StrapiWebDevelopResponse> {
  const query = buildWebDevelopQuery()
  const candidates = resolveWebDevelopEndpointCandidates()

  let lastError: unknown = null
  for (const endpoint of candidates) {
    try {
      return await httpClient.get<StrapiWebDevelopResponse>(`${endpoint}?${query}`)
    } catch (error) {
      lastError = error
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error('No se pudo obtener /api/web-develop desde Strapi')
}
