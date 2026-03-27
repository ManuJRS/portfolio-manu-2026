export type PortfolioPreviewProject = {
  tag: string
  title: string
  description: string
  buttonText: string
  buttonUrl: string
  imageSrc: string
  imageAlt: string
}

export type PortfolioPreviewProps = {
  headingLine1: string
  headingLine2: string
  description: string
  first: PortfolioPreviewProject
  second: PortfolioPreviewProject
}
