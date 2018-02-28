// 产品模块
import request from '@/utils/request'
var qs = require('qs')

// 查询产品列表
export function getProductList(param) {
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

// 删除产品
export function deleteProduct(userId) {
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
