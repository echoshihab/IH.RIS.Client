import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Patient from '@/components/Patient.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Patient Search' },
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/patients/:mrn',
      name: 'PatientDetail',
      component: Patient,
      meta: { title: 'Patient' },
    },
  ],
})

router.beforeEach((to, from, next) => {
  document.title = (to.meta.title || 'IH') as string
  next()
})

export default router
