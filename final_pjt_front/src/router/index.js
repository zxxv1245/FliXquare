import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/NoLogin/HomeView.vue'
import SignupView from '@/views/NoLogin/SignupView.vue'
import LoginView from '@/views/NoLogin/LoginView.vue'
import ArticlesView from '@/views/YesLogin/ArticlesView.vue'
import LatestView from '@/views/YesLogin/LatestView.vue'
import MovieView from '@/views/YesLogin/MovieView.vue'
import PopularView from '@/views/YesLogin/PopularView.vue'
import ProfileView from '@/views/YesLogin/ProfileView.vue'
import StoreView from '@/views/YesLogin/StoreView.vue'


const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path : '/',
      name : 'HomeView',
      component : HomeView
    },
    {
      path : '/signup',
      name : 'SignupView',
      component : SignupView
    },
    {
      path : '/login',
      name : 'LoginView',
      component : LoginView
    },
    {
      path : '/articles',
      name : 'ArticlesView',
      component : ArticlesView
    },
    {
      path : '/latest',
      name : 'LatestView',
      component : LatestView
    },
    {
      path : '/movie',
      name : 'MovieView',
      component : MovieView
    },
    {
      path : '/popular',
      name : 'PopularView',
      component : PopularView
    },
    {
      path : '/profile',
      name : 'ProfileView',
      component : ProfileView
    },
    {
      path : '/store',
      name : 'StoreView',
      component : StoreView
    },
  ]
})

export default router
