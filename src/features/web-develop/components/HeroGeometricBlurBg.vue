<script setup lang="ts">
/**
 * Port de geometric-blur-mesh (bg-square.mdc) — WebGL wireframe 3D, sin React.
 *
 * Posición y tamaño: `layout`, `placement`, `wrapperClass` (Tailwind en este archivo).
 */
import { computed, nextTick, onBeforeUnmount, onMounted, useTemplateRef } from 'vue'
import { cn } from '@/shared/utils/cn'
import fragmentShader from './heroGeometricBlur.fragment.glsl?raw'
import vertexShader from './heroGeometricBlur.vertex.glsl?raw'

export type HeroGeometricLayout = 'full' | 'corner'
export type HeroGeometricPlacement =
  | 'top-left'
  | 'top-right'
  | 'bottom-left'
  | 'bottom-right'
  | 'center'

const placementClass: Record<HeroGeometricPlacement, string> = {
  'top-left': 'left-0 top-0',
  'top-right': 'right-0 top-0',
  'bottom-left': 'left-0 bottom-0',
  'bottom-right': 'right-0 bottom-0',
  center: 'left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2',
}

/** Tamaño cuando `layout="corner"` (ajústalo aquí o con `wrapperClass`). */
const cornerSizeClass =
  'h-[min(62vh,520px)] w-[min(100%,620px)] sm:h-[min(44vh,360px)] sm:max-w-[480px] lg:h-[min(66vh,1200px)] lg:max-w-[1220px]'

const props = withDefaults(
  defineProps<{
    /** 0 = cubo … 7 = morphing (ver shader). */
    shapeIndex?: number
    /** `full` = todo el contenedor padre (`inset-0`). `corner` = bloque según `placement`. */
    layout?: HeroGeometricLayout
    /** Solo aplica si `layout="corner"`. */
    placement?: HeroGeometricPlacement
    /** Clases extra en el contenedor posicionado (p. ej. `max-w-md top-8`). */
    wrapperClass?: string
  }>(),
  {
    shapeIndex: 0,
    layout: 'corner',
    placement: 'top-left',
    wrapperClass: '',
  },
)

const rootClass = computed(() =>
  cn(
    'pointer-events-none absolute z-0 overflow-hidden',
    props.layout === 'full' ? 'inset-0' : cn(placementClass[props.placement], cornerSizeClass),
    props.wrapperClass,
  ),
)

const containerRef = useTemplateRef('containerEl')
const canvasRef = useTemplateRef('canvasEl')

let gl: WebGLRenderingContext | null = null
let program: WebGLProgram | null = null
let rafId = 0
let uniforms: Record<string, WebGLUniformLocation | null> = {}
const startTime = Date.now()
const mouseRef = { x: 0, y: 0 }
const mouseDampRef = { x: 0, y: 0 }
let resizeObserver: ResizeObserver | null = null
let lastTime = performance.now()

function onMouseMove(e: MouseEvent) {
  const canvas = canvasRef.value
  if (!canvas) return
  const rect = canvas.getBoundingClientRect()
  mouseRef.x = e.clientX - rect.left
  mouseRef.y = e.clientY - rect.top
}

function onTouchMove(e: TouchEvent) {
  const canvas = canvasRef.value
  if (!canvas || !e.touches[0]) return
  const rect = canvas.getBoundingClientRect()
  mouseRef.x = e.touches[0].clientX - rect.left
  mouseRef.y = e.touches[0].clientY - rect.top
}

function resize() {
  const canvas = canvasRef.value
  const container = containerRef.value
  if (!canvas || !container) return
  const dpr = Math.min(window.devicePixelRatio, 2)
  const width = Math.max(1, container.clientWidth)
  const height = Math.max(1, container.clientHeight)
  canvas.width = width * dpr
  canvas.height = height * dpr
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  gl?.viewport(0, 0, canvas.width, canvas.height)
}

function initGL() {
  const canvas = canvasRef.value
  if (!canvas) return
  const ctx = canvas.getContext('webgl', {
    antialias: true,
    alpha: false,
    premultipliedAlpha: false,
    preserveDrawingBuffer: false,
  })
  if (!ctx) {
    console.warn('[HeroGeometricBlurBg] WebGL no disponible')
    return
  }
  gl = ctx
  /* Mismo token que `bg-surface-container-lowest` (#0e0e0e) — mantener sync con WebDevelopHero */
  gl.clearColor(14 / 255, 14 / 255, 14 / 255, 1)

  function compileShader(type: number, source: string): WebGLShader | null {
    const shader = gl!.createShader(type)
    if (!shader) return null
    gl!.shaderSource(shader, source)
    gl!.compileShader(shader)
    if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
      console.error('[HeroGeometricBlurBg]', gl!.getShaderInfoLog(shader))
      gl!.deleteShader(shader)
      return null
    }
    return shader
  }

  const vs = compileShader(gl.VERTEX_SHADER, vertexShader)
  const fs = compileShader(gl.FRAGMENT_SHADER, fragmentShader)
  if (!vs || !fs) return

  program = gl.createProgram()
  if (!program) return
  gl.attachShader(program, vs)
  gl.attachShader(program, fs)
  gl.linkProgram(program)
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error('[HeroGeometricBlurBg]', gl.getProgramInfoLog(program))
    return
  }
  gl.useProgram(program)

  uniforms = {
    u_mouse: gl.getUniformLocation(program, 'u_mouse'),
    u_resolution: gl.getUniformLocation(program, 'u_resolution'),
    u_pixelRatio: gl.getUniformLocation(program, 'u_pixelRatio'),
    u_time: gl.getUniformLocation(program, 'u_time'),
    u_shape: gl.getUniformLocation(program, 'u_shape'),
  }

  const vertices = new Float32Array([-1, -1, 0, 1, -1, 0, -1, 1, 0, 1, 1, 0])
  const uvs = new Float32Array([0, 0, 1, 0, 0, 1, 1, 1])

  const positionBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW)
  const positionLocation = gl.getAttribLocation(program, 'a_position')
  gl.enableVertexAttribArray(positionLocation)
  gl.vertexAttribPointer(positionLocation, 3, gl.FLOAT, false, 0, 0)

  const uvBuffer = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer)
  gl.bufferData(gl.ARRAY_BUFFER, uvs, gl.STATIC_DRAW)
  const uvLocation = gl.getAttribLocation(program, 'a_uv')
  gl.enableVertexAttribArray(uvLocation)
  gl.vertexAttribPointer(uvLocation, 2, gl.FLOAT, false, 0, 0)
}

function animate(time: number) {
  rafId = requestAnimationFrame(animate)
  const canvas = canvasRef.value
  if (!gl || !program || !canvas) return

  const deltaTime = (time - lastTime) / 1000
  lastTime = time

  const dampingFactor = 8
  mouseDampRef.x += (mouseRef.x - mouseDampRef.x) * dampingFactor * deltaTime
  mouseDampRef.y += (mouseRef.y - mouseDampRef.y) * dampingFactor * deltaTime

  gl.clear(gl.COLOR_BUFFER_BIT)

  const dpr = Math.min(window.devicePixelRatio, 2)
  const elapsedTime = (Date.now() - startTime) / 1000

  if (uniforms.u_mouse) gl.uniform2f(uniforms.u_mouse, mouseDampRef.x, mouseDampRef.y)
  if (uniforms.u_resolution) gl.uniform2f(uniforms.u_resolution, canvas.width, canvas.height)
  if (uniforms.u_pixelRatio) gl.uniform1f(uniforms.u_pixelRatio, dpr)
  if (uniforms.u_time) gl.uniform1f(uniforms.u_time, elapsedTime)
  if (uniforms.u_shape) gl.uniform1i(uniforms.u_shape, props.shapeIndex)

  gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
}

onMounted(() => {
  void nextTick(() => {
    initGL()
    resize()
    resizeObserver = new ResizeObserver(() => resize())
    if (containerRef.value) resizeObserver.observe(containerRef.value)
    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('touchmove', onTouchMove, { passive: true })
    lastTime = performance.now()
    rafId = requestAnimationFrame(animate)
  })
})

onBeforeUnmount(() => {
  cancelAnimationFrame(rafId)
  resizeObserver?.disconnect()
  window.removeEventListener('mousemove', onMouseMove)
  window.removeEventListener('touchmove', onTouchMove)
  if (gl && program) {
    gl.deleteProgram(program)
  }
  gl = null
  program = null
})
</script>

<template>
  <div :class="rootClass" aria-hidden="true">
    <div ref="containerEl" class="absolute inset-0 overflow-hidden">
      <canvas ref="canvasEl" class="block h-full w-full" />
    </div>
  </div>
</template>
