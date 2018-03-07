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
  checkRepeatForAuthority,
  queryAuthority,
  createAuthority,
  updateAuthority,
  deleteAuthority
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
          if (data.roleModules) {
            data.roleModules = data.roleModules.split(',')
          }
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增权限
    CreateAuthority({ commit }, param) {
      return new Promise((resolve, reject) => {
        // if (param.roleModules.length) {
        //   param.roleModules = param.roleModules.join(',')
        // }
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
        // if (param.roleModules.length) {
        //   param.roleModules = param.roleModules.join(',')
        // }
        delete param.roleName
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
    QueryAuthority({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        queryAuthority(roleId).then(response => {
          const result = response.data
          // if (result.roleModules) {
          //   result.roleModules = result.roleModules.split(',')
          // }
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 权限重复性查询
    CheckRepeatForAuthority({ commit }, roleName) {
      return new Promise((resolve, reject) => {
        checkRepeatForAuthority(roleName).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default userManage
