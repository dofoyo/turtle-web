import Vue from 'vue'
import Router from 'vue-router'
import holds from '@/components/holds'
import preys from '@/components/preys'
import favors from '@/components/favors'
import top50 from '@/components/top50'

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
    },
    {
      path: '/favors',
      name: 'favors',
      component: favors
    },
    {
      path: '/top50',
      name: 'top50',
      component: top50
    }
  ]
})
