import type {
  StrapiDynamicZoneBlock,
  StrapiHeroMinimalBlockDto,
  StrapiHomePortfolioResponse,
  StrapiProfileHighlightBlockDto,
  StrapiSelectedWorksBlockDto,
  StrapiStackGridBlockDto,
} from '../types/strapi-home-portfolio.dto'
import type { HomePortfolioPage, HomePortfolioSection } from '../types/home-portfolio.model'
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
