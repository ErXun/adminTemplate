import { login } from '../../api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'


const state = {
  token: getToken(),
  avatar: '',
  username: "",
  accessRoutes: [],
  isLogin:false
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, username) => {
    state.username = username
  },
  SET_ACCESS_LISTS: (state, accessRoutes) => {
    state.accessRoutes = accessRoutes
  }
}

const actions = {
  // user login
  login({ commit }, userInfo) {
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        console.log(response, 'response');
        commit('SET_ACCESS_LISTS', response.data)  // 设置动态路由
        commit('SET_TOKEN', response.token)  // 设置token
        setToken(response.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },
}


export default {
  namespaced: true,
  state,
  mutations,
  actions
}
