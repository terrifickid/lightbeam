import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store';

Vue.use(VueRouter)

  const routes = [
  {
    path: '/login',
    name: 'Login',
    meta:{
      roles: ['open']
    },
    component: function () {
      return import('../views/Login.vue');
    }
  },
  {
    path: '/campaign/:id',
    name: 'Campaign',
    meta:{
      roles: ['open']
    },
    component: function () {
      return import('../views/Campaign.vue');
    }
  },
  {
    path: '/',
    name: 'Home',
    meta:{
      roles: ['Administrator']
    },
    component: function () {
      return import('../views/Home.vue');
    }

  },
  {
    path: '/orders',
    name: 'Orders',
    meta:{
      roles: ['Administrator']
    },
    component: function () {
      return import('../views/Orders.vue');
    }

  },
  {
    path: '/users',
    name: 'Users',
    meta:{
      roles: ['Administrator']
    },
    component: function () {
      return import('../views/Users.vue');
    }
  },
  {
    path: '/roles',
    name: 'Roles',
    meta:{
      roles: ['Administrator']
    },
    component: function () {
      return import('../views/Roles.vue');
    }
  },
  {
    path: '/types',
    name: 'Types',
    meta:{
      roles: ['Administrator']
    },
    component: function () {
      return import('../views/Types.vue');
    }
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})



router.beforeEach((to, from, next) => {
  var user = store.getters.getUser;
  var role = null;
  if(user) role = user.role;

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
