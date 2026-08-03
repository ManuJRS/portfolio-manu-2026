export type HowIDoStep = {
  id: string
  number: string
  title: string
  description: string
}

export type HowIDoImage = {
  src: string
  alt: string
  stagger: boolean
}

export type HowIDoProps = {
  tag: string
  title: string
  steps: HowIDoStep[]
  images: HowIDoImage[]
}
