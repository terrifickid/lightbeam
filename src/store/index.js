import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
Vue.use(Vuex)

import axios from 'axios';

const store = new Vuex.Store({
  state: {
    notice: null,
    user: {
      role: null
    },
  },
  getters:{
    getNotice: (state) => {
       return state.notice;
     },
    getUser: (state) => {
       return state.user;
     },
  },
  mutations: {
    initialiseStore(state) {
      console.log('state init');
      if(localStorage.getItem('orderwrite')) {
        // Replace the state object with the stored item
        this.replaceState(
            Object.assign(state, JSON.parse(localStorage.getItem('orderwrite')))
        );
      }
      state.notice = null;
    },
    setNotice(state, notice){
      state.notice = notice;
    },
    setUser(state, user){
      state.user = user;
    },


  },
  actions: {
    async login({ commit }, creds){
      try{
        const response = await axios.post("http://localhost:3000/users",creds);
        console.log(response.data);
        commit('setUser', null);
        if(response.data[0]){
          commit('setUser', response.data[0]);
          router.push('/').catch(function(){});
          return true;
        }

        commit('setNotice', {error: 'Username or password Incorrect.'});
        return false;
      }catch(err){

        commit('setUser', null);
      }
    }
  },
  modules: {
  }
});
store.subscribe((mutation, state) => {
 localStorage.setItem('orderwrite', JSON.stringify(state));
});

export default store;
