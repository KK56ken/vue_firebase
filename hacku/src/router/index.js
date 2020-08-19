import Vue from 'vue'
import VueRouter from 'vue-router'
import HelloWorld from '../components/HelloWorld'
import Signup from '../components/Signup'
import Signin from '../components/Signin'
import firebase from 'firebase'

Vue.use(VueRouter)

const routes = [
  {
    path: '*',
    redirect: 'Signin'
  },
  {
    path: '/',
    name: 'HelloWorld',
    component: HelloWorld,
    meta: {requiresAuth: true}
  },
  {
    path: '/Signup',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/Signin',
    name: 'Signin',
    component: Signin
  }

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})


router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  if (requiresAuth) {
    // このルートはログインされているかどうか認証が必要です。
    // もしされていないならば、ログインページにリダイレクトします。
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        next()
      } else {
        next({
          path: '/Signin',
          query: { redirect: to.fullPath }
        })
      }
    })
  } else {
    next() // next() を常に呼び出すようにしてください!
  }
})


export default router
