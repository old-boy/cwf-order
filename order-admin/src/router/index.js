import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login'
import Admin from '@/views/Admin'
import Index from '@/views/Index'
import UserList from '@/views/User/UserList'
import UserInfo from '@/views/User/UserInfo'
import Upload from '@/views/User/Upload'
import OrderAdd from '@/views/Order/OrderAdd'

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
          path: 'order/add',
          name: 'OrderAdd',
          component: OrderAdd
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
