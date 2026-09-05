import { createRouter, createWebHistory } from 'vue-router'
import { getSmoothScroll, smoothScrollTo } from '@/shared/utils/smoothScroll'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const immediate = reduced || !getSmoothScroll()

    // Deja que Lenis (o el fallback) mueva el scroll; evita doble animación.
    return new Promise((resolve) => {
      requestAnimationFrame(() => {
        if (savedPosition) {
          smoothScrollTo(savedPosition.top, { immediate: true })
        } else if (to.hash) {
          smoothScrollTo(to.hash, { immediate })
        } else {
          smoothScrollTo(0, { immediate })
        }
        resolve(false)
      })
    })
  },
  routes: [
    {
      path: '/',
      redirect: '/es',
    },
    {
      path: '/desarrollo-web',
      name: 'web-develop',
      component: () => import('@/features/web-develop/views/WebDevelopView.vue'),
    },
    /** Compatibilidad: antes los artículos vivían en /desarrollo-web/blog/:slug */
    {
      path: '/desarrollo-web/blog/:slug',
      redirect: (to) => ({
        path: `/desarrollo-web/${String(to.params.slug)}`,
      }),
    },
    {
      path: '/desarrollo-web/blog',
      name: 'blog-preview',
      component: () => import('@/features/blog/views/BlogPreviewView.vue'),
    },
    {
      path: '/desarrollo-web/:slug',
      name: 'blog-article',
      component: () => import('@/features/blog/views/BlogArticleView.vue'),
    },
    {
      path: '/:locale(es|en)/projects/:slug',
      name: 'project-detail',
      component: () => import('@/features/projects/views/ProjectDetailView.vue'),
    },
    {
      path: '/:locale(es|en)/info',
      name: 'info',
      component: () => import('@/features/info/views/InfoView.vue'),
    },
    {
      path: '/:locale(es|en)',
      name: 'home',
      component: () => import('@/features/home/views/HomeView.vue'),
    },
  ],
})

export default router
