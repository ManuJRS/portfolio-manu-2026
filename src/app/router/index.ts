import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    const smooth =
      typeof window !== 'undefined' &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const behavior = smooth ? ('smooth' as const) : ('auto' as const)
    if (to.hash) {
      return { el: to.hash, behavior }
    }
    return { top: 0, left: 0, behavior }
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
