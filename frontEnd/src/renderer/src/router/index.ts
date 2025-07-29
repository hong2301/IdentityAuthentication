import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    // {
    //   path: '/user',
    //   name: 'user',
    //   component: UserView,
    //   children: [
    //     {
    //       path: 'order',  // 注意这里不需要加斜杠
    //       name: 'user-order',
    //       component: UserOrderView
    //     }
    //   ]
    // }
  ]
})

export default router