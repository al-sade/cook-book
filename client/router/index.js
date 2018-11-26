import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/Home'
import Manager from '../components/Manager'
import Recipe from '../components/Recipe'

Vue.use(Router);

export default new Router({
  routes: [
    {
    path: '/',
    name: 'Home',
    component: Home
    },
      {
    path: '/recipe/:title',
    name: 'Recipe',
    component: Recipe
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    }
  ],
    mode: 'history'
})
