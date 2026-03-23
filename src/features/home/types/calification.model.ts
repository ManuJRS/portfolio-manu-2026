export type CalificationTag = {
  id: number
  label: string
}

export type CalificationComment = {
  id: number
  position?: string
  rating: number
  /** Nombre de la persona (campo Title en Strapi dentro de Coment) */
  name: string
  description: string
  timeLapse?: string
  tags: CalificationTag[]
}

export type CalificationProps = {
  sectionTag?: string
  title?: string
  comments?: CalificationComment[]
}
