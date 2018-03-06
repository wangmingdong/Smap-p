import { login, logout, getInfo, getModuleAuthority } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    name: '',
    avatar: '',
    roles: [],
    authority: null,
    userId: null,
    moduleOpts: ''
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    },
    SET_AUTHORITY: (state, authority) => {
      state.authority = authority
    },
    SET_USER_ID: (state, userId) => {
      state.userId = userId
    },
    SET_MODULE_OPTS: (state, moduleOpts) => {
      state.moduleOpts = moduleOpts
    },
    SET_MENU_OPTS: (state, menuOpts) => {
      state.menuOpts = menuOpts
    }
  },

  actions: {
    Login({ commit }, userInfo) {
      const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        login(username, userInfo.password).then(response => {
          if (parseInt(response.code, 10) === 200) {
            const data = response.data
            setToken(data.token)
            commit('SET_TOKEN', data.token)
            commit('SET_AUTHORITY', data.pmModules)
            commit('SET_NAME', data.loginNo)
            commit('SET_USER_ID', data.userId)
            commit('SET_MENU_OPTS', data.pmModules)
            // 头像默认
            commit('SET_AVATAR', './src/assets/avatar.gif')
          }
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token).then(response => {
          const data = response.data
          commit('SET_AUTHORITY', data.pmModules)
          commit('SET_NAME', data.loginNo)
          commit('SET_USER_ID', data.userId)
          commit('SET_MENU_OPTS', data.pmModules)
          // 头像默认
          commit('SET_AVATAR', './src/assets/avatar.gif')
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 按钮权限
    GetModuleAuthority({ commit, state }, id) {
      return new Promise((resolve, reject) => {
        getModuleAuthority(state.userId, id).then(response => {
          const data = response.data
          commit('SET_MODULE_OPTS', data.moduleOpts)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_AUTHORITY', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
