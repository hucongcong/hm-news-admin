import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'
// 使用插件
Vue.use(VueRouter)

// 创建路由实例
const router = new VueRouter({
  // 配置路由规则
  routes: [
    { path: '/', component: Home, name: 'home' },
    { path: '/login', component: Login, name: 'login' }
  ]
})

// 隐藏重复路由跳转的报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

// 配置导航守卫
// 规则：除了登录页，其他所有的页面必须登录了才能访问
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  // if (to.path !== '/login') {
  //   if (token) {
  //     // 如果有token
  //     next()
  //   } else {
  //     // 去登录页
  //     // next('/login')
  //     router.push('/login')
  //   }
  // } else {
  //   next()
  // }

  if (to.path === '/login' || token) {
    next()
  } else {
    router.push('/login')
  }
})

// 导出路由实例
export default router
