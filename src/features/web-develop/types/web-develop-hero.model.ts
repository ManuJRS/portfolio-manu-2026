export type WebDevelopHeroMedia = {
  src: string
  kind: 'video' | 'image'
}

export type WebDevelopHeroProps = {
  title: string
  tag: string
  buttonText: string
  buttonUrl: string
  /** `MediaHero` en Strapi (vídeo o imagen) */
  heroMedia?: WebDevelopHeroMedia
}
