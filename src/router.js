import Vue from 'vue'
import Router from 'vue-router'
import DefaultLayout from '@/layouts/Default.vue'
import Board from '@/views/Board.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: DefaultLayout,
      children: [
        {
          path: '',
          name: 'home',
          component: Board
        }
      ]
    }
  ]
})
