import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    meta:{
      roles: ['admin','open']
    },
    component: function () {
      return import('../views/Login.vue');
    }
  },
  {
    path: '/',
    name: 'Home',
    meta:{
      roles: ['admin']
    },
    component: Home,

  },
  {
    path: '/about',
    name: 'About',
    meta:{
      roles: ['super']
    },
    component: function () {
      return import('../views/About.vue');
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  store.commit('initialiseStore');
  store.commit('setNotice',null);
  var user = store.getters.getUser;
  var role = null;
  if(user) role = user.role;

  console.log(user);
  try{
    if(to.meta.roles.includes(role) || to.meta.roles.includes('open')){
      next();
      return;
    }
    next({name: 'Login'});

  }catch(err){
    console.log(err);
  }


});

export default router
