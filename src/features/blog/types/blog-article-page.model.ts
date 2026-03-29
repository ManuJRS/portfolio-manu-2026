import type { BlogArticleCodeBlockProps } from './blog-article-code-block.model'
import type { BlogArticleContentListProps } from './blog-article-content-list.model'
import type { BlogArticleContentProps } from './blog-article-content.model'
import type { BlogArticleIntroProps } from './blog-article-intro.model'

export type BlogArticleSection =
  | {
      component: 'components.blog-hero'
      id: string
      props: BlogArticleIntroProps
    }
  | {
      component: 'components.blog-content'
      id: string
      props: BlogArticleContentProps
    }
  | {
      component: 'components.content-list'
      id: string
      props: BlogArticleContentListProps
    }
  | {
      component: 'shared.code-block'
      id: string
      props: BlogArticleCodeBlockProps
    }

export type BlogArticlePage = {
  id: number
  slug?: string
  title?: string
  sections: BlogArticleSection[]
}
