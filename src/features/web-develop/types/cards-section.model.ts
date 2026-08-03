/** Tarjeta “pilar técnico” normalizada (origen: `Cards[]` en Strapi). */
export type CardsSectionPillar = {
  id: string
  icon: string
  title: string
  description: string
  /** Textos de viñetas (`iconOne` / `iconTwo` / `iconThree` en API). */
  bullets: string[]
}

/** Props del bloque `components.cards-section`. */
export type CardsSectionProps = {
  tag: string
  title: string
  pillars: CardsSectionPillar[]
}
