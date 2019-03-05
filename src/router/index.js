import Vue from 'vue'
import Router from 'vue-router'
import holds from '@/components/holds'
import preys from '@/components/preys'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/holds'
    },
    {
      path: '/holds',
      name: 'holds',
      component: holds
    },
    {
      path: '/preys',
      name: 'preys',
      component: preys
    }
  ]
})
