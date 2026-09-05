import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

let lenis: Lenis | null = null
let rafId = 0

function prefersReducedMotion(): boolean {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
}

function tick(time: number) {
  lenis?.raf(time)
  rafId = requestAnimationFrame(tick)
}

/** Inicia Lenis en el documento (no-op si reduced-motion). */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined' || lenis) return lenis
  if (prefersReducedMotion()) return null

  lenis = new Lenis({
    duration: 1.15,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.2,
  })

  rafId = requestAnimationFrame(tick)
  return lenis
}

export function getSmoothScroll(): Lenis | null {
  return lenis
}

export function destroySmoothScroll() {
  if (rafId) {
    cancelAnimationFrame(rafId)
    rafId = 0
  }
  lenis?.destroy()
  lenis = null
}

export function pauseSmoothScroll() {
  lenis?.stop()
}

export function resumeSmoothScroll() {
  lenis?.start()
}

type ScrollTarget = number | string | HTMLElement

/** Scroll suave vía Lenis, o nativo como fallback. */
export function smoothScrollTo(
  target: ScrollTarget,
  options?: { immediate?: boolean; offset?: number },
) {
  const immediate = options?.immediate ?? false
  const offset = options?.offset ?? 0

  if (lenis) {
    lenis.scrollTo(target, { immediate, offset })
    return
  }

  if (typeof target === 'number') {
    window.scrollTo({
      top: target + offset,
      behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth',
    })
    return
  }

  const el =
    typeof target === 'string' ? document.querySelector(target) : target
  if (el instanceof HTMLElement) {
    el.scrollIntoView({
      behavior: immediate || prefersReducedMotion() ? 'auto' : 'smooth',
      block: 'start',
    })
  }
}
