export type BlogArticleContentListItem = {
  title?: string
  description?: string
}

export type BlogArticleContentListProps = {
  sectionTitle?: string
  items: BlogArticleContentListItem[]
}
