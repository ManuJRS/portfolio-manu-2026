import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/es',
    },
    {
      path: '/:locale(es|en)/projects/:slug',
      name: 'project-detail',
      component: () => import('@/features/projects/views/ProjectDetailView.vue'),
    },
    {
      path: '/:locale(es|en)',
      name: 'home',
      component: () => import('@/features/home/views/HomeView.vue'),
    },
  ],
})

export default router
