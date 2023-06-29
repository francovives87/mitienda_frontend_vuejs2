import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CreateStore from '../views/register/CreateStore.vue'
import RegisterView from '../views/register/RegisterView.vue'
import LoginView from '../views/login/LoginView.vue'
import TiendaView from '../views/tienda/TiendaView.vue';
import AdminHomeView from '../views/admin/AdminHomeView.vue';
import AdminProductsView from '../views/admin/AdminProductsView.vue';
import AdminStoreSettings from '../views/admin/AdminStoreSettings.vue';
import AdminStoreOrders from '../views/admin/AdminStoreOrders.vue';

Vue.use(VueRouter)

const routes = [
  /* MITIENDA.APP */
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { group: 'mitienda' },
    props: true,
  },
  {
    path: '/register',
    name: 'register',
    component: RegisterView,
    meta: { group: 'mitienda' },
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
    meta: { group: 'mitienda' },
  },
  {
    path: '/create',
    name: 'createStore',
    component: CreateStore,
    meta: { group: 'mitienda' },
  },
  /* MITIENDA.APP */

  /* ADMIN */

  {
    path: '/admin',
    name: 'admin',
    component: AdminHomeView,
    props: true,
    meta: { group: 'admin' },

  },
  {
    path: '/admin/products/',
    name: 'admin_products',
    component: AdminProductsView,
    props: true,
    meta: { group: 'admin' },

  },
  {
    path: '/admin/settings/',
    name: 'admin_settings',
    component: AdminStoreSettings,
    props: true,
    meta: { group: 'admin' },

  },
  {
    path: '/admin/orders/',
    name: 'admin_orders',
    component: AdminStoreOrders,
    props: true,
    meta: { group: 'admin' },

  },

  /* ADMIN */

  /* TIENDA */

  {
    path: '/:name',
    name: 'tienda',
    component: TiendaView,
    props: true,
    meta: { group: 'store' },
  },
  /* TIENDA */


]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
