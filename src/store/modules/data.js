// 数据模块
import { getProductList, publishProduct, getProductForUser, discardProduct, getProInfo } from '@/api/data'

const data = {
  state: {
  },

  mutations: {
  },

  actions: {
    GetProductList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getProductList(param).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 发布产品
    PublishProduct({ commit }, param) {
      return new Promise((resolve, reject) => {
        publishProduct(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 作废产品
    DiscardProduct({ commit }, param) {
      return new Promise((resolve, reject) => {
        discardProduct(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询用户所属产品
    GetProductForUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        getProductForUser(userId).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询产品详情
    GetProInfo({ commit }, specProductId) {
      return new Promise((resolve, reject) => {
        getProInfo(specProductId).then(response => {
          resolve(response.data)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default data
