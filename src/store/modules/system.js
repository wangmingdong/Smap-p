// 系统模块
import {
  // 用户
  getUserList,
  getRolesByUser,
  getProByUser,
  checkRepeat,
  createUser,
  queryUser,
  updateUser,
  deleteUser,
  // 角色
  getRoleList,
  getModules,
  checkRepeatForRole,
  queryRole,
  createRole,
  updateRole,
  deleteRole
} from '@/api/system'

const userManage = {
  state: {
    userList: [],
    userTotal: 0
  },

  mutations: {
    SET_USER_LIST: (state, userList) => {
      state.userList = userList
    },
    SET_USER_TOTAL: (state, userTotal) => {
      state.userTotal = userTotal
    }
  },

  actions: {
    GetUserList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getUserList(param).then(response => {
          const data = response.data
          commit('SET_USER_LIST', data.result)
          commit('SET_USER_TOTAL', data.total)
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询可选角色
    GetRolesByUser({ commit }) {
      return new Promise((resolve, reject) => {
        getRolesByUser().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询可选产品
    GetProByUser({ commit }) {
      return new Promise((resolve, reject) => {
        getProByUser().then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 重复性查询
    CheckRepeat({ commit }, param) {
      return new Promise((resolve, reject) => {
        checkRepeat(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 新增用户
    CreateUser({ commit }, param) {
      return new Promise((resolve, reject) => {
        param.specInfoId = param.specInfoId.join(',')
        createUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询用户
    QueryUser({ commit }, userId) {
      return new Promise((resolve, reject) => {
        queryUser(userId).then(response => {
          const result = response.data
          result.specInfoId = result.specInfoId.split(',')
          resolve(result)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改用户
    UpdateUser({ commit }, param) {
      return new Promise((resolve, reject) => {
        param.specInfoId = param.specInfoId.join(',')
        updateUser(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除用户
    DeleteUser({ commit }, ids) {
      return new Promise((resolve, reject) => {
        deleteUser(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 查询角色列表
    GetRoleList({ commit }, param) {
      return new Promise((resolve, reject) => {
        getRoleList(param).then(response => {
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

    // 新增角色
    CreateRole({ commit }, param) {
      return new Promise((resolve, reject) => {
        // if (param.roleModules.length) {
        //   param.roleModules = param.roleModules.join(',')
        // }
        createRole(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 修改角色
    UpdateRole({ commit }, param) {
      return new Promise((resolve, reject) => {
        // if (param.roleModules.length) {
        //   param.roleModules = param.roleModules.join(',')
        // }
        delete param.roleName
        updateRole(param).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 删除角色
    DeleteRole({ commit }, ids) {
      return new Promise((resolve, reject) => {
        deleteRole(ids).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 查询角色详情
    QueryRole({ commit }, roleId) {
      return new Promise((resolve, reject) => {
        queryRole(roleId).then(response => {
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
    // 查询角色模块权限
    GetModules({ commit }, param) {
      return new Promise((resolve, reject) => {
        getModules(param).then(response => {
          const data = response.data
          resolve(data)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 角色重复性查询
    CheckRepeatForRole({ commit }, roleName) {
      return new Promise((resolve, reject) => {
        checkRepeatForRole(roleName).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default userManage
