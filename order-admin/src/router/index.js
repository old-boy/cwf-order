import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import Index from '@/views/Index'
import UserList from '@/views/User/UserList'
import UserInfo from '@/views/User/UserInfo'
import Upload from '@/views/User/Upload'
import OrderList from '@/views/Order/OrderList'
import OrderTag from '@/views/Order/OrderTag'
import SalesList from '@/views/Sales/SalesList'
import ClientList from '@/views/Client/ClientList'
import ClientType from '@/views/Client/ClientType'
import Payment from '@/views/Client/Payment'
import Comment from '@/views/Comments/Comment'
import Product from '@/views/Product/Product'

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
          path: '/product/list',
          name: 'Product',
          component: Product
        },
        {
          path: '/sales/list',
          name: 'SalesList',
          component: SalesList
        },
        {
          path: '/client/list',
          name: 'ClientList',
          component: ClientList
        },
        {
          path: '/client/type',
          name: 'ClientType',
          component: ClientType
        },
        {
          path: '/client/pay',
          name: 'Payment',
          component: Payment
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
