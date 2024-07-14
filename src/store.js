// src/store.js
import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    isLoggedIn: false,
    user: null,
  },
  mutations: {
    setLoggedIn(state, value) {
      state.isLoggedIn = value;
    },
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    async validateSession({ commit }) {
      try {
        const username = localStorage.getItem('username');
        const password = localStorage.getItem('password');
        
        if (username && password) {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/user/login/${username}/${password}`, {
            headers: {
              "api-key": import.meta.env.VITE_API_KEY_HEADER,
            },
          });
          
          if (response.data && response.data.data.length > 0) {
            commit('setLoggedIn', true);
            commit('setUser', response.data.data[0]);
          } else {
            commit('setLoggedIn', false);
          }
        } else {
          commit('setLoggedIn', false);
        }
      } catch (error) {
        commit('setLoggedIn', false);
        console.error('Session validation failed:', error);
      }
    },
  },
});

export default store;
