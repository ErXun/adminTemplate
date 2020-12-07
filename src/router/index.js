import Vue from 'vue'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import findLast from 'lodash/findLast'
import { check, isLogin } from '../utils/auth'
import 'nprogress/nprogress.css'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/layouts/BasicLayout.vue'),
    meta: { authority: ['user', 'admin'] },
    children: [
      {
        path: '/',
        redirect: "/dashboard/analysis"
      },
      {
        path: '/dashboard',
        name: 'dashboard',
        meta: { icon: 'dashboard', title: '仪表盘' },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/dashboard/analysis',
            name: 'analysis',
            meta: { title: '分析页' },
            component: () => import('@/views/dashboard/Analysis.vue'),
          },
          {
            path: '/dashboard/workplace',
            name: 'workplace',
            meta: { title: '工作区' },
            component: () => import('@/views/dashboard/Workplace.vue'),
          },
        ]
      },
      {
        path: '/form',
        name: 'form',
        meta: { icon: 'form', title: '表单', authority: ['admin'] },
        component: { render: h => h('router-view') },
        children: [
          {
            path: '/form/basicForm',
            name: 'basicForm',
            meta: { title: '基础表单' },
            component: () => import("@/views/form/BasicForm.vue")
          },
          {
            path: '/form/stepForm',
            name: 'stepForm',
            hideChildrenMenu: true,
            meta: { title: '分步表单' },
            component: () => import("@/views/form/stepForm"),
            children: [
              {
                path: '/form/stepForm/stepOne',
                name: 'stepOne',
                component: () => import('@/views/form/stepForm/StepOne.vue'),
              },
              {
                path: '/form/stepForm/stepTwo',
                name: 'stepTwo',
                component: () => import('@/views/form/stepForm/StepTwo.vue'),
              },
              {
                path: '/form/stepForm/stepThree',
                name: 'stepThree',
                component: () => import('@/views/form/stepForm/StepThree.vue'),
              },
            ]
          },

        ]
      }
    ]
  },
  {
    path: '/user',
    hideInMenu: true,  // 不在菜单中显示
    component: () => import('@/layouts/UserLayout.vue'),
    children: [
      {
        path: '/user',
        redirect: '/user/login'
      },
      {
        path: '/user/login',
        name: 'login',
        component: () => import(/*webpackChunkName:"user"*/'../views/User/Login.vue')
      },
      {
        path: '/user/register',
        name: 'register',
        component: () => import('../views/User/Register.vue')
      }
    ]

  },
  {
    path: '*',
    name: '404',
    hideInMenu: true,
    component: () => import('@/views/404.vue')
  },
  {
    path: '/403',
    name: '403',
    hideInMenu: true,
    component: () => import('@/views/403.vue')
  }

]

const router = new VueRouter({
  routes
})
router.beforeEach((to, from, next) => {
  if (to.path !== from.path) {
    NProgress.start()
  }
  const record = findLast(to.matched, record => record.meta.authority)
  if (record && !check(record.meta.authority)) {
    if (!isLogin() && to.path !== '/user/login') {
      next({
        path: '/user/login'
      })
    } else if (to.path !== '/403') {
      next({
        path: '/403'
      })
    }
    NProgress.done()
  }
  next()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
