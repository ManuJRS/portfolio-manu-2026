import type { Component } from 'vue'
import Calification from '@/features/home/components/Calification.vue'
import HeroMinimal from '@/features/home/components/HeroMinimal.vue'
import ProfileHighlight from '@/features/home/components/ProfileHighlight.vue'
import SelectedWorks from '@/features/home/components/SelectedWorks.vue'
import StackGrid from '@/features/home/components/StackGrid.vue'

/**
 * Registro de bloques Strapi (__component) → componente Vue.
 * Añade aquí nuevos bloques al crear componentes y mappers.
 */
export const homeBlockRegistry: Record<string, Component> = {
  'components.hero-minimalf': HeroMinimal,
  'components.profile-highlight': ProfileHighlight,
  'components.selected-works': SelectedWorks,
  'components.stack-grid': StackGrid,
  'components.calification': Calification,
}

export function resolveHomeBlock(component: string): Component | undefined {
  return homeBlockRegistry[component]
}
