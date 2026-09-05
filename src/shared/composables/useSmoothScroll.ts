import { onMounted, onUnmounted } from 'vue'
import {
  destroySmoothScroll,
  initSmoothScroll,
} from '@/shared/utils/smoothScroll'

/** Activa scroll suavizado (Lenis) durante el ciclo de vida del componente raíz. */
export function useSmoothScroll() {
  onMounted(() => {
    initSmoothScroll()
  })

  onUnmounted(() => {
    destroySmoothScroll()
  })
}
