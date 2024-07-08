import { createRouter, createWebHistory } from "vue-router";
 

import home from '../pages/home.vue'
import dashboard from '../pages/master/dashboard.vue'
import profile from '../pages/profile.vue'

  const routes = [
    {
      name: 'Dashboard',
      path: '/',
      component: dashboard,
      children: [
         {
          name: 'home',
          path: '/home',
          component:home
        },
        {
          name: 'profile',
          path: '/profile',
          component:profile
        }
      ]
    },
       
  ];
const router = Router();
export default router;
function Router() {
    const router = new createRouter({
        history: createWebHistory(),
        routes,
    });
    return router;
}
  