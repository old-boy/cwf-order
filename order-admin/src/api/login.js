import request from '@/util/request'

export function login(data) {
  return request({
    url: '/api/opinfo/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/user/info',
    method: 'get',
    params: { token }
  })
}

export function logout(data) {
  console.log(data)
  return request({
    url: '/users/logout',
    method: 'post',
    data
  })
}

export function modifyPassword(data) {
  console.log(data)
  return request({
    url: '/api/opinfo/update_pwd',
    method: 'post',
    data
  })
}

export function userlist(data) {
  console.log(data)
  return request({
    url: '/api/opgroup/index',
    method: 'get',
    data
  })
}

