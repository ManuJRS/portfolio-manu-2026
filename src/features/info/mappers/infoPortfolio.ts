import type { StrapiSeoDto } from '@/features/home/types/strapi-home-portfolio.dto'
import type { SeoMeta } from '@/features/home/types/home-portfolio.model'
import type {
  StrapiExpComponentBlockDto,
  StrapiInfoDynamicZoneBlock,
  StrapiInfoPortfolioResponse,
  StrapiIntroDescriptionBlockDto,
} from '../types/strapi-info-portfolio.dto'
import type { InfoPortfolioPage, InfoPortfolioSection } from '../types/info-portfolio.model'
import { mapExpComponentFromStrapi } from './expComponent'
import { mapIntroDescriptionFromStrapi } from './introDescription'

function isIntroDescription(
  block: StrapiInfoDynamicZoneBlock,
): block is StrapiIntroDescriptionBlockDto {
  return block.__component === 'components.intro-description'
}

function isExpComponent(block: StrapiInfoDynamicZoneBlock): block is StrapiExpComponentBlockDto {
  return block.__component === 'components.exp-component'
}

function mapBlock(block: StrapiInfoDynamicZoneBlock): InfoPortfolioSection | null {
  if (isIntroDescription(block)) {
    return {
      component: 'components.intro-description',
      id: `components.intro-description-${block.id}`,
      props: mapIntroDescriptionFromStrapi(block),
    }
  }
  if (isExpComponent(block)) {
    return {
      component: 'components.exp-component',
      id: `components.exp-component-${block.id}`,
      props: mapExpComponentFromStrapi(block),
    }
  }
  return null
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

export function mapInfoPortfolioFromStrapi(response: StrapiInfoPortfolioResponse): InfoPortfolioPage {
  const raw = response.data
  const sectionsRaw = raw?.sections
  const seo = mapSeoFromStrapi(raw?.Seo)

  const sections: InfoPortfolioSection[] = []
  if (sectionsRaw?.length) {
    for (const block of sectionsRaw) {
      const mapped = mapBlock(block)
      if (mapped) sections.push(mapped)
    }
  }

  return { sections, ...(seo && { seo }) }
}
