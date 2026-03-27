import type { SeoMeta } from '@/features/home/types/home-portfolio.model'
import type { WebDevelopHeroProps } from './web-develop-hero.model'
import type { WebDevelopVideoProps } from './web-develop-video.model'
import type { WebDevelopTimelineProps } from './web-develop-timeline.model'
import type { WebDevelopResourcesProps } from './web-develop-resources.model'
import type { PortfolioPreviewProps } from './portfolio-preview.model'

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

export type WebDevelopPage = {
  id: number
  slug?: string
  title?: string
  sections: WebDevelopSection[]
  seo?: SeoMeta
}
