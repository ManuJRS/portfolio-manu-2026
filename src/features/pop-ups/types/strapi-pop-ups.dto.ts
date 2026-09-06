/** Respuesta GET /api/pop-ups (collection o single type Strapi) */

export type PopUpFrequency = 'once_per_session' | 'once_per_visitor' | 'always'

export type StrapiTargetPageDto = {
  id?: number
  documentId?: string
  slug?: string | null
  attributes?: {
    slug?: string | null
  } | null
}

export type StrapiPopUpsAttributes = {
  title?: string | null
  /** Campo real en Strapi (preferido). */
  message?: string | null
  /** Alias legacy / CMS alternativo. */
  text?: string | null
  buttonText?: string | null
  buttonLink?: string | null
  frequency?: PopUpFrequency | string | null
  /** Segundos de espera antes de mostrar (0–10). `null` → 0. */
  delay?: number | null
  targetHomePage?: boolean | null
  targetInfoPage?: boolean | null
  /** Relación: array plano (Strapi flat) o `{ data: [...] }` (v4). */
  targetPages?:
    | StrapiTargetPageDto[]
    | {
        data?: StrapiTargetPageDto[] | null
      }
    | null
}

export type StrapiPopUpsDto = StrapiPopUpsAttributes & {
  id?: number
  documentId?: string
  attributes?: StrapiPopUpsAttributes | null
  locale?: string
}

export type StrapiPopUpsResponse = {
  data: StrapiPopUpsDto | StrapiPopUpsDto[] | null
  meta?: Record<string, unknown>
}
