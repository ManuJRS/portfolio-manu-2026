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

export function mapInfoPortfolioFromStrapi(response: StrapiInfoPortfolioResponse): InfoPortfolioPage {
  const sectionsRaw = response.data?.sections
  if (!sectionsRaw?.length) {
    return { sections: [] }
  }

  const sections: InfoPortfolioSection[] = []
  for (const block of sectionsRaw) {
    const mapped = mapBlock(block)
    if (mapped) sections.push(mapped)
  }

  return { sections }
}
