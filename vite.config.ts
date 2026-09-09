import { fileURLToPath, URL } from 'node:url'
import type { IncomingMessage } from 'node:http'
import { defineConfig, type Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from '@tailwindcss/vite'

/** Simula Netlify Forms en `vite dev` (POST / con form-name=contacto → 200). */
function netlifyFormsDevMock(): Plugin {
  return {
    name: 'netlify-forms-dev-mock',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.method !== 'POST') {
          next()
          return
        }

        const url = req.url?.split('?')[0] ?? ''
        if (url !== '/' && url !== '') {
          next()
          return
        }

        readRequestBody(req)
          .then((raw) => {
            const params = new URLSearchParams(raw)
            if (params.get('form-name') !== 'contacto') {
              next()
              return
            }

            console.info(
              '[netlify-forms-dev-mock] Envío de contacto recibido (solo local; no se manda correo):',
              Object.fromEntries(params.entries()),
            )

            res.statusCode = 200
            res.setHeader('Content-Type', 'text/html; charset=utf-8')
            res.end('<html><body>OK</body></html>')
          })
          .catch(() => {
            res.statusCode = 500
            res.end('Form mock error')
          })
      })
    },
  }
}

function readRequestBody(req: IncomingMessage): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    req.on('data', (chunk: Buffer) => chunks.push(chunk))
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')))
    req.on('error', reject)
  })
}

export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    vueDevTools(),
    tailwindcss(),
    netlifyFormsDevMock(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
