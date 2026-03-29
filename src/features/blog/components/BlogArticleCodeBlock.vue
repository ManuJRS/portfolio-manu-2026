<script setup lang="ts">
import { Check, Copy } from 'lucide-vue-next'
import { computed, ref } from 'vue'
import type { BlogArticleCodeBlockProps, BlogCodeLanguage } from '../types/blog-article-code-block.model'

const props = defineProps<BlogArticleCodeBlockProps>()

const copied = ref(false)
let copyResetId: ReturnType<typeof setTimeout> | undefined

const barLabel = computed(() => {
  const f = props.filename?.trim()
  if (f) return f
  const t = props.title?.trim()
  if (t) return t
  return props.language
})

const preLanguageClass = computed(() => {
  const map: Record<BlogCodeLanguage, string> = {
    CSS:
      'border-l-4 border-l-emerald-500/90 bg-surface-container-lowest/95 shadow-[inset_4px_0_0_0_theme(colors.emerald.500/0.35)]',
    HTML:
      'border-l-4 border-l-orange-500/90 bg-surface-container-lowest/95 shadow-[inset_4px_0_0_0_theme(colors.orange.500/0.35)]',
    TS: 'border-l-4 border-l-sky-500/90 bg-surface-container-lowest/95 shadow-[inset_4px_0_0_0_theme(colors.sky.500/0.35)]',
    JS: 'border-l-4 border-l-amber-400/90 bg-surface-container-lowest/95 shadow-[inset_4px_0_0_0_theme(colors.amber.400/0.35)]',
    VUE:
      'border-l-4 border-l-[#42b883]/95 bg-surface-container-lowest/95 shadow-[inset_4px_0_0_0_rgba(66,184,131,0.28)]',
  }
  return map[props.language]
})

const codeTextClass = computed(() => {
  const map: Record<BlogCodeLanguage, string> = {
    CSS: 'text-emerald-100/95',
    HTML: 'text-orange-100/95',
    TS: 'text-sky-100/95',
    JS: 'text-amber-100/95',
    VUE: 'text-[#e8f5ef]',
  }
  return map[props.language]
})

const langBadgeClass = computed(() => {
  const map: Record<BlogCodeLanguage, string> = {
    CSS: 'bg-emerald-500/15 text-emerald-300',
    HTML: 'bg-orange-500/15 text-orange-300',
    TS: 'bg-sky-500/15 text-sky-300',
    JS: 'bg-amber-400/15 text-amber-200',
    VUE: 'bg-[#42b883]/20 text-[#7dd4a8]',
  }
  return map[props.language]
})

async function copyCode() {
  try {
    await navigator.clipboard.writeText(props.code)
    copied.value = true
    if (copyResetId) clearTimeout(copyResetId)
    copyResetId = setTimeout(() => {
      copied.value = false
    }, 2000)
  } catch {
    copied.value = false
  }
}
</script>

<template>
  <section class="space-y-4 pt-8 pb-8">
    <h4
      v-if="title"
      class="text-xs font-bold uppercase tracking-widest text-primary"
    >
      {{ title }}
    </h4>

    <div
      class="flex items-center justify-between bg-surface-container-highest px-4 py-2"
    >
      <div class="flex min-w-0 flex-1 items-center gap-3">
        <span
          class="truncate text-[10px] font-bold uppercase tracking-widest text-on-surface-variant"
        >
          {{ barLabel }}
        </span>
        <span
          class="shrink-0 rounded px-2 py-0.5 text-[9px] font-black uppercase tracking-wider"
          :class="langBadgeClass"
        >
          {{ language }}
        </span>
      </div>
      <div class="flex shrink-0 items-center gap-3">
        <button
          type="button"
          class="inline-flex items-center gap-1.5 rounded border border-outline-variant/40 px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-on-surface-variant transition hover:border-primary/50 hover:text-primary"
          aria-label="Copiar código"
          @click="copyCode"
        >
          <Check v-if="copied" class="size-3.5 text-primary" aria-hidden="true" />
          <Copy v-else class="size-3.5" aria-hidden="true" />
          {{ copied ? 'Copiado' : 'Copiar' }}
        </button>
        <div class="hidden gap-1.5 sm:flex" aria-hidden="true">
          <div class="size-2 rounded-full bg-outline-variant" />
          <div class="size-2 rounded-full bg-outline-variant" />
          <div class="size-2 rounded-full bg-outline-variant" />
        </div>
      </div>
    </div>

    <pre
      class="overflow-x-auto border border-outline-variant/10 p-6 text-sm leading-relaxed font-mono"
      :class="preLanguageClass"
    ><code
      class="block whitespace-pre font-mono"
      :class="codeTextClass"
    >{{ code }}</code></pre>
  </section>
</template>
