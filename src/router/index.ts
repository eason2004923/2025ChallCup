import { createRouter, createWebHistory } from 'vue-router'
import Diagnosis from '../components/Diagnosis/Diagnosis.vue'
import index from '../components/index.vue'
import Description from '../components/Description/Description.vue'

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
    },
    {
      path: '/Description',
      name: 'Description',
      component: Description
    }
  ]
})

export default router