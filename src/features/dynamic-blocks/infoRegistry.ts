import type { Component } from 'vue'
import IntroDescription from '@/features/info/components/IntroDescription.vue'
import ExpComponent from '@/features/info/components/ExpComponent.vue'

export const infoBlockRegistry: Record<string, Component> = {
  'components.intro-description': IntroDescription,
  'components.exp-component': ExpComponent,
}

export function resolveInfoBlock(component: string): Component | undefined {
  return infoBlockRegistry[component]
}
