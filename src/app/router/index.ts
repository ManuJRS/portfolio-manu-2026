import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0, left: 0 }
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
    {
      path: '/desarrollo-web/blog/:slug',
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
