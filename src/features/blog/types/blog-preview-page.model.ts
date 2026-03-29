export type BlogPreviewPostCard = {
  id: number
  title: string
  summary: string
  publishedLabel: string
  slug: string
  /** URL absoluta desde `ImgPreview` en Strapi */
  previewImageSrc?: string
  previewImageAlt?: string
}

export type BlogPreviewPage = {
  /** Título para &lt;title&gt; / SEO (campo `title` en Strapi) */
  seoTitle?: string
  heading: string
  description: string
  posts: BlogPreviewPostCard[]
}
