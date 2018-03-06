// 产品管理模块
import request from '@/utils/request'
var qs = require('qs')

// 查询产品列表
export function getProList(param) {
  return request({
    url: '/manage/metadata/query',
    method: 'get',
    params: {
      specInfoName: param.specInfoName,
      pageNum: param.pageNum,
      pageSize: param.pageSize
    }
  })
}

// 初始化下拉框值域
export function getParamByPro() {
  return request({
    url: '/manage/metadata/params',
    method: 'get',
    params: {}
  })
}

// 产品可选产品列表
export function getProByPro() {
  return request({
    url: '/manage/metadata/getSpecInfo',
    method: 'get',
    params: {}
  })
}

// 重复性查询
export function checkRepeatForPro(param) {
  return request({
    url: '/manage/metadata/checkRepeat',
    method: 'get',
    params: {
      specInfoName: param.specInfoName,
      specInfoId: param.specInfoId
    }
  })
}

// 新增产品
export function createPro(param) {
  return request({
    url: '/manage/metadata/add',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 查询产品
export function queryPro(specInfoId) {
  return request({
    url: '/manage/metadata/view',
    method: 'get',
    params: {
      specInfoId: specInfoId
    }
  })
}

// 修改产品
export function updatePro(param) {
  return request({
    url: '/manage/metadata/update',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}

// 同步产品
export function syncPro(specInfoId) {
  const param = {
    specInfoId: specInfoId
  }
  return request({
    url: '/manage/metadata/sync',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}
