import type {
  StrapiDynamicZoneBlock,
  StrapiHeroMinimalBlockDto,
  StrapiHomePortfolioResponse,
  StrapiProfileHighlightBlockDto,
  StrapiSelectedWorksBlockDto,
  StrapiStackGridBlockDto,
  StrapiSeoDto,
} from '../types/strapi-home-portfolio.dto'
import type { HomePortfolioPage, HomePortfolioSection, SeoMeta } from '../types/home-portfolio.model'
import { mapHeroMinimalFromStrapi } from './heroMinimal'
import { mapProfileHighlightFromStrapi } from './profileHighlight'
import { mapSelectedWorksFromStrapi } from './selectedWorks'
import { mapStackGridFromStrapi } from './stackGrid'

function isHeroMinimalBlock(block: StrapiDynamicZoneBlock): block is StrapiHeroMinimalBlockDto {
  return block.__component === 'components.hero-minimalf'
}

function isProfileHighlightBlock(
  block: StrapiDynamicZoneBlock,
): block is StrapiProfileHighlightBlockDto {
  return block.__component === 'components.profile-highlight'
}

function isSelectedWorksBlock(
  block: StrapiDynamicZoneBlock,
): block is StrapiSelectedWorksBlockDto {
  return block.__component === 'components.selected-works'
}

function isStackGridBlock(block: StrapiDynamicZoneBlock): block is StrapiStackGridBlockDto {
  return block.__component === 'components.stack-grid'
}

function mapDynamicBlock(block: StrapiDynamicZoneBlock): HomePortfolioSection | null {
  if (isSelectedWorksBlock(block) && block.isVisible !== false) {
    return {
      component: 'components.selected-works',
      id: `components.selected-works-${block.id}`,
      props: mapSelectedWorksFromStrapi(block),
    }
  }
  if (isStackGridBlock(block)) {
    return {
      component: 'components.stack-grid',
      id: `components.stack-grid-${block.id}`,
      props: mapStackGridFromStrapi(block),
    }
  }
  if (isProfileHighlightBlock(block) && block.showSection !== false) {
    return {
      component: 'components.profile-highlight',
      id: `components.profile-highlight-${block.id}`,
      props: mapProfileHighlightFromStrapi(block),
    }
  }
  if (isHeroMinimalBlock(block)) {
    return {
      component: 'components.hero-minimalf',
      id: `components.hero-minimalf-${block.id}`,
      props: mapHeroMinimalFromStrapi(block),
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

export function mapHomePortfolioFromStrapi(response: StrapiHomePortfolioResponse): HomePortfolioPage {
  const raw = response.data
  const sectionsRaw = raw?.sections
  const seo = mapSeoFromStrapi(raw?.seo ?? raw?.Seo)

  const sections: HomePortfolioSection[] = []
  if (sectionsRaw?.length) {
    for (const block of sectionsRaw) {
      const mapped = mapDynamicBlock(block)
      if (mapped) sections.push(mapped)
    }
  }

  return { sections, ...(seo && { seo }) }
}
