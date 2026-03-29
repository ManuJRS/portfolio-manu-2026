export type BlogArticleIntroTag = {
  id: number
  label: string
}

export type BlogArticleIntroProps = {
  title: string
  /** Lead / bajada (p. ej. DescriptionProyect en Strapi) */
  description?: string
  dateLabel: string
  author: string
  tags: BlogArticleIntroTag[]
  /** Minutos de lectura; opcional si no viene en la API */
  readingMinutes?: number
}
