import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/settings',
      name: 'settings',
      component: () => import('../views/SettingsFormView.vue')
    },
    {
      path: '/scheduler',
      name: 'scheduler',
      component: () => import('../views/SchedulerTableView.vue')
    }
  ]
})

export default router
