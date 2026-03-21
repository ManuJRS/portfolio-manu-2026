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
  socialLinks?: ProfileHighlightSocialLink[]
}
