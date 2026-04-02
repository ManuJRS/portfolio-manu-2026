/** Tarjeta de servicio normalizada para UI (origen: `Cards[]` en Strapi). */
export type CardSolutionItem = {
  id: string
  icon: string
  title: string
  description: string
  tags: string[]
  imageSrc: string
  imageAlt: string
  /** Primera tarjeta: bento ancho + imagen cover; resto compact + contain. */
  layout: 'featured' | 'compact'
}

/** Props del bloque `components.card-solution`. */
export type CardSolutionProps = {
  tag: string
  title: string
  ctaText: string
  ctaTitle: string
  ctaLink: string
  cards: CardSolutionItem[]
}
