import type { Component } from 'vue'
import HeroMinimal from '@/features/home/components/HeroMinimal.vue'
import ProfileHighlight from '@/features/home/components/ProfileHighlight.vue'
import StackGrid from '@/features/home/components/StackGrid.vue'

/**
 * Registro de bloques Strapi (__component) → componente Vue.
 * Añade aquí nuevos bloques al crear componentes y mappers.
 */
export const homeBlockRegistry: Record<string, Component> = {
  'components.hero-minimalf': HeroMinimal,
  'components.profile-highlight': ProfileHighlight,
  'components.stack-grid': StackGrid,
}

export function resolveHomeBlock(component: string): Component | undefined {
  return homeBlockRegistry[component]
}
