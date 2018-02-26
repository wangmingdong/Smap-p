import request from '@/utils/request'
var qs = require('qs')

export function login(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    // `transformRequest`选项允许我们在请求发送到服务器之前对请求的数据做出一些改动
    // 该选项只适用于以下请求方式：`put/post/patch`
    // 数组里面的最后一个函数必须返回一个字符串、-一个`ArrayBuffer`或者`Stream`
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify({ param: JSON.stringify({ loginNo: username, loginPwd: password }) })
    }]
  })
}

export function login1(username, password) {
  return request({
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo(token) {
  return request({
    url: '/user/getUserByToken',
    method: 'get',
    params: { token }
  })
}

export function logout() {
  return request({
    url: '/user/logout',
    method: 'post'
  })
}
