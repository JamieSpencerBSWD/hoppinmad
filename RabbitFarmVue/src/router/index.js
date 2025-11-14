import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '../views/HomePage.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/generate',
      name: 'generate',
      // route level code-splitting
      // this generates a separate chunk (Generate.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/GenerateRabbit.vue'),
    },
  ],
})

export default router
