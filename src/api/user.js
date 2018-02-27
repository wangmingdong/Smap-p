// 用户管理模块
import request from '@/utils/request'
var qs = require('qs')

// 查询用户列表
export function getUserList(param) {
  return request({
    url: '/user/query',
    method: 'get',
    params: {
      loginNo: param.loginNo,
      userStatus: param.userStatus,
      pageNum: param.pageNum,
      pageSize: param.pageSize
    }
  })
}

// 用户可选角色列表
export function getRolesByUser() {
  return request({
    url: '/user/getRoleInfo',
    method: 'get',
    params: {}
  })
}

// 用户可选产品列表
export function getProByUser() {
  return request({
    url: '/user/getSpecInfo',
    method: 'get',
    params: {}
  })
}

// 重复性查询
export function checkRepeat(param) {
  return request({
    url: '/user/checkRepeat',
    method: 'get',
    params: {
      email: param.email,
      loginNo: param.loginNo,
      userId: param.userId
    }
  })
}

// 新增用户
export function createUser(param) {
  return request({
    url: '/user/add',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 查询用户
export function queryUser(userId) {
  return request({
    url: '/user/view',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 修改用户
export function updateUser(param) {
  return request({
    url: '/user/update',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 删除用户
export function deleteUser(userId) {
  const param = {
    userId: userId
  }
  return request({
    url: '/user/delete',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}
