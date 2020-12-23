import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import { Notify, Toast } from 'vant';
// import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    redirect: '/Home/Index',
  },
  {
    path: '/Home',
    name: 'Home',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Home.vue'),
    children: [
      {
        path: '/Home/Index',
        name: 'Index',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Index.vue')
      },
      {
        path: '/Home/Order',
        name: 'Order',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/Order.vue')
      },
      {
        path: '/Home/User',
        name: 'User',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/User.vue')
      },
    ]

  },
  {
    path: '/Login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  },
  {
    path: '/Register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Register.vue')
  },
  {
    path: '/ForgetPwd',
    name: 'ForgetPwd',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/ForgetPwd.vue')
  },
  {
    path: '/Commodity_details',
    name: 'Commodity_details',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Commodity_details.vue')
  },
  {
    path: '/Bill',
    name: 'Bill',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Bill.vue')
  },
  {
    path: '/search',
    name: 'Search',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "Search" */ '../views/Search.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach(async (to, from) => {
  // determine whether the user has logged in
  let isLogin = store.state.loginInfo;
  console.log(isLogin, 'isLogin===');
  if (isLogin) {
    if (to.path === '/' || to.path === '/Login' || to.path === '/Register' || to.path === '/ForgetPwd') {
      // user login
      return false;
    }
  } else {
    if (to.path === '/' || to.path === '/Login' || to.path === '/Register' || to.path === '/ForgetPwd' || to.path === '/Home/Index' || to.path === '/Commodity_details') {
      console.log('aaaa')
    } else {
      Toast.fail('请登录之后再操作');
      setTimeout(() => {
        router.push('/Login')
      }, 1000);
      return false;
    }

  }
})

export default router
