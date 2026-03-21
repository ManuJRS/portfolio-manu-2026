import type {
  StrapiProjectDynamicZoneBlock,
  StrapiProjectHeroDarkBlockDto,
  StrapiProjectPortfolioDocument,
  StrapiMediaContentSplitBlockDto,
  StrapiProjectTechnicalBreakdownBlockDto,
  StrapiProjectTextMediaBlockDto,
} from '../types/strapi-project-portfolio.dto'
import type { ProjectPortfolioPage, ProjectPortfolioSection } from '../types/project-portfolio.model'
import { mapMediaContentSplitFromStrapi } from './mediaContentSplit'
import { mapProjectHeroDarkFromStrapi } from './projectHeroDark'
import { mapProjectTechnicalBreakdownFromStrapi } from './projectTechnicalBreakdown'
import { mapProjectTextMediaFromStrapi } from './projectTextMedia'

function isProjectHeroDarkBlock(
  block: StrapiProjectDynamicZoneBlock,
): block is StrapiProjectHeroDarkBlockDto {
  return block.__component === 'components.project-hero-dark'
}

function isMediaContentSplitBlock(
  block: StrapiProjectDynamicZoneBlock,
): block is StrapiMediaContentSplitBlockDto {
  return block.__component === 'components.media-content-split'
}

function isProjectTextMediaBlock(
  block: StrapiProjectDynamicZoneBlock,
): block is StrapiProjectTextMediaBlockDto {
  return block.__component === 'components.project-text-media'
}

function isProjectTechnicalBreakdownBlock(
  block: StrapiProjectDynamicZoneBlock,
): block is StrapiProjectTechnicalBreakdownBlockDto {
  return block.__component === 'components.project-technical-breakdown'
}

function mapSection(block: StrapiProjectDynamicZoneBlock): ProjectPortfolioSection | null {
  if (isProjectTechnicalBreakdownBlock(block) && block.isVisible !== false) {
    return {
      component: 'components.project-technical-breakdown',
      id: `components.project-technical-breakdown-${block.id}`,
      props: mapProjectTechnicalBreakdownFromStrapi(block),
    }
  }
  if (isProjectTextMediaBlock(block) && block.isVisible !== false) {
    return {
      component: 'components.project-text-media',
      id: `components.project-text-media-${block.id}`,
      props: mapProjectTextMediaFromStrapi(block),
    }
  }
  if (isMediaContentSplitBlock(block) && block.isVisible !== false) {
    return {
      component: 'components.media-content-split',
      id: `components.media-content-split-${block.id}`,
      props: mapMediaContentSplitFromStrapi(block),
    }
  }
  if (isProjectHeroDarkBlock(block) && block.isVisible !== false) {
    return {
      component: 'components.project-hero-dark',
      id: `components.project-hero-dark-${block.id}`,
      props: mapProjectHeroDarkFromStrapi(block),
    }
  }
  return null
}

export function mapProjectDocumentToPage(doc: StrapiProjectPortfolioDocument): ProjectPortfolioPage {
  const sectionsRaw = doc.sections
  const sections: ProjectPortfolioSection[] = []
  if (sectionsRaw?.length) {
    for (const block of sectionsRaw) {
      const mapped = mapSection(block)
      if (mapped) sections.push(mapped)
    }
  }

  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    sections,
  }
}
