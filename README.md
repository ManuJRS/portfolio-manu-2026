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

> Todos los efectos respetan `prefers-reduced-motion` y reducen o eliminan las animaciones cuando el usuario lo tiene activado.
