import Vue from 'vue'
import Vuex from 'vuex'
import router from '../router';
Vue.use(Vuex)

import axios from 'axios';

const store = new Vuex.Store({
  state: {
    notice: {show: false, message: null, color: null},
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
      state.notice = {show: false, message: null, color: null};

    },
    setNotice(state, notice){
      state.notice = notice;
    },
    setUser(state, user){
      state.user = user;
    },


  },
  actions: {
    async dbQuery({ commit }, data){
      try{
        const response = await axios.post("http://localhost:3000/"+data.endpoint, data.params);
         commit('setNotice', {show: true, color: 'success', message: 'Loaded Data!'});
        return response.data;
      }catch(err){
        commit('setNotice', {show: true, color: 'error', message: 'Failed to Load Data!'});
        console.log(err);
      }
    },
    async dbUpdate({ commit }, data){
      try{
        const response = await axios.put("http://localhost:3000/"+data.endpoint, data.params);
         commit('setNotice', {show: true, color: 'success', message: 'Saved Data!'});
        return response.data;
      }catch(err){
        commit('setNotice', {show: true, color: 'error', message: 'Failed to Save Data!'});
        console.log(err);
      }
    },
    async login({ commit }, creds){
      try{
        const response = await axios.post("http://localhost:3000/users",creds);
        console.log(response.data);
        commit('setUser', null);
        if(response.data[0]){
          commit('setUser', response.data[0]);
          commit('setNotice', {show: true, color: 'success', message: 'Login Successful!'});
          router.push('/').catch(function(){});
          return true;
        }

        commit('setNotice', {show: true, color: 'error', message: 'Username or password Incorrect.'});
        return false;
      }catch(err){

        commit('setUser', null);
      }
    }
  },
  modules: {
  }
});

  store.commit('initialiseStore');

store.subscribe((mutation, state) => {
 localStorage.setItem('orderwrite', JSON.stringify(state));
});

export default store;
