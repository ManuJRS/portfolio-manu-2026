export type StackGridItem = {
  id: number
  label: string
}

export type StackGridProps = {
  sectionLabel?: string
  title?: string
  items?: StackGridItem[]
}
