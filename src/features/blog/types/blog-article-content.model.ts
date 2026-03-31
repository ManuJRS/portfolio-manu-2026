export type BlogSemanticHeadingTag = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'

export type BlogArticleContentMediaItem = {
  kind: 'image' | 'video'
  src: string
  alt: string
  caption?: string
}

export type BlogArticleContentProps = {
  title?: string
  /** Solo aplica si hay `title`; por defecto en mapper `h2` */
  headingTag: BlogSemanticHeadingTag
  descriptionParagraphs: string[]
  mediaItems: BlogArticleContentMediaItem[]
}
