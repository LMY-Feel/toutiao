// 创建router实例，给main使用
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

import Login from '@/views/login'
import Home from '@/views/home'
import Welcome from '@/views/welcome'
import NotFound from '@/views/404'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    //   name选项作用：找到对应路由规则
    //   跳转方便一些：$router.push('/login') 或者 $router.push({name:'login'})
    { path: '/login', name: 'login', component: Login },
    {
      path: '/',
      component: Home,
      children: [
        // 路由规则：子路由有名称，父路由不需要设置name属性
        { path: '/', name: 'welcome', component: Welcome }
      ]
    },
    { path: '*', name: '404', component: NotFound }
  ]
})

// 前置守卫
router.beforeEach((to, from, next) => {
  // if (to.path === '/login') return next()
  // if (!store.getUser().token) return next('login')
  // next()
  if (to.path !== '/login' && !store.getUser().token) return next('/login')
  next()
})

export default router
