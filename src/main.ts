import { createApp } from 'vue'
import { createHead } from '@vueuse/head'
import { createPinia } from 'pinia'
import { createGtag } from 'vue-gtag'
import './main.css'
import App from './App.vue'
import router from '@/app/router'

const app = createApp(App)

app.use(createPinia())
app.use(createHead())
app.use(router)

const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID
if (measurementId) {
  app.use(
    createGtag({
      tagId: measurementId,
      pageTracker: { router },
    }),
  )
}

app.mount('#app')
