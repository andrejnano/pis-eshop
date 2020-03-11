import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'

Vue.use(VueRouter)

const routes = [

  {
    path: '/sandbox-dev',
    name: 'Sandbox',
    component: () => import(/* webpackChunkName: "sandbox" */ '../pages/SANDBOX.vue'),
    meta: {
      auth: false,
      title: 'Sandbox'
    }
  },

  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth: false,
      title: 'VPS'
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../pages/About.vue'),
    meta: {
      auth: false,
      title: 'About'
    }
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../pages/Products.vue'),
    meta: {
      auth: false,
      title: 'Products'
    }
  },
  {
    path: '/login',
    name: 'Log in',
    component: () => import(/* webpackChunkName: "login" */ '../pages/LogIn.vue'),
    meta: {
      auth: false,
      title: 'Log in'
    }
  },
  {
    path: '/register',
    name: 'Register',
    component: () => import(/* webpackChunkName: "register" */ '../pages/Register.vue'),
    meta: {
      auth: false,
      title: 'Register'
    }
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import(/* webpackChunkName: "account" */ '../pages/Account.vue'),
    meta: {
      auth: true,
      title: 'Account'
    }
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import(/* webpackChunkName: "cart" */ '../pages/Cart.vue'),
    meta: {
      auth: true,
      title: 'Cart'
    }
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import(/* webpackChunkName: "orders" */ '../pages/Orders.vue'),
    meta: {
      auth: true,
      title: 'Orders'
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "dashboard" */ '../pages/Dashboard.vue'),
    meta: {
      auth: true,
      title: 'Dashboard'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// update page title
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | eshop.blue';
  }
});

export default router
