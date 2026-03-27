import type { Component } from 'vue'
import WebDevelopHero from './components/WebDevelopHero.vue'
import WebDevelopVideo from './components/WebDevelopVideo.vue'
import WebDevelopTimeline from './components/WebDevelopTimeline.vue'
import WebDevelopResources from './components/WebDevelopResources.vue'
import PortfolioPreview from './components/PortfolioPreview.vue'

export const webDevelopBlockRegistry: Record<string, Component> = {
  'components.web-develop-hero': WebDevelopHero,
  'components.web-develop-video': WebDevelopVideo,
  'components.web-develop-timeline': WebDevelopTimeline,
  'components.web-develop-resources': WebDevelopResources,
  'components.portfolio-preview': PortfolioPreview,
}

export function resolveWebDevelopBlock(component: string): Component | undefined {
  return webDevelopBlockRegistry[component]
}
