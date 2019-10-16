import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '@/layouts/Default.vue'
import Board from '@/views/Board.vue'
import Login from '@/views/Login.vue'
import firebase from '@/services/firebase'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Board,
          meta: {
            auth: true
          }
        },
        {
          path: '/login',
          name: 'login',
          component: Login
        }
      ]
    }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.auth)) {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        next()
      } else {
        next({
          name: 'login'
        })
      }
    })
  } else {
    next()
  }
})

export default router
