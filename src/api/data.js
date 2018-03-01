// 产品模块
import request from '@/utils/request'
var qs = require('qs')

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

// 发布产品
export function publishProduct(userId) {
  const param = {
    userId: userId
  }
  return request({
    url: '/manage/common/release',
    method: 'post',
    data: param,
    transformRequest: [function(data) {
      // 返回数据需要格式化一下
      return qs.stringify(param)
    }]
  })
}
