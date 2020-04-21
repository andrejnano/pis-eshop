import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../pages/Home.vue'
import store from '../store'

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
    path: '/categories',
    name: 'Categories',
    component: () => import(/* webpackChunkName: "products" */ '../pages/Categories.vue'),
    meta: {
      auth: false,
      title: 'Categories'
    }
  },
  {
    path: '/categories/:category_id',
    name: 'Products',
    component: () => import(/* webpackChunkName: "products" */ '../pages/Products.vue'),
    meta: {
      auth: false,
      title: 'Products'
    }
  },
  {
    path: '/pricing',
    name: 'Pricing',
    component: () => import(/* webpackChunkName: "pricing" */ '../pages/Pricing.vue'),
    meta: {
      auth: false,
      title: 'Pricing'
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
  scrollBehavior: () => ({ y: 0 }),
  routes,
  mode: 'history',
  base: process.env.BASE_URL,
})



// control auth access with router middleware
router.beforeEach((to, from, next) => {
  // allow acces depending on the login state
  if (to.matched.some(record => record.meta.auth)) {
    // check if user is authenticated using a token
    if (!store.getters.isAuth) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

// update page title
router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | eshop.blue';
  }
});

export default router
