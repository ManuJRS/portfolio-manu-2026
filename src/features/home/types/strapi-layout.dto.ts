/** Respuesta típica GET /api/layout (single type Strapi) */
export type StrapiLayoutDto = {
  id: number
  documentId: string
  fotterTitleLeft?: string | null
  fotterMessageRigth?: string | null
  fotterCopyrightTYear?: string | null
  locale?: string
  createdAt?: string
  updatedAt?: string
  publishedAt?: string | null
}

export type StrapiLayoutResponse = {
  data: StrapiLayoutDto | null
  meta?: Record<string, unknown>
}
