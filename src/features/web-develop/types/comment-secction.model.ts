/** Fragmento del párrafo consultivo (texto normal vs resaltado). */
export type CommentSecctionParagraphPart = {
  text: string
  bold?: boolean
}

/**
 * Props del bloque Strapi `components.comment-secction`.
 * Etiquetas inferiores: `itemOne` … `itemFour` en API.
 */
export type CommentSecctionProps = {
  title: string
  paragraphParts: CommentSecctionParagraphPart[]
  techLabels: string[]
}
