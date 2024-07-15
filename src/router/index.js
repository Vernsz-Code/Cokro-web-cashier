// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';

import produk from '../pages/produk.vue';
import searchProduk from '../pages/searchProduk.vue';
import dashboard from '../pages/master/dashboard.vue';
import transaksi from '../pages/transaksi.vue';
import unPage from '../pages/undefinedPage.vue';
import login from '../pages/login.vue';
import testPrint from '../pages/testPrint.vue'

const routes = [
  {
    path: '/login',
    name: 'login',
    component: login,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'undefined page',
    component: unPage,
  },
  {
    path: '/',
    name: 'dashboard',
    component: dashboard,
    children:[
      
  {
    path: '/produk',
    name: 'produk',
    component: produk,
    meta: { requiresAuth: true },
  },
  {
    path: '/testprint',
    name: 'testprint',
    component: testPrint,
    meta: { requiresAuth: true },
  },
  {
    path: '/produk/:search',
    name: 'searchProduk',
    component: searchProduk,
    meta: { requiresAuth: true },
  },
  {
    path: '/transaksi',
    name: 'transaksi',
    component: transaksi,
    meta: { requiresAuth: true },
  },
    ],
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(async (to, from, next) => {
  await store.dispatch('validateSession');

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!store.state.isLoggedIn) {
      next({ name: 'login' });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
