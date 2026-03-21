export type MediaContentSplitPosition = 'left' | 'right'

export type MediaContentSplitKind = 'image' | 'video'

/** Ancho máximo del contenedor interior (grid). Por defecto `6xl` (comportamiento anterior). */
export type MediaContentSplitContentWidth = '4xl' | '5xl' | '6xl' | '7xl' | 'full'

export type MediaContentSplitProps = {
  mediaPosition?: MediaContentSplitPosition
  /** Controla `max-w-*` del bloque con `mx-auto` (ej. Strapi: enum o texto). */
  contentMaxWidth?: MediaContentSplitContentWidth
  eyebrow?: string
  title?: string
  description?: string
  items?: string[]
  mediaUrl?: string
  mediaKind?: MediaContentSplitKind
  mediaAlt?: string
  mediaBadge?: string
  showPlayButton?: boolean
}
