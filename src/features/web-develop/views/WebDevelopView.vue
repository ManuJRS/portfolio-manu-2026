<script setup lang="ts">
import { ChevronRight } from 'lucide-vue-next'
import { computed, ref, watch } from 'vue'
import PageSeo from '@/shared/ui/PageSeo.vue'
import WebDevelopBlockRenderer from '../components/WebDevelopBlockRenderer.vue'
import WebDevelopHero from '../components/WebDevelopHero.vue'
import WebDevelopResources from '../components/WebDevelopResources.vue'
import WebDevelopVideo from '../components/WebDevelopVideo.vue'
import WebDevelopTimeline from '../components/WebDevelopTimeline.vue'
import PortfolioPreview from '../components/PortfolioPreview.vue'
import { useWebDevelop } from '../composables/useWebDevelop'
import type { WebDevelopSection } from '../types/web-develop-page.model'
import { cn } from '@/shared/utils/cn'
import MenuMobile from '@/shared/ui/MenuMobile.vue'

const { data, loading, error, refresh } = useWebDevelop()

function isSidebarManaged(s: WebDevelopSection): boolean {
  return (
    s.component === 'components.web-develop-hero' ||
    s.component === 'components.web-develop-resources' ||
    s.component === 'components.web-develop-video' ||
    s.component === 'components.web-develop-timeline' ||
    s.component === 'components.portfolio-preview'
  )
}

const introSections = computed(
  () => data.value?.sections.filter((s) => !isSidebarManaged(s)) ?? [],
)

const heroSection = computed(
  () =>
    data.value?.sections.find((s) => s.component === 'components.web-develop-hero') ?? null,
)

const resourcesSection = computed(
  () =>
    data.value?.sections.find((s) => s.component === 'components.web-develop-resources') ??
    null,
)

const timelineSection = computed(
  () =>
    data.value?.sections.find((s) => s.component === 'components.web-develop-timeline') ?? null,
)

const portfolioSection = computed(
  () =>
    data.value?.sections.find((s) => s.component === 'components.portfolio-preview') ?? null,
)

const videoSection = computed(
  () =>
    data.value?.sections.find((s) => s.component === 'components.web-develop-video') ?? null,
)

const hasSidebarContent = computed(
  () =>
    !!(
      heroSection.value ||
      resourcesSection.value ||
      videoSection.value ||
      timelineSection.value ||
      portfolioSection.value
    ),
)

type Panel = 'resources' | 'quote'

const activePanel = ref<Panel>('resources')
const panelInitialized = ref(false)

watch(
  data,
  (page) => {
    if (!page || panelInitialized.value) return
    panelInitialized.value = true
    const hasRes = !!resourcesSection.value
    const hasQuote = !!(
      heroSection.value ||
      videoSection.value ||
      timelineSection.value ||
      portfolioSection.value
    )
    if (!hasRes && hasQuote) {
      activePanel.value = 'quote'
    } else if (hasRes) {
      activePanel.value = 'resources'
    }
  },
  { immediate: true },
)

function setPanel(panel: Panel) {
  activePanel.value = panel
}

function navButtonClass(active: boolean) {
  return cn(
    'relative flex w-full items-center rounded-3xl text-left text-sm font-medium uppercase tracking-wider transition-all duration-200 hover:cursor-pointer',
    active
      ? 'border-primary/60 pl-10 pr-4 text-on-surface'
      : 'border-outline-variant/30 bg-transparent px-4 text-on-surface-variant hover:border-outline-variant/50 hover:text-on-surface hover:tracking-[0.2em]',
  )
}
</script>

<template>
  <div class="min-h-screen">
    <PageSeo :seo="data?.seo" />
    <MenuMobile
      v-if="hasSidebarContent && !loading && !error"
      v-model:active-panel="activePanel"
    />
    <div class="fixed inset-0 grid-bg pointer-events-none z-0" />

    <main class="relative z-10 min-h-screen">
      <div
        v-if="loading"
        class="flex min-h-screen items-center justify-center text-sm uppercase tracking-widest text-on-surface-variant"
      >
        Cargando...
      </div>

      <div
        v-else-if="error"
        class="flex min-h-screen flex-col items-center justify-center gap-4 px-6 text-center"
      >
        <p class="text-on-surface">{{ error.message }}</p>
        <button
          type="button"
          class="rounded border border-white/30 px-4 py-2 text-sm uppercase tracking-widest text-on-surface hover:bg-white/10"
          @click="refresh"
        >
          Reintentar
        </button>
      </div>

      <template v-else-if="data?.sections.length">
        <WebDevelopBlockRenderer
          v-if="introSections.length"
          :sections="introSections"
        />

        <div
          v-if="hasSidebarContent"
          class="border-t border-outline-variant/15 bg-surface-container-lowest/30"
        >
          <div
            class="mx-auto flex max-w-auto flex-col gap-0 lg:flex-row lg:gap-0 lg:min-h-[min(80vh,1200px)]"
          >
            <aside
              class="hidden shrink-0 border-outline-variant/15 lg:block lg:w-64 lg:border-r lg:border-outline-variant/15 lg:px-2 lg:py-10 xl:w-58"
              aria-label="Secciones de desarrollo web"
            >
              <nav
                class="flex gap-2 overflow-x-auto [scrollbar-width:none] lg:flex-col lg:gap-6 lg:overflow-visible [&::-webkit-scrollbar]:hidden sticky top-10 z-20"
              >
                <button
                  type="button"
                  :class="navButtonClass(activePanel === 'resources')"
                  @click="setPanel('resources')"
                >
                  <ChevronRight
                    v-if="activePanel === 'resources'"
                    class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
                    aria-hidden="true"
                    stroke-width="2.25"
                  />
                  Recursos Gratuitos
                </button>
                <button
                  type="button"
                  :class="navButtonClass(activePanel === 'quote')"
                  @click="setPanel('quote')"
                >
                  <ChevronRight
                    v-if="activePanel === 'quote'"
                    class="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-primary"
                    aria-hidden="true"
                    stroke-width="2.25"
                  />
                  Cotizar Proyecto
                </button>
              </nav>
            </aside>

            <div class="min-w-0 flex-1">
              <div v-show="activePanel === 'resources'">
                <WebDevelopResources v-if="resourcesSection" v-bind="resourcesSection.props" />
                <p
                  v-else
                  class="px-6 py-20 text-center text-sm text-on-surface-variant"
                >
                  No hay recursos configurados todavía.
                </p>
              </div>
              <div v-show="activePanel === 'quote'">
                <WebDevelopHero v-if="heroSection" v-bind="heroSection.props" />
                <WebDevelopVideo v-if="videoSection" v-bind="videoSection.props" />
                <WebDevelopTimeline v-if="timelineSection" v-bind="timelineSection.props" />
                <PortfolioPreview v-if="portfolioSection" v-bind="portfolioSection.props" />
                <p
                  v-if="!heroSection && !videoSection && !timelineSection && !portfolioSection"
                  class="px-6 py-20 text-center text-sm text-on-surface-variant"
                >
                  No hay contenido en esta sección.
                </p>
              </div>
            </div>
          </div>
        </div>

        <p
          v-if="!introSections.length && !hasSidebarContent"
          class="flex min-h-screen items-center justify-center text-sm text-on-surface-variant"
        >
          No hay secciones para mostrar.
        </p>
      </template>

      <p
        v-else
        class="flex min-h-screen items-center justify-center text-sm text-on-surface-variant"
      >
        No hay secciones para mostrar.
      </p>
    </main>
  </div>
</template>
