import type { Component } from 'vue'
import WebDevelopHero from './components/WebDevelopHero.vue'
import WebDevelopVideo from './components/WebDevelopVideo.vue'
import WebDevelopTimeline from './components/WebDevelopTimeline.vue'
import WebDevelopResources from './components/WebDevelopResources.vue'
import PortfolioPreview from './components/PortfolioPreview.vue'
import WebDevelopCardSolution from './components/WebDevelopCardSolution.vue'
import WebDevelopCardsSection from './components/WebDevelopCardsSection.vue'
import WebDevelopHowIDo from './components/WebDevelopHowIDo.vue'
import WebDevelopCommentSecction from './components/WebDevelopCommentSecction.vue'
import WebDevelopCardsTitle from './components/WebDevelopCardsTitle.vue'
import WebDevelopLogos from './components/WebDevelopLogos.vue'
import WebDevelopFormWeb from './components/WebDevelopFormWeb.vue'

export const webDevelopBlockRegistry: Record<string, Component> = {
  'components.web-develop-hero': WebDevelopHero,
  'components.web-develop-video': WebDevelopVideo,
  'components.web-develop-timeline': WebDevelopTimeline,
  'components.web-develop-resources': WebDevelopResources,
  'components.portfolio-preview': PortfolioPreview,
  'components.card-solution': WebDevelopCardSolution,
  'components.cards-section': WebDevelopCardsSection,
  'components.how-i-do': WebDevelopHowIDo,
  'components.comment-secction': WebDevelopCommentSecction,
  'components.cards-title': WebDevelopCardsTitle,
  'components.logos': WebDevelopLogos,
  'components.form-web': WebDevelopFormWeb,
}

/** Bloques de la página /desarrollo-web (Cotizar proyecto); excluye recursos gratuitos. */
const webDevelopQuoteComponentIds = new Set([
  'components.web-develop-hero',
  'components.web-develop-video',
  'components.web-develop-timeline',
  'components.portfolio-preview',
  'components.card-solution',
  'components.cards-section',
  'components.how-i-do',
  'components.comment-secction',
  'components.cards-title',
  'components.logos',
  'components.form-web',
])

export function isWebDevelopQuoteBlock(component: string): boolean {
  return webDevelopQuoteComponentIds.has(component)
}

export function resolveWebDevelopBlock(component: string): Component | undefined {
  return webDevelopBlockRegistry[component]
}
