import type { SeoMeta } from '@/features/home/types/home-portfolio.model'
import type { StrapiSeoDto } from '@/features/home/types/strapi-home-portfolio.dto'
import type {
  StrapiWebDevelopDocument,
  StrapiWebDevelopDynamicZoneBlock,
  StrapiWebDevelopHeroBlockDto,
  StrapiWebDevelopResponse,
  StrapiWebDevelopVideoBlockDto,
  StrapiWebDevelopTimelineBlockDto,
  StrapiWebDevelopResourcesBlockDto,
  StrapiPortfolioPreviewBlockDto,
} from '../types/strapi-web-develop.dto'
import type { WebDevelopPage, WebDevelopSection } from '../types/web-develop-page.model'
import { mapWebDevelopHeroFromStrapi } from './webDevelopHero'
import { mapWebDevelopVideoFromStrapi } from './webDevelopVideo'
import { mapWebDevelopTimelineFromStrapi } from './webDevelopTimeline'
import { mapWebDevelopResourcesFromStrapi } from './webDevelopResources'
import { mapPortfolioPreviewFromStrapi } from './portfolioPreview'

function isWebDevelopHeroBlock(
  block: StrapiWebDevelopDynamicZoneBlock,
): block is StrapiWebDevelopHeroBlockDto {
  return block.__component === 'components.web-develop-hero'
}

function isWebDevelopVideoBlock(
  block: StrapiWebDevelopDynamicZoneBlock,
): block is StrapiWebDevelopVideoBlockDto {
  return block.__component === 'components.web-develop-video'
}

function isWebDevelopTimelineBlock(
  block: StrapiWebDevelopDynamicZoneBlock,
): block is StrapiWebDevelopTimelineBlockDto {
  return block.__component === 'components.web-develop-timeline'
}

function isWebDevelopResourcesBlock(
  block: StrapiWebDevelopDynamicZoneBlock,
): block is StrapiWebDevelopResourcesBlockDto {
  return block.__component === 'components.web-develop-resources'
}

function isPortfolioPreviewBlock(
  block: StrapiWebDevelopDynamicZoneBlock,
): block is StrapiPortfolioPreviewBlockDto {
  return block.__component === 'components.portfolio-preview'
}

function mapSection(block: StrapiWebDevelopDynamicZoneBlock): WebDevelopSection | null {
  if (isWebDevelopHeroBlock(block)) {
    return {
      component: 'components.web-develop-hero',
      id: `components.web-develop-hero-${block.id}`,
      props: mapWebDevelopHeroFromStrapi(block),
    }
  }
  if (isWebDevelopVideoBlock(block)) {
    return {
      component: 'components.web-develop-video',
      id: `components.web-develop-video-${block.id}`,
      props: mapWebDevelopVideoFromStrapi(block),
    }
  }
  if (isWebDevelopTimelineBlock(block)) {
    return {
      component: 'components.web-develop-timeline',
      id: `components.web-develop-timeline-${block.id}`,
      props: mapWebDevelopTimelineFromStrapi(block),
    }
  }
  if (isWebDevelopResourcesBlock(block)) {
    return {
      component: 'components.web-develop-resources',
      id: `components.web-develop-resources-${block.id}`,
      props: mapWebDevelopResourcesFromStrapi(block),
    }
  }
  if (isPortfolioPreviewBlock(block)) {
    return {
      component: 'components.portfolio-preview',
      id: `components.portfolio-preview-${block.id}`,
      props: mapPortfolioPreviewFromStrapi(block),
    }
  }
  return null
}

function unwrapSeoField(
  raw: StrapiSeoDto | { data: StrapiSeoDto | null } | null | undefined,
): StrapiSeoDto | null {
  if (raw == null) return null
  if (typeof raw === 'object' && 'data' in raw) {
    return (raw as { data: StrapiSeoDto | null }).data ?? null
  }
  return raw as StrapiSeoDto
}

function mapSeoFromStrapi(dto: StrapiSeoDto | null | undefined): SeoMeta | undefined {
  if (!dto) return undefined
  const meta: SeoMeta = {}
  if (dto.metaTitle != null) meta.metaTitle = dto.metaTitle
  if (dto.metaDescription != null) meta.metaDescription = dto.metaDescription
  if (dto.metaRobots != null) meta.metaRobots = dto.metaRobots
  if (dto.canonicalURL != null) meta.canonicalURL = dto.canonicalURL
  if (dto.ogTitle != null) meta.ogTitle = dto.ogTitle
  if (dto.ogDescription != null) meta.ogDescription = dto.ogDescription
  if (dto.ogType != null) meta.ogType = dto.ogType
  if (dto.twitterCard != null) meta.twitterCard = dto.twitterCard
  if (dto.twitterTitle != null) meta.twitterTitle = dto.twitterTitle
  if (dto.twitterDescription != null) meta.twitterDescription = dto.twitterDescription
  if (dto.structuredData != null) meta.structuredData = dto.structuredData
  if (dto.hideFromSearchEngines != null) meta.hideFromSearchEngines = dto.hideFromSearchEngines
  return Object.keys(meta).length ? meta : undefined
}

function mapDocument(doc: StrapiWebDevelopDocument): WebDevelopPage {
  const sections: WebDevelopSection[] = []
  if (doc.sections?.length) {
    for (const block of doc.sections) {
      const mapped = mapSection(block)
      if (mapped) sections.push(mapped)
    }
  }

  const seo = mapSeoFromStrapi(unwrapSeoField(doc.seo ?? doc.Seo))

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    sections,
    ...(seo && { seo }),
  }
}

export function mapWebDevelopPageFromStrapi(response: StrapiWebDevelopResponse): WebDevelopPage | null {
  if (!response.data) return null
  return mapDocument(response.data)
}
