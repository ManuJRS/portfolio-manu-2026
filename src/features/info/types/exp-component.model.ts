export type ExpItem = {
  id: number
  duration?: string
  position?: string
  company?: string
  description?: string
  /** Etiquetas tech (opcional, si Strapi las expone) */
  tags?: string[]
}

export type ExpComponentProps = {
  items?: ExpItem[]
}
