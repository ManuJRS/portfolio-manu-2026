import type {
  StrapiBlogArticleDocument,
  StrapiBlogArticleDynamicZoneBlock,
  StrapiBlogArticleResponse,
  StrapiBlogContentBlockDto,
  StrapiBlogContentListBlockDto,
  StrapiBlogHeroBlockDto,
  StrapiSharedCodeBlockDto,
} from '../types/strapi-blog-article.dto'
import type { BlogArticlePage, BlogArticleSection } from '../types/blog-article-page.model'
import { mapBlogArticleCodeBlockFromStrapi } from './blogArticleCodeBlock'
import { mapBlogArticleContentFromStrapi } from './blogArticleContent'
import { mapBlogArticleContentListFromStrapi } from './blogArticleContentList'
import { mapBlogArticleIntroFromStrapi } from './blogArticleIntro'

function isBlogHeroBlock(block: StrapiBlogArticleDynamicZoneBlock): block is StrapiBlogHeroBlockDto {
  return block.__component === 'components.blog-hero'
}

function isBlogContentBlock(block: StrapiBlogArticleDynamicZoneBlock): block is StrapiBlogContentBlockDto {
  return block.__component === 'components.blog-content'
}

function isContentListBlock(block: StrapiBlogArticleDynamicZoneBlock): block is StrapiBlogContentListBlockDto {
  return block.__component === 'components.content-list'
}

function isSharedCodeBlock(block: StrapiBlogArticleDynamicZoneBlock): block is StrapiSharedCodeBlockDto {
  return block.__component === 'shared.code-block'
}

function mapSection(block: StrapiBlogArticleDynamicZoneBlock): BlogArticleSection | null {
  if (isBlogHeroBlock(block)) {
    return {
      component: 'components.blog-hero',
      id: `components.blog-hero-${block.id}`,
      props: mapBlogArticleIntroFromStrapi(block),
    }
  }
  if (isBlogContentBlock(block)) {
    const props = mapBlogArticleContentFromStrapi(block)
    const hasBody =
      Boolean(props.title) || props.descriptionParagraphs.length > 0 || props.mediaItems.length > 0
    if (!hasBody) return null
    return {
      component: 'components.blog-content',
      id: `components.blog-content-${block.id}`,
      props,
    }
  }
  if (isContentListBlock(block)) {
    const props = mapBlogArticleContentListFromStrapi(block)
    if (!props.sectionTitle && !props.items.length) return null
    return {
      component: 'components.content-list',
      id: `components.content-list-${block.id}`,
      props,
    }
  }
  if (isSharedCodeBlock(block)) {
    const props = mapBlogArticleCodeBlockFromStrapi(block)
    if (!props) return null
    return {
      component: 'shared.code-block',
      id: `shared.code-block-${block.id}`,
      props,
    }
  }
  return null
}

function mapDocument(doc: StrapiBlogArticleDocument): BlogArticlePage {
  const sections: BlogArticleSection[] = []
  if (doc.BlogSections?.length) {
    for (const block of doc.BlogSections) {
      const mapped = mapSection(block)
      if (mapped) sections.push(mapped)
    }
  }

  return {
    id: doc.id,
    slug: doc.slug ?? undefined,
    title: doc.Title ?? undefined,
    sections,
  }
}

export function mapBlogArticlePageFromStrapi(response: StrapiBlogArticleResponse): BlogArticlePage | null {
  if (!response.data) return null
  return mapDocument(response.data)
}
