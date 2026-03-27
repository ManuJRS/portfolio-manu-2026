import type { StrapiWebDevelopResponse } from '@/features/web-develop/types/strapi-web-develop.dto'
import { httpClient } from '@/services/http'

function resolveWebDevelopEndpointCandidates(): string[] {
  const fromEnv = import.meta.env.VITE_STRAPI_WEB_DEVELOP_ENDPOINT?.trim()
  if (fromEnv) {
    return [fromEnv]
  }
  return ['/api/web-develop', '/api/web-develops']
}

export async function fetchWebDevelopRaw(): Promise<StrapiWebDevelopResponse> {
  const params = new URLSearchParams()
  // Strapi localization: mantenemos `locale=` (vacío) como en tu URL de prueba
  // y solo poblamos secciones por ahora (SEO se puede añadir luego si hace falta).
  params.set('locale', '')
  params.set('populate[sections][populate]', '*')

  const query = params.toString()
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
