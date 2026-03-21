import type { Component } from 'vue'
import MediaContentSplit from './components/MediaContentSplit.vue'
import ProjectHeroDark from './components/ProjectHeroDark.vue'
import ProjectTechnicalBreakdown from './components/ProjectTechnicalBreakdown.vue'
import ProjectTextMedia from './components/ProjectTextMedia.vue'

/**
 * Bloques dinámicos de project-portfolio (Strapi __component → Vue).
 */
export const projectBlockRegistry: Record<string, Component> = {
  'components.project-hero-dark': ProjectHeroDark,
  'components.media-content-split': MediaContentSplit,
  'components.project-text-media': ProjectTextMedia,
  'components.project-technical-breakdown': ProjectTechnicalBreakdown,
}

export function resolveProjectBlock(component: string): Component | undefined {
  return projectBlockRegistry[component]
}
