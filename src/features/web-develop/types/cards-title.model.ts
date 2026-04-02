/** Una tarjeta de testimonio (origen: `cards[]` en Strapi). */
export type CardsTitleTestimonial = {
  id: string
  quote: string
  author: string
  role: string
}

/** Props del bloque `components.cards-title`. */
export type CardsTitleProps = {
  tag: string
  title: string
  items: CardsTitleTestimonial[]
}
