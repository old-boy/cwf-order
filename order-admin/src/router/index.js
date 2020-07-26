import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import Index from '@/views/Index'
import UserList from '@/views/User/UserList'
import UserInfo from '@/views/User/UserInfo'
import Upload from '@/views/User/Upload'
import OrderAdd from '@/views/Order/OrderAdd'
import OrderList from '@/views/Order/OrderList'
import OrderTag from '@/views/Order/OrderTag'
import SalesList from '@/views/Sales/SalesList'
import SalesAdd from '@/views/Sales/SalesAdd'
import Comment from '@/views/Comments/Comment'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/admin',
      name: 'admin',
      component: Admin,
      redirect: '/admin/userList',//登录成功后跳转的位置
      children: [
        {
          path: 'index',
          name: 'index',
          component: Index
        },
        {
          path: 'userList',
          name: 'userList',
          component: UserList
        },
        {
          path: 'userInfo/:id',
          name: 'userInfo',
          component: UserInfo
        },
        {
          path: 'upload',
          name: 'upload',
          component: Upload
        },
        {
          path: '/order/add',
          name: 'OrderAdd',
          component: OrderAdd
        },
        {
          path: '/order/list',
          name: 'OrderList',
          component: OrderList
        },
        {
          path: '/order/tag',
          name: 'OrderTag',
          component: OrderTag
        },
        {
          path: '/sales/list',
          name: 'SalesList',
          component: SalesList
        },
        {
          path: '/sales/add',
          name: 'SalesAdd',
          component: SalesAdd
        },
        {
          path: 'comment',
          name: 'comment',
          component: Comment
        },
        {
          path: '*',
          redirect: '/admin'
        }
      ]
    }
  ]
})
