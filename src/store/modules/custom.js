// 系统模块
import {
  // 客户
  getCustomList,
  getParamsByCustom,
  getUserKey,
  checkRepeatForAccount,
  createCustom,
  queryCustom,
  updateCustom,
  deleteCustom,
  // 权限
  getAuthorityList,
  queryAuthority,
  createAuthority,
  updateAuthority,
  deleteAuthority,
  getAuthorityParams,
  getSpecTypeParamsForPro,
  checkRepeatForAuthority
} from '@/api/custom'

const userManage = {
  state: {},

  mutations: {},

  actions: {
    GetCustomList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getCustomList(param).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取参数下拉集合
    GetParamsByCustom({ commit }) {
      return new Promise((resolve, reject) => {
        getParamsByCustom().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 生成秘钥
    GetUserKey({ commit }, param) {
      return new Promise((resolve, reject) => {
        getUserKey(param).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 重复性查询
    CheckRepeatForAccount({ commit }, param) {
      return new Promise((resolve, reject) => {
        checkRepeatForAccount(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增客户
    CreateCustom({ commit }, param) {
      return new Promise((resolve, reject) => {
        createCustom(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询客户
    QueryCustom({ commit }, userId) {
      return new Promise((resolve, reject) => {
        queryCustom(userId).then(response => {
          const result = response.data
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改客户
    UpdateCustom({ commit }, param) {
      return new Promise((resolve, reject) => {
        updateCustom(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除客户
    DeleteCustom({ commit }, ids) {
      return new Promise((resolve, reject) => {
        deleteCustom(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询权限列表
    GetAuthorityList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getAuthorityList(param).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增权限
    CreateAuthority({ commit }, param) {
      return new Promise((resolve, reject) => {
        createAuthority(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改权限
    UpdateAuthority({ commit }, param) {
      return new Promise((resolve, reject) => {
        updateAuthority(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除权限
    DeleteAuthority({ commit }, ids) {
      return new Promise((resolve, reject) => {
        deleteAuthority(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询权限详情
    QueryAuthority({ commit }, customerId) {
      return new Promise((resolve, reject) => {
        queryAuthority(customerId).then(response => {
          const result = response.data
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取文件类型，产品列表
    GetAuthorityParams({ commit }) {
      return new Promise((resolve, reject) => {
        getAuthorityParams().then(response => {
          const result = response.data
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询产品类型和模式值域
    GetSpecTypeParamsForPro({ commit }) {
      return new Promise((resolve, reject) => {
        getSpecTypeParamsForPro().then(response => {
          const result = response.data
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 检查客户权限已配置
    CheckRepeatForAuthority({ commit }, param) {
      return new Promise((resolve, reject) => {
        checkRepeatForAuthority(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default userManage
