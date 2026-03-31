<script setup lang="ts">
import { ref } from 'vue'
import MenuToggleIcon from '@/shared/ui/MenuToggleIcon.vue'
import { cn } from '@/shared/utils/cn'

export type WebDevelopMobilePanel = 'resources' | 'quote'

const activePanel = defineModel<WebDevelopMobilePanel>('activePanel', { required: true })

const menuOpen = ref(false)

function toggleMenu() {
  menuOpen.value = !menuOpen.value
}

function select(panel: WebDevelopMobilePanel) {
  activePanel.value = panel
  menuOpen.value = false
}

function closeMenu() {
  menuOpen.value = false
}

function itemClass(selected: boolean) {
  return cn(
    'w-full rounded-xl px-4 py-4 text-left text-sm font-medium uppercase tracking-wider transition-colors md:py-5 md:text-base',
    selected
      ? 'bg-white/10 text-white'
      : 'text-zinc-400 hover:bg-white/5 hover:text-zinc-200',
  )
}
</script>

<template>
  <div class="lg:hidden">
    <!-- Atenúa la mitad derecha (toda la pantalla; el panel izquierdo tapa su parte) -->
    <Transition
      enter-active-class="transition-opacity duration-300 ease-out"
      enter-from-class="opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="transition-opacity duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="opacity-0"
    >
      <button
        v-if="menuOpen"
        type="button"
        class="fixed inset-0 z-[60] cursor-default bg-black/40 backdrop-blur-[2px]"
        aria-label="Cerrar menú"
        @click="closeMenu"
      />
    </Transition>

    <!-- Panel oscuro: mitad de la pantalla -->
    <Transition
      enter-active-class="transition-transform duration-300 ease-out"
      enter-from-class="-translate-x-full"
      enter-to-class="translate-x-0"
      leave-active-class="transition-transform duration-250 ease-in"
      leave-from-class="translate-x-0"
      leave-to-class="-translate-x-full"
    >
      <aside
        v-if="menuOpen"
        class="fixed inset-y-0 left-0 z-[61] flex w-1/2 min-w-0 flex-col bg-black shadow-2xl shadow-black/50 ring-1 ring-white/10"
        role="menu"
        aria-label="Secciones"
      >
        <div
          class="flex flex-1 flex-col gap-2 px-2 pb-8"
          :style="{
            paddingTop: 'max(5.5rem, calc(env(safe-area-inset-top) + 4rem))',
          }"
        >
          <p class="mb-2 text-[10px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            Desarrollo web
          </p>
          <button
            type="button"
            role="menuitem"
            :class="itemClass(activePanel === 'resources')"
            @click="select('resources')"
          >
            Recursos Gratuitos
          </button>
          <button
            type="button"
            role="menuitem"
            :class="itemClass(activePanel === 'quote')"
            @click="select('quote')"
          >
            Cotizar Proyecto
          </button>
        </div>
      </aside>
    </Transition>

    <!-- Botón triangular encima del panel -->
    <div
      class="fixed z-[62] [filter:drop-shadow(0_4px_14px_rgba(0,0,0,0.45))]"
      :style="{
        top: 'max(-0.175rem, env(safe-area-inset-top))',
        left: 'max(-0.175rem, env(safe-area-inset-left))',
      }"
    >
      <button
        type="button"
        class="flex size-16 shrink-0 items-start justify-start bg-black pt-2 pl-2 text-white [clip-path:polygon(0_0,100%_0,0_100%)]"
        aria-haspopup="true"
        :aria-expanded="menuOpen"
        aria-label="Menú de secciones"
        @click="toggleMenu"
      >
        <MenuToggleIcon :open="menuOpen" class="size-7" :duration="400" />
      </button>
    </div>
  </div>
</template>
