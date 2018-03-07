// 客户管理模块
import request from '@/utils/request'
var qs = require('qs')

// 查询客户列表
export function getCustomList(param) {
  return request({
    url: '/customer/account/query',
    method: 'get',
    params: {
      loginNo: param.loginNo,
      userType: param.userType,
      userValid: param.userValid,
      pageNum: param.pageNum,
      pageSize: param.pageSize
    }
  })
}

// 获取参数下拉集合
export function getParamsByCustom() {
  return request({
    url: '/customer/account/params',
    method: 'get',
    params: {}
  })
}

// 获取秘钥
export function getUserKey(param) {
  return request({
    url: '/customer/account/getUserKey',
    method: 'get',
    params: {
      loginNo: param.loginNo,
      loginPwd: param.loginPwd
    }
  })
}

// 重复性查询
export function checkRepeatForAccount(param) {
  return request({
    url: '/customer/account/checkRepeat',
    method: 'get',
    params: {
      loginNo: param.loginNo,
      email: param.email
    }
  })
}

// 新增客户
export function createCustom(param) {
  return request({
    url: '/customer/account/add',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 查询客户
export function queryCustom(userId) {
  return request({
    url: '/customer/account/view',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 修改客户
export function updateCustom(param) {
  return request({
    url: '/customer/account/update',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 删除客户
export function deleteCustom(userId) {
  const param = {
    userId: userId
  }
  return request({
    url: '/customer/account/delete',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 查询权限列表
export function getAuthorityList(param) {
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

// 新增权限
export function createAuthority(param) {
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

// 修改权限
export function updateAuthority(param) {
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

// 删除权限
export function deleteAuthority(roleId) {
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

// 权限重复性查询
export function checkRepeatForAuthority(roleName) {
  return request({
    url: '/system/role/checkRepeat',
    method: 'get',
    params: {
      roleName: roleName
    }
  })
}

// 查询权限详情
export function queryAuthority(roleId) {
  return request({
    url: '/system/role/view',
    method: 'get',
    params: {
      roleId: roleId
    }
  })
}
