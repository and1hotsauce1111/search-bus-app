import { createRouter, createWebHistory } from "vue-router";


const routes =[
  {
    path: '/',
    name: 'Home',
    component: () => import("@/views/MobileHome.vue")
  },
  {
    path: '/search/:type',
    name: 'Search',
    component: () => import("@/views/MobileSearchPage.vue")
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router