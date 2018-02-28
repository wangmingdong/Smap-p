// 用户管理模块
import request from '@/utils/request'
var qs = require('qs')

// 查询用户列表
export function getUserList(param) {
  return request({
    url: '/system/user/query',
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
    url: '/system/user/getRoleInfo',
    method: 'get',
    params: {}
  })
}

// 用户可选产品列表
export function getProByUser() {
  return request({
    url: '/system/user/getSpecInfo',
    method: 'get',
    params: {}
  })
}

// 重复性查询
export function checkRepeat(param) {
  return request({
    url: '/system/user/checkRepeat',
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
    url: '/system/user/add',
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
    url: '/system/user/view',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 修改用户
export function updateUser(param) {
  return request({
    url: '/system/user/update',
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
    url: '/system/user/delete',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 查询角色列表
export function getRoleList(param) {
  return request({
    url: '/system/role/query',
    method: 'get',
    params: {
      roleStatus: param.roleStatus,
      pageNum: param.pageNum,
      pageSize: param.pageSize
    }
  })
}

// 新增角色
export function createRole(param) {
  return request({
    url: '/system/role/add',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 修改角色
export function updateRole(param) {
  return request({
    url: '/system/role/update',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 删除角色
export function deleteRole(roleId) {
  const param = {
    roleId: roleId
  }
  return request({
    url: '/system/role/delete',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 获取角色权限信息
export function getModules(param) {
  return request({
    url: '/system/role/getModules',
    method: 'get',
    params: {}
  })
}

// 角色重复性查询
export function checkRepeatForRole(roleName) {
  return request({
    url: '/system/role/checkRepeat',
    method: 'get',
    params: {
      roleName: roleName
    }
  })
}

// 查询角色详情
export function queryRole(roleId) {
  return request({
    url: '/system/role/view',
    method: 'get',
    params: {
      roleId: roleId
    }
  })
}
