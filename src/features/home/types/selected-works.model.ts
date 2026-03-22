export type SelectedWorkItem = {
  id: number
  title: string
  slug: string
  projectTag?: string
  imageUrl?: string
  imageAlt?: string
  shortDescription?: string
  descriptionProyect?: string
}

export type SelectedWorksProps = {
  title?: string
  description?: string
  showFilters?: boolean
  defaultFilter?: string
  works: SelectedWorkItem[]
  /** Tags únicos para los filtros (ej: ['all', 'code', 'wp']) */
  filterTags?: string[]
}
