export type ProfileHighlightSocialLink = {
  label: string
  url: string
  icon: string
}

export type ProfileHighlightProps = {
  name?: string
  role?: string
  description?: string
  imageAlt?: string
  imageUrl?: string
  /** Si está definido, se muestra en lugar de la imagen (mismo slot visual). */
  videoUrl?: string
  socialLinks?: ProfileHighlightSocialLink[]
}
