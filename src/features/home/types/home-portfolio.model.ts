import type { CalificationProps } from './calification.model'
import type { HeroMinimalProps } from './hero-minimal.model'
import type { ProfileHighlightProps } from './profile-highlight.model'
import type { SelectedWorksProps } from './selected-works.model'
import type { StackGridProps } from './stack-grid.model'

export type SeoMeta = {
  metaTitle?: string
  metaDescription?: string
  metaRobots?: string
  canonicalURL?: string
  ogTitle?: string
  ogDescription?: string
  ogType?: string
  twitterCard?: string
  twitterTitle?: string
  twitterDescription?: string
  structuredData?: Record<string, unknown>
  hideFromSearchEngines?: boolean
}

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
  | {
      component: 'components.selected-works'
      id: string
      props: SelectedWorksProps
    }
  | {
      component: 'components.calification'
      id: string
      props: CalificationProps
    }

export type HomePortfolioPage = {
  sections: HomePortfolioSection[]
  seo?: SeoMeta
}
