import type { MediaContentSplitPosition } from './media-content-split.model'
import type { ProjectMediaKind } from '../utils/resolveProjectMedia'

export type ProjectTextMediaProps = {
  mediaPosition?: MediaContentSplitPosition
  eyebrow?: string
  title?: string
  descriptionParagraphs?: string[]
  mediaUrl?: string
  mediaKind?: ProjectMediaKind
  mediaAlt?: string
}
