export type WebDevelopHeroMedia = {
  src: string
  kind: 'video' | 'image'
}

export type WebDevelopHeroProps = {
  title: string
  tag: string
  buttonText: string
  buttonUrl: string
  heroMedia?: WebDevelopHeroMedia
  rotatingPhrases?: string[]
  description?: string
  videoAriaLabel?: string
  text?: string
}
