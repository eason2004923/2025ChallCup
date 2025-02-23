import { createRouter, createWebHistory } from 'vue-router'
import Diagnosis from '../components/Diagnosis/Diagnosis.vue'
import index from '../components/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Index',
      component: index
    },
    {
      path: '/diagnosis',
      name: 'diagnosis',
      component: Diagnosis
    }
  ]
})

export default router