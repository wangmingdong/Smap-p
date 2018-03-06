// 产品管理模块
import { getProList, getParamByPro, checkRepeatForPro, createPro, queryPro, updatePro, syncPro } from '@/api/meta'

const userManage = {
  state: {
  },

  mutations: {
  },

  actions: {
    GetProList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getProList(param).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 初始化下拉框值域
    GetParamByPro({ commit }) {
      return new Promise((resolve, reject) => {
        getParamByPro().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 重复性查询
    CheckRepeatForPro({ commit }, param) {
      return new Promise((resolve, reject) => {
        checkRepeatForPro(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增产品
    CreatePro({ commit }, param) {
      return new Promise((resolve, reject) => {
        createPro(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询产品
    QueryPro({ commit }, userId) {
      return new Promise((resolve, reject) => {
        queryPro(userId).then(response => {
          const result = response.data
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改产品
    UpdatePro({ commit }, param) {
      return new Promise((resolve, reject) => {
        updatePro(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 同步产品
    SyncPro({ commit }, ids) {
      return new Promise((resolve, reject) => {
        syncPro(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default userManage
