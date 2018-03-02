// 产品模块
import request from '@/utils/request'
// var qs = require('qs')

// 查询产品列表
export function getProductList(param) {
  return request({
    url: '/manage/common/query',
    method: 'get',
    params: {
      specInfoId: param.specInfoId,
      productName: param.productName,
      pageNum: param.pageNum,
      pageSize: param.pageSize
    }
  })
}

// 查询用户所属产品
export function getProductForUser(userId) {
  return request({
    url: '/manage/common/userspec',
    method: 'get',
    params: {
      userId: userId
    }
  })
}

// 作废常规产品
export function discardProduct(param) {
  return request({
    url: '/manage/common/discard',
    method: 'get',
    params: {
      userId: param.userId,
      specProductId: param.specProductId
    }
  })
}

// 发布产品
export function publishProduct(param) {
  return request({
    url: '/manage/common/release',
    method: 'get',
    params: {
      userId: param.userId,
      specProductId: param.specProductId
    }
  })
}

// 查询产品详情
export function getProInfo(specProductId) {
  return request({
    url: '/manage/common/view',
    method: 'get',
    params: {
      specProductId: specProductId
    }
  })
}
