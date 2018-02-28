// 数据模块
import { getProductList, deleteProduct } from '@/api/data'

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
          commit('SET_USER_LIST', data.result)
          commit('SET_USER_TOTAL', data.total)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除用户
    DeleteProduct({ commit }, ids) {
      return new Promise((resolve, reject) => {
        deleteProduct(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default data
