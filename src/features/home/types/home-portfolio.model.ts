import type { HeroMinimalProps } from './hero-minimal.model'
import type { ProfileHighlightProps } from './profile-highlight.model'
import type { StackGridProps } from './stack-grid.model'

export type HomePortfolioSection =
  | {
      component: 'components.hero-minimalf'
      id: string
      props: HeroMinimalProps
    }
  | {
      component: 'components.profile-highlight'
      id: string
      props: ProfileHighlightProps
    }
  | {
      component: 'components.stack-grid'
      id: string
      props: StackGridProps
    }

export type HomePortfolioPage = {
  sections: HomePortfolioSection[]
}
