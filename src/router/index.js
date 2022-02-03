import { createRouter, createWebHistory } from '@ionic/vue-router';
import Tabs from '../views/Tabs'

const routes = [
  {
    path: '/',
    redirect: '/tabs/home'
  },
  {
    path: '/prohibition',
    name: 'Prohibition',
    component: () => import('../views/Prohibition')
  },
  {
    path: '/tabs',
    name: 'Tabs',
    component: Tabs,
    children: [
      {
        path: 'home',
        name: 'Home',
        component: () => import('../views/Home')
      },
      {
        path: 'profile',
        name: 'Profile',
        component: () => import('../views/Profile')
      },
      {
        path: 'exercise',
        name: 'Exercise',
        component: () => import('../views/Exercise')
      },
      {
        path: 'ranking',
        name: 'Ranking',
        component: () => import('../views/Ranking')
      },
      {
        path: 'health',
        name: 'Health',
        component: () => import('../views/Health')
      },
      {
        path: 'soon',
        name: 'Soon',
        component: () => import('../views/Soon')
      },
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
    path: '/goals',
    name: 'Goal',
    component: () => import('../views/Goals')
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
    path: '/activities/walk-record-goal-form',
    name: 'WalkRecordGoalForm',
    component: () => import('../views/activities/WalkRecordGoalForm')
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
    path: '/activities/jog-record-goal-form',
    name: 'JogRecordGoalForm',
    component: () => import('../views/activities/JogRecordGoalForm')
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
  {
    path: '/activities/dance-records',
    name: 'DanceRecord',
    component: () => import('../views/activities/DanceRecord')
  },
  {
    path: '/activities/dance-record-form',
    name: 'DanceRecordForm',
    component: () => import('../views/activities/DanceRecordForm')
  },
  {
    path: '/activities/dance-record-detail/:recordId',
    name: 'DanceRecordDetail',
    component: () => import('../views/activities/DanceRecordDetail')
  },
  {
    path: '/activities/sport-records',
    name: 'SportRecord',
    component: () => import('../views/activities/SportRecord')
  },
  {
    path: '/activities/sport-record-form',
    name: 'SportRecordForm',
    component: () => import('../views/activities/SportRecordForm')
  },
  {
    path: '/activities/sport-record-detail/:recordId',
    name: 'SportRecordDetail',
    component: () => import('../views/activities/SportRecordDetail')
  },
  {
    path: '/activities/jumprope-records',
    name: 'JumpRopeRecord',
    component: () => import('../views/activities/JumpRopeRecord')
  },
  {
    path: '/activities/jumprope-record-form',
    name: 'JumpRopeRecordForm',
    component: () => import('../views/activities/JumpRopeRecordForm')
  },
  {
    path: '/activities/jumprope-record-detail/:recordId',
    name: 'JumpRopeRecordDetail',
    component: () => import('../views/activities/JumpRopeRecordDetail')
  },
  {
    path: '/activities/hulahoop-records',
    name: 'HulaHoopRecord',
    component: () => import('../views/activities/HulaHoopRecord')
  },
  {
    path: '/activities/hulahoop-record-form',
    name: 'HulaHoopRecordForm',
    component: () => import('../views/activities/HulaHoopRecordForm')
  },
  {
    path: '/activities/hulahoop-record-detail/:recordId',
    name: 'HulaHoopRecordDetail',
    component: () => import('../views/activities/HulaHoopRecordDetail')
  },
  {
    path: '/activities/bodyweight-records',
    name: 'BodyWeightRecord',
    component: () => import('../views/activities/BodyWeightRecord')
  },
  {
    path: '/activities/bodyweight-record-form',
    name: 'BodyWeightRecordForm',
    component: () => import('../views/activities/BodyWeightRecordForm')
  },
  {
    path: '/activities/bodyweight-record-detail/:recordId',
    name: 'BodyWeightRecordDetail',
    component: () => import('../views/activities/BodyWeightRecordDetail')
  },
  {
    path: '/activities/weighttraining-records',
    name: 'WeightTrainingRecord',
    component: () => import('../views/activities/WeightTrainingRecord')
  },
  {
    path: '/activities/weighttraining-record-form',
    name: 'WeightTrainingRecordForm',
    component: () => import('../views/activities/WeightTrainingRecordForm')
  },
  {
    path: '/activities/weighttraining-record-detail/:recordId',
    name: 'WeightTrainingRecordDetail',
    component: () => import('../views/activities/WeightTrainingRecordDetail')
  },
  {
    path: '/challenges/:recordId',
    name: 'ChallengeDetail',
    component: () => import('../views/ChallengeDetail')
  },
  {
    path: '/ranking-challenge/:recordId',
    name: 'RankingChallenge',
    component: () => import('../views/ranking/RankingChallenge')
  },
  {
    path: '/health/lab',
    name: 'LabRecord',
    component: () => import('../views/health/lab/LabRecord')
  },
  {
    path: '/health/lab/form',
    name: 'LabRecordForm',
    component: () => import('../views/health/lab/LabRecordForm')
  },
  {
    path: '/health/drink',
    name: 'Drink',
    component: () => import('../views/health/diet/Drink')
  },
  {
    path: '/physical/weight',
    name: 'weight',
    component: () => import('../views/physical/weight')
  },
  {
    path: '/physical/height',
    name: 'height',
    component: () => import('../views/physical/height')
  },
  {
    path: '/diet/foodsearch',
    name: 'foodsearch',
    component: () => import('../views/health/diet/FoodSearch')
  },
  {
    path: '/meditation',
    name: 'MeditationRecord',
    component: () => import('../views/health/mediation/MeditationRecord')
  },
  {
    path: '/meditation/form',
    name: 'MeditationRecordForm',
    component: () => import('../views/health/mediation/MeditationRecordForm')
  },
  {
    path: '/mood',
    name: 'MoodRecord',
    component: () => import('../views/health/mood/MoodRecord')
  },
  {
    path: '/mood/form',
    name: 'MoodRecordForm',
    component: () => import('../views/health/mood/MoodRecordForm')
  },
  {
    path: '/mood/detail/:recordId',
    name: 'MoodRecordDetail',
    component: () => import('../views/health/mood/MoodRecordDetail')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
