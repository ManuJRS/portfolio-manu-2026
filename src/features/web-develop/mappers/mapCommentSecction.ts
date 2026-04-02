import type { StrapiCommentSecctionBlockDto } from '../types/strapi-web-develop.dto'
import type {
  CommentSecctionParagraphPart,
  CommentSecctionProps,
} from '../types/comment-secction.model'

/** Frases resaltadas como en `secctioncoment.mdc` / indexAlt (orden de aparición típico). */
const DEFAULT_BOLD_PHRASES = ['Shopify', 'WordPress', 'código 100% propio'] as const

function splitDescriptionIntoParts(
  description: string,
  phrases: readonly string[] = DEFAULT_BOLD_PHRASES,
): CommentSecctionParagraphPart[] {
  const text = description.trim()
  if (!text) return [{ text: '', bold: false }]

  const parts: CommentSecctionParagraphPart[] = []
  let remaining = text

  for (const phrase of phrases) {
    const idx = remaining.indexOf(phrase)
    if (idx === -1) continue
    if (idx > 0) {
      parts.push({ text: remaining.slice(0, idx), bold: false })
    }
    parts.push({ text: phrase, bold: true })
    remaining = remaining.slice(idx + phrase.length)
  }

  if (remaining) {
    parts.push({ text: remaining, bold: false })
  }

  return parts.length > 0 ? parts : [{ text, bold: false }]
}

function mapTechLabels(block: StrapiCommentSecctionBlockDto): string[] {
  return [
    block.itemOne ?? block.ItemOne,
    block.itemTwo ?? block.ItemTwo,
    block.itemThree ?? block.ItemThree,
    block.itemFour ?? block.ItemFour,
  ]
    .map((s) => (typeof s === 'string' ? s.trim() : ''))
    .filter(Boolean)
}

const DEFAULT_TITLE = 'No te vendemos una herramienta, te damos la solución.'
const DEFAULT_DESCRIPTION =
  'Nuestro enfoque de consultoría es agnóstico a la tecnología. Analizamos tu modelo de negocio para determinar si necesitas Shopify, WordPress o código 100% propio.'

const DEFAULT_LABELS = ['React', 'Shopify', 'Next.js', 'WordPress'] as const

export function mapCommentSecctionFromStrapi(
  block: StrapiCommentSecctionBlockDto,
): CommentSecctionProps {
  const title = block.title?.trim() || block.Title?.trim() || DEFAULT_TITLE
  const rawDesc =
    block.description?.trim() || block.Description?.trim() || DEFAULT_DESCRIPTION

  let techLabels = mapTechLabels(block)
  if (techLabels.length === 0) {
    techLabels = [...DEFAULT_LABELS]
  }

  return {
    title,
    paragraphParts: splitDescriptionIntoParts(rawDesc),
    techLabels,
  }
}
