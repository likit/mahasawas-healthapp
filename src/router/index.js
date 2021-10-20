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
      },
      {
        path: 'health',
        component: () => import('../views/Health')
      }
    ]
  },
  {
    path: '/milestones',
    name: 'Milestone',
    component: () => import('../views/Milestone')
  },
  {
    path: '/activities/walk-records',
    name: 'WalkRecord',
    component: () => import('../views/activities/WalkRecord')
  },
  {
    path: '/activities/walk-record-form',
    name: 'WalkRecordForm',
    component: () => import('../views/activities/WalkRecordForm')
  },
  {
    path: '/activities/walk-record-detail/:recordId',
    name: 'WalkRecordDetail',
    component: () => import('../views/activities/WalkRecordDetail')
  },
  {
    path: '/activities/jog-records',
    name: 'JogRecord',
    component: () => import('../views/activities/JogRecord')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
