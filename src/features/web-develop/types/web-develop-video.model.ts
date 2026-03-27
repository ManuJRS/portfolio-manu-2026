export type WebDevelopVideoFeatureItem = {
  title: string
  description: string
}

export type WebDevelopVideoProps = {
  title: string
  description: string
  mediaUrl: string
  mediaAlt: string
  mediaKind: 'image' | 'video'
  features: WebDevelopVideoFeatureItem[]
}
