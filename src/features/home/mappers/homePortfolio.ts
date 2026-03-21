import type {
  StrapiDynamicZoneBlock,
  StrapiHeroMinimalBlockDto,
  StrapiHomePortfolioResponse,
  StrapiProfileHighlightBlockDto,
  StrapiStackGridBlockDto,
} from '../types/strapi-home-portfolio.dto'
import type { HomePortfolioPage, HomePortfolioSection } from '../types/home-portfolio.model'
import { mapHeroMinimalFromStrapi } from './heroMinimal'
import { mapProfileHighlightFromStrapi } from './profileHighlight'
import { mapStackGridFromStrapi } from './stackGrid'

function isHeroMinimalBlock(block: StrapiDynamicZoneBlock): block is StrapiHeroMinimalBlockDto {
  return block.__component === 'components.hero-minimalf'
}

function isProfileHighlightBlock(
  block: StrapiDynamicZoneBlock,
): block is StrapiProfileHighlightBlockDto {
  return block.__component === 'components.profile-highlight'
}

function isStackGridBlock(block: StrapiDynamicZoneBlock): block is StrapiStackGridBlockDto {
  return block.__component === 'components.stack-grid'
}

function mapDynamicBlock(block: StrapiDynamicZoneBlock): HomePortfolioSection | null {
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

export function mapHomePortfolioFromStrapi(response: StrapiHomePortfolioResponse): HomePortfolioPage {
  const sectionsRaw = response.data?.sections
  if (!sectionsRaw?.length) {
    return { sections: [] }
  }

  const sections: HomePortfolioSection[] = []
  for (const block of sectionsRaw) {
    const mapped = mapDynamicBlock(block)
    if (mapped) sections.push(mapped)
  }

  return { sections }
}
