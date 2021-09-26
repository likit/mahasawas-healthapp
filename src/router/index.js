import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs'

const routes = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: Tabs,
    children: [
      {
        path: 'home',
        component: () => import('../views/Home')
      },
      {
        path: 'profile',
        component: () => import('../views/Profile')
      },
      {
        path: 'exercise',
        component: () => import('../views/Exercise')
      },
      {
        path: 'ranking',
        component: () => import('../views/Ranking')
      }
    ]
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
