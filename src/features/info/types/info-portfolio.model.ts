import type { IntroDescriptionProps } from './intro-description.model'
import type { ExpComponentProps } from './exp-component.model'

export type InfoPortfolioSection =
  | {
      component: 'components.intro-description'
      id: string
      props: IntroDescriptionProps
    }
  | {
      component: 'components.exp-component'
      id: string
      props: ExpComponentProps
    }

export type InfoPortfolioPage = {
  sections: InfoPortfolioSection[]
}
