// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
// import css
import './assets/css/app.css';

// Import plugin
import IminPrinter from 'imin-printer';

// Create Vue application
const app = createApp(App);

// Use the store and router
app.use(store);
app.use(router);

// Use the IminPrinter plugin
app.use(IminPrinter);

// Mount the Vue application
app.mount('#app');
