// 数据模块
import { getProductList, publishProduct } from '@/api/data'

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
    PublishProduct({ commit }, ids) {
      return new Promise((resolve, reject) => {
        publishProduct(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default data
