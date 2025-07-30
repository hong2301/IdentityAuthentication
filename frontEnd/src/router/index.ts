import { createRouter, createWebHashHistory } from 'vue-router'
import BackHomeView from '../views/backHome.vue'
import HomeView from '../views/home.vue'
import Layout from '../components/layout.vue'
import PhyexamView from '../views/phyexam.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/layout',
      name: 'layout',
      component: Layout,
      children: [
        {
          path: '',
          name: 'home',
          component: HomeView
        },
        {
          path: 'back',
          name: 'backHome',
          component: BackHomeView,
        },
        {
          path: 'phyexam',
          name: 'phyexam',
          component: PhyexamView
        },
      ]
    },
    {
      path: '/',
      redirect: '/layout'
    }
  ]
})

export default router
