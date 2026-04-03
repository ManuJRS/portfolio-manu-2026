# portfolio-manu-2026

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Efectos de UI

El proyecto incluye componentes reutilizables en `src/shared/ui/` para animaciones y estados de carga.

### Loader

Indicador de carga con texto shimmer (efecto brillante). Soporta español e inglés por defecto.

```vue
<script setup>
import Loader from '@/shared/ui/Loader.vue'
</script>

<template>
  <!-- Fullscreen (pantalla completa) -->
  <Loader v-if="loading" :locale="locale" full-screen />

  <!-- Inline (dentro de un contenedor) -->
  <Loader v-if="loading" locale="es" />

  <!-- Texto personalizado -->
  <Loader text="Generating code…" :duration="1.5" />
</template>
```

| Prop       | Tipo     | Default | Descripción                                        |
|-----------|----------|---------|----------------------------------------------------|
| `text`    | `string` | —       | Texto personalizado. Si no se pasa, usa el de `locale` |
| `locale`  | `'es' \| 'en'` | `'es'` | Idioma: "Cargando…" o "Loading…"                   |
| `fullScreen` | `boolean` | `false` | Si `true`, ocupa `min-h-screen` centrado           |
| `duration` | `number`  | `2`     | Duración de la animación en segundos               |
| `class`   | `string` | —       | Clases adicionales                                 |

---

### TextEffect

Revelado de texto con efecto tipo matriz: primero aparecen caracteres aleatorios y luego se revela el texto real.

```vue
<script setup>
import TextEffect from '@/shared/ui/TextEffect.vue'
</script>

<template>
  <!-- Solo cuando entra en viewport -->
  <TextEffect
    :text="eyebrowText"
    in-view
    class="text-on-surface-variant"
    :speed="25"
  />

  <!-- Animación inmediata con retardo -->
  <TextEffect :text="'Make it beautiful'" :delay="0.5" :speed="30" />
</template>
```

| Prop    | Tipo      | Default | Descripción                                    |
|---------|-----------|---------|------------------------------------------------|
| `text`  | `string`  | *requerido* | Texto a revelar                             |
| `speed` | `number`  | `20`    | Intervalo entre pasos en ms                    |
| `delay` | `number`  | `0`     | Retardo inicial en segundos                    |
| `inView`| `boolean` | `false` | Si `true`, anima solo al entrar en viewport    |
| `once`  | `boolean` | `true`  | Si `inView`, animar solo una vez               |
| `class` | `string`  | —       | Clases adicionales                             |

---

### TitleEffect

Revelado de texto con un bloque que hace wipe de izquierda a derecha y luego se retira. Se activa al entrar en viewport.

```vue
<script setup>
import TitleEffect from '@/shared/ui/TitleEffect.vue'
</script>

<template>
  <TitleEffect
    block-color="#ffffff"
    class="text-3xl font-bold uppercase text-white"
  >
    <h2>Tu título aquí</h2>
  </TitleEffect>

  <!-- Con duración y retardo -->
  <TitleEffect
    block-color="#ffffff"
    :duration="0.8"
    :delay="0.2"
    class="text-4xl text-white"
  >
    <span>Otro título</span>
  </TitleEffect>
</template>
```

| Prop        | Tipo     | Default              | Descripción                              |
|-------------|----------|----------------------|------------------------------------------|
| `blockColor`| `string` | `'#ffffff'`          | Color del bloque en hex                   |
| `duration`  | `number` | `0.6`                | Duración de cada fase en segundos         |
| `delay`     | `number` | `0`                  | Retardo antes de iniciar (segundos)       |
| `once`      | `boolean`| `true`               | Animar solo una vez al entrar en viewport |
| `rootMargin`| `string` | `'0px 0px -15% 0px'` | Margen del viewport para activar          |
| `class`     | `string` | —                    | Clases adicionales                        |

El contenido va dentro del slot (entre las etiquetas del componente). El color del texto se define con las clases que apliques (`text-white`, `text-on-surface-variant`, etc.).

---

### HeroMorphingCursorText (morphing cursor)

Efecto tipo “cursor morphing”: al pasar el ratón sobre el texto aparece un círculo que sigue al puntero y muestra un **segundo texto** con colores invertidos respecto al fondo. Está basado en `src/features/web-develop/components/cursor-effect.mdc` (referencia React) y vive en el feature de desarrollo web.

**Importación**

```vue
<script setup lang="ts">
import HeroMorphingCursorText from '@/features/web-develop/components/HeroMorphingCursorText.vue'
import { usePreferredReducedMotion } from '@vueuse/core'

const prefersReducedMotion = usePreferredReducedMotion()
</script>
```

**Uso recomendado con accesibilidad**

`usePreferredReducedMotion()` devuelve `'reduce' | 'no-preference'` (no un booleano). Conviene mostrar texto estático si el usuario pide menos movimiento, igual que en `WebDevelopHero.vue`:

```vue
<template>
  <h2 v-if="prefersReducedMotion === 'reduce'" class="text-2xl font-bold text-white">
    {{ titulo }}
  </h2>
  <HeroMorphingCursorText
    v-else
    as="h2"
    :text="titulo"
    hover-text="Texto alterno"
    text-class="text-2xl font-bold text-white"
    hover-text-class="text-2xl font-bold text-on-primary"
    :circle-size="160"
  />
</template>
```

**Texto sobre fondo oscuro** (`variant="on-dark"`, valor por defecto): el círculo es blanco y el texto interior debe ir en **`text-on-primary`** (u otro oscuro). El texto base suele ser **`text-white`**.

**Texto sobre fondo claro** (botón blanco, chip, etc.): usa **`variant="on-light"`** (círculo oscuro con `bg-on-primary`) y **`compact`** para que el contenedor sea en línea. El texto interior del círculo debe ser **`text-white`**.

```vue
<button type="button" class="flex items-center gap-2 bg-white px-8 py-4 text-on-primary">
  <HeroMorphingCursorText
    as="span"
    variant="on-light"
    compact
    text="Solicitar"
    hover-text="Hablemos"
    :circle-size="120"
    text-class="text-sm font-bold uppercase tracking-widest text-on-primary"
    hover-text-class="text-sm font-bold uppercase tracking-widest text-white"
  />
</button>
```

**Encabezados y semántica**: usa **`as="h1"`** solo una vez por página (título principal). En el resto de bloques usa `h2`, `h3`, `p` o `span` según corresponda.

**Ajustar el tamaño del círculo**: prop **`circle-size`** (píxeles). Textos grandes → valores mayores (p. ej. `200`); CTAs o etiquetas pequeñas → menores (p. ej. `110`–`140`).

| Prop              | Tipo | Default | Descripción |
|-------------------|------|---------|-------------|
| `text`            | `string` | *requerido* | Texto visible sin hover |
| `hoverText`       | `string` | según uso | Texto dentro del círculo |
| `as`              | `'h1' \| 'h2' \| 'h3' \| 'h4' \| 'p' \| 'span' \| 'div'` | `'h1'` | Etiqueta del contenedor |
| `variant`         | `'on-dark' \| 'on-light'` | `'on-dark'` | Círculo claro u oscuro según el fondo |
| `compact`         | `boolean` | `false` | Contenedor inline (CTA, texto en fila) |
| `circleSize`      | `number` | `200` | Diámetro del círculo al hacer hover (px) |
| `textClass`       | `string` | `''` | Clases Tailwind del texto base (tamaño, peso, color, márgenes) |
| `hoverTextClass`  | `string` | `''` | Clases del texto en el círculo; deben coincidir en tipografía con `textClass` y usar el color adecuado (`text-on-primary` en `on-dark`, `text-white` en `on-light`). Si se omite, hay estilos por defecto según `variant` |

> **Loader**, **TextEffect** y **TitleEffect** respetan `prefers-reduced-motion` por sí solos. **HeroMorphingCursorText** no: debes bifurcar en el padre con `usePreferredReducedMotion === 'reduce'` (como en el ejemplo anterior).

> Referencia en el proyecto: `WebDevelopHero.vue` (título `on-dark` y botón CTA `on-light` con `compact`).
