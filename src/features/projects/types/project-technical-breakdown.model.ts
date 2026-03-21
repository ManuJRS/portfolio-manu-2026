export type ProjectTechnicalBreakdownFeaturedItem = {
  id?: number
  title: string
  descriptionParagraphs?: string[]
}

export type ProjectTechnicalBreakdownImage = {
  url: string
  alt: string
}

export type ProjectTechnicalBreakdownProps = {
  sectionLabel?: string
  sectionIndex?: string
  highlightTitle?: string
  highlightDescriptionParagraphs?: string[]
  featuredItems?: ProjectTechnicalBreakdownFeaturedItem[]
  images?: ProjectTechnicalBreakdownImage[]
}
