import type { MediaContentSplitProps } from './media-content-split.model'
import type { ProjectHeroDarkProps } from './project-hero-dark.model'
import type { ProjectTechnicalBreakdownProps } from './project-technical-breakdown.model'
import type { ProjectTextMediaProps } from './project-text-media.model'

export type ProjectPortfolioSection =
  | {
      component: 'components.project-hero-dark'
      id: string
      props: ProjectHeroDarkProps
    }
  | {
      component: 'components.media-content-split'
      id: string
      props: MediaContentSplitProps
    }
  | {
      component: 'components.project-text-media'
      id: string
      props: ProjectTextMediaProps
    }
  | {
      component: 'components.project-technical-breakdown'
      id: string
      props: ProjectTechnicalBreakdownProps
    }

export type ProjectPortfolioPage = {
  id: number
  slug?: string
  title?: string
  sections: ProjectPortfolioSection[]
}
