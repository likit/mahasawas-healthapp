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
        name: 'Profile',
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
    path: '/profile/personal-info-edit',
    name: 'PersonalInfoForm',
    component: () => import('../views/PersonalInfoForm')
  },
  {
    path: '/profile/groups',
    name: 'GroupList',
    component: () => import('../views/GroupList')
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
  {
    path: '/activities/jog-record-detail/:recordId',
    name: 'JogRecordDetail',
    component: () => import('../views/activities/JogRecordDetail')
  },
  {
    path: '/activities/jog-record-form',
    name: 'JogRecordForm',
    component: () => import('../views/activities/JogRecordForm')
  },
  {
    path: '/activities/swim-records',
    name: 'SwimRecord',
    component: () => import('../views/activities/SwimRecord')
  },
  {
    path: '/activities/swim-record-detail/:recordId',
    name: 'SwimRecordDetail',
    component: () => import('../views/activities/SwimRecordDetail')
  },
  {
    path: '/activities/swim-record-form',
    name: 'SwimRecordForm',
    component: () => import('../views/activities/SwimRecordForm')
  },
  {
    path: '/activities/bike-records',
    name: 'BikeRecord',
    component: () => import('../views/activities/BikeRecord')
  },
  {
    path: '/activities/bike-record-detail/:recordId',
    name: 'BikeRecordDetail',
    component: () => import('../views/activities/BikeRecordDetail')
  },
  {
    path: '/activities/bike-record-form',
    name: 'BikeRecordForm',
    component: () => import('../views/activities/BikeRecordForm')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
