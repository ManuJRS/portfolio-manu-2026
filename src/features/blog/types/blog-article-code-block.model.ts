export const BLOG_CODE_LANGUAGES = ['CSS', 'HTML', 'TS', 'JS', 'VUE'] as const

export type BlogCodeLanguage = (typeof BLOG_CODE_LANGUAGES)[number]

export type BlogArticleCodeBlockProps = {
  /** Título del bloque en Strapi (opcional en UI si hay filename) */
  title?: string
  language: BlogCodeLanguage
  code: string
  filename?: string
}
