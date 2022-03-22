import { createRouter, createWebHashHistory } from 'vue-router'
const routes = [
  {
    path: '/',
    name: 'Index',
    component: () => import('../views/index.vue')
  },
  {
    path: '/ar',
    name: 'Ar',
    component: () => import('../views/ar.vue')
  }
]

const options = {
  history: createWebHashHistory(),
  routes
}

const router = createRouter(options)
export default router