export type BlogArticleIntroProps = {
  title: string
  /** Lead / bajada (campo Description en Strapi) */
  description?: string
  dateLabel: string
  author: string
  tags: string[]
  /** Minutos de lectura; opcional si no viene en la API */
  readingMinutes?: number
}
