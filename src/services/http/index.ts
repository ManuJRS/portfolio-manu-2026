import { createHttpClient } from './client'

const baseUrl = import.meta.env.VITE_STRAPI_URL ?? 'http://localhost:1337'

export const httpClient = createHttpClient(baseUrl)
