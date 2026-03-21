export type HeroMinimalSocialLink = {
  label: string
  url: string
  icon: string
}

export type HeroMinimalProps = {
  eyebrowLeft?: string
  eyebrowRight?: string
  description?: string
  scrollText?: string
  socialLinks?: HeroMinimalSocialLink[]
}
