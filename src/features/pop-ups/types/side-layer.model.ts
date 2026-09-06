import type { PopUpFrequency } from './strapi-pop-ups.dto'

export type SideLayerContent = {
  title: string | null
  text: string | null
  buttonText: string | null
  buttonLink: string | null
  frequency: PopUpFrequency
  /** Segundos de espera antes de mostrar (0–10). */
  delay: number
  targetHomePage: boolean
  targetInfoPage: boolean
  targetPageSlugs: string[]
}
