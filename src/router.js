import Vue from 'vue'
import Router from 'vue-router'
import BaseLayout from '@/layout/BaseLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'dashboard',
      component: BaseLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/category',
          name: 'category',
          component: () => import(/* webpackChunkName: "demo" */ './views/Category.vue')
        },
        {
          path: '/reports',
          name: 'reports',
          component: () => import(/* webpackChunkName: "demo" */ './views/Reports.vue')
        },
        {
          path: '/transactions',
          name: 'transactions',
          component: () => import(/* webpackChunkName: "demo" */ './views/Transactions.vue')
        },
        {
          path: '/investments',
          name: 'investments',
          component: () => import(/* webpackChunkName: "demo" */ './views/Investments.vue')
        }
      ]
    },
    {
      path: '/logout',
      name: 'logout',
      component: () => import(/* webpackChunkName: "demo" */ './views/Logout.vue')
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
