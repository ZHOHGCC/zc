import Vue from 'vue'
import Router from 'vue-router'
import Index from './views/Index.vue'
import Nofind from './views/404'
import Login from './views/Login'
import Home from './views/Home.vue'

import mysql from './views/mysql.vue'
// --------------------------------------------------------主页模块  
import Banner from './views/homePage/Banner'
import Advertising from './views/homePage/Advertising'
import Recommend from './views/homePage/Recommend'
// ------------------------------------------------------------
import Financial from './views/Financial/Check' //-------------------金融
import cdkey from './views/Financial/cdkey'
import unused from './views/Financial/unused'
import LookMoney from './views/Financial/Visible/lookMoney'
import LookScore from './views/Financial/Visible/lookScore'
import LookWallet from './views/Financial/Visible/lookWallet'

// ------------------------------------------------------------- 活动公告
import Activity from './views/ActAnn/Activity.vue'
import Announcement from './views/ActAnn/Announcement.vue'
// -------------------------------------------------------------
import Share from './views/Share/Share'

// --------------------------------------
import Product from './views/Product/Product'
// --------------------------------------------------
import OrderForm from './views/orderForm/orderForm'
// ------------------------------------------------------------------------
import reply from './views/Reply/reply'

import lookProps from './views/Product/Visible/props'

const withdraw = () => import('./views/Financial/withdraw')

Vue.use(Router)

const router = new Router({


  routes: [{
    path: '*',
    name: '/404',
    component: Nofind
  },
  {
    path: '/',
    redirect: '/index'
  },

  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/index',

    component: Index,
    children: [{
      path: '',
      component: Home
    },
    // -------------------------------------- 订单
    {
      path: '/orderForm',
      name: 'orderForm',
      component: OrderForm
    },

    {
      path: '/mysql',
      name: 'mysql',
      component: mysql
    },
    // ----------------------------------- 用户 
    {
      path: '/home',
      name: 'home',
      component: Home
    },

    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/activity',
      name: 'activity',
      component: Activity
    },
    // --------------------------------------------------- 主页设置  广告，推荐 banner
    {
      path: '/advertising',
      name: 'Advertising',
      component: Advertising
    },
    {
      path: '/banner',
      name: 'Banner',
      component: Banner
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    // -------------------------------------  金融模块
    {
      path: '/financial',
      name: 'Financial',
      component: Financial,

    },
    {
      path: '/cdkey',
      name: 'cdkey',
      component: cdkey,

    },
    {
      path: '/unused',
      name: 'unused',
      component: unused,

    },
    {
      path: '/withdraw',
      name: 'cdkey',
      component: withdraw,

    },
    // ------
    {
      path: '/lookMoney',
      name: 'LookMoney',
      component: LookMoney
    },
    {
      path: '/lookScore',
      name: 'LookScore',
      component: LookScore
    },
    {
      path: '/lookWallet',
      name: 'LookWallet',
      component: LookWallet
    },

    // ------------------------------------------------ 分享
    {
      path: '/share',
      name: 'Share',
      component: Share
    },
    // ------------------------------------------------ 产品模块
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/lookProps',
      name: 'lookProps',
      component: lookProps
    },
    // -------------------------------
    {
      path: '/reply',
      name: 'reply',
      component: reply
    },
    ]
  },


  ]
})

// 添加路由守卫!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
router.beforeEach((to, from, next) => {
  const isLogin = localStorage.eleToken ? true : false;
  if (to.path == "/login") {
    next();
  } else {
    isLogin ? next() : next("/login");
  }
})

export default router;