import type { SeoMeta } from '@/features/home/types/home-portfolio.model'
import type { WebDevelopHeroProps } from './web-develop-hero.model'
import type { WebDevelopVideoProps } from './web-develop-video.model'
import type { WebDevelopTimelineProps } from './web-develop-timeline.model'
import type { WebDevelopResourcesProps } from './web-develop-resources.model'
import type { PortfolioPreviewProps } from './portfolio-preview.model'
import type { CardSolutionProps } from './card-solution.model'
import type { CardsSectionProps } from './cards-section.model'
import type { HowIDoProps } from './how-i-do.model'
import type { CommentSecctionProps } from './comment-secction.model'
import type { CardsTitleProps } from './cards-title.model'
import type { LogosProps } from './logos.model'
import type { FormWebProps } from './form-web.model'

export type WebDevelopSection =
  | {
      component: 'components.web-develop-hero'
      id: string
      props: WebDevelopHeroProps
    }
  | {
      component: 'components.web-develop-video'
      id: string
      props: WebDevelopVideoProps
    }
  | {
      component: 'components.web-develop-timeline'
      id: string
      props: WebDevelopTimelineProps
    }
  | {
      component: 'components.web-develop-resources'
      id: string
      props: WebDevelopResourcesProps
    }
  | {
      component: 'components.portfolio-preview'
      id: string
      props: PortfolioPreviewProps
    }
  | {
      component: 'components.card-solution'
      id: string
      props: CardSolutionProps
    }
  | {
      component: 'components.cards-section'
      id: string
      props: CardsSectionProps
    }
  | {
      component: 'components.how-i-do'
      id: string
      props: HowIDoProps
    }
  | {
      component: 'components.comment-secction'
      id: string
      props: CommentSecctionProps
    }
  | {
      component: 'components.cards-title'
      id: string
      props: CardsTitleProps
    }
  | {
      component: 'components.logos'
      id: string
      props: LogosProps
    }
  | {
      component: 'components.form-web'
      id: string
      props: FormWebProps
    }

export type WebDevelopPage = {
  id: number
  slug?: string
  title?: string
  sections: WebDevelopSection[]
  seo?: SeoMeta
}
