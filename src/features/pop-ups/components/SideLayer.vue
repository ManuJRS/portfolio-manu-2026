<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { X } from 'lucide-vue-next'
import { isAppLocale, type AppLocale } from '@/features/home/types/locale'
import { getPopUps } from '@/features/pop-ups/api/popUps'
import type { SideLayerContent } from '@/features/pop-ups/types/side-layer.model'

const STORAGE_KEY = 'hideSideLayer'

const route = useRoute()

const layerData = ref<SideLayerContent | null>(null)
const isVisible = ref(false)
/** Tras cerrar con la X, no volver a mostrar hasta recargar (salvo Storage). */
const userClosed = ref(false)
let showTimeoutId: ReturnType<typeof setTimeout> | null = null

function clearShowTimeout() {
  if (showTimeoutId == null) return
  clearTimeout(showTimeoutId)
  showTimeoutId = null
}

const currentLocale = computed<AppLocale>(() => {
  const raw = route.params.locale
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' && isAppLocale(value) ? value : 'es'
})

const currentSlug = computed(() => {
  const raw = route.params.slug
  const value = Array.isArray(raw) ? raw[0] : raw
  return typeof value === 'string' ? value : ''
})

function isHomeRoute(): boolean {
  if (route.name === 'home') return true
  const path = route.path.replace(/\/+$/, '') || '/'
  return path === '/' || path === '/es' || path === '/en'
}

function isInfoRoute(): boolean {
  if (route.name === 'info') return true
  return /^\/(es|en)\/info\/?$/.test(route.path)
}

function matchesTargetPages(data: SideLayerContent): boolean {
  if (!data.targetPageSlugs.length || !currentSlug.value) return false
  return data.targetPageSlugs.includes(currentSlug.value)
}

function shouldRenderOnRoute(data: SideLayerContent): boolean {
  if (data.targetHomePage && isHomeRoute()) return true
  if (data.targetInfoPage && isInfoRoute()) return true
  if (matchesTargetPages(data)) return true
  return false
}

function isHiddenInStorage(): boolean {
  try {
    return (
      sessionStorage.getItem(STORAGE_KEY) === 'true' ||
      localStorage.getItem(STORAGE_KEY) === 'true'
    )
  } catch {
    return false
  }
}

function revealLayer(data: SideLayerContent) {
  if (userClosed.value || isVisible.value) return
  isVisible.value = true
}

function syncVisibility() {
  const data = layerData.value
  if (userClosed.value || !data) {
    clearShowTimeout()
    isVisible.value = false
    return
  }

  if (!shouldRenderOnRoute(data)) {
    clearShowTimeout()
    isVisible.value = false
    return
  }

  if (isVisible.value || showTimeoutId != null) return

  const delayMs = data.delay * 1000
  if (delayMs <= 0) {
    revealLayer(data)
    return
  }

  showTimeoutId = setTimeout(() => {
    showTimeoutId = null
    revealLayer(data)
  }, delayMs)
}

function closeLayer() {
  const frequency = layerData.value?.frequency ?? 'always'

  try {
    if (frequency === 'once_per_session') {
      sessionStorage.setItem(STORAGE_KEY, 'true')
    } else if (frequency === 'once_per_visitor') {
      localStorage.setItem(STORAGE_KEY, 'true')
    }
  } catch {
    // Storage puede fallar en modo privado; igual ocultamos.
  }

  clearShowTimeout()
  userClosed.value = true
  isVisible.value = false
}

const isExternalLink = computed(() => {
  const link = layerData.value?.buttonLink
  return Boolean(link && /^https?:\/\//i.test(link))
})

const closeLabel = computed(() =>
  currentLocale.value === 'en' ? 'Close' : 'Cerrar',
)

onMounted(async () => {
  if (isHiddenInStorage()) return

  try {
    const data = await getPopUps(currentLocale.value)
    if (!data) return
    layerData.value = data
    syncVisibility()
  } catch {
    layerData.value = null
    isVisible.value = false
  }
})

watch(
  () => [route.fullPath, layerData.value] as const,
  () => {
    if (!layerData.value) return
    syncVisibility()
  },
)

watch(currentLocale, async (locale, prev) => {
  if (locale === prev) return
  clearShowTimeout()
  isVisible.value = false

  if (isHiddenInStorage()) {
    layerData.value = null
    return
  }

  try {
    const data = await getPopUps(locale)
    layerData.value = data
    syncVisibility()
  } catch {
    layerData.value = null
    isVisible.value = false
  }
})

onUnmounted(() => {
  clearShowTimeout()
})
</script>

<template>
  <Teleport to="body">
    <Transition name="side-layer">
      <aside
        v-if="isVisible && layerData"
        class="side-layer"
        role="complementary"
        :aria-label="layerData.title || closeLabel"
      >
        <button
          type="button"
          class="side-layer__close"
          :aria-label="closeLabel"
          @click="closeLayer"
        >
          <X :size="16" :stroke-width="2" aria-hidden="true" />
        </button>

        <div class="side-layer__body">
          <h2 v-if="layerData.title" class="side-layer__title">
            {{ layerData.title }}
          </h2>

          <p v-if="layerData.text" class="side-layer__text">
            {{ layerData.text }}
          </p>

          <a
            v-if="layerData.buttonText && layerData.buttonLink && isExternalLink"
            class="side-layer__button"
            :href="layerData.buttonLink"
            target="_blank"
            rel="noopener noreferrer"
          >
            {{ layerData.buttonText }}
          </a>

          <RouterLink
            v-else-if="layerData.buttonText && layerData.buttonLink"
            class="side-layer__button"
            :to="layerData.buttonLink"
          >
            {{ layerData.buttonText }}
          </RouterLink>
        </div>
      </aside>
    </Transition>
  </Teleport>
</template>

<style scoped>
.side-layer {
  position: fixed;
  top: 50%;
  right: 1.25rem;
  z-index: 90;
  display: flex;
  flex-direction: column;
  width: min(20rem, calc(100vw - 2rem));
  max-height: min(70vh, 28rem);
  padding: 1.25rem 1.25rem 1.5rem;
  overflow: auto;
  color: #e5e2e1;
  background: #1c1b1b;
  border: 1px solid rgba(147, 143, 153, 0.35);
  border-radius: 1rem;
  box-shadow: 0 18px 40px rgba(0, 0, 0, 0.45);
  transform: translateY(-50%);
}

.side-layer__close {
  position: absolute;
  top: 0.65rem;
  right: 0.65rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2.25rem;
  height: 2.25rem;
  padding: 0;
  color: rgba(229, 226, 225, 0.7);
  background: transparent;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  transition: background-color 0.15s ease, color 0.15s ease;
}

.side-layer__close:hover {
  color: #e5e2e1;
  background: rgba(255, 255, 255, 0.08);
}

.side-layer__body {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  padding-right: 1.5rem;
}

.side-layer__title {
  margin: 0;
  font-size: 1.05rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: 0.01em;
}

.side-layer__text {
  margin: 0;
  font-size: 0.9rem;
  line-height: 1.55;
  color: rgba(229, 226, 225, 0.78);
}

.side-layer__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  margin-top: 0.35rem;
  padding: 0.55rem 1rem;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.06em;
  text-decoration: none;
  text-transform: uppercase;
  color: #121212;
  background: #e5e2e1;
  border-radius: 999px;
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.side-layer__button:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}

.side-layer-enter-active,
.side-layer-leave-active {
  transition:
    opacity 0.25s ease,
    transform 0.25s ease;
}

.side-layer-enter-from,
.side-layer-leave-to {
  opacity: 0;
  transform: translate(1rem, -50%);
}

.side-layer-enter-to,
.side-layer-leave-from {
  opacity: 1;
  transform: translate(0, -50%);
}

@media (max-width: 640px) {
  .side-layer {
    top: auto;
    right: 0.75rem;
    bottom: calc(5.5rem + env(safe-area-inset-bottom, 0px));
    left: 0.75rem;
    width: auto;
    max-height: 40vh;
    transform: none;
  }

  .side-layer-enter-from,
  .side-layer-leave-to {
    transform: translateY(1rem);
  }

  .side-layer-enter-to,
  .side-layer-leave-from {
    transform: translateY(0);
  }
}
</style>
