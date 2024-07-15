// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import IminPrinter from 'imin-printer'; 
import router from './router';
import store from './store';
// import css
import './assets/css/app.css'

  const app =createApp(App)
  app.config.globalProperties.$printer = new IminPrinter('10.0.21.53');
  app.use(store)
  app.use(router)
  app.mount('#app')