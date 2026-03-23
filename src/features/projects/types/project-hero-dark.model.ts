export type ProjectHeroDarkProps = {
  titleLine1?: string
  titleLine2?: string
  description?: string
  /** URL del medio destacado (imagen o vídeo) */
  mediaUrl?: string
  mediaKind?: 'image' | 'video'
  mediaAlt?: string
  technologies?: string[]
  urlText?: string
  urlProject?: string
}
